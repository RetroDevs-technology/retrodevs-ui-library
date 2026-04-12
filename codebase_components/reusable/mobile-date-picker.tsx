import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/helper-functions"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "iconsax-react"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import DatePicker, { type DatePickerProps } from "react-datepicker"
import type { DateRange } from "react-day-picker"
import type { ControllerRenderProps } from "react-hook-form"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MobileDatePickerProps {
  placeholder?: string
  mode?: "single" | "range"
  value?: Date | DateRange | string
  onChange?: (value: Date | DateRange | string | undefined) => void
  display?: "select" | "date" | "ghost"
  className?: string
  formatString?: string
  popoverClassName?: string
  showTime?: boolean
  timeFormat?: "12" | "24"
  returnAsString?: boolean
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatDateToLocalString = (date: Date): string => {
  return date.toLocaleString("sv-SE") // YYYY-MM-DD HH:mm:ss format
}

const formatDateRangeToLocalString = (dateRange: DateRange): DateRange => {
  return {
    from: dateRange.from ? (formatDateToLocalString(dateRange.from) as any) : undefined,
    to: dateRange.to ? (formatDateToLocalString(dateRange.to) as any) : undefined,
  }
}

const parseValueToDate = (value: Date | string | undefined): Date | undefined => {
  if (!value) return undefined
  if (value instanceof Date) return value
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

const parseValueToDateRange = (value: DateRange | string | undefined): DateRange | undefined => {
  if (!value) return undefined
  if (typeof value === "string") return undefined // Can't parse string to DateRange
  if (typeof value === "object" && "from" in value) {
    return {
      from: parseValueToDate(value.from),
      to: parseValueToDate(value.to),
    }
  }
  return undefined
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MobileDatePicker({
  value,
  onChange,
  placeholder,
  mode = "single",
  display = "date",
  className,
  formatString = "PPP",
  popoverClassName,
  showTime = false,
  timeFormat = "24",
  returnAsString = false,
  ...props
}: MobileDatePickerProps & Partial<ControllerRenderProps>) {
  // Date states
  const [date, setDate] = React.useState<Date | undefined>(
    mode === "single" ? parseValueToDate(value) : undefined,
  )
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    mode === "range" ? parseValueToDateRange(value)?.from : undefined,
  )
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    mode === "range" ? parseValueToDateRange(value)?.to : undefined,
  )

  // ============================================================================
  // EFFECTS
  // ============================================================================

  React.useEffect(() => {
    if (mode === "single") {
      const dateValue = parseValueToDate(value)
      setDate(dateValue)
    } else {
      const rangeValue = parseValueToDateRange(value)
      setStartDate(rangeValue?.from)
      setEndDate(rangeValue?.to)
    }
  }, [value, mode])

  // ============================================================================
  // DISPLAY FUNCTIONS
  // ============================================================================

  const formatDisplayValue = (): string => {
    if (mode === "single") {
      if (!date) return placeholder || "Pick a date"
      const timeStr = showTime
        ? ` ${format(date, timeFormat === "12" ? "h:mm aa" : "HH:mm")}`
        : ""
      // Use formatDate for date formatting, fallback to formatString if it's a date-fns format
      const dateStr = formatString === "PPP"
        ? format(date, formatString)
        : formatDate(date, formatString as any) || format(date, formatString)
      return `${dateStr}${timeStr}`
    }

    if (!startDate) {
      return placeholder || "Pick a date range"
    }

    if (startDate && !endDate) {
      if (showTime) {
        const dateStr = format(startDate, "MMM d")
        const timeStr = format(startDate, timeFormat === "12" ? "h:mm aa" : "HH:mm")
        return `${dateStr} ${timeStr} - Select end`
      }
      return `${formatDate(startDate, "basic2")} - Select end date`
    }

    if (startDate && endDate) {
      if (showTime) {
        const isSameDate =
          startDate.getDate() === endDate.getDate() &&
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getFullYear() === endDate.getFullYear()

        const fromTime = format(startDate, timeFormat === "12" ? "h:mm aa" : "HH:mm")
        const toTime = format(endDate, timeFormat === "12" ? "h:mm aa" : "HH:mm")

        if (isSameDate) {
          // Same date: "Dec 3 13:44 - 14:00"
          const dateStr = format(startDate, "MMM d")
          const year = startDate.getFullYear()
          return `${dateStr} ${fromTime} - ${toTime} ${year}`
        } else {
          // Different dates: "Dec 3 13:44 - Dec 4 14:00 2025"
          const fromDate = format(startDate, "MMM d")
          const toDate = format(endDate, "MMM d")
          const year = startDate.getFullYear()
          return `${fromDate} ${fromTime} - ${toDate} ${toTime} ${year}`
        }
      }

      // Without time, use formatDate
      return `${formatDate(startDate, "basic2")} - ${formatDate(endDate, "basic2")}`
    }

    return placeholder || "Pick a date range"
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleSingleDateChange = (newDate: Date | null) => {
    if (!newDate) {
      setDate(undefined)
      onChange?.(undefined)
      return
    }

    const selectedDate = new Date(newDate.getTime())
    setDate(selectedDate)

    if (showTime) {
      // Return as string format to preserve local time without timezone conversion
      onChange?.(formatDateToLocalString(selectedDate))
    } else {
      // For date-only selection, normalize to midnight in local timezone
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
      onChange?.(normalizedDate)
    }
  }

  const handleStartDateChange = (newDate: Date | null) => {
    if (!newDate) {
      setStartDate(undefined)
      const selectedRange: DateRange = {
        from: undefined,
        to: endDate,
      }
      onChange?.(endDate ? formatDateRangeToLocalString(selectedRange) : undefined)
      return
    }

    const selectedDate = new Date(newDate.getTime())
    setStartDate(selectedDate)

    const selectedRange: DateRange = {
      from: selectedDate,
      to: endDate,
    }

    if (showTime) {
      onChange?.(formatDateRangeToLocalString(selectedRange))
    } else {
      const normalizedRange = {
        from: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ),
        to: endDate
          ? new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
          )
          : undefined,
      }
      onChange?.(normalizedRange)
    }
  }

  const handleEndDateChange = (newDate: Date | null) => {
    if (!newDate) {
      setEndDate(undefined)
      const selectedRange: DateRange = {
        from: startDate,
        to: undefined,
      }
      onChange?.(startDate ? formatDateRangeToLocalString(selectedRange) : undefined)
      return
    }

    const selectedDate = new Date(newDate.getTime())
    setEndDate(selectedDate)

    const selectedRange: DateRange = {
      from: startDate,
      to: selectedDate,
    }

    if (showTime) {
      onChange?.(formatDateRangeToLocalString(selectedRange))
    } else {
      const normalizedRange = {
        from: startDate
          ? new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
          )
          : undefined,
        to: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ),
      }
      onChange?.(normalizedRange)
    }
  }

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const CustomInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { displayValue?: string; isEmpty?: boolean }>(
    ({ value, onClick, displayValue: customDisplayValue, isEmpty, ...props }, ref) => {
      const displayValue = customDisplayValue || formatDisplayValue()
      const isInputEmpty = isEmpty !== undefined ? isEmpty : (mode === "single" ? !date : !startDate)

      return (
        <div className="relative w-full">
          <input
            ref={ref}
            type="text"
            value={displayValue}
            onClick={onClick}
            readOnly
            data-empty={isInputEmpty}
            className={cn(
              "w-full data-[empty=true]:text-muted-foreground text-[10px] font-medium text-left h-11 border border-border dark:border-border dark:bg-white bg-white rounded-[8px] hover:border-[#0046C97A] hover:bg-white dark:hover:bg-white active:bg-primary dark:active:bg-primary hover:text-foreground dark:hover:text-foreground",
              "pl-3 pr-12 py-2 cursor-pointer truncate",
              className,
            )}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
            {display === "date" && <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
            {display === "select" && <ChevronDown className="text-accent size-6 flex-shrink-0" />}
          </div>
        </div>
      )
    },
  )
  CustomInput.displayName = "CustomInput"

  const baseDatePickerProps: any = {
    showTimeSelect: showTime,
    timeIntervals: 1,
    dateFormat: showTime
      ? timeFormat === "12"
        ? "MMM d, yyyy h:mm aa"
        : "MMM d, yyyy HH:mm"
      : "MMM d, yyyy",
    timeFormat: timeFormat === "12" ? "h:mm aa" : "HH:mm",
    calendarClassName: "react-datepicker__calendar-custom",
    wrapperClassName: "w-full",
    withPortal: false,
  }

  // Format functions for individual date pickers
  const formatStartDisplayValue = (): string => {
    if (!startDate) return "Start date"
    if (showTime) {
      const dateStr = format(startDate, "MMM d")
      const timeStr = format(startDate, timeFormat === "12" ? "h:mm aa" : "HH:mm")
      return `${dateStr} ${timeStr}`
    }
    return formatDate(startDate, "basic2")
  }

  const formatEndDisplayValue = (): string => {
    if (!endDate) return "End date"
    if (showTime) {
      const dateStr = format(endDate, "MMM d")
      const timeStr = format(endDate, timeFormat === "12" ? "h:mm aa" : "HH:mm")
      return `${dateStr} ${timeStr}`
    }
    return formatDate(endDate, "basic2")
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  if (mode === "single") {
    return (
      <DatePicker
        selected={date || null}
        onChange={handleSingleDateChange}
        placeholderText={placeholder || "Pick a date"}
        customInput={React.createElement(CustomInput)}
        {...baseDatePickerProps}
      />
    )
  }

  // For range mode, use two separate date pickers
  return (
    <div className="flex flex-col gap-2 w-full">
      <DatePicker
        selected={startDate || null}
        onChange={handleStartDateChange}
        placeholderText="Start date"
        customInput={React.createElement(CustomInput, {
          displayValue: formatStartDisplayValue(),
          isEmpty: !startDate,
        })}
        minDate={new Date()}
        maxDate={endDate || undefined}
        {...baseDatePickerProps}
      />
      <DatePicker
        selected={endDate || null}
        onChange={handleEndDateChange}
        placeholderText="End date"
        customInput={React.createElement(CustomInput, {
          displayValue: formatEndDisplayValue(),
          isEmpty: !endDate,
        })}
        minDate={startDate || new Date()}
        {...baseDatePickerProps}
      />
    </div>
  )
}

