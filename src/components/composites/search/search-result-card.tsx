import { Boxes } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/core/badge"
import { cn } from "@/lib/utils"

import type { SearchResultLike } from "./types"

export interface SearchResultCardClassNames {
  root?: string
  icon?: string
  title?: string
  description?: string
}

export interface SearchResultCardProps<T extends SearchResultLike = SearchResultLike> {
  result: T
  isHighlighted?: boolean
  onClick?: () => void
  className?: string
  classNames?: SearchResultCardClassNames
  renderIcon?: (type: string) => React.ReactNode
  formatTypeLabel?: (type: string) => string
  /** Merged with Badge `className` for the type pill */
  getTypeBadgeClassName?: (type: string) => string | undefined
  badgeVariant?: React.ComponentProps<typeof Badge>["variant"]
}

function defaultFormatTypeLabel(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function SearchResultCard<T extends SearchResultLike = SearchResultLike>({
  result,
  isHighlighted = false,
  onClick,
  className,
  classNames,
  renderIcon,
  formatTypeLabel = defaultFormatTypeLabel,
  getTypeBadgeClassName,
  badgeVariant = "outline",
}: SearchResultCardProps<T>) {
  return (
    <button
      type="button"
      aria-selected={isHighlighted}
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        "hover:bg-muted/50 border border-transparent hover:border-border",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isHighlighted && "bg-primary/5 border-primary/30",
        className,
        classNames?.root
      )}
    >
      <div className={cn("flex-shrink-0 mt-0.5 text-muted-foreground", classNames?.icon)}>
        {renderIcon ? renderIcon(result.type) : <Boxes className="size-4" />}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn("text-sm font-medium text-foreground truncate", classNames?.title)}>
            {result.title}
          </h4>
          <Badge
            variant={badgeVariant}
            className={cn(
              "text-xs px-2 py-0.5 shrink-0",
              getTypeBadgeClassName?.(result.type)
            )}
          >
            {formatTypeLabel(result.type)}
          </Badge>
        </div>
        <p className={cn("text-xs text-muted-foreground line-clamp-2", classNames?.description)}>
          {result.description}
        </p>
        {result.metadata && Object.keys(result.metadata).length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {result.metadata.status ? (
              <span className="text-xs text-muted-foreground">
                Status: <span className="font-medium">{String(result.metadata.status)}</span>
              </span>
            ) : null}
            {result.metadata.trackingNumber ? (
              <span className="text-xs text-muted-foreground">
                Tracking:{" "}
                <span className="font-medium">{String(result.metadata.trackingNumber)}</span>
              </span>
            ) : null}
            {result.metadata.poNumber ? (
              <span className="text-xs text-muted-foreground">
                PO: <span className="font-medium">{String(result.metadata.poNumber)}</span>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </button>
  )
}
