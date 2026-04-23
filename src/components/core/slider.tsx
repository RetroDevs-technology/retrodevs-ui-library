import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import * as React from "react"

import { cn } from "@/lib/utils"

function normalizeSliderValue(
  v: number | readonly number[] | undefined,
): number[] | undefined {
  if (v === undefined) return undefined
  if (Array.isArray(v)) return [...v]
  return [v as number]
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
      orientation = "horizontal",
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
          "relative flex touch-none select-none items-center",
          orientation === "horizontal" && "w-full",
          orientation === "vertical" && "h-full min-h-44 w-auto flex-col",
          className,
        )}
        orientation={orientation}
        {...props}>
        <SliderPrimitive.Control
          className={cn(
            "flex touch-none items-center select-none",
            orientation === "horizontal" && "w-full py-1",
            orientation === "vertical" && "h-full w-auto px-1",
          )}>
          <SliderPrimitive.Track
            className={cn(
              "relative grow overflow-hidden rounded-full bg-secondary",
              orientation === "horizontal" && "h-2 w-full",
              orientation === "vertical" && "h-full w-2",
            )}>
            <SliderPrimitive.Indicator
              className={cn(
                "absolute bg-primary",
                orientation === "horizontal" && "h-full",
                orientation === "vertical" && "w-full",
              )}
            />
            {Array.from({ length: thumbCount }, (_, i) => (
              <SliderPrimitive.Thumb
                key={i}
                index={i}
                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
