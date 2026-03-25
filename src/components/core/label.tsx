"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Label component for form inputs.
 * Provides accessible labeling with proper association to form controls.
 *
 * @param props - Label component props (extends React.LabelHTMLAttributes<HTMLLabelElement>)
 * @param props.className - Additional CSS classes
 * @param props.htmlFor - ID of the associated form control
 * @returns Label element
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 */
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label }
