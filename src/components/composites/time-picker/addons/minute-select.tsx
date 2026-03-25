import * as React from "react"
import { BaseSelect } from "@/components/modules/base-select"

interface MinuteSelectProps {
  /** Current minute */
  currentMinute: number
  /** Current hour in 24-hour format */
  currentHour: number
  /** Current period (AM/PM) */
  currentPeriod: "AM" | "PM"
  /** Whether to use 12-hour format */
  use12Hour: boolean
  /** Whether the select is disabled */
  disabled: boolean
  /** Callback when minute changes */
  onMinuteChange: (hour: number, minute: number, period?: "AM" | "PM") => void
  /** Array of minute values */
  minutes: number[]
}

/**
 * Minute select component for the time picker.
 */
export function MinuteSelect({
  currentMinute,
  currentHour,
  currentPeriod,
  use12Hour,
  disabled,
  onMinuteChange,
  minutes,
}: MinuteSelectProps) {
  const handleValueChange = React.useCallback(
    (val: string) => {
      onMinuteChange(
        currentHour,
        parseInt(val, 10),
        use12Hour ? currentPeriod : undefined
      )
    },
    [currentHour, currentPeriod, use12Hour, onMinuteChange]
  )

  const items = React.useMemo(
    () =>
      minutes.map((m) => ({
        value: m.toString(),
        label: m.toString().padStart(2, "0"),
      })),
    [minutes]
  )

  return (
    <BaseSelect
      value={currentMinute.toString()}
      onChange={handleValueChange}
      placeholder="MM"
      items={items}
      width={80}
      triggerClassName="w-[80px]"
      contentClassName="max-h-[200px]"
      disabled={disabled}
    />
  )
}
