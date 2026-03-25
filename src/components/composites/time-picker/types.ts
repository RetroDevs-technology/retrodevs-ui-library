/**
 * Time picker component props.
 */
export interface TimePickerProps {
  /** Selected time value (Date object with time) */
  value?: Date
  /** Callback when time changes */
  onChange?: (time: Date | undefined) => void
  /** Whether to use 12-hour format (AM/PM) */
  use12Hour?: boolean
  /** Additional CSS classes */
  className?: string
  /** Whether the time picker is disabled */
  disabled?: boolean
}
