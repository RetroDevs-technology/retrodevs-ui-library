import * as React from "react"
import { BaseSelect } from "@/components/modules/base-select"
import { getDisplayHour } from "../utils/timeCalculations"
import { convert12To24Hour } from "../utils/timeConversion"

interface HourSelectProps {
  /** Current hour in 24-hour format */
  currentHour: number
  /** Current minute */
  currentMinute: number
  /** Current period (AM/PM) */
  currentPeriod: "AM" | "PM"
  /** Whether to use 12-hour format */
  use12Hour: boolean
  /** Whether the select is disabled */
  disabled: boolean
  /** Callback when hour changes */
  onHourChange: (hour: number, minute: number, period?: "AM" | "PM") => void
  /** Array of hour values */
  hours: number[]
}

/**
 * Hour select component for the time picker.
 */
export function HourSelect({
  currentHour,
  currentMinute,
  currentPeriod,
  use12Hour,
  disabled,
  onHourChange,
  hours,
}: HourSelectProps) {
  const displayHour = getDisplayHour(currentHour, use12Hour)

  const handleValueChange = React.useCallback(
    (val: string) => {
      const newDisplayHour = parseInt(val, 10)
      if (use12Hour) {
        // Convert display hour (1-12) to 24-hour format
        const newHour24 = convert12To24Hour(newDisplayHour, currentPeriod)
        onHourChange(newHour24, currentMinute, currentPeriod)
      } else {
        onHourChange(newDisplayHour, currentMinute)
      }
    },
    [use12Hour, currentPeriod, currentMinute, onHourChange]
  )

  const items = React.useMemo(
    () =>
      hours.map((h) => ({
        value: h.toString(),
        label: h.toString().padStart(2, "0"),
      })),
    [hours]
  )

  return (
    <BaseSelect
      value={displayHour.toString()}
      onChange={handleValueChange}
      placeholder="HH"
      items={items}
      style={{ minWidth: 80 }}
      triggerClassName="w-[80px]"
      contentClassName="max-h-[200px]"
      disabled={disabled}
    />
  )
}
