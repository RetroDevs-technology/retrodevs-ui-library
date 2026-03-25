/**
 * Normalizes a date range selection for the Calendar component.
 * Handles partial selections (only from date selected).
 * 
 * @param selected - Selected date range
 * @returns Normalized date range for Calendar component
 */
export function normalizeDateRange(
  selected: { from?: Date; to?: Date } | undefined
): { from: Date; to: Date } | { from: Date } | undefined {
  if (!selected || typeof selected !== "object" || !("from" in selected)) {
    return undefined
  }

  if (selected.from && selected.to) {
    return { from: selected.from, to: selected.to }
  } else if (selected.from) {
    return { from: selected.from }
  }

  return undefined
}
