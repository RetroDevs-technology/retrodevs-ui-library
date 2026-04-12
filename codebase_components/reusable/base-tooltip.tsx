/**
 * A reusable tooltip component built on top of shadcn/ui Tooltip.
 * Provides a consistent way to display helpful information when hovering over elements.
 * Supports different positions, alignments, and customizable delay.
 *
 * @example
 * ```tsx
 * <BaseTooltip
 *   content="This is a helpful tooltip"
 *   side="top"
 *   align="center"
 *   delayDuration={500}
 * >
 *   <Button>Hover me</Button>
 * </BaseTooltip>
 * ```
 */
"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface CustomTooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode
  /** Element that triggers the tooltip on hover */
  children: React.ReactNode
  /** Position of the tooltip relative to the trigger element */
  side?: "top" | "right" | "bottom" | "left"
  /** Horizontal alignment of the tooltip */
  align?: "start" | "center" | "end"
  /** Delay in milliseconds before showing the tooltip */
  delayDuration?: number
  /** Delay in milliseconds before showing the tooltip on touch */
  touchDelay?: number
  /** Additional CSS classes for the tooltip content */
  className?: string
}

/**
 * Base tooltip component that provides a consistent way to display helpful information.
 * The tooltip appears when hovering over the trigger element and supports various positioning options.
 */
function BaseTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 300,
  touchDelay = 500,
  className,
}: CustomTooltipProps) {
  const [open, setOpen] = useState(false)
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTouchStart = useCallback(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, touchDelay)
    setTouchTimer(timer)
  }, [touchDelay])

  const handleTouchEnd = useCallback(() => {
    if (touchTimer) {
      clearTimeout(touchTimer)
      setTouchTimer(null)
    }
    setOpen(false)
  }, [touchTimer])

  useEffect(() => {
    return () => {
      if (touchTimer) {
        clearTimeout(touchTimer)
      }
    }
  }, [touchTimer])

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration} open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn("cursor-pointer", className)}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setOpen(!open)
              }
            }}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label="Toggle tooltip">
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn("max-w-[90vw] md:max-w-[460px] break-words mx-4 my-2", className)}
          onPointerDownOutside={() => setOpen(false)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BaseTooltip
