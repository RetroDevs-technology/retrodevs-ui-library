import { format } from "date-fns"

/**
 * Formats a single date-time value for display.
 * 
 * @param value - Date value
 * @param showTime - Whether to include time in format
 * @param use12Hour - Whether to use 12-hour format
 * @param placeholder - Placeholder text if value is not provided
 * @returns Formatted date-time string or placeholder
 */
export function formatSingleDateTime(
  value: Date | undefined,
  showTime: boolean,
  use12Hour: boolean,
  placeholder: string
): string {
  if (!value) {
    return placeholder
  }

  const dateStr = format(value, "PPP")
  if (!showTime) {
    return dateStr
  }

  const timeStr = format(value, use12Hour ? "h:mm a" : "HH:mm")
  return `${dateStr} ${timeStr}`
}

/**
 * Formats a date range with time for display.
 * 
 * @param value - Date range value
 * @param showTime - Whether to include time in format
 * @param use12Hour - Whether to use 12-hour format
 * @param placeholder - Placeholder text if value is not provided
 * @returns Formatted date range string or placeholder
 */
export function formatRangeDateTime(
  value: { from?: Date; to?: Date } | undefined,
  showTime: boolean,
  use12Hour: boolean,
  placeholder: string
): string {
  if (!value || typeof value !== "object" || !("from" in value)) {
    return placeholder
  }

  if (value.from && value.to) {
    const fromStr = format(value.from, "PPP")
    const toStr = format(value.to, "PPP")
    const fromTimeStr = showTime ? format(value.from, use12Hour ? "h:mm a" : "HH:mm") : ""
    const toTimeStr = showTime ? format(value.to, use12Hour ? "h:mm a" : "HH:mm") : ""
    const fromDisplay = fromTimeStr ? `${fromStr} ${fromTimeStr}` : fromStr
    const toDisplay = toTimeStr ? `${toStr} ${toTimeStr}` : toStr
    return `${fromDisplay} - ${toDisplay}`
  } else if (value.from) {
    const fromStr = format(value.from, "PPP")
    const fromTimeStr = showTime ? format(value.from, use12Hour ? "h:mm a" : "HH:mm") : ""
    return fromTimeStr ? `${fromStr} ${fromTimeStr}` : fromStr
  }

  return placeholder
}

/**
 * Gets the display value for the date-time picker.
 * 
 * @param mode - Selection mode ("single" | "range")
 * @param value - Selected value
 * @param showTime - Whether to show time
 * @param use12Hour - Whether to use 12-hour format
 * @param placeholder - Placeholder text
 * @returns Display value string
 */
export function getDateTimePickerDisplayValue(
  mode: "single" | "range",
  value: Date | { from?: Date; to?: Date } | undefined,
  showTime: boolean,
  use12Hour: boolean,
  placeholder: string
): string {
  if (mode === "single") {
    return formatSingleDateTime(
      value instanceof Date ? value : undefined,
      showTime,
      use12Hour,
      placeholder || "Pick a date and time"
    )
  } else {
    return formatRangeDateTime(
      value && typeof value === "object" && "from" in value ? value : undefined,
      showTime,
      use12Hour,
      placeholder || "Pick a date range and time"
    )
  }
}
