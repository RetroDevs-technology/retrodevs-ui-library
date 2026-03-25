import * as React from "react"
import { Tooltip } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

/**
 * Tooltip provider component.
 * Provides tooltip context and configuration.
 *
 * @param props - TooltipProvider props
 * @param props.delay - Delay before showing tooltip in ms (default: 300)
 * @returns Tooltip provider element
 */
function TooltipProvider({
  delay = 300,
  ...props
}: React.ComponentProps<typeof Tooltip.Provider>) {
  return (
    <Tooltip.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

/**
 * Tooltip root component.
 * Controls the open/closed state of the tooltip.
 *
 * @param props - Tooltip props (extends React.ComponentProps<typeof Tooltip.Root>)
 * @param props.open - Controlled open state
 * @param props.defaultOpen - Uncontrolled default open state
 * @param props.onOpenChange - Callback when open state changes
 * @returns Tooltip root element
 */
function TooltipRoot({
  ...props
}: React.ComponentProps<typeof Tooltip.Root>) {
  return (
    <TooltipProvider>
      <Tooltip.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Tooltip.Trigger>
>((props, ref) => {
  return <Tooltip.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />
})
TooltipTrigger.displayName = "TooltipTrigger"

/**
 * Tooltip content component.
 * The floating tooltip text that appears on hover.
 *
 * @param props - TooltipContent props
 * @param props.className - Additional CSS classes
 * @param props.sideOffset - Distance from trigger in pixels (default: 8)
 * @param props.side - Position of tooltip relative to trigger
 * @param props.align - Horizontal alignment of tooltip
 * @param props.children - Tooltip text content
 * @returns Tooltip content element
 */
function TooltipContent({
  className,
  sideOffset = 8,
  side,
  align,
  children,
  ...props
}: React.ComponentProps<typeof Tooltip.Popup> & {
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={sideOffset} arrowPadding={8} side={side} align={align}>
        <Tooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
            className
          )}
          {...props}
        >
          {children}
          <Tooltip.Arrow className="bg-primary fill-primary z-50 size-2.5 rotate-45 rounded-[2px] data-[side=top]:bottom-0 data-[side=top]:left-1/2 data-[side=top]:-translate-x-1/2 data-[side=top]:translate-y-[calc(100%-5px)] data-[side=bottom]:top-0 data-[side=bottom]:left-1/2 data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(100%-5px)] data-[side=left]:right-0 data-[side=left]:top-1/2 data-[side=left]:-translate-y-1/2 data-[side=left]:translate-x-[calc(100%-6px)] data-[side=right]:left-0 data-[side=right]:top-1/2 data-[side=right]:-translate-y-1/2 data-[side=right]:-translate-x-[calc(100%-6px)]" />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  )
}

export { TooltipRoot as Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
