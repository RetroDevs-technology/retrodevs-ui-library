/**
 * A reusable select component built on top of shadcn/ui Select.
 * Provides a flexible way to create dropdown select inputs with various customization options.
 * Supports different types (auth/others), loading states, and custom item rendering.
 *
 * @example
 * ```tsx
 * <BaseSelect
 *   type="auth"
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
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/core/select";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface ICustomSelectProps {
  /** Select type variant (affects styling) */
  type?: "auth" | "others";
  /** Minimum width of the select trigger in pixels */
  width?: number;
  /** Default selected value */
  defaultValue?: string;
  /** Placeholder text when no value is selected */
  placeholder: string;
  /** Array of selectable items */
  items: { value: string; label: string }[];
  /** Controlled selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Custom renderer for the selected item */
  selectedItemRenderer?: (value: string) => React.ReactNode;
  /** Custom options to replace default items */
  customOptions?: React.ReactNode;
  /** Label text for the select group */
  label?: string;
  /** Whether to show loading state */
  isLoading?: boolean;
  /** Additional CSS classes for the trigger element */
  triggerClassName?: string;
  /** Additional CSS classes for the content element */
  contentClassName?: string;
  /** Additional CSS classes for the item elements */
  itemClassName?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
}

/**
 * Base select component that provides a consistent way to create dropdown select inputs.
 * Supports different styling variants, loading states, and custom content rendering.
 */
export function BaseSelect({
  type = "others",
  width = 165,
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
  disabled = false,
}: ICustomSelectProps) {
  const safeItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item && typeof item === "object" && "value" in item && "label" in item
      )
    : []

  const handleValueChange = React.useCallback(
    (newValue: unknown) => {
      if (onChange && typeof newValue === "string") {
        onChange(newValue)
      }
    },
    [onChange]
  )

  if (isLoading) {
    return (
      <div
        className={cn(
          "min-w-0 border border-border bg-transparent animate-pulse",
          {
            "w-full h-9 rounded-md": type === "auth",
            "h-12 rounded-sm": type === "others",
          },
          triggerClassName
        )}
        style={width ? { minWidth: `${width}px` } : undefined}
      />
    );
  }

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "min-w-0 border border-input bg-transparent",
          {
            "w-full h-9 rounded-md": type === "auth",
            "h-12 data-[popup-open]:bg-popover data-[popup-open]:border-border rounded-sm":
              type === "others",
          },
          triggerClassName
        )}
        style={width ? { minWidth: `${width}px` } : undefined}
      >
        {selectedItemRenderer ? (
          <SelectValue
            placeholder={placeholder}
            className="leading-normal"
          >
            {value && selectedItemRenderer(value)}
          </SelectValue>
        ) : (
          <SelectValue
            placeholder={placeholder}
            className="leading-normal"
          />
        )}
      </SelectTrigger>
      <SelectContent
        className={cn(
          "flex flex-col bg-popover border-border",
          contentClassName
        )}
        position="popper"
        sideOffset={5}
      >
        <SelectGroup>
          {label && (
            <SelectLabel className="text-sm text-popover-foreground">
              {label}
            </SelectLabel>
          )}
          {customOptions
            ? customOptions
            : safeItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    "border-b border-border last:border-none rounded-none text-popover-foreground",
                    itemClassName
                  )}
                >
                  {item.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
