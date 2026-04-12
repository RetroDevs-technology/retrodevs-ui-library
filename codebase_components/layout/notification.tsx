import type { INotification } from "@/models/notification.model"
import { format, isToday } from "date-fns"
import { Bell, Check, X } from "lucide-react"
import { useState } from "react"
import { useNotifications } from "@/providers/notification.provider"
import { LoadingSpinner } from "./loading-fallback"
import NotificationItem from "./notification-item"
import { Button, DropdownMenu } from "@/components/ui"
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function groupNotificationsByDate(notifications: INotification[]) {
  const groups: { label: string; items: INotification[] }[] = []
  const seen = new Set<string>()

  for (const n of notifications) {
    const date = new Date(n.createdAt)
    if (Number.isNaN(date.getTime())) continue
    const key = date.toDateString()
    if (seen.has(key)) continue
    seen.add(key)
    const label = isToday(date) ? "Today" : format(date, "d MMM yyyy")
    const items = notifications.filter((item) => {
      const d = new Date(item.createdAt)
      return d.toDateString() === key
    })
    groups.push({ label, items })
  }

  return groups
}

export default function Notifications() {
  const [open, setOpen] = useState(false)
  const {
    activeNotifications,
    notifications,
    isNotificationLoading,
    markAllAsRead,
    isMarkAllAsReadLoading,
  } = useNotifications()
  const grouped = groupNotificationsByDate(notifications)

  return (
    <div className="relative flex size-full items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full border border-border/60 p-1.5 text-[#B0B7C3] hover:border-border/80 hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-1"
            aria-label="Notifications">
            <Bell className="size-5 sm:size-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="flex max-h-[85dvh] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-lg p-0 sm:w-[360px]">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5 sm:px-4 sm:py-3">
            <h2 className="truncate text-sm font-semibold sm:text-base">
              Notifications
            </h2>
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-auto min-w-0 px-2 py-1.5 text-xs underline"
                onClick={() => markAllAsRead()}
                disabled={isMarkAllAsReadLoading || notifications.length === 0}>
                <Check className="mr-1 size-3.5 shrink-0" />
                Mark all as read
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label="Close"
                onClick={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
          </div>

          <div className="min-h-[120px] max-h-[min(320px,60vh)] flex-1 overflow-y-auto overscroll-contain py-3">
            <div className="px-3 sm:px-4">
              {isNotificationLoading ? (
                <div className="flex min-h-[180px] items-center justify-center">
                  <div className="size-10">
                    <LoadingSpinner />
                  </div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="flex flex-col gap-4 pb-4">
                  {grouped.map((group) => (
                    <div key={group.label} className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        {group.label}
                      </p>
                      <div className="flex flex-col gap-2">
                        {group.items.map((notif) => (
                          <NotificationItem key={notif.id} {...notif} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 py-6 text-center sm:py-8">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 sm:size-16">
                    <Bell className="size-7 text-primary sm:size-8" />
                  </div>
                  <div className="space-y-1 px-1">
                    <p className="text-sm font-semibold text-foreground">
                      No Notifications Yet
                    </p>
                    <p className="max-w-[260px] text-xs text-muted-foreground">
                      You&apos;ll be notified about deliveries, messages, and
                      other important updates here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {activeNotifications && (
        <span className="absolute -top-0.5 right-0 block size-2 rounded-full bg-orange-400 ring-2 ring-white sm:top-0" />
      )}
    </div>
  )
}
