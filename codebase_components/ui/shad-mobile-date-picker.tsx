import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "iconsax-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface TimeState {
  hour: number
  minute: number
  period?: "AM" | "PM"
}

interface ShadMobileDatePickerProps {
  mode?: "single" | "range"
  selected?: Date | DateRange | undefined
  onSelect?: (date: Date | DateRange | undefined) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  sheetClassName?: string
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
  numberOfMonths?: number
  formatString?: string
  showTime?: boolean
  timeFormat?: "12" | "24"
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const createTimeState = (timeFormat: "12" | "24", date?: Date): TimeState => {
  const now = date || new Date()
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

const combineDateTime = (date: Date, time: TimeState, timeFormat: "12" | "24"): Date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour24 = convertTo24Hour(time.hour, time.period, timeFormat)

  return new Date(year, month, day, hour24, time.minute, 0, 0)
}

const extractTimeFromDate = (date: Date, timeFormat: "12" | "24"): TimeState => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return {
    hour: timeFormat === "12" ? (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour) : hour,
    minute,
    period: timeFormat === "12" ? (hour >= 12 ? "PM" : "AM") : undefined,
  }
}

// ============================================================================
// MOBILE TIME PICKER COMPONENT
// ============================================================================

interface MobileTimePickerProps {
  time: TimeState
  setTime: (time: TimeState) => void
  label: string
  timeFormat: "12" | "24"
}

function MobileTimePicker({ time, setTime, label, timeFormat }: MobileTimePickerProps) {
  const hours = timeFormat === "12"
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)

  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const hourId = React.useId()
  const minuteId = React.useId()

  const handleHourChange = (value: string) => {
    const newHour = Number.parseInt(value) || 0
    setTime({ ...time, hour: newHour })
  }

  const handleMinuteChange = (value: string) => {
    const newMinute = Number.parseInt(value) || 0
    setTime({ ...time, minute: newMinute })
  }

  const handlePeriodChange = (period: "AM" | "PM") => {
    setTime({ ...time, period })
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <fieldset className="flex items-center gap-3 border-0 p-0 m-0">
        <legend className="sr-only">{label}</legend>
        {/* Hour Picker - Scrollable Number Input */}
        <div className="flex-1">
          <Input
            id={hourId}
            type="number"
            min={timeFormat === "12" ? 1 : 0}
            max={timeFormat === "12" ? 12 : 23}
            value={time.hour}
            onChange={(e) => handleHourChange(e.target.value)}
            className="text-center text-lg font-semibold h-14"
            placeholder="00"
            aria-label={`${label} hour`}
          />
          <p className="text-xs text-muted-foreground text-center mt-1">Hour</p>
        </div>

        <span className="text-2xl font-bold text-muted-foreground" aria-hidden="true">:</span>

        {/* Minute Picker - Scrollable Number Input */}
        <div className="flex-1">
          <Input
            id={minuteId}
            type="number"
            min={0}
            max={59}
            value={time.minute}
            onChange={(e) => handleMinuteChange(e.target.value)}
            className="text-center text-lg font-semibold h-14"
            placeholder="00"
            aria-label={`${label} minute`}
          />
          <p className="text-xs text-muted-foreground text-center mt-1">Minute</p>
        </div>

        {/* AM/PM Picker for 12-hour format */}
        {timeFormat === "12" && (
          <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
            <legend className="sr-only">{label} period</legend>
            <Button
              type="button"
              variant={time.period === "AM" ? "default" : "outline"}
              size="sm"
              className="h-12 w-16 text-sm font-semibold"
              onClick={() => handlePeriodChange("AM")}
              aria-pressed={time.period === "AM"}
            >
              AM
            </Button>
            <Button
              type="button"
              variant={time.period === "PM" ? "default" : "outline"}
              size="sm"
              className="h-12 w-16 text-sm font-semibold"
              onClick={() => handlePeriodChange("PM")}
              aria-pressed={time.period === "PM"}
            >
              PM
            </Button>
          </fieldset>
        )}
      </fieldset>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ShadMobileDatePicker({
  mode = "single",
  selected,
  onSelect,
  placeholder,
  className,
  inputClassName,
  sheetClassName,
  disabled = false,
  fromDate,
  toDate,
  numberOfMonths = 1,
  formatString = "PPP",
  showTime = false,
  timeFormat = "24",
}: ShadMobileDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Time states
  const [time, setTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "single") {
      return extractTimeFromDate(selected as Date, timeFormat)
    }
    return createTimeState(timeFormat)
  })

  const [fromTime, setFromTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "range") {
      const range = selected as DateRange
      if (range.from) {
        return extractTimeFromDate(range.from, timeFormat)
      }
    }
    return createTimeState(timeFormat)
  })

  const [toTime, setToTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "range") {
      const range = selected as DateRange
      if (range.to) {
        return extractTimeFromDate(range.to, timeFormat)
      }
    }
    return createTimeState(timeFormat)
  })

  // Update time states when selected changes
  React.useEffect(() => {
    if (showTime) {
      if (mode === "single" && selected) {
        setTime(extractTimeFromDate(selected as Date, timeFormat))
      } else if (mode === "range" && selected) {
        const range = selected as DateRange
        if (range.from) {
          setFromTime(extractTimeFromDate(range.from, timeFormat))
        }
        if (range.to) {
          setToTime(extractTimeFromDate(range.to, timeFormat))
        }
      }
    }
  }, [selected, mode, showTime, timeFormat])

  // Format display value
  const formatDisplayValue = (): string => {
    if (!selected) return placeholder || "Pick a date"

    if (mode === "range") {
      const range = selected as DateRange
      if (range.from && range.to) {
        const dateFormat = showTime ? "MMM d, yyyy" : formatString
        const fromTimeStr = showTime
          ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
          : ""
        const toTimeStr = showTime
          ? ` ${formatTime(toTime.hour, toTime.minute, toTime.period, timeFormat)}`
          : ""

        if (showTime) {
          const fromDate = format(range.from, "MMM d")
          const toDate = format(range.to, "MMM d")
          const year = range.from.getFullYear()
          return `${fromDate}${fromTimeStr} - ${toDate}${toTimeStr}, ${year}`
        }

        return `${format(range.from, dateFormat)}${fromTimeStr} - ${format(range.to, dateFormat)}${toTimeStr}`
      }
      if (range.from) {
        const dateFormat = showTime ? "MMM d, yyyy" : formatString
        const fromTimeStr = showTime
          ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
          : ""
        return `${format(range.from, dateFormat)}${fromTimeStr} - Select end date`
      }
      return placeholder || "Pick a date"
    }

    const date = selected as Date
    const timeStr = showTime
      ? ` ${formatTime(time.hour, time.minute, time.period, timeFormat)}`
      : ""
    return `${format(date, formatString)}${timeStr}`
  }

  const handleSelect = (date: Date | DateRange | undefined) => {
    if (!date) {
      onSelect?.(undefined)
      return
    }

    if (mode === "single") {
      const singleDate = date as Date
      if (showTime) {
        const combinedDate = combineDateTime(singleDate, time, timeFormat)
        onSelect?.(combinedDate)
      } else {
        // Normalize to midnight for date-only
        const normalizedDate = new Date(
          singleDate.getFullYear(),
          singleDate.getMonth(),
          singleDate.getDate(),
        )
        onSelect?.(normalizedDate)
      }

      if (!showTime) {
        setOpen(false)
      }
    } else {
      const range = date as DateRange
      if (showTime) {
        const updatedRange: DateRange = {
          from: range.from ? combineDateTime(range.from, fromTime, timeFormat) : undefined,
          to: range.to ? combineDateTime(range.to, toTime, timeFormat) : undefined,
        }
        onSelect?.(updatedRange)
      } else {
        // Normalize to midnight for date-only
        const normalizedRange: DateRange = {
          from: range.from
            ? new Date(
              range.from.getFullYear(),
              range.from.getMonth(),
              range.from.getDate(),
            )
            : undefined,
          to: range.to
            ? new Date(
              range.to.getFullYear(),
              range.to.getMonth(),
              range.to.getDate(),
            )
            : undefined,
        }
        onSelect?.(normalizedRange)
      }

      if (range.from && range.to && !showTime) {
        setOpen(false)
      }
    }
  }

  const handleTimeChange = (newTime: TimeState, isFromTime = false) => {
    if (mode === "single") {
      setTime(newTime)
      if (selected) {
        const combinedDate = combineDateTime(selected as Date, newTime, timeFormat)
        onSelect?.(combinedDate)
      }
    } else {
      if (isFromTime) {
        setFromTime(newTime)
        if (selected) {
          const range = selected as DateRange
          if (range.from) {
            const updatedRange: DateRange = {
              ...range,
              from: combineDateTime(range.from, newTime, timeFormat),
            }
            onSelect?.(updatedRange)
          }
        }
      } else {
        setToTime(newTime)
        if (selected) {
          const range = selected as DateRange
          if (range.to) {
            const updatedRange: DateRange = {
              ...range,
              to: combineDateTime(range.to, newTime, timeFormat),
            }
            onSelect?.(updatedRange)
          }
        }
      }
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="flex-1 truncate">{formatDisplayValue()}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className={cn(
          "h-[85vh] flex flex-col p-0",
          sheetClassName,
        )}
      >
        <SheetHeader className="px-4 pt-4 pb-2 border-b">
          <SheetTitle>
            {mode === "range" ? "Select Date Range" : "Select Date"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {mode === "range" ? (
            <Calendar
              mode="range"
              selected={selected as DateRange | undefined}
              onSelect={handleSelect}
              numberOfMonths={numberOfMonths}
              required
              className="w-full [--cell-size:3rem]"
              classNames={{
                // Mobile-optimized larger touch targets
                day: cn(
                  "relative w-full h-full p-0 text-center",
                  "min-h-[48px]", // Minimum touch target size
                  "group/day aspect-square select-none",
                ),
                month_caption: cn(
                  "flex items-center justify-center h-12 w-full px-4",
                  "text-base font-semibold", // Larger caption
                ),
                button_previous: cn(
                  "size-12", // Larger navigation buttons
                  "min-h-[48px] min-w-[48px]",
                ),
                button_next: cn(
                  "size-12", // Larger navigation buttons
                  "min-h-[48px] min-w-[48px]",
                ),
                weekday: cn(
                  "text-muted-foreground rounded-md flex-1 font-normal text-sm",
                  "min-h-[40px] flex items-center justify-center", // Larger weekday headers
                ),
              }}
              fromDate={fromDate}
              endMonth={new Date(new Date().getFullYear() + 5, 11)}
              showOutsideDays={true}
              captionLayout="dropdown"
            />
          ) : (
            <Calendar
              mode="single"
              selected={selected as Date | undefined}
              onSelect={handleSelect}
              numberOfMonths={numberOfMonths}
              className="w-full [--cell-size:3rem]"
              classNames={{
                // Mobile-optimized larger touch targets
                day: cn(
                  "relative w-full h-full p-0 text-center",
                  "min-h-[48px]", // Minimum touch target size
                  "group/day aspect-square select-none",
                ),
                month_caption: cn(
                  "flex items-center justify-center h-12 w-full px-4",
                  "text-base font-semibold", // Larger caption
                ),
                button_previous: cn(
                  "size-12", // Larger navigation buttons
                  "min-h-[48px] min-w-[48px]",
                ),
                button_next: cn(
                  "size-12", // Larger navigation buttons
                  "min-h-[48px] min-w-[48px]",
                ),
                weekday: cn(
                  "text-muted-foreground rounded-md flex-1 font-normal text-sm",
                  "min-h-[40px] flex items-center justify-center", // Larger weekday headers
                ),
              }}
              fromDate={fromDate}
              endMonth={new Date(new Date().getFullYear() + 5, 11)}
              showOutsideDays={true}
              captionLayout="dropdown"
            />
          )}

          {showTime && (
            <div className="border-t pt-4 mt-4 space-y-4">
              {mode === "single" ? (
                <MobileTimePicker
                  time={time}
                  setTime={(newTime) => handleTimeChange(newTime)}
                  label="Time"
                  timeFormat={timeFormat}
                />
              ) : (
                <>
                  <MobileTimePicker
                    time={fromTime}
                    setTime={(newTime) => handleTimeChange(newTime, true)}
                    label="From Time"
                    timeFormat={timeFormat}
                  />
                  {selected && (selected as DateRange).to && (
                    <MobileTimePicker
                      time={toTime}
                      setTime={(newTime) => handleTimeChange(newTime, false)}
                      label="To Time"
                      timeFormat={timeFormat}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
        {mode === "range" && (
          <div className="border-t p-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                onSelect?.(undefined)
                setOpen(false)
              }}
            >
              Clear
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                if (selected && mode === "range") {
                  const range = selected as DateRange
                  if (range.from && range.to) {
                    setOpen(false)
                  }
                }
              }}
              disabled={
                !selected ||
                (mode === "range" &&
                  (!(selected as DateRange).from ||
                    !(selected as DateRange).to))
              }
            >
              Apply
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

// ============================================================================
// INPUT VARIANT
// ============================================================================

interface ShadMobileDatePickerInputProps
  extends Omit<ShadMobileDatePickerProps, "className"> {
  inputClassName?: string
  label?: string
}

export function ShadMobileDatePickerInput({
  mode = "single",
  selected,
  onSelect,
  placeholder,
  inputClassName,
  sheetClassName,
  disabled = false,
  fromDate,
  toDate,
  numberOfMonths = 1,
  formatString = "PPP",
  showTime = false,
  timeFormat = "24",
  label,
}: ShadMobileDatePickerInputProps) {
  const [open, setOpen] = React.useState(false)

  // Time states
  const [time, setTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "single") {
      return extractTimeFromDate(selected as Date, timeFormat)
    }
    return createTimeState(timeFormat)
  })

  const [fromTime, setFromTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "range") {
      const range = selected as DateRange
      if (range.from) {
        return extractTimeFromDate(range.from, timeFormat)
      }
    }
    return createTimeState(timeFormat)
  })

  const [toTime, setToTime] = React.useState<TimeState>(() => {
    if (showTime && selected && mode === "range") {
      const range = selected as DateRange
      if (range.to) {
        return extractTimeFromDate(range.to, timeFormat)
      }
    }
    return createTimeState(timeFormat)
  })

  // Update time states when selected changes
  React.useEffect(() => {
    if (showTime) {
      if (mode === "single" && selected) {
        setTime(extractTimeFromDate(selected as Date, timeFormat))
      } else if (mode === "range" && selected) {
        const range = selected as DateRange
        if (range.from) {
          setFromTime(extractTimeFromDate(range.from, timeFormat))
        }
        if (range.to) {
          setToTime(extractTimeFromDate(range.to, timeFormat))
        }
      }
    }
  }, [selected, mode, showTime, timeFormat])

  // Format display value
  const formatDisplayValue = (): string => {
    if (!selected) return placeholder || "Pick a date"

    if (mode === "range") {
      const range = selected as DateRange
      if (range.from && range.to) {
        const dateFormat = showTime ? "MMM d, yyyy" : formatString
        const fromTimeStr = showTime
          ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
          : ""
        const toTimeStr = showTime
          ? ` ${formatTime(toTime.hour, toTime.minute, toTime.period, timeFormat)}`
          : ""

        if (showTime) {
          const fromDate = format(range.from, "MMM d")
          const toDate = format(range.to, "MMM d")
          const year = range.from.getFullYear()
          return `${fromDate}${fromTimeStr} - ${toDate}${toTimeStr}, ${year}`
        }

        return `${format(range.from, dateFormat)}${fromTimeStr} - ${format(range.to, dateFormat)}${toTimeStr}`
      }
      if (range.from) {
        const dateFormat = showTime ? "MMM d, yyyy" : formatString
        const fromTimeStr = showTime
          ? ` ${formatTime(fromTime.hour, fromTime.minute, fromTime.period, timeFormat)}`
          : ""
        return `${format(range.from, dateFormat)}${fromTimeStr} - Select end date`
      }
      return placeholder || "Pick a date"
    }

    const date = selected as Date
    const timeStr = showTime
      ? ` ${formatTime(time.hour, time.minute, time.period, timeFormat)}`
      : ""
    return `${format(date, formatString)}${timeStr}`
  }

  const handleSelect = (date: Date | DateRange | undefined) => {
    if (!date) {
      onSelect?.(undefined)
      return
    }

    if (mode === "single") {
      const singleDate = date as Date
      if (showTime) {
        const combinedDate = combineDateTime(singleDate, time, timeFormat)
        onSelect?.(combinedDate)
      } else {
        // Normalize to midnight for date-only
        const normalizedDate = new Date(
          singleDate.getFullYear(),
          singleDate.getMonth(),
          singleDate.getDate(),
        )
        onSelect?.(normalizedDate)
      }

      if (!showTime) {
        setOpen(false)
      }
    } else {
      const range = date as DateRange
      if (showTime) {
        const updatedRange: DateRange = {
          from: range.from ? combineDateTime(range.from, fromTime, timeFormat) : undefined,
          to: range.to ? combineDateTime(range.to, toTime, timeFormat) : undefined,
        }
        onSelect?.(updatedRange)
      } else {
        // Normalize to midnight for date-only
        const normalizedRange: DateRange = {
          from: range.from
            ? new Date(
              range.from.getFullYear(),
              range.from.getMonth(),
              range.from.getDate(),
            )
            : undefined,
          to: range.to
            ? new Date(
              range.to.getFullYear(),
              range.to.getMonth(),
              range.to.getDate(),
            )
            : undefined,
        }
        onSelect?.(normalizedRange)
      }

      if (range.from && range.to && !showTime) {
        setOpen(false)
      }
    }
  }

  const handleTimeChange = (newTime: TimeState, isFromTime = false) => {
    if (mode === "single") {
      setTime(newTime)
      if (selected) {
        const combinedDate = combineDateTime(selected as Date, newTime, timeFormat)
        onSelect?.(combinedDate)
      }
    } else {
      if (isFromTime) {
        setFromTime(newTime)
        if (selected) {
          const range = selected as DateRange
          if (range.from) {
            const updatedRange: DateRange = {
              ...range,
              from: combineDateTime(range.from, newTime, timeFormat),
            }
            onSelect?.(updatedRange)
          }
        }
      } else {
        setToTime(newTime)
        if (selected) {
          const range = selected as DateRange
          if (range.to) {
            const updatedRange: DateRange = {
              ...range,
              to: combineDateTime(range.to, newTime, timeFormat),
            }
            onSelect?.(updatedRange)
          }
        }
      }
    }
  }

  const inputId = React.useId()

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium mb-2 block">
          {label}
        </label>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="relative">
            <Input
              id={inputId}
              readOnly
              value={formatDisplayValue()}
              placeholder={placeholder || "Pick a date"}
              className={cn(
                "cursor-pointer pr-10",
                !selected && "text-muted-foreground",
                inputClassName,
              )}
              disabled={disabled}
              onClick={() => !disabled && setOpen(true)}
            />
            <CalendarIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className={cn(
            "h-[85vh] flex flex-col p-0",
            sheetClassName,
          )}
        >
          <SheetHeader className="px-4 pt-4 pb-2 border-b">
            <SheetTitle>
              {mode === "range" ? "Select Date Range" : "Select Date"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {mode === "range" ? (
              <Calendar
                mode="range"
                selected={selected as DateRange | undefined}
                onSelect={handleSelect}
                numberOfMonths={numberOfMonths}
                required
                className="w-full [--cell-size:3rem]"
                classNames={{
                  // Mobile-optimized larger touch targets
                  day: cn(
                    "relative w-full h-full p-0 text-center",
                    "min-h-[48px]", // Minimum touch target size
                    "group/day aspect-square select-none",
                  ),
                  month_caption: cn(
                    "flex items-center justify-center h-12 w-full px-4",
                    "text-base font-semibold", // Larger caption
                  ),
                  button_previous: cn(
                    "size-12", // Larger navigation buttons
                    "min-h-[48px] min-w-[48px]",
                  ),
                  button_next: cn(
                    "size-12", // Larger navigation buttons
                    "min-h-[48px] min-w-[48px]",
                  ),
                  weekday: cn(
                    "text-muted-foreground rounded-md flex-1 font-normal text-sm",
                    "min-h-[40px] flex items-center justify-center", // Larger weekday headers
                  ),
                }}
                fromDate={fromDate}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
                showOutsideDays={true}
                captionLayout="dropdown"
              />
            ) : (
              <Calendar
                mode="single"
                selected={selected as Date | undefined}
                onSelect={handleSelect}
                numberOfMonths={numberOfMonths}
                className="w-full [--cell-size:3rem]"
                classNames={{
                  // Mobile-optimized larger touch targets
                  day: cn(
                    "relative w-full h-full p-0 text-center",
                    "min-h-[48px]", // Minimum touch target size
                    "group/day aspect-square select-none",
                  ),
                  month_caption: cn(
                    "flex items-center justify-center h-12 w-full px-4",
                    "text-base font-semibold", // Larger caption
                  ),
                  button_previous: cn(
                    "size-12", // Larger navigation buttons
                    "min-h-[48px] min-w-[48px]",
                  ),
                  button_next: cn(
                    "size-12", // Larger navigation buttons
                    "min-h-[48px] min-w-[48px]",
                  ),
                  weekday: cn(
                    "text-muted-foreground rounded-md flex-1 font-normal text-sm",
                    "min-h-[40px] flex items-center justify-center", // Larger weekday headers
                  ),
                }}
                fromDate={fromDate}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
                showOutsideDays={true}
                captionLayout="dropdown"
              />
            )}

            {showTime && (
              <div className="border-t pt-4 mt-4 space-y-4">
                {mode === "single" ? (
                  <MobileTimePicker
                    time={time}
                    setTime={(newTime) => handleTimeChange(newTime)}
                    label="Time"
                    timeFormat={timeFormat}
                  />
                ) : (
                  <>
                    <MobileTimePicker
                      time={fromTime}
                      setTime={(newTime) => handleTimeChange(newTime, true)}
                      label="From Time"
                      timeFormat={timeFormat}
                    />
                    {selected && (selected as DateRange).to && (
                      <MobileTimePicker
                        time={toTime}
                        setTime={(newTime) => handleTimeChange(newTime, false)}
                        label="To Time"
                        timeFormat={timeFormat}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          {mode === "range" && (
            <div className="border-t p-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  onSelect?.(undefined)
                  setOpen(false)
                }}
              >
                Clear
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (selected && mode === "range") {
                    const range = selected as DateRange
                    if (range.from && range.to) {
                      setOpen(false)
                    }
                  }
                }}
                disabled={
                  !selected ||
                  (mode === "range" &&
                    (!(selected as DateRange).from ||
                      !(selected as DateRange).to))
                }
              >
                Apply
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
