
import { Calendar } from "@/components/core/calendar"
import { BasePopoverContent } from "@/components/modules/base-popover"
import { normalizeDateRange } from "../utils/dateRange"
import type { DatePickerComponentProps } from "../types"

interface CalendarWrapperProps {
  /** Selection mode */
  mode: "single" | "range"
  /** Selected date (for single mode) */
  date?: Date
  /** Selected date range (for range mode) */
  selected?: Date | { from?: Date; to?: Date }
  /** Callback for single date selection */
  onSingleSelect?: (date: Date | undefined) => void
  /** Callback for range selection */
  onRangeSelect?: (range: { from?: Date; to?: Date } | undefined) => void
  /** Additional calendar props */
  calendarProps: Omit<DatePickerComponentProps, "date" | "selected" | "mode" | "onDateChange" | "onRangeChange" | "placeholder" | "className">
}

/**
 * Calendar wrapper component that handles both single and range selection modes.
 */
export function CalendarWrapper({
  mode,
  date,
  selected,
  onSingleSelect,
  onRangeSelect,
  calendarProps,
}: CalendarWrapperProps) {
  return (
    <BasePopoverContent className="w-auto p-0" align="start">
      {mode === "single" ? (
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSingleSelect}
          initialFocus
          {...calendarProps}
        />
      ) : (
        <Calendar
          mode="range"
          selected={normalizeDateRange(
            selected && typeof selected === "object" && "from" in selected
              ? selected
              : undefined
          )}
          onSelect={onRangeSelect}
          initialFocus
          {...calendarProps}
        />
      )}
    </BasePopoverContent>
  )
}
