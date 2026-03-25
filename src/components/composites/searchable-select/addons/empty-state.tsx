import { ComboboxEmpty } from "@/components/core/combobox"

interface EmptyStateProps {
  /** Message to display when no results are found */
  message: string
}

/**
 * Empty state component for searchable select.
 * Displays when no items match the search query.
 */
export function EmptyState({ message }: EmptyStateProps) {
  return <ComboboxEmpty>{message}</ComboboxEmpty>
}
