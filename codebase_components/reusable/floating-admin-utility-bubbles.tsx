import { Button } from "@/components/ui"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import type { LucideIcon } from "lucide-react"

interface UtilityTool {
  id: string
  name: string
  icon: LucideIcon
  onClick: () => void
}

interface FloatingAdminUtilityBubblesProps {
  open: boolean
  tools: UtilityTool[]
  onClose: () => void
}

export function FloatingAdminUtilityBubbles({
  open,
  tools,
  onClose,
}: FloatingAdminUtilityBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add a small delay to prevent immediate close when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  if (!open || tools.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-24 z-50 flex flex-col gap-2 sm:gap-3 items-end">
      {tools.map((tool, index) => (
        <TooltipProvider key={tool.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={tool.onClick}
                size="lg"
                className={cn(
                  "h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 bg-primary",
                  open && "animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95",
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}>
                <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-primary text-primary-foreground text-sm">
              <p>{tool.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

