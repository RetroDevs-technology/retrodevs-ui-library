import { ComboboxClear } from "@/components/core/combobox"

interface ClearButtonProps {
  /** Whether to show the clear button */
  show: boolean
}

/**
 * Clear button component for searchable select.
 * Only visible when a value is selected and combobox is closed.
 */
export function ClearButton({ show }: ClearButtonProps) {
  if (!show) {
    return null
  }

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2">
      <ComboboxClear />
    </div>
  )
}
