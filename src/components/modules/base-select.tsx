/**
 * A reusable select component built on top of shadcn/ui Select.
 * Provides a flexible way to create dropdown select inputs with various customization options.
 * Supports loading states, optional date icon, and custom item rendering.
 *
 * @example
 * ```tsx
 * <BaseSelect
 *   placeholder="Select an option"
 *   items={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" }
 *   ]}
 *   label="Options"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/core/select"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import * as React from "react"

export interface ICustomSelectProps {
  defaultValue?: string
  /** Placeholder text when no value is selected */
  placeholder: string
  /** Array of selectable items */
  items: {
    value: string
    label: string | React.ReactNode
  }[]
  /** Controlled selected value */
  value?: string
  /** Callback when selection changes */
  onChange?: (value: string) => void
  /** Custom renderer for the selected item */
  selectedItemRenderer?: (value: string) => React.ReactNode
  /** Custom options to replace default items */
  customOptions?: React.ReactNode
  /** Label text for the select group */
  label?: string
  /** Whether to show loading state */
  isLoading?: boolean
  /** Additional CSS classes for the trigger element */
  triggerClassName?: string
  /** Additional CSS classes for the content element */
  contentClassName?: string
  /** Additional CSS classes for the item elements */
  itemClassName?: string
  /** Show calendar icon in trigger (date-style select) */
  date?: boolean
  className?: string
  style?: React.CSSProperties
  /** Whether the select is disabled */
  disabled?: boolean
}

/**
 * Base select component that provides a consistent way to create dropdown select inputs.
 * Supports styling variants, loading states, and custom content rendering.
 */
export function BaseSelect({
  defaultValue,
  placeholder,
  items,
  value,
  onChange,
  selectedItemRenderer,
  customOptions,
  label,
  isLoading = false,
  triggerClassName,
  contentClassName,
  itemClassName,
  date = false,
  className,
  style,
  disabled = false,
}: ICustomSelectProps) {
  const safeItems = Array.isArray(items)
    ? items.filter((item) => item && typeof item === "object" && "value" in item && "label" in item)
    : []

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      onChange?.(newValue)
    },
    [onChange],
  )

  if (isLoading) {
    return (
      <div
        className={cn(
          `border border-border h-11 rounded-[8px] py-2.5 px-3 bg-background animate-pulse`,
          triggerClassName,
        )}
      />
    )
  }

  return (
    <Select value={value} onValueChange={handleValueChange} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger
        style={style}
        className={cn(
          `border border-border !h-11 rounded-[8px] py-2.5 px-3 bg-transparent text-sm placeholder:text-medium-gray hover:border-[#0046C97A] transition-all duration-150 active:bg-[#0046C90D]`,
          {
            "[&>svg]:hidden gap-2.5 justify-start": date,
          },
          triggerClassName,
          className,
        )}>
        {date && (
          <div className="flex">
            <Calendar size={16} color="#747474" />
          </div>
        )}

        {selectedItemRenderer ? (
          <SelectValue placeholder={placeholder}>{value && selectedItemRenderer(value)}</SelectValue>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent
        className={cn("max-h-[300px] [&>div]:!h-auto [&>div]:max-h-[280px]", contentClassName)}
        position="popper"
        sideOffset={5}>
        <SelectGroup>
          {label && <SelectLabel className="text-sm">{label}</SelectLabel>}
          {customOptions
            ? customOptions
            : safeItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    "border-b last:border-none rounded-none dark:hover:bg-black/5 dark:hover:outline-none dark:hover:text-black",
                    itemClassName,
                  )}>
                  {item.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

BaseSelect.displayName = "BaseSelect"
