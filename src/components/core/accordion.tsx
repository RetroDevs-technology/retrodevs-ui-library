import * as React from "react"
import { Accordion } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function AccordionRoot({ ...props }: React.ComponentProps<typeof Accordion.Root>) {
  return <Accordion.Root data-slot="accordion" {...props} />
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-panel-open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
    </Accordion.Trigger>
  </Accordion.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Panel>
>(({ className, children, ...props }, ref) => (
  <Accordion.Panel
    ref={ref}
    data-slot="accordion-content"
    className="data-[closed]:animate-accordion-up data-[open]:animate-accordion-down overflow-hidden text-sm"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </Accordion.Panel>
))
AccordionContent.displayName = "AccordionContent"

export { AccordionRoot as Accordion, AccordionItem, AccordionTrigger, AccordionContent }
