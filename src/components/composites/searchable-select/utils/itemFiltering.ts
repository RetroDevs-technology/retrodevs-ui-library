/**
 * Validates and filters items array to ensure all items have required properties.
 * 
 * @param items - Array of items to filter
 * @returns Filtered array of valid items
 */
export function filterValidItems(
  items: unknown[]
): { value: string; label: string }[] {
  if (!Array.isArray(items)) {
    return []
  }

  return items.filter(
    (item): item is { value: string; label: string } =>
      item !== null &&
      typeof item === "object" &&
      "value" in item &&
      "label" in item &&
      typeof (item as { value: unknown }).value === "string" &&
      typeof (item as { label: unknown }).label === "string"
  )
}

/**
 * Finds a selected item from the items array by value.
 * 
 * @param items - Array of items
 * @param value - Value to find
 * @returns Found item or undefined
 */
export function findSelectedItem(
  items: { value: string; label: string }[],
  value: string | undefined
): { value: string; label: string } | undefined {
  if (!value) {
    return undefined
  }
  return items.find((item) => item.value === value)
}
