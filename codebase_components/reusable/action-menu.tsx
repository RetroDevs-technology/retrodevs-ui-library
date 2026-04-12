import { Button } from "@/components/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

export interface ActionMenuItem {
  id: string
  label: string
  icon?: ReactNode
  onClick: () => void
  disabled?: boolean
  tooltip?: string
  variant?: "default" | "destructive"
  className?: string
  shortcut?: string
}

export interface ActionMenuGroup {
  id: string
  label?: string
  items: ActionMenuItem[]
}

export interface ActionMenuProps {
  groups: ActionMenuGroup[]
  trigger?: ReactNode
  triggerClassName?: string
  contentClassName?: string
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  alignOffset?: number
  disabled?: boolean
  loading?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost" | "destructive"
}

export function ActionMenu({
  groups,
  trigger,
  triggerClassName,
  contentClassName,
  align = "end",
  side = "bottom",
  sideOffset = 4,
  alignOffset = 0,
  disabled = false,
  loading = false,
  size = "md",
  variant = "outline",
}: ActionMenuProps) {
  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }

  const iconSizes = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  }

  const defaultTrigger = (
    <Button
      variant={variant}
      size="sm"
      disabled={disabled || loading}
      className={cn("gap-2", sizeClasses[size], triggerClassName)}>
      Actions
      <ChevronDown className={cn("transition-transform", iconSizes[size])} />
    </Button>
  )

  const renderMenuItem = (item: ActionMenuItem) => {
    const menuItem = (
      <DropdownMenuItem
        key={item.id}
        onClick={item.onClick}
        disabled={item.disabled}
        variant={item.variant}
        className={cn(
          "flex items-center gap-2.5 cursor-pointer px-2.5 py-2 rounded-md text-sm transition-colors",
          item.className
        )}>
        {item.icon && <span className={cn("flex-shrink-0", iconSizes[size])}>{item.icon}</span>}
        <span className="flex-1 font-medium">{item.label}</span>
        {item.shortcut && (
          <span className="text-xs text-muted-foreground ml-auto">{item.shortcut}</span>
        )}
      </DropdownMenuItem>
    )

    if (item.tooltip) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
          <TooltipContent>
            <p>{item.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return menuItem
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger || defaultTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          "min-w-[220px] rounded-lg border border-border bg-popover shadow-lg p-1.5",
          contentClassName
        )}>
        {groups.map((group, groupIndex) => (
          <div key={group.id}>
            {groupIndex > 0 && <DropdownMenuSeparator className="my-1.5" />}
            {group.label && (
              <DropdownMenuLabel className="px-2.5 py-1.5 text-xs font-semibold text-muted-foreground">
                {group.label}
              </DropdownMenuLabel>
            )}
            {group.items.map(renderMenuItem)}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionMenu
