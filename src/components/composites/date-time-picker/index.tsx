/**
 * Backward-compatible date+time picker: delegates to {@link BaseDatePicker} so
 * behavior matches the unified date-picker composite (mobile sheet, time selects, range).
 */
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { BaseDatePicker } from "@/components/composites/date-picker/base-date-picker"

import type { BaseDateTimePickerProps } from "./types"

function parseToDate(value: Date | string | undefined): Date | undefined {
  if (value === undefined) return undefined
  if (value instanceof Date) return value
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function normalizeDateTimeValue(
  mode: "single" | "range",
  raw: Date | DateRange | string | undefined,
): Date | { from?: Date; to?: Date } | undefined {
  if (raw === undefined) return undefined

  if (mode === "single") {
    if (typeof raw === "string") return parseToDate(raw)
    return raw instanceof Date ? raw : undefined
  }

  const range = raw as DateRange
  return {
    from: parseToDate(range.from as Date | string | undefined),
    to: parseToDate(range.to as Date | string | undefined),
  }
}

export function BaseDateTimePicker({
  mode = "single",
  value,
  onChange,
  showTime = true,
  use12Hour = false,
  placeholder,
  className,
  disabled = false,
}: BaseDateTimePickerProps) {
  const handleChange = React.useCallback(
    (next: Date | DateRange | string | undefined) => {
      onChange?.(normalizeDateTimeValue(mode, next))
    },
    [mode, onChange],
  )

  return (
    <BaseDatePicker
      mode={mode}
      value={value as Date | DateRange | string | undefined}
      onChange={handleChange}
      placeholder={placeholder}
      showTime={showTime}
      timeFormat={use12Hour ? "12" : "24"}
      className={className}
      disabled={disabled}
    />
  )
}
