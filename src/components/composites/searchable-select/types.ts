import type * as React from "react"

export interface BaseSearchableSelectProps {
  /** Array of selectable items */
  items: { value: string; label: string }[]
  /** Controlled selected value */
  value?: string
  /** Callback when selection changes */
  onChange?: (value: string) => void
  /** Default selected value */
  defaultValue?: string
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Message to display when no results are found */
  emptyMessage?: string
  /** Whether to show loading state */
  isLoading?: boolean
  /** Whether the combobox is disabled */
  disabled?: boolean
  /** Label text for the combobox group */
  label?: string
  /** Custom renderer for the selected item */
  selectedItemRenderer?: (value: string) => React.ReactNode
  /** Additional CSS classes for the trigger/input element */
  triggerClassName?: string
  /** Additional CSS classes for the popup element */
  popupClassName?: string
  /** Additional CSS classes for the item elements */
  itemClassName?: string
  /** Minimum width of the trigger in pixels */
  width?: number
  /** Whether to close popup on selection */
  closeOnSelect?: boolean
}
