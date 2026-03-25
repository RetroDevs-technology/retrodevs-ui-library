/**
 * Converts an item to its label string.
 * Handles both item objects and plain strings.
 * 
 * @param item - Item to convert (object with label or string)
 * @returns Label string
 */
export function itemToStringLabel(item: unknown): string {
  if (item && typeof item === "object" && item !== null && "label" in item) {
    const label = (item as { label: unknown }).label
    if (typeof label === "string") {
      return label
    }
  }
  return String(item ?? "")
}

/**
 * Converts an item to its value string.
 * Handles both item objects and plain strings.
 * 
 * @param item - Item to convert (object with value or string)
 * @returns Value string
 */
export function itemToStringValue(item: unknown): string {
  if (item && typeof item === "object" && item !== null && "value" in item) {
    const value = (item as { value: unknown }).value
    if (typeof value === "string") {
      return value
    }
  }
  return String(item ?? "")
}

/**
 * Extracts value from a combobox value change event.
 * Handles both item objects and plain strings.
 * 
 * @param newValue - Value from combobox onChange
 * @returns Extracted string value
 */
export function extractValueFromComboboxChange(newValue: unknown): string | undefined {
  if (typeof newValue === "string") {
    return newValue
  }
  if (newValue && typeof newValue === "object" && "value" in newValue) {
    return (newValue as { value: string }).value
  }
  return undefined
}
