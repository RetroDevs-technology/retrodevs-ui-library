import * as React from "react"
import { BasePopover, BasePopoverTrigger } from "@/components/modules/base-popover"
import { getDatePickerDisplayValue } from "./utils/formatDate"
import { DatePickerTrigger } from "./addons/trigger"
import { CalendarWrapper } from "./addons/calendar-wrapper"
import type { DatePickerComponentProps } from "./types"

/**
 * Legacy popover-only date picker (simple API: `date` / `onDateChange` / `onRangeChange`).
 * Prefer {@link BaseDatePicker} for parity with Formatic apps (mobile, time, controlled `value`).
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
    [onDateChange],
  )

  const handleRangeSelect = React.useCallback(
    (selectedRange: { from?: Date; to?: Date } | undefined) => {
      if (onRangeChange) {
        onRangeChange(selectedRange)
      }
      if (selectedRange?.from && selectedRange?.to) {
        setOpen(false)
      }
    },
    [onRangeChange],
  )

  const displayValue = React.useMemo(
    () => getDatePickerDisplayValue(mode, date, selected, placeholder),
    [date, selected, mode, placeholder],
  )

  const hasValue =
    mode === "single"
      ? !!date
      : !!(selected && typeof selected === "object" && "from" in selected && selected.from)

  return (
    <BasePopover open={open} onOpenChange={setOpen}>
      <BasePopoverTrigger asChild>
        <DatePickerTrigger displayValue={displayValue} hasValue={hasValue} className={className} />
      </BasePopoverTrigger>
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
