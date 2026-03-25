/**
 * A reusable searchable select component built on top of Base UI Combobox.
 * Provides a filterable dropdown that allows users to type to search through options.
 *
 * @example
 * ```tsx
 * <BaseSearchableSelect
 *   placeholder="Select an option"
 *   searchPlaceholder="Search..."
 *   items={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" }
 *   ]}
 *   value={value}
 *   onChange={(value) => setValue(value)}
 * />
 * ```
 */
import * as React from "react"
import {
  Combobox,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxGroupLabel,
} from "@/components/core/combobox"
import { cn } from "@/lib/utils"
import { filterValidItems, findSelectedItem } from "./utils/itemFiltering"
import {
  itemToStringLabel,
  itemToStringValue,
  extractValueFromComboboxChange,
} from "./utils/itemConversion"
import { TriggerInput } from "./addons/trigger-input"
import { ClearButton } from "./addons/clear-button"
import { EmptyState } from "./addons/empty-state"
import type { BaseSearchableSelectProps } from "./types"

/**
 * Base searchable select component that provides a consistent way to create searchable dropdown inputs.
 * Supports filtering, loading states, and custom content rendering.
 */
export function BaseSearchableSelect({
  items,
  value,
  onChange,
  defaultValue,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  isLoading = false,
  disabled = false,
  label,
  selectedItemRenderer,
  triggerClassName,
  popupClassName,
  itemClassName,
  width,
  closeOnSelect = true,
}: BaseSearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const safeItems = React.useMemo(() => filterValidItems(items), [items])
  const selectedItem = React.useMemo(
    () => findSelectedItem(safeItems, value),
    [safeItems, value]
  )
  const comboboxValue = selectedItem || value || null

  const handleValueChange = React.useCallback(
    (newValue: unknown) => {
      const extractedValue = extractValueFromComboboxChange(newValue)
      if (extractedValue && onChange) {
        onChange(extractedValue)
      }
      if (closeOnSelect) {
        setOpen(false)
        setInputValue("")
      }
    },
    [onChange, closeOnSelect]
  )

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen) {
        setInputValue("")
      } else {
        // Auto-focus the search input when opening
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
    },
    []
  )

  React.useEffect(() => {
    if (!open && value) {
      // Reset input value when closed and a value is selected
      setInputValue("")
    }
  }, [open, value])

  if (isLoading) {
    return (
      <div
        className={cn(
          "min-w-0 border border-border bg-transparent animate-pulse h-9 rounded-md",
          triggerClassName
        )}
        style={width ? { minWidth: `${width}px` } : undefined}
      />
    )
  }

  const comboboxDefaultValue = defaultValue
    ? findSelectedItem(safeItems, defaultValue) || defaultValue
    : undefined

  return (
    <Combobox
      value={comboboxValue}
      onValueChange={handleValueChange}
      defaultValue={comboboxDefaultValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      open={open}
      onOpenChange={handleOpenChange}
      items={safeItems}
      disabled={disabled}
      itemToStringLabel={itemToStringLabel}
      itemToStringValue={itemToStringValue}
    >
      <div className="relative" style={width ? { minWidth: `${width}px` } : undefined}>
        <TriggerInput
          open={open}
          inputRef={inputRef}
          searchPlaceholder={searchPlaceholder}
          placeholder={placeholder}
          selectedItem={selectedItem}
          value={value}
          selectedItemRenderer={selectedItemRenderer}
          triggerClassName={triggerClassName}
          width={width}
        />
        <ClearButton show={!!value && !open} />
      </div>
      <ComboboxPortal>
        <ComboboxPositioner sideOffset={5}>
          <ComboboxPopup
            className={cn("flex flex-col bg-popover border-border", popupClassName)}
          >
            <ComboboxList>
              <EmptyState message={emptyMessage} />
              <ComboboxGroup>
                {label && (
                  <ComboboxGroupLabel className="text-sm text-popover-foreground">
                    {label}
                  </ComboboxGroupLabel>
                )}
                {safeItems.map((item) => (
                  <ComboboxItem
                    key={item.value}
                    value={item}
                    className={cn(
                      "border-b border-border last:border-none rounded-none text-popover-foreground",
                      itemClassName
                    )}
                  >
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}
