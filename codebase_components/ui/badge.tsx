import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "text-sm py-1 text-sm rounded-full text-error w-[85px] border-transparent bg-[#FCF0F0] [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-[#EDFAEF] text-[#008024] rounded-full text-sm w-[85px] py-1 border-transparent",
        warning:
          "bg-[#FDF1E3] text-[#F08E15] rounded-full text-sm w-[85px] py-1 border-transparent",
        new: "bg-[#EBF0FF] text-sm text-primary w-[85px] py-1 rounded-full border-transparent",
        "transit-destructive":
          "text-xs rounded-full text-error w-fit border-transparent bg-[#FCF0F0] py-1 px-4",
        "transit-warning":
          "bg-[#F08E151F] text-[#F08E15] rounded-full text-xs w-fit border-transparent py-1 px-4",
        "transit-success":
          "bg-[#34C7591F] text-[#10481E] rounded-full text-xs w-fit border-transparent py-1 px-4",
        "transit-blue":
          "bg-[#EBF0FF] text-[#0073D2] rounded-full text-xs w-fit border-transparent py-1 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
