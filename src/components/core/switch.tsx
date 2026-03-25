import * as React from "react"
import { Switch } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

/**
 * Switch component for toggle input.
 * Provides accessible switch/toggle functionality with smooth animations.
 *
 * @param props - Switch component props (extends React.ComponentProps<typeof SwitchPrimitive.Root>)
 * @param props.className - Additional CSS classes
 * @param props.checked - Controlled checked state
 * @param props.defaultChecked - Uncontrolled default checked state
 * @param props.onCheckedChange - Callback when checked state changes
 * @returns Switch element
 *
 * @example
 * ```tsx
 * <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 * <Switch defaultChecked />
 * ```
 */
const SwitchRoot = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof Switch.Root>
>(({ className, ...props }, ref) => {
  return (
    <Switch.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "peer data-[checked]:bg-primary data-[unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Switch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[unchecked]:bg-foreground dark:data-[checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[checked]:translate-x-[calc(100%-2px)] data-[unchecked]:translate-x-0"
        )}
      />
    </Switch.Root>
  )
})
SwitchRoot.displayName = "Switch"

export { SwitchRoot as Switch }
