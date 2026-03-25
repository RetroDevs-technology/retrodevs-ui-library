import * as React from "react"
import {
  BasePopover,
  BasePopoverTrigger,
} from "@/components/modules/base-popover"
import { getDatePickerDisplayValue } from "./utils/formatDate"
import { DatePickerTrigger } from "./addons/trigger"
import { CalendarWrapper } from "./addons/calendar-wrapper"
import type { DatePickerComponentProps } from "./types"

/**
 * Date picker component.
 * Combines Calendar with Popover for a dropdown date selection interface.
 *
 * @param props - DatePicker props
 * @param props.date - Selected date (Date object)
 * @param props.onDateChange - Callback when date changes
 * @param props.placeholder - Placeholder text (default: "Pick a date")
 * @param props.className - Additional CSS classes
 * @param props.mode - Selection mode ("single" | "range")
 * @param props.selected - Selected date(s) - can be Date or { from: Date, to: Date }
 * @returns Date picker component
 *
 * @example
 * ```tsx
 * <DatePicker date={date} onDateChange={setDate} />
 * ```
 */
export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  mode = "single",
  selected,
  ...props
}: DatePickerComponentProps) {
  const { onRangeChange, ...calendarProps } = props
  const [open, setOpen] = React.useState(false)

  const handleSingleSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      onDateChange?.(selectedDate)
      setOpen(false)
    },
    [onDateChange]
  )

  const handleRangeSelect = React.useCallback(
    (selectedRange: { from?: Date; to?: Date } | undefined) => {
      if (onRangeChange) {
        onRangeChange(selectedRange)
      }
      // Keep popover open until both dates are selected
      if (selectedRange?.from && selectedRange?.to) {
        setOpen(false)
      }
    },
    [onRangeChange]
  )

  const displayValue = React.useMemo(
    () => getDatePickerDisplayValue(mode, date, selected, placeholder),
    [date, selected, mode, placeholder]
  )

  const hasValue = mode === "single" ? !!date : !!(selected && typeof selected === "object" && "from" in selected && selected.from)

  return (
    <BasePopover open={open} onOpenChange={setOpen}>
      <BasePopoverTrigger
        render={
          <DatePickerTrigger
            displayValue={displayValue}
            hasValue={hasValue}
            className={className}
          />
        }
      />
      <CalendarWrapper
        mode={mode}
        date={date}
        selected={selected}
        onSingleSelect={handleSingleSelect}
        onRangeSelect={handleRangeSelect}
        calendarProps={calendarProps}
      />
    </BasePopover>
  )
}
