import { formatRelativeTime } from "@/lib/utils"
import type { NotificationType } from "@/models/notification.model"
import { useNotifications } from "@/providers/notification.provider"
import {
  AlertTriangle,
  Bell,
  DollarSign,
  FileText,
  MessageCircle,
  Package,
  Settings,
  Truck,
  type LucideIcon,
} from "lucide-react"
import { Checkbox, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"
import type { INotification as INotificationProps } from "@/models/notification.model"

const NOTIFICATION_TYPE_ICON: Record<NotificationType, LucideIcon> = {
  SHIPMENT: Package,
  QUOTE: FileText,
  ISSUE: AlertTriangle,
  INVOICE: FileText,
  SETTINGS: Settings,
  CHAT: MessageCircle,
  AUTH: Bell,
  EARNING: DollarSign,
  DRIVER: Truck,
  OTHER: Bell,
}

export default function NotificationItem(notification: INotificationProps) {
  const { id, type, title, description, read, createdAt } = notification
  const { acknowledgeNotification } = useNotifications()
  const Icon = NOTIFICATION_TYPE_ICON[type as NotificationType] ?? Bell

  return (
    <button
      type="button"
      onClick={() => !read && acknowledgeNotification(id)}
      className="w-full rounded-md bg-background min-h-[56px] p-3 shadow-sm flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer text-left">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${type === "ISSUE" ? "bg-destructive/10" : "bg-muted"}`}>
        <Icon
          className={`size-4 ${type === "ISSUE" ? "text-destructive" : "text-muted-foreground"}`}
        />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className={`text-sm ${!read ? "font-semibold" : "font-medium"} text-foreground`}>
          {title}
        </p>
        {description ? (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        ) : null}
        {createdAt ? (
          <p className="text-xs text-muted-foreground/80">
            {formatRelativeTime(createdAt)}
          </p>
        ) : null}
      </div>
      <div
        className="flex shrink-0 items-start gap-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}>
        {!read && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="mt-1.5 block size-2 rounded-full bg-muted-foreground/60" />
            </TooltipTrigger>
            <TooltipContent className="w-fit px-2">
              <p className="text-xs">Unread</p>
            </TooltipContent>
          </Tooltip>
        )}
        {!read && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Checkbox
                onClick={() => acknowledgeNotification(id)}
                checked={read}
                className="border-primary-300 size-3.5 mt-1"
              />
            </TooltipTrigger>
            <TooltipContent className="w-fit px-2">
              <p className="text-xs">Mark as read</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </button>
  )
}
