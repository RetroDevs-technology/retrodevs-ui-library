import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component for text, email, password, and other input types.
 * Supports all standard input HTML attributes with consistent styling.
 *
 * @param props - Input component props (extends React.ComponentProps<"input">)
 * @param props.className - Additional CSS classes
 * @param props.type - Input type (text, email, password, number, etc.)
 * @returns Input element
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Enter your email" />
 * <Input type="password" placeholder="Password" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        ref={ref}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
