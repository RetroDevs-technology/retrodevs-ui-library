import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { Minus, X } from "lucide-react"
import { useState, type ReactNode } from "react"

interface FloatingAdminToolWindowProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function FloatingAdminToolWindow({
  open,
  onClose,
  title,
  children,
}: FloatingAdminToolWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-300 shadow-2xl rounded-lg overflow-hidden bg-white border border-gray-200 flex flex-col",
        "bottom-4 left-4 right-4 sm:left-auto sm:right-24 sm:bottom-24",
        "max-w-[calc(100vw-2rem)]",
        isMinimized
          ? "w-64 sm:w-80 h-14"
          : "w-full sm:w-[450px] h-[min(650px,85vh)] max-h-[85vh]",
      )}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-primary text-white flex-shrink-0 min-h-12">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && <div className="flex-1 overflow-hidden">{children}</div>}
    </div>
  )
}

