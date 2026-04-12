import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

export type BadgeVariants = VariantProps<typeof badgeVariants>

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "text-sm py-1 text-sm rounded-full text-destructive w-[85px] border-transparent bg-destructive/10 [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-full text-sm w-[85px] py-1 border-transparent",
        warning:
          "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 rounded-full text-sm w-[85px] py-1 border-transparent",
        new: "bg-primary/10 text-sm text-primary w-[85px] py-1 rounded-full border-transparent",
        "transit-destructive":
          "text-xs rounded-full text-destructive w-fit border-transparent bg-destructive/10 py-1 px-4",
        "transit-warning":
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-xs w-fit border-transparent py-1 px-4",
        "transit-success":
          "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 rounded-full text-xs w-fit border-transparent py-1 px-4",
        "transit-blue":
          "bg-primary/10 text-primary rounded-full text-xs w-fit border-transparent py-1 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    BadgeVariants {
  asChild?: boolean
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
