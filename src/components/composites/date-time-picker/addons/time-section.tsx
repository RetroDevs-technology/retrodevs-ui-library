
import { TimePicker } from "@/components/composites/time-picker"

interface TimeSectionProps {
  /** Selection mode */
  mode: "single" | "range"
  /** Current value */
  value: Date | { from?: Date; to?: Date } | undefined
  /** Whether to use 12-hour format */
  use12Hour: boolean
  /** Callback when time changes */
  onTimeChange: (time: Date | undefined, isStart: boolean) => void
}

/**
 * Time picker section wrapper for date-time picker.
 * Handles both single and range modes.
 */
export function TimeSection({
  mode,
  value,
  use12Hour,
  onTimeChange,
}: TimeSectionProps) {
  if (mode === "single") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Time</label>
        <TimePicker
          value={value instanceof Date ? value : undefined}
          onChange={(time) => onTimeChange(time, true)}
          use12Hour={use12Hour}
        />
      </div>
    )
  }

  const range = value && typeof value === "object" && "from" in value ? value : undefined

  return (
    <div className="space-y-4">
      {range?.from && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Time</label>
          <TimePicker
            value={range.from}
            onChange={(time) => onTimeChange(time, true)}
            use12Hour={use12Hour}
          />
        </div>
      )}
      {range?.to && (
        <div className="space-y-2">
          <label className="text-sm font-medium">End Time</label>
          <TimePicker
            value={range.to}
            onChange={(time) => onTimeChange(time, false)}
            use12Hour={use12Hour}
          />
        </div>
      )}
    </div>
  )
}
