import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ComponentProps } from "react"

interface StatusBadgeConfig<TStatus extends string> {
  variant: ComponentProps<typeof Badge>["variant"]
  label?: string
  description: string
}

interface StatusBadgeWithTooltipProps<TStatus extends string> {
  status: TStatus
  configs: Record<TStatus, StatusBadgeConfig<TStatus>>
  fallbackLabel?: string
  fallbackDescription?: string
  className?: string
}

function formatStatus(status: string): string {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function StatusBadgeWithTooltip<TStatus extends string>({
  status,
  configs,
  fallbackLabel = "Unknown",
  fallbackDescription = "No description available for this status",
  className = "text-xs",
}: StatusBadgeWithTooltipProps<TStatus>) {
  const config = configs[status]
  const label = config?.label ?? formatStatus(status)
  const description = config?.description ?? fallbackDescription
  const variant = config?.variant ?? "secondary"

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <span className="inline-flex cursor-help">
          <Badge variant={variant} className={className}>
            {label || fallbackLabel}
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[300px]">
        {description}
      </TooltipContent>
    </Tooltip>
  )
}
