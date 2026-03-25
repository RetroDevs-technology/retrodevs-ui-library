/**
 * A reusable date-time picker component that combines date and time selection.
 * Supports both single date+time and date range+time modes.
 *
 * @example
 * ```tsx
 * <BaseDateTimePicker
 *   mode="single"
 *   value={dateTime}
 *   onChange={setDateTime}
 *   showTime={true}
 * />
 * <BaseDateTimePicker
 *   mode="range"
 *   value={dateRange}
 *   onChange={setDateRange}
 *   showTime={true}
 * />
 * ```
 */
import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/core/button"
import { Calendar } from "@/components/core/calendar"
import {
  BasePopover,
  BasePopoverTrigger,
  BasePopoverContent,
} from "@/components/modules/base-popover"
import { getDateTimePickerDisplayValue } from "./utils/dateTimeFormat"
import { handleDateSelectWithTimePreservation } from "./utils/timePreservation"
import { TimeSection } from "./addons/time-section"
import { normalizeDateRange } from "../date-picker/utils/dateRange"
import type { BaseDateTimePickerProps } from "./types"

/**
 * Base date-time picker component that provides a consistent way to select dates and times.
 * Supports both single date+time and date range+time selection modes.
 */
export function BaseDateTimePicker({
  mode = "single",
  value,
  onChange,
  showTime = true,
  use12Hour = false,
  placeholder,
  className,
  disabled = false,
}: BaseDateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = React.useCallback(
    (selected: Date | { from?: Date; to?: Date } | undefined) => {
      const newValue = handleDateSelectWithTimePreservation(
        selected,
        mode,
        value,
        showTime
      )

      if (mode === "single") {
        const date = newValue as Date | undefined
        onChange?.(date)
        if (date && !showTime) {
          setOpen(false)
        }
      } else {
        const range = newValue as { from?: Date; to?: Date } | undefined
        onChange?.(range)
        if (range?.from && range?.to && !showTime) {
          setOpen(false)
        }
      }
    },
    [mode, onChange, showTime, value]
  )

  const handleTimeChange = React.useCallback(
    (time: Date | undefined, isStart: boolean = true) => {
      if (mode === "single") {
        if (value instanceof Date && time) {
          const newDate = new Date(value)
          newDate.setHours(time.getHours())
          newDate.setMinutes(time.getMinutes())
          onChange?.(newDate)
        } else if (time) {
          onChange?.(time)
        }
      } else {
        const range = value && typeof value === "object" && "from" in value ? value : { from: undefined, to: undefined }
        if (isStart && range.from && time) {
          const newFrom = new Date(range.from)
          newFrom.setHours(time.getHours())
          newFrom.setMinutes(time.getMinutes())
          onChange?.({ ...range, from: newFrom })
        } else if (!isStart && range.to && time) {
          const newTo = new Date(range.to)
          newTo.setHours(time.getHours())
          newTo.setMinutes(time.getMinutes())
          onChange?.({ ...range, to: newTo })
        }
      }
    },
    [mode, onChange, value]
  )

  const displayValue = React.useMemo(
    () =>
      getDateTimePickerDisplayValue(
        mode,
        value,
        showTime,
        use12Hour,
        placeholder || ""
      ),
    [value, mode, showTime, use12Hour, placeholder]
  )

  return (
    <div className={cn("space-y-2", className)}>
      <BasePopover open={open} onOpenChange={setOpen}>
        <BasePopoverTrigger
          render={
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground",
                className
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {displayValue}
            </Button>
          }
        />
        <BasePopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            {mode === "single" ? (
              <Calendar
                mode="single"
                selected={value instanceof Date ? value : undefined}
                onSelect={handleDateSelect}
                initialFocus
              />
            ) : (
              <Calendar
                mode="range"
                selected={normalizeDateRange(
                  value && typeof value === "object" && "from" in value
                    ? value
                    : undefined
                )}
                onSelect={handleDateSelect}
                initialFocus
              />
            )}
            {showTime && (
              <div className="border-t pt-3 mt-3">
                <TimeSection
                  mode={mode}
                  value={value}
                  use12Hour={use12Hour}
                  onTimeChange={handleTimeChange}
                />
              </div>
            )}
          </div>
        </BasePopoverContent>
      </BasePopover>
    </div>
  )
}
