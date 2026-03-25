import { format } from "date-fns"

/**
 * Formats a date for display in the date picker.
 * 
 * @param date - Date to format
 * @param placeholder - Placeholder text if date is not provided
 * @returns Formatted date string or placeholder
 */
export function formatDateValue(date: Date | undefined, placeholder: string): string {
  return date ? format(date, "PPP") : placeholder
}

/**
 * Formats a date range for display in the date picker.
 * 
 * @param selected - Selected date range
 * @param placeholder - Placeholder text if no dates are selected
 * @returns Formatted date range string or placeholder
 */
export function formatDateRange(
  selected: { from?: Date; to?: Date } | undefined,
  placeholder: string
): string {
  if (!selected) {
    return placeholder
  }

  if (selected.from && selected.to) {
    return `${format(selected.from, "PPP")} - ${format(selected.to, "PPP")}`
  } else if (selected.from) {
    return format(selected.from, "PPP")
  }

  return placeholder
}

/**
 * Gets the display value for the date picker based on mode.
 * 
 * @param mode - Selection mode ("single" | "range")
 * @param date - Selected date (for single mode)
 * @param selected - Selected date range (for range mode)
 * @param placeholder - Placeholder text
 * @returns Display value string
 */
export function getDatePickerDisplayValue(
  mode: "single" | "range",
  date: Date | undefined,
  selected: Date | { from?: Date; to?: Date } | undefined,
  placeholder: string
): string {
  if (mode === "single") {
    return formatDateValue(date, placeholder)
  } else {
    if (selected && typeof selected === "object" && "from" in selected) {
      return formatDateRange(selected, placeholder)
    }
    return placeholder
  }
}
