/**
 * A reusable popover component built on top of shadcn/ui Popover.
 * Provides a simple way to display floating content relative to a trigger element.
 *
 * @example
 * ```tsx
 * <BasePopover
 *   trigger={<Button>Open Popover</Button>}
 *   content={
 *     <div className="p-4">
 *       <p>Popover content goes here</p>
 *     </div>
 *   }
 * />
 * ```
 */
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface IPopoverProps {
  /** The trigger element that opens the popover (usually a button) */
  trigger: React.ReactNode
  /** The content to display in the popover */
  content: React.ReactNode
  contentClassName?: string
}

/**
 * Base popover component that provides a consistent way to display floating content.
 * The popover appears when the trigger element is clicked and is positioned relative to it.
 */
export function BasePopover({ trigger, content, contentClassName }: IPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn("max-w-fit border-none flex flex-col bg-medium-gray p-0", contentClassName)}>
        {content}
      </PopoverContent>
    </Popover>
  )
}
