import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib/utils"

function normalizeSliderValue(
  v: number | number[] | undefined,
): number[] | undefined {
  if (v === undefined) return undefined
  return Array.isArray(v) ? v : [v]
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const normalizedDefault = normalizeSliderValue(defaultValue)
    const normalizedValue = normalizeSliderValue(value)
    const thumbCount = normalizedValue?.length ?? normalizedDefault?.length ?? 1

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        defaultValue={normalizedDefault}
        value={normalizedValue}
        className={cn(
          "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}>
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2">
          <SliderPrimitive.Range className="absolute h-full bg-primary data-[orientation=vertical]:w-full" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    )
  },
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
