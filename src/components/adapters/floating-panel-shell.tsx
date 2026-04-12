import { Minus, X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/core/button"
import { cn } from "@/lib/utils"

export interface FloatingPanelShellProps {
  open: boolean
  onClose: () => void
  title: string
  icon?: React.ReactNode
  className?: string
  headerClassName?: string
  /** When true, starts collapsed to a title bar */
  defaultMinimized?: boolean
  children: React.ReactNode
}

export function FloatingPanelShell({
  open,
  onClose,
  title,
  icon,
  className,
  headerClassName,
  defaultMinimized = false,
  children,
}: FloatingPanelShellProps) {
  const [isMinimized, setIsMinimized] = React.useState(defaultMinimized)

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 flex flex-col transition-all duration-300 shadow-2xl rounded-lg overflow-hidden bg-background border border-border",
        isMinimized ? "w-80 h-14" : "w-[400px] h-[600px] max-h-[80vh]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between p-4 bg-primary text-primary-foreground shrink-0",
          headerClassName
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <h3 className="font-semibold truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {!isMinimized ? <div className="flex flex-col flex-1 min-h-0 overflow-hidden">{children}</div> : null}
    </div>
  )
}
