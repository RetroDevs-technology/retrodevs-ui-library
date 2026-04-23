import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import type * as React from "react"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value ?? null}
      className={cn("bg-primary/20 relative h-fit w-full overflow-hidden rounded-full", className)}
      {...props}>
      <ProgressPrimitive.Track className="h-1 w-full rounded-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-[#04AA01] h-1 w-full flex-1 transition-all rounded-full"
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
