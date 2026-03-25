import * as React from "react"
import { Popover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

/**
 * Popover root component.
 * Controls the open/closed state of the popover.
 *
 * @param props - Popover props (extends React.ComponentProps<typeof Popover.Root>)
 * @returns Popover root element
 */
function PopoverRoot({
  ...props
}: React.ComponentProps<typeof Popover.Root>) {
  return <Popover.Root data-slot="popover" {...props} />
}

/**
 * Popover trigger component.
 * Element that opens the popover when clicked.
 *
 * @param props - PopoverTrigger props (extends React.ComponentProps<typeof Popover.Trigger>)
 * @returns Popover trigger element
 */
const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Popover.Trigger>
>((props, ref) => {
  return <Popover.Trigger ref={ref} data-slot="popover-trigger" {...props} />
})
PopoverTrigger.displayName = "PopoverTrigger"

/**
 * Popover content component.
 * The floating content that appears when the popover is open.
 *
 * @param props - PopoverContent props (extends React.ComponentProps<typeof Popover.Popup>)
 * @param props.className - Additional CSS classes
 * @param props.align - Alignment relative to trigger (default: "center")
 * @param props.sideOffset - Distance from trigger in pixels (default: 4)
 * @returns Popover content element
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Popover.Popup> & {
  align?: "center" | "start" | "end"
  sideOffset?: number
}) {
  return (
    <Popover.Portal>
      <Popover.Positioner align={align} sideOffset={sideOffset}>
        <Popover.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground data-[open]:animate-in data-[closed]:animate-out data-[closed]:duration-200 data-[open]:duration-300 data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
            className
          )}
          {...props}
        />
      </Popover.Positioner>
    </Popover.Portal>
  )
}

export { PopoverRoot as Popover, PopoverTrigger, PopoverContent }
