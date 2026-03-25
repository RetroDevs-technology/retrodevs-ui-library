import * as React from "react"
import { Slider } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

/**
 * Slider root component.
 * Controls the value and behavior of the slider.
 *
 * @param props - Slider props (extends React.ComponentProps<typeof Slider.Root>)
 * @param props.value - Controlled value (number or [number, number] for range)
 * @param props.defaultValue - Uncontrolled default value
 * @param props.onValueChange - Callback when value changes
 * @param props.min - Minimum value (default: 0)
 * @param props.max - Maximum value (default: 100)
 * @param props.step - Step increment (default: 1)
 * @param props.disabled - Whether slider is disabled
 * @returns Slider root element
 */
function SliderRoot({
  ...props
}: React.ComponentProps<typeof Slider.Root>) {
  return <Slider.Root data-slot="slider" {...props} />
}

/**
 * Slider control component.
 * The clickable, interactive part of the slider.
 *
 * @param props - SliderControl props (extends React.ComponentProps<typeof Slider.Control>)
 * @param props.className - Additional CSS classes
 * @returns Slider control element
 */
function SliderControl({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Control>) {
  return (
    <Slider.Control
      data-slot="slider-control"
      className={cn(
        "relative flex touch-none select-none",
        "w-full items-center justify-center data-[orientation=horizontal]:flex-row",
        "h-full data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * Slider track component.
 * Contains the slider indicator and represents the entire range.
 *
 * @param props - SliderTrack props (extends React.ComponentProps<typeof Slider.Track>)
 * @param props.className - Additional CSS classes
 * @returns Slider track element
 */
function SliderTrack({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Track>) {
  return (
    <Slider.Track
      data-slot="slider-track"
      className={cn(
        "relative rounded-full bg-secondary",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:grow",
        "data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:grow",
        className
      )}
      {...props}
    />
  )
}

/**
 * Slider indicator component.
 * Visualizes the current value of the slider.
 *
 * @param props - SliderIndicator props (extends React.ComponentProps<typeof Slider.Indicator>)
 * @param props.className - Additional CSS classes
 * @returns Slider indicator element
 */
function SliderIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Indicator>) {
  return (
    <Slider.Indicator
      data-slot="slider-indicator"
      className={cn(
        "absolute bg-primary",
        "data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:h-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Slider thumb component.
 * The draggable part of the slider.
 *
 * @param props - SliderThumb props (extends React.ComponentProps<typeof Slider.Thumb>)
 * @param props.className - Additional CSS classes
 * @param props.aria-label - Accessible label for the thumb
 * @returns Slider thumb element
 */
const SliderThumb = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Slider.Thumb>
>(({ className, ...props }, ref) => {
  return (
    <Slider.Thumb
      ref={ref}
      data-slot="slider-thumb"
      className={cn(
        "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
SliderThumb.displayName = "SliderThumb"

/**
 * Slider value component.
 * Displays the current value of the slider as text.
 *
 * @param props - SliderValue props (extends React.ComponentProps<typeof Slider.Value>)
 * @param props.className - Additional CSS classes
 * @param props.children - Custom render function for formatted value
 * @returns Slider value element
 */
function SliderValue({
  className,
  ...props
}: React.ComponentProps<typeof Slider.Value>) {
  return (
    <Slider.Value
      data-slot="slider-value"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

export {
  SliderRoot as Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
}
