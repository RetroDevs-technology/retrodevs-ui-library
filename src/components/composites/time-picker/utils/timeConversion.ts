/**
 * Converts a 12-hour format hour to 24-hour format.
 * 
 * @param displayHour - Hour in 12-hour format (1-12)
 * @param period - AM or PM
 * @returns Hour in 24-hour format (0-23)
 */
export function convert12To24Hour(displayHour: number, period: "AM" | "PM"): number {
  if (period === "PM" && displayHour !== 12) {
    return displayHour + 12
  } else if (period === "AM" && displayHour === 12) {
    return 0
  }
  return displayHour
}

/**
 * Converts a 24-hour format hour to 12-hour format.
 * 
 * @param hour24 - Hour in 24-hour format (0-23)
 * @returns Hour in 12-hour format (1-12)
 */
export function convert24To12Hour(hour24: number): number {
  if (hour24 === 0) {
    return 12
  } else if (hour24 > 12) {
    return hour24 - 12
  }
  return hour24
}

/**
 * Creates a new Date object with updated time values.
 * Preserves the date portion and updates only hours and minutes.
 * 
 * @param baseDate - Base date to update
 * @param hour - Hour in 24-hour format (0-23)
 * @param minute - Minute (0-59)
 * @returns New Date object with updated time
 */
export function createTimeDate(baseDate: Date, hour: number, minute: number): Date {
  const newDate = new Date(baseDate)
  newDate.setHours(hour)
  newDate.setMinutes(minute)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)
  return newDate
}

/**
 * Handles time change for 12-hour format.
 * Converts display hour and period to 24-hour format before creating the date.
 * 
 * @param baseDate - Base date to update
 * @param displayHour - Hour in 12-hour format (1-12)
 * @param minute - Minute (0-59)
 * @param period - AM or PM
 * @returns New Date object with updated time
 */
export function handle12HourTimeChange(
  baseDate: Date,
  displayHour: number,
  minute: number,
  period: "AM" | "PM"
): Date {
  const hour24 = convert12To24Hour(displayHour, period)
  return createTimeDate(baseDate, hour24, minute)
}

/**
 * Handles time change for 24-hour format.
 * 
 * @param baseDate - Base date to update
 * @param hour - Hour in 24-hour format (0-23)
 * @param minute - Minute (0-59)
 * @returns New Date object with updated time
 */
export function handle24HourTimeChange(
  baseDate: Date,
  hour: number,
  minute: number
): Date {
  return createTimeDate(baseDate, hour, minute)
}
