import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import type * as React from "react"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-[#6073BC] data-[unchecked]:bg-white data-[unchecked]:border-[#6073BC]",
        className,
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[checked]:translate-x-5 data-[checked]:bg-white data-[unchecked]:translate-x-0.5 data-[unchecked]:bg-[#6073BC]",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
