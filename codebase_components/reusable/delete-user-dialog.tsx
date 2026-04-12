import { Button } from "@/components/ui"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface DeleteUserDialogProps {
  /** Callback function to execute when user confirms deletion */
  onDelete: () => void
  /** Whether the delete operation is in progress */
  isDeleting?: boolean
  /** Custom button className */
  buttonClassName?: string
  /** Custom button variant */
  buttonVariant?: "destructive" | "outline" | "default" | "ghost" | "link" | "black"
  /** Custom button text */
  buttonText?: string
  /** Whether to show the trigger button */
  showTrigger?: boolean
  /** Custom trigger element (if showTrigger is false) */
  trigger?: React.ReactNode
}

/**
 * A reusable dialog component for confirming user account deletion.
 * Provides a consistent confirmation flow across admin, customer, and driver settings pages.
 *
 * @example
 * ```tsx
 * <DeleteUserDialog
 *   onDelete={() => deleteUser()}
 *   isDeleting={isDeletingUser}
 * />
 * ```
 */
export function DeleteUserDialog({
  onDelete,
  isDeleting = false,
  buttonClassName = "!border-[#D2000A33] py-3 px-6 w-full sm:w-fit !h-10 rounded-xl order-2 sm:order-1",
  buttonVariant = "destructive",
  buttonText = "Delete account",
  showTrigger = true,
  trigger,
}: DeleteUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleDelete() {
    onDelete()
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant={buttonVariant}
            disabled={isDeleting}
            className={buttonClassName}>
            {isDeleting ? "Deleting..." : buttonText}
          </Button>
        </AlertDialogTrigger>
      )}
      {!showTrigger && trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account? This action cannot be undone and will
            permanently delete all your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

