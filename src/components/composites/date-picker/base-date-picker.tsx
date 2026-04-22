import { Button } from "@/components/core/button"
import { Calendar } from "@/components/core/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/core/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/core/sheet"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/lib/hooks/use-mobile"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "iconsax-react"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import type { ControllerRenderProps } from "react-hook-form"
import { ShadMobileDatePicker } from "./shad-mobile-date-picker"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface BaseDatePickerProps {
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
  disabled?: boolean
}

interface TimeState {
  hour: number
  minute: number
  period?: "AM" | "PM"
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const createTimeState = (timeFormat: "12" | "24"): TimeState => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()

  return {
    hour: timeFormat === "12" ? (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour) : hour,
    minute,
    period: timeFormat === "12" ? (hour >= 12 ? "PM" : "AM") : undefined,
  }
}

const convertTo24Hour = (
  hour: number,
  period: "AM" | "PM" | undefined,
  timeFormat: "12" | "24",
): number => {
  if (timeFormat === "24" || !period) return hour
  if (period === "AM" && hour === 12) return 0
  if (period === "PM" && hour !== 12) return hour + 12
  return hour
}

const formatTime = (
  hour: number,
  minute: number,
  period: "AM" | "PM" | undefined,
  timeFormat: "12" | "24",
): string => {
  const displayHour = timeFormat === "12" ? (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour) : hour
  const formattedMinute = minute.toString().padStart(2, "0")

  return timeFormat === "12"
    ? `${displayHour}:${formattedMinute} ${period || "AM"}`
    : `${displayHour.toString().padStart(2, "0")}:${formattedMinute}`
}

const combineDateTime = (date: Date | string, time: TimeState, timeFormat: "12" | "24"): Date => {
  // Handle string dates by parsing them back to Date objects
  const dateObj = typeof date === "string" ? new Date(date) : date

  // If the string couldn't be parsed or is not a valid date, use current date
  if (Number.isNaN(dateObj.getTime())) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()
    const hour24 = convertTo24Hour(time.hour, time.period, timeFormat)
    return new Date(year, month, day, hour24, time.minute, 0, 0)
  }

  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const day = dateObj.getDate()
  const hour24 = convertTo24Hour(time.hour, time.period, timeFormat)

  // Create a new date with the exact time specified, preserving the original date's timezone context
  return new Date(year, month, day, hour24, time.minute, 0, 0)
}

const extractTimeFromDate = (date: Date | string, timeFormat: "12" | "24"): TimeState => {
  // Handle string dates by parsing them back to Date objects
  const dateObj = typeof date === "string" ? new Date(date) : date

  // If the string couldn't be parsed or is not a valid date, return current time
  if (Number.isNaN(dateObj.getTime())) {
    return createTimeState(timeFormat)
  }

  const hour = dateObj.getHours()
  const minute = dateObj.getMinutes()

  return {
    hour: timeFormat === "12" ? (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour) : hour,
    minute,
    period: timeFormat === "12" ? (hour >= 12 ? "PM" : "AM") : undefined,
  }
}

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

export function BaseDatePicker({
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
  disabled = false,
  ...props
}: BaseDatePickerProps & Partial<ControllerRenderProps>) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  // Determine if we should use Sheet (mobile + range mode) or Popover
  const useSheet = isMobile && mode === "range"

  // Date states
  const [date, setDate] = React.useState<Date | undefined>(
    mode === "single" ? parseValueToDate(value) : undefined,
  )
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    mode === "range" ? parseValueToDateRange(value) : undefined,
  )

  // Time states
  const [time, setTime] = React.useState<TimeState>(() => createTimeState(timeFormat))
  const [fromTime, setFromTime] = React.useState<TimeState>(() => createTimeState(timeFormat))
  const [toTime, setToTime] = React.useState<TimeState>(() => createTimeState(timeFormat))

  // ============================================================================
  // EFFECTS
  // ============================================================================

  React.useEffect(() => {
    if (mode === "single") {
      const dateValue = parseValueToDate(value)
      setDate(dateValue)

      if (showTime && value) {
        setTime(extractTimeFromDate(value, timeFormat))
      }
    } else {
      const rangeValue = parseValueToDateRange(value)
      setDateRange(rangeValue)

      if (showTime && rangeValue?.from) {
        setFromTime(extractTimeFromDate(rangeValue.from, timeFormat))
      }
      if (showTime && rangeValue?.to) {
        setToTime(extractTimeFromDate(rangeValue.to, timeFormat))
      }
    }
  }, [value, mode, showTime, timeFormat])

  // ============================================================================
  // DISPLAY FUNCTIONS
  // ============================================================================

  const formatDisplayValue = (): string => {
    if (mode === "single") {
      if (!date) return placeholder || "Pick a date"
      const timeStr = showTime
        ? ` ${formatTime(time.hour, time.minute, time.period, timeFormat)}`
        : ""
      return `${format(date, formatString)}${timeStr}`
    }

    if (!dateRange?.from) {
      return placeholder || "Pick a date range"
    }

    // Use more compact format for ranges, especially with time
    const dateFormat = showTime || isMobile ? "MMM d, yyyy" : "PPP"

    if (dateRange.from && !dateRange.to) {
      const fromTimeStr = showTime
        ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
        : ""
      return `${format(dateRange.from, dateFormat)}${fromTimeStr} - Select end date`
    }

    if (dateRange.from && dateRange.to) {
      const fromTimeStr = showTime
        ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
        : ""
      const toTimeStr = showTime
        ? ` ${formatTime(toTime.hour, toTime.minute, toTime.period, timeFormat)}`
        : ""

      // Use even more compact format for mobile with time
      if (isMobile && showTime) {
        const fromDate = format(dateRange.from, "MMM d")
        const toDate = format(dateRange.to, "MMM d")
        const year = dateRange.from.getFullYear()
        return `${fromDate}${fromTimeStr} - ${toDate}${toTimeStr}, ${year}`
      }

      return `${format(dateRange.from, dateFormat)}${fromTimeStr} - ${format(dateRange.to, dateFormat)}${toTimeStr}`
    }

    return placeholder || "Pick a date range"
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleSingleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) {
      setDate(undefined)
      onChange?.(undefined)
      return
    }

    // Preserve the exact date and time as selected, without timezone conversion
    const selectedDate = new Date(newDate.getTime())
    setDate(selectedDate)

    if (showTime) {
      const combinedDate = combineDateTime(selectedDate, time, timeFormat)
      // Return as string format to preserve local time without timezone conversion
      onChange?.(formatDateToLocalString(combinedDate))
    } else {
      // For date-only selection, normalize to midnight in local timezone
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
      onChange?.(normalizedDate)
    }

    if (!showTime) {
      setOpen(false)
    }
  }

  const handleRangeDateSelect = (newRange: DateRange | undefined) => {
    if (!newRange) {
      setDateRange(undefined)
      onChange?.(undefined)
      return
    }

    // Preserve the exact dates and times as selected, without timezone conversion
    const selectedRange = {
      ...newRange,
      from: newRange.from ? new Date(newRange.from.getTime()) : undefined,
      to: newRange.to ? new Date(newRange.to.getTime()) : undefined,
    }
    setDateRange(selectedRange)

    if (showTime) {
      const updatedRange = { ...selectedRange }
      if (selectedRange.from) {
        updatedRange.from = combineDateTime(selectedRange.from, fromTime, timeFormat)
      }
      if (selectedRange.to) {
        updatedRange.to = combineDateTime(selectedRange.to, toTime, timeFormat)
      }
      // Return as string format to preserve local time without timezone conversion
      onChange?.(formatDateRangeToLocalString(updatedRange))
    } else {
      // For date-only selection, normalize to midnight in local timezone
      const normalizedRange = {
        ...selectedRange,
        from: selectedRange.from
          ? new Date(
            selectedRange.from.getFullYear(),
            selectedRange.from.getMonth(),
            selectedRange.from.getDate(),
          )
          : undefined,
        to: selectedRange.to
          ? new Date(
            selectedRange.to.getFullYear(),
            selectedRange.to.getMonth(),
            selectedRange.to.getDate(),
          )
          : undefined,
      }
      onChange?.(normalizedRange)
    }

    if (selectedRange.from && selectedRange.to && !showTime) {
      setOpen(false)
    }
  }

  const handleTimeChange = (newTime: TimeState, isFromTime = false) => {
    if (mode === "single") {
      setTime(newTime)
      if (date) {
        const combinedDate = combineDateTime(date, newTime, timeFormat)
        // Return as string format to preserve local time without timezone conversion
        onChange?.(formatDateToLocalString(combinedDate))
      }
    } else {
      if (isFromTime) {
        setFromTime(newTime)
        if (dateRange?.from) {
          const updatedRange = {
            ...dateRange,
            from: combineDateTime(dateRange.from, newTime, timeFormat),
          }
          // Return as string format to preserve local time without timezone conversion
          onChange?.(formatDateRangeToLocalString(updatedRange))
        }
      } else {
        setToTime(newTime)
        if (dateRange?.to) {
          const updatedRange = {
            ...dateRange,
            to: combineDateTime(dateRange.to, newTime, timeFormat),
          }
          // Return as string format to preserve local time without timezone conversion
          onChange?.(formatDateRangeToLocalString(updatedRange))
        }
      }
    }
  }

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  const TimePicker = ({
    time,
    setTime,
    label,
  }: {
    time: TimeState
    setTime: (time: TimeState) => void
    label: string
  }) => {
    const hours =
      timeFormat === "12"
        ? Array.from({ length: 12 }, (_, i) => i + 1)
        : Array.from({ length: 24 }, (_, i) => i)

    const minutes = Array.from({ length: 60 }, (_, i) => i)

    const handleHourChange = (hour: unknown) => {
      const newHour = Number.parseInt(String(hour), 10)
      setTime({ ...time, hour: newHour })
    }

    const handleMinuteChange = (minute: unknown) => {
      const newMinute = Number.parseInt(String(minute), 10)
      setTime({ ...time, minute: newMinute })
    }

    const handlePeriodChange = (period: unknown) => {
      setTime({
        ...time,
        period: String(period) as "AM" | "PM",
      })
    }

    const timePickerId = `time-picker-${label.toLowerCase().replace(/\s+/g, "-")}`

    return (
      <div className="space-y-2 isolate relative">
        <label htmlFor={timePickerId} className="text-sm font-medium text-foreground break-words">
          {label}
        </label>
        <div className="flex items-center space-x-2 isolate relative" id={timePickerId}>
          <Select value={time.hour.toString()} onValueChange={handleHourChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-muted-foreground">:</span>

          <Select value={time.minute.toString()} onValueChange={handleMinuteChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  {minute.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {timeFormat === "12" && (
            <Select value={time.period || "AM"} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderTrigger = () => (
    <Button
      variant="outline"
      data-empty={mode === "single" ? !date : !dateRange?.from}
      className={cn(
        "w-full data-[empty=true]:text-muted-foreground text-xs font-medium justify-between text-left h-11 border-border dark:border-border dark:bg-white bg-white rounded-[8px] hover:border-[#0046C97A] hover:bg-white dark:hover:bg-white active:bg-primary dark:active:bg-primary hover:text-foreground dark:hover:text-foreground",
        "overflow-hidden",
        className,
      )}
      {...props}
      disabled={disabled}>
      <span className="truncate flex-1 text-left pr-2">{formatDisplayValue()}</span>
      {display === "date" && <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />}
      {display === "select" && <ChevronDown className="text-accent size-6 flex-shrink-0" />}
    </Button>
  )

  const renderContent = () => (
    <div className={cn("p-3", useSheet && "pb-6", "isolate")}>
      {mode === "single" ? (
        <div className="flex flex-col gap-2 isolate">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSingleDateSelect}
            className="min-w-[250px] isolate"
            captionLayout="dropdown"
            startMonth={new Date(new Date().getFullYear() - 100, 0)}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
          />

          {showTime && (
            <div className="border-t pt-3 mt-3 isolate relative z-10">
              <TimePicker
                time={time}
                setTime={(newTime) => handleTimeChange(newTime)}
                label="Time"
              />
            </div>
          )}
        </div>
      ) : (
        <div className={cn("flex flex-col gap-2 isolate",
          "[&_.rdp-months]:flex [&_.rdp-months]:gap-8 [&_.rdp-month]:min-w-[280px]",
          "[&_.rdp-months]:isolate [&_.rdp-month]:isolate",
          useSheet && "[&_.rdp-months]:flex-col [&_.rdp-months]:gap-4 [&_.rdp-month]:min-w-full",
          className,
        )}>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleRangeDateSelect}
            className="min-w-[250px] isolate"
            numberOfMonths={2}
            captionLayout="dropdown"
            startMonth={new Date(new Date().getFullYear() - 100, 0)}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
          />

          {showTime && (
            <div className={cn(
              "border-t pt-3 mt-3 space-y-3 isolate relative z-10",
              useSheet && "pb-4"
            )}>
              <TimePicker
                time={fromTime}
                setTime={(newTime) => handleTimeChange(newTime, true)}
                label="From Time"
              />

              {dateRange?.to && (
                <TimePicker
                  time={toTime}
                  setTime={(newTime) => handleTimeChange(newTime, false)}
                  label="To Time"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )

  // ============================================================================
  // RENDER
  // ============================================================================

  // Use ShadMobileDatePicker for mobile devices, shadcn Calendar for desktop
  if (isMobile) {
    // Convert value to selected format (Date | DateRange)
    const selected = mode === "single"
      ? parseValueToDate(value)
      : parseValueToDateRange(value)

    // Handle onChange to match expected format
    const handleMobileSelect = (selectedDate: Date | DateRange | undefined) => {
      if (!onChange) return

      if (!selectedDate) {
        setDate(undefined)
        setDateRange(undefined)
        onChange(undefined)
        return
      }

      if (mode === "single") {
        const singleDate = selectedDate as Date
        setDate(singleDate)
        if (showTime) setTime(extractTimeFromDate(singleDate, timeFormat))
        onChange(showTime ? formatDateToLocalString(singleDate) : singleDate)
      } else {
        const range = selectedDate as DateRange
        setDateRange(range)
        if (showTime) {
          setFromTime(range.from ? extractTimeFromDate(range.from, timeFormat) : createTimeState(timeFormat))
          setToTime(range.to ? extractTimeFromDate(range.to, timeFormat) : createTimeState(timeFormat))
        }
        onChange(showTime ? formatDateRangeToLocalString(range) : range)
      }
    }

    return (
      <ShadMobileDatePicker
        mode={mode}
        selected={selected}
        onSelect={handleMobileSelect}
        placeholder={placeholder}
        className={className}
        formatString={formatString}
        sheetClassName={popoverClassName}
        showTime={showTime}
        timeFormat={timeFormat}
        disabled={disabled}
        numberOfMonths={mode === "range" ? 2 : 1}
      />
    )
  }

  // Use Sheet for mobile range mode, Popover for everything else
  if (useSheet) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{renderTrigger()}</SheetTrigger>
        <SheetContent
          side="bottom"
          className={cn(
            "max-h-[90vh] overflow-y-auto p-0",
            popoverClassName
          )}>
          {renderContent()}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", popoverClassName)}>
        {renderContent()}
      </PopoverContent>
    </Popover>
  )
}
