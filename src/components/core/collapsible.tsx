import * as React from "react"
import { Collapsible } from "@base-ui/react/collapsible"

import { cn } from "@/lib/utils"

function CollapsibleRoot({ ...props }: React.ComponentProps<typeof Collapsible.Root>) {
  return <Collapsible.Root data-slot="collapsible" {...props} />
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Trigger>
>(({ className, ...props }, ref) => (
  <Collapsible.Trigger
    ref={ref}
    data-slot="collapsible-trigger"
    className={cn(className)}
    {...props}
  />
))
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Panel>
>(({ className, ...props }, ref) => (
  <Collapsible.Panel
    ref={ref}
    data-slot="collapsible-content"
    className={cn(
      "overflow-hidden text-sm data-[closed]:animate-accordion-up data-[open]:animate-accordion-down",
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName = "CollapsibleContent"

export { CollapsibleRoot as Collapsible, CollapsibleTrigger, CollapsibleContent }
