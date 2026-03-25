import * as React from "react"
import { BaseSelect } from "@/components/modules/base-select"

interface PeriodSelectProps {
  /** Current period (AM/PM) */
  currentPeriod: "AM" | "PM"
  /** Current hour in 24-hour format */
  currentHour: number
  /** Current minute */
  currentMinute: number
  /** Whether the select is disabled */
  disabled: boolean
  /** Callback when period changes */
  onPeriodChange: (hour: number, minute: number, period: "AM" | "PM") => void
}

/**
 * Period select component (AM/PM) for 12-hour format time picker.
 */
export function PeriodSelect({
  currentPeriod,
  currentHour,
  currentMinute,
  disabled,
  onPeriodChange,
}: PeriodSelectProps) {
  const handleValueChange = React.useCallback(
    (val: string) => {
      onPeriodChange(currentHour, currentMinute, val as "AM" | "PM")
    },
    [currentHour, currentMinute, onPeriodChange]
  )

  const items = React.useMemo(
    () => [
      { value: "AM", label: "AM" },
      { value: "PM", label: "PM" },
    ],
    []
  )

  return (
    <BaseSelect
      value={currentPeriod}
      onChange={handleValueChange}
      placeholder=""
      items={items}
      width={80}
      triggerClassName="w-[80px]"
      contentClassName="max-h-[200px]"
      disabled={disabled}
    />
  )
}
