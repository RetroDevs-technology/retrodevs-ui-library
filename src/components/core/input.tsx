import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex w-full min-w-0 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      fieldSize: {
        default:
          "h-9 rounded-md px-3 py-1 text-base md:text-sm dark:bg-input/30",
        comfortable:
          "h-11 rounded-lg px-3 py-2.5 text-xs font-normal md:text-sm bg-background hover:border-primary/50 transition-all duration-150 active:bg-primary/5",
      },
    },
    defaultVariants: {
      fieldSize: "default",
    },
  }
)

export type InputVariants = VariantProps<typeof inputVariants>

export interface InputProps extends React.ComponentProps<"input">, InputVariants {}

/**
 * Input component for text, email, password, and other input types.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, fieldSize, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        ref={ref}
        className={cn(inputVariants({ fieldSize }), className)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
