import * as React from "react"
import { Checkbox } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Checkbox component for boolean input.
 * Provides accessible checkbox functionality with visual feedback.
 *
 * @param props - Checkbox component props (extends React.ComponentProps<typeof CheckboxPrimitive.Root>)
 * @param props.className - Additional CSS classes
 * @param props.checked - Controlled checked state
 * @param props.defaultChecked - Uncontrolled default checked state
 * @param props.onCheckedChange - Callback when checked state changes
 * @returns Checkbox element
 *
 * @example
 * ```tsx
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 * <Checkbox defaultChecked />
 * ```
 */
const CheckboxRoot = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof Checkbox.Root>
>(({ className, ...props }, ref) => {
  return (
    <Checkbox.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[checked]:bg-primary data-[checked]:text-primary-foreground dark:data-[checked]:bg-primary data-[checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex items-center justify-center size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Checkbox.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
})
CheckboxRoot.displayName = "Checkbox"

export { CheckboxRoot as Checkbox }
