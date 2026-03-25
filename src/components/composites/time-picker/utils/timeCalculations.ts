/**
 * Gets the display hour for 12-hour format.
 * Converts 24-hour format to 12-hour format for display.
 * 
 * @param hour24 - Hour in 24-hour format (0-23)
 * @param use12Hour - Whether to use 12-hour format
 * @returns Display hour (1-12 for 12-hour, 0-23 for 24-hour)
 */
export function getDisplayHour(hour24: number, use12Hour: boolean): number {
  if (!use12Hour) {
    return hour24
  }

  if (hour24 === 0) {
    return 12
  } else if (hour24 > 12) {
    return hour24 - 12
  }
  return hour24
}

/**
 * Gets the current period (AM/PM) from a 24-hour format hour.
 * 
 * @param hour24 - Hour in 24-hour format (0-23)
 * @returns "AM" or "PM"
 */
export function getPeriod(hour24: number): "AM" | "PM" {
  return hour24 >= 12 ? "PM" : "AM"
}

/**
 * Generates an array of hour values based on format.
 * 
 * @param use12Hour - Whether to use 12-hour format
 * @returns Array of hours (1-12 for 12-hour, 0-23 for 24-hour)
 */
export function generateHours(use12Hour: boolean): number[] {
  if (use12Hour) {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }
  return Array.from({ length: 24 }, (_, i) => i)
}

/**
 * Generates an array of minute values (0-59).
 * 
 * @returns Array of minutes
 */
export function generateMinutes(): number[] {
  return Array.from({ length: 60 }, (_, i) => i)
}
