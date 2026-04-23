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

import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/core/tooltip"
import { cn } from "@/lib/utils"
import { Tooltip } from "@base-ui/react/tooltip"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"

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
  const [touchTimer, setTouchTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

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

  const triggerHandlers = {
    onClick: () => setOpen((o) => !o),
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    },
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        {React.isValidElement(children) ? (
          <TooltipTrigger asChild>
            {React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
              ...triggerHandlers,
              "aria-expanded": open,
              "aria-haspopup": "true" as const,
            })}
          </TooltipTrigger>
        ) : (
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn("cursor-pointer", className)}
              aria-expanded={open}
              aria-haspopup="true"
              aria-label="Toggle tooltip"
              {...triggerHandlers}>
              {children}
            </button>
          </TooltipTrigger>
        )}
        <TooltipContent
          side={side}
          align={align}
          className={cn("max-w-[90vw] md:max-w-[460px] break-words mx-4 my-2", className)}>
          {content}
        </TooltipContent>
      </Tooltip.Root>
    </TooltipProvider>
  )
}

export default BaseTooltip
