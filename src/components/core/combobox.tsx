import * as React from "react"
import { Combobox } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Combobox root component.
 * Controls the open/closed state, value, and input value of the combobox.
 *
 * @param props - Combobox props (extends React.ComponentProps<typeof Combobox.Root>)
 * @param props.value - Controlled selected value
 * @param props.defaultValue - Uncontrolled default value
 * @param props.onValueChange - Callback when value changes
 * @param props.inputValue - Controlled input value
 * @param props.defaultInputValue - Uncontrolled default input value
 * @param props.onInputValueChange - Callback when input value changes
 * @param props.open - Controlled open state
 * @param props.defaultOpen - Uncontrolled default open state
 * @param props.onOpenChange - Callback when open state changes
 * @returns Combobox root element
 */
function ComboboxRoot({
  ...props
}: React.ComponentProps<typeof Combobox.Root>) {
  return <Combobox.Root data-slot="combobox" {...props} />
}

/**
 * Combobox input component.
 * A text input to search for items in the list.
 *
 * @param props - ComboboxInput props (extends React.ComponentProps<typeof Combobox.Input>)
 * @param props.className - Additional CSS classes
 * @param props.placeholder - Placeholder text
 * @returns Combobox input element
 */
const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Combobox.Input>
>(({ className, ...props }, ref) => {
  return (
    <Combobox.Input
      ref={ref}
      data-slot="combobox-input"
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
ComboboxInput.displayName = "ComboboxInput"

/**
 * Combobox trigger component.
 * A button that opens the popup.
 *
 * @param props - ComboboxTrigger props (extends React.ComponentProps<typeof Combobox.Trigger>)
 * @param props.className - Additional CSS classes
 * @returns Combobox trigger element
 */
const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Combobox.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <Combobox.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Combobox.Icon>
        <ChevronDownIcon className="size-4 opacity-50" />
      </Combobox.Icon>
    </Combobox.Trigger>
  )
})
ComboboxTrigger.displayName = "ComboboxTrigger"

/**
 * Combobox clear component.
 * Clears the value when clicked.
 *
 * @param props - ComboboxClear props (extends React.ComponentProps<typeof Combobox.Clear>)
 * @param props.className - Additional CSS classes
 * @returns Combobox clear button element
 */
const ComboboxClear = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Combobox.Clear>
>(({ className, ...props }, ref) => {
  return (
    <Combobox.Clear
      ref={ref}
      data-slot="combobox-clear"
      className={cn(
        "text-muted-foreground hover:text-foreground flex items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <XIcon className="size-4" />
    </Combobox.Clear>
  )
})
ComboboxClear.displayName = "ComboboxClear"

/**
 * Combobox value component.
 * Displays the current value of the combobox.
 *
 * @param props - ComboboxValue props (extends React.ComponentProps<typeof Combobox.Value>)
 * @param props.placeholder - Placeholder text when no value is selected
 * @param props.children - Custom render function for formatted value
 * @returns Combobox value element
 */
function ComboboxValue({
  ...props
}: React.ComponentProps<typeof Combobox.Value>) {
  return <Combobox.Value data-slot="combobox-value" {...props} />
}

/**
 * Combobox portal component.
 * A portal element that moves the popup to a different part of the DOM.
 *
 * @param props - ComboboxPortal props (extends React.ComponentProps<typeof Combobox.Portal>)
 * @returns Combobox portal element
 */
function ComboboxPortal({
  ...props
}: React.ComponentProps<typeof Combobox.Portal>) {
  return <Combobox.Portal data-slot="combobox-portal" {...props} />
}

/**
 * Combobox positioner component.
 * Positions the popup against the trigger.
 *
 * @param props - ComboboxPositioner props (extends React.ComponentProps<typeof Combobox.Positioner>)
 * @param props.className - Additional CSS classes
 * @param props.sideOffset - Distance from trigger in pixels (default: 4)
 * @param props.align - Alignment relative to trigger (default: "center")
 * @param props.side - Position relative to trigger (default: "bottom")
 * @returns Combobox positioner element
 */
function ComboboxPositioner({
  className,
  sideOffset = 4,
  align = "center",
  side = "bottom",
  ...props
}: React.ComponentProps<typeof Combobox.Positioner> & {
  sideOffset?: number
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <Combobox.Positioner
      data-slot="combobox-positioner"
      sideOffset={sideOffset}
      align={align}
      side={side}
      className={className}
      {...props}
    />
  )
}

/**
 * Combobox popup component.
 * A container for the list.
 *
 * @param props - ComboboxPopup props (extends React.ComponentProps<typeof Combobox.Popup>)
 * @param props.className - Additional CSS classes
 * @returns Combobox popup element
 */
function ComboboxPopup({
  className,
  style,
  ...props
}: React.ComponentProps<typeof Combobox.Popup>) {
  return (
    <Combobox.Popup
      data-slot="combobox-popup"
      className={cn(
        "bg-popover text-popover-foreground data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        "[width:var(--anchor-width)]",
        className
      )}
      style={{
        width: "var(--anchor-width)",
        ...style,
      }}
      {...props}
    />
  )
}

/**
 * Combobox list component.
 * A list container for the items.
 *
 * @param props - ComboboxList props (extends React.ComponentProps<typeof Combobox.List>)
 * @param props.className - Additional CSS classes
 * @param props.children - Items or render function
 * @returns Combobox list element
 */
function ComboboxList({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.List>) {
  return (
    <Combobox.List
      data-slot="combobox-list"
      className={cn("max-h-[300px] overflow-y-auto p-1", className)}
      {...props}
    />
  )
}

/**
 * Combobox item component.
 * An individual item in the list.
 *
 * @param props - ComboboxItem props (extends React.ComponentProps<typeof Combobox.Item>)
 * @param props.className - Additional CSS classes
 * @param props.value - Item value
 * @param props.children - Item label/content
 * @returns Combobox item element
 */
function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Combobox.Item>) {
  return (
    <Combobox.Item
      data-slot="combobox-item"
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[selected]:bg-accent data-[selected]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <Combobox.ItemIndicator>
          <CheckIcon className="size-4" />
        </Combobox.ItemIndicator>
      </span>
      {children}
    </Combobox.Item>
  )
}

/**
 * Combobox item indicator component.
 * Indicates whether the item is selected.
 *
 * @param props - ComboboxItemIndicator props (extends React.ComponentProps<typeof Combobox.ItemIndicator>)
 * @param props.className - Additional CSS classes
 * @returns Combobox item indicator element
 */
function ComboboxItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.ItemIndicator>) {
  return (
    <Combobox.ItemIndicator
      data-slot="combobox-item-indicator"
      className={cn("text-primary", className)}
      {...props}
    />
  )
}

/**
 * Combobox empty component.
 * Renders its children only when the list is empty.
 *
 * @param props - ComboboxEmpty props (extends React.ComponentProps<typeof Combobox.Empty>)
 * @param props.className - Additional CSS classes
 * @returns Combobox empty element
 */
function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Empty>) {
  return (
    <Combobox.Empty
      data-slot="combobox-empty"
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Combobox group component.
 * Groups related items with the corresponding label.
 *
 * @param props - ComboboxGroup props (extends React.ComponentProps<typeof Combobox.Group>)
 * @param props.className - Additional CSS classes
 * @returns Combobox group element
 */
function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Group>) {
  return (
    <Combobox.Group
      data-slot="combobox-group"
      className={cn("", className)}
      {...props}
    />
  )
}

/**
 * Combobox group label component.
 * An accessible label that is automatically associated with its parent group.
 *
 * @param props - ComboboxGroupLabel props (extends React.ComponentProps<typeof Combobox.GroupLabel>)
 * @param props.className - Additional CSS classes
 * @returns Combobox group label element
 */
function ComboboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.GroupLabel>) {
  return (
    <Combobox.GroupLabel
      data-slot="combobox-group-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium", className)}
      {...props}
    />
  )
}

export {
  ComboboxRoot as Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxValue,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
}
