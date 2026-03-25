export interface BaseDateTimePickerProps {
  /** Selection mode: single date+time or date range+time */
  mode?: "single" | "range"
  /** Selected value - Date for single mode, { from: Date, to: Date } for range mode */
  value?: Date | { from?: Date; to?: Date }
  /** Callback when value changes */
  onChange?: (value: Date | { from?: Date; to?: Date } | undefined) => void
  /** Whether to show time picker */
  showTime?: boolean
  /** Whether to use 12-hour format for time */
  use12Hour?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
  /** Whether the picker is disabled */
  disabled?: boolean
}
