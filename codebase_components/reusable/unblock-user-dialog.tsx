import { FormaticModal } from "@/components/modals/formatic-modal"
import { Button } from "@/components/ui"

interface UnblockUserDialogProps {
  open: boolean
  onClose: () => void
  userName: string
  isPending: boolean
  onConfirm: () => void
}

export function UnblockUserDialog({
  open,
  onClose,
  userName,
  isPending,
  onConfirm,
}: UnblockUserDialogProps) {
  return (
    <FormaticModal
      open={open}
      onClose={onClose}
      title="Unblock User Account?"
      description={`This will remove ${userName} from the blocked list. They will need to verify their email again before they can log in.`}
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
            className="flex-1 bg-primary text-white h-10"
            disabled={isPending}>
            {isPending ? "Unblocking..." : "Unblock User"}
          </Button>
        </div>
      }
    />
  )
}
