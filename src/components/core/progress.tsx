import * as React from "react"
import { Progress } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

/**
 * Progress root component.
 * Groups all parts of the progress bar and provides task completion status.
 *
 * @param props - Progress props (extends React.ComponentProps<typeof Progress.Root>)
 * @param props.value - Current value (0-100) or null for indeterminate
 * @param props.min - Minimum value (default: 0)
 * @param props.max - Maximum value (default: 100)
 * @returns Progress root element
 */
function ProgressRoot({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Root>) {
  return (
    <Progress.Root
      data-slot="progress"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  )
}

/**
 * Progress track component.
 * Contains the progress bar indicator.
 *
 * @param props - ProgressTrack props (extends React.ComponentProps<typeof Progress.Track>)
 * @param props.className - Additional CSS classes
 * @returns Progress track element
 */
function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Track>) {
  return (
    <Progress.Track
      data-slot="progress-track"
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Progress indicator component.
 * Visualizes the completion status of the task.
 *
 * @param props - ProgressIndicator props (extends React.ComponentProps<typeof Progress.Indicator>)
 * @param props.className - Additional CSS classes
 * @returns Progress indicator element
 */
function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Indicator>) {
  return (
    <Progress.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all data-[complete]:bg-primary data-[indeterminate]:animate-[progress_1.5s_ease-in-out_infinite] data-[progressing]:bg-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Progress value component.
 * A text label displaying the current value.
 *
 * @param props - ProgressValue props (extends React.ComponentProps<typeof Progress.Value>)
 * @param props.className - Additional CSS classes
 * @param props.children - Custom render function for formatted value
 * @returns Progress value element
 */
function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Value>) {
  return (
    <Progress.Value
      data-slot="progress-value"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

/**
 * Progress label component.
 * An accessible label for the progress bar.
 *
 * @param props - ProgressLabel props (extends React.ComponentProps<typeof Progress.Label>)
 * @param props.className - Additional CSS classes
 * @returns Progress label element
 */
function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof Progress.Label>) {
  return (
    <Progress.Label
      data-slot="progress-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

export {
  ProgressRoot as Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
  ProgressLabel,
}
