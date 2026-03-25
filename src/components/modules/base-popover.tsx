/**
 * A reusable popover component built on top of shadcn/ui Popover.
 * Provides a simple way to display floating content relative to a trigger element.
 * Supports both simple trigger/content API and controlled state with children pattern.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <BasePopover
 *   trigger={<Button>Open Popover</Button>}
 *   content={
 *     <div className="p-4">
 *       <p>Popover content goes here</p>
 *     </div>
 *   }
 * />
 *
 * // Controlled usage
 * <BasePopover open={open} onOpenChange={setOpen}>
 *   <BasePopoverTrigger render={<Button>Open</Button>} />
 *   <BasePopoverContent align="start">
 *     <div className="p-4">Content</div>
 *   </BasePopoverContent>
 * </BasePopover>
 * ```
 */
import * as React from "react"
import {
  Popover,
  PopoverContent as CorePopoverContent,
  PopoverTrigger as CorePopoverTrigger,
} from "@/components/core/popover"
import { cn } from "@/lib/utils"

interface IPopoverSimpleProps {
  /** The trigger element that opens the popover (usually a button) */
  trigger: React.ReactNode
  /** The content to display in the popover */
  content: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

interface IPopoverControlledProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Children using BasePopoverTrigger and BasePopoverContent */
  children: React.ReactNode
  /** Simple trigger prop (for backward compatibility) */
  trigger?: never
  /** Simple content prop (for backward compatibility) */
  content?: never
}

type BasePopoverProps = IPopoverSimpleProps | IPopoverControlledProps

/**
 * Base popover component that provides a consistent way to display floating content.
 * The popover appears when the trigger element is clicked and is positioned relative to it.
 * Supports both simple trigger/content API and controlled state with children pattern.
 */
export function BasePopover(props: BasePopoverProps) {
  const { open, onOpenChange } = props

  // Simple API: trigger and content props
  if ("trigger" in props && "content" in props && props.trigger !== undefined && props.content !== undefined) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <BasePopoverTrigger render={React.isValidElement(props.trigger) ? props.trigger : <button>{props.trigger}</button>} />
        <BasePopoverContent className="max-w-fit border-border flex flex-col bg-popover p-0">
          {props.content}
        </BasePopoverContent>
      </Popover>
    )
  }

  // Controlled API: children pattern
  if ("children" in props) {
    const controlledProps = props as IPopoverControlledProps
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        {controlledProps.children}
      </Popover>
    )
  }

  return null
}

/**
 * BasePopoverTrigger component.
 * Used within BasePopover for controlled state pattern.
 */
export const BasePopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof CorePopoverTrigger>
>((props, ref) => {
  return <CorePopoverTrigger ref={ref} {...props} />
})
BasePopoverTrigger.displayName = "BasePopoverTrigger"

/**
 * BasePopoverContent component.
 * Used within BasePopover for controlled state pattern.
 */
export function BasePopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof CorePopoverContent> & {
  align?: "center" | "start" | "end"
  sideOffset?: number
}) {
  return (
    <CorePopoverContent
      className={cn("max-w-fit border-border flex flex-col bg-popover p-0", className)}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  )
}
