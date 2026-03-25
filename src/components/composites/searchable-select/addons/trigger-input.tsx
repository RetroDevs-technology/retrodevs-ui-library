import * as React from "react"
import {
  ComboboxInput,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/core/combobox"
import { cn } from "@/lib/utils"

interface TriggerInputProps {
  /** Whether the combobox is open */
  open: boolean
  /** Input reference for auto-focus */
  inputRef: React.RefObject<HTMLInputElement>
  /** Placeholder text for the search input */
  searchPlaceholder: string
  /** Placeholder text when closed */
  placeholder: string
  /** Selected item */
  selectedItem: { value: string; label: string } | undefined
  /** Current value */
  value: string | undefined
  /** Custom renderer for selected item */
  selectedItemRenderer?: (value: string) => React.ReactNode
  /** Additional CSS classes */
  triggerClassName?: string
  /** Minimum width */
  width?: number
}

/**
 * Trigger/Input toggle component for searchable select.
 * Shows input when open, trigger button when closed.
 */
export function TriggerInput({
  open,
  inputRef,
  searchPlaceholder,
  placeholder,
  selectedItem,
  value,
  selectedItemRenderer,
  triggerClassName,
  width,
}: TriggerInputProps) {
  const style = width ? { minWidth: `${width}px` } : undefined

  if (open) {
    return (
      <ComboboxInput
        ref={inputRef}
        placeholder={searchPlaceholder}
        className={cn(
          "min-w-0 border border-input bg-transparent w-full",
          triggerClassName
        )}
        style={style}
      />
    )
  }

  return (
    <ComboboxTrigger
      className={cn(
        "min-w-0 border border-input bg-transparent w-full justify-between",
        triggerClassName
      )}
      style={style}
    >
      <ComboboxValue placeholder={placeholder}>
        {selectedItemRenderer && value
          ? selectedItemRenderer(value)
          : selectedItem?.label}
      </ComboboxValue>
    </ComboboxTrigger>
  )
}
