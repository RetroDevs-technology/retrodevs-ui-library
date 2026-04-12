import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  asChild?: boolean
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-background text-destructive-foreground py-2.5 px-5 text-sm font-medium border border-[#D2000A33] rounded-[8px] hover:bg-destructive/10 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-background",
        outline:
          "py-2.5 px-5 h-10 rounded-[8px] shadow-outline bg-background text-sm font-bold hover:text-accent-foreground dark:bg-input/30 dark:border-charcoal dark:hover:bg-input/50",
        outline_pagination:
          "py-2.5 px-5 h-10 rounded-[8px] border border-primary bg-background text-sm font-bold hover:text-accent-foreground dark:bg-input/30 dark:border-primary dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:text-accent-foreground hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "py-3 px-2.5 rounded-[12px] hover:bg-primary/90 h-[43px] shadow-blue bg-primary text-white text-sm font-bold",
        black:
          "py-3 px-2.5 rounded-[12px] h-10 bg-charcoal text-sm font-medium text-primary-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-disabled={props.disabled}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
