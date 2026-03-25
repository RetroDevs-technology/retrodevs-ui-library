import type { Calendar } from "@/components/core/calendar"
import type * as React from "react"

export interface DatePickerProps {
  /** Selected date (Date object) */
  date?: Date
  /** Callback when date changes */
  onDateChange?: (date: Date | undefined) => void
  /** Placeholder text (default: "Pick a date") */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
  /** Selection mode ("single" | "range") */
  mode?: "single" | "range"
  /** Selected date(s) - can be Date or { from: Date, to: Date } */
  selected?: Date | { from?: Date; to?: Date }
  /** Callback when range changes */
  onRangeChange?: (range: { from?: Date; to?: Date } | undefined) => void
}

export type DatePickerComponentProps = DatePickerProps &
  Omit<React.ComponentProps<typeof Calendar>, "selected" | "onSelect">
