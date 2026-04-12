import { HelpCircle } from "lucide-react"
import type { ReactNode } from "react"
import BaseTooltip from "./base-tooltip"

interface LabelWithTooltipProps {
  label: string
  tooltip?: string
  required?: boolean
  className?: string
}

export function LabelWithTooltip({
  label,
  tooltip,
  required = false,
  className,
}: LabelWithTooltipProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className || ""}`}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {tooltip && (
        <BaseTooltip content={tooltip} side="top" align="start">
          <HelpCircle className="size-4 text-muted-foreground cursor-help" />
        </BaseTooltip>
      )}
    </div>
  )
}

