import * as React from "react"
import { ScrollArea } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollAreaRoot({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollArea.Root>) {
  return (
    <ScrollArea.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
      <ScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollBar />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Scrollbar> & {
    orientation?: "vertical" | "horizontal"
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollArea.Scrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(
      "flex touch-none p-px transition-colors select-none",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      className
    )}
    {...props}
  >
    <ScrollArea.Thumb
      data-slot="scroll-area-thumb"
      className="bg-border relative flex-1 rounded-full"
    />
  </ScrollArea.Scrollbar>
))
ScrollBar.displayName = "ScrollBar"

export { ScrollAreaRoot as ScrollArea, ScrollBar }
