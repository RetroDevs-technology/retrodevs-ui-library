import * as React from "react"
import { cn } from "@/lib/utils"
import {
  getPeriod,
  generateHours,
  generateMinutes,
} from "./utils/timeCalculations"
import {
  handle12HourTimeChange,
  handle24HourTimeChange,
} from "./utils/timeConversion"
import { HourSelect } from "./addons/hour-select"
import { MinuteSelect } from "./addons/minute-select"
import { PeriodSelect } from "./addons/period-select"
import type { TimePickerProps } from "./types"

/**
 * Time picker component for selecting hours and minutes.
 * Supports both 12-hour (AM/PM) and 24-hour formats.
 *
 * @param props - TimePicker props
 * @param props.value - Selected time (Date object)
 * @param props.onChange - Callback when time changes
 * @param props.use12Hour - Use 12-hour format with AM/PM (default: false)
 * @param props.className - Additional CSS classes
 * @param props.disabled - Whether time picker is disabled
 * @returns Time picker component
 *
 * @example
 * ```tsx
 * <TimePicker value={time} onChange={setTime} />
 * <TimePicker value={time} onChange={setTime} use12Hour />
 * ```
 */
export function TimePicker({
  value,
  onChange,
  use12Hour = false,
  className,
  disabled = false,
}: TimePickerProps) {
  const currentHour = value?.getHours() ?? new Date().getHours()
  const currentMinute = value?.getMinutes() ?? new Date().getMinutes()
  const currentPeriod = getPeriod(currentHour)

  const handleTimeChange = React.useCallback(
    (newHour: number, newMinute: number, newPeriod?: "AM" | "PM") => {
      const baseDate = value || new Date()
      const newDate = use12Hour && newPeriod
        ? handle12HourTimeChange(baseDate, newHour, newMinute, newPeriod)
        : handle24HourTimeChange(baseDate, newHour, newMinute)

      onChange?.(newDate)
    },
    [value, onChange, use12Hour]
  )

  const hours = React.useMemo(() => generateHours(use12Hour), [use12Hour])
  const minutes = React.useMemo(() => generateMinutes(), [])

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="time-picker"
    >
      <HourSelect
        currentHour={currentHour}
        currentMinute={currentMinute}
        currentPeriod={currentPeriod}
        use12Hour={use12Hour}
        disabled={disabled}
        onHourChange={handleTimeChange}
        hours={hours}
      />

      <span className="text-muted-foreground">:</span>

      <MinuteSelect
        currentMinute={currentMinute}
        currentHour={currentHour}
        currentPeriod={currentPeriod}
        use12Hour={use12Hour}
        disabled={disabled}
        onMinuteChange={handleTimeChange}
        minutes={minutes}
      />

      {use12Hour && (
        <PeriodSelect
          currentPeriod={currentPeriod}
          currentHour={currentHour}
          currentMinute={currentMinute}
          disabled={disabled}
          onPeriodChange={handleTimeChange}
        />
      )}
    </div>
  )
}
