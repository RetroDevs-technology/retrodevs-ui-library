/**
 * Preserves time when date changes in single mode.
 * 
 * @param newDate - New date value
 * @param currentValue - Current date value with time
 * @param showTime - Whether time should be preserved
 * @returns New date with preserved time or just the new date
 */
export function preserveTimeOnDateChange(
  newDate: Date | undefined,
  currentValue: Date | undefined,
  showTime: boolean
): Date | undefined {
  if (!newDate || !showTime || !currentValue) {
    return newDate
  }

  const preservedDate = new Date(newDate)
  preservedDate.setHours(currentValue.getHours())
  preservedDate.setMinutes(currentValue.getMinutes())
  return preservedDate
}

/**
 * Preserves times when date range changes in range mode.
 * 
 * @param newRange - New date range
 * @param currentValue - Current date range with times
 * @param showTime - Whether times should be preserved
 * @returns New range with preserved times or just the new range
 */
export function preserveTimesOnRangeChange(
  newRange: { from?: Date; to?: Date } | undefined,
  currentValue: { from?: Date; to?: Date } | undefined,
  showTime: boolean
): { from?: Date; to?: Date } | undefined {
  if (!newRange || !showTime || !currentValue) {
    return newRange
  }

  if (newRange.from && newRange.to) {
    const newFrom = new Date(newRange.from)
    const newTo = new Date(newRange.to)

    if (currentValue.from) {
      newFrom.setHours(currentValue.from.getHours())
      newFrom.setMinutes(currentValue.from.getMinutes())
    }
    if (currentValue.to) {
      newTo.setHours(currentValue.to.getHours())
      newTo.setMinutes(currentValue.to.getMinutes())
    }

    return { from: newFrom, to: newTo }
  }

  return newRange
}

/**
 * Handles date selection with time preservation logic.
 * 
 * @param selected - Selected date or range
 * @param mode - Selection mode
 * @param currentValue - Current value
 * @param showTime - Whether to preserve time
 * @returns Value with preserved time if applicable
 */
export function handleDateSelectWithTimePreservation(
  selected: Date | { from?: Date; to?: Date } | undefined,
  mode: "single" | "range",
  currentValue: Date | { from?: Date; to?: Date } | undefined,
  showTime: boolean
): Date | { from?: Date; to?: Date } | undefined {
  if (mode === "single") {
    return preserveTimeOnDateChange(
      selected as Date | undefined,
      currentValue instanceof Date ? currentValue : undefined,
      showTime
    )
  } else {
    return preserveTimesOnRangeChange(
      selected as { from?: Date; to?: Date } | undefined,
      currentValue && typeof currentValue === "object" && "from" in currentValue
        ? currentValue
        : undefined,
      showTime
    )
  }
}
