import { FormaticModal } from "@/components/modals/formatic-modal"
import { Button } from "@/components/ui"

interface BlockUserDialogProps {
  open: boolean
  onClose: () => void
  userName: string
  isPending: boolean
  onConfirm: () => void
}

export function BlockUserDialog({
  open,
  onClose,
  userName,
  isPending,
  onConfirm,
}: BlockUserDialogProps) {
  return (
    <FormaticModal
      open={open}
      onClose={onClose}
      title="Block User Account?"
      description={`WARNING: This is a severe action that will:
• Immediately revoke all access to the platform
• Prevent login and API access
• Block the email from registering again
• Require email re-verification if unblocked later

Only block users for serious violations (fraud, abuse, etc.)

Are you sure you want to block ${userName}?`}
      illustrationSrc="/assets/notif/notification.png"
      extraContent={
        <div className="flex mx-auto items-center justify-center gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-10"
            disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
            disabled={isPending}>
            {isPending ? "Blocking..." : "Yes, Block User"}
          </Button>
        </div>
      }
    />
  )
}
