/**
 * A reusable dialog component built on top of shadcn/ui Dialog.
 * Provides a consistent way to display confirmation dialogs with customizable content and actions.
 * Supports closing by clicking outside and an optional X button at the top right.
 *
 * @example
 * ```tsx
 * <BaseDialog
 *   trigger={<Button>Delete Item</Button>}
 *   title="Delete Confirmation"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   onConfirm={() => handleDelete()}
 *   closeOnOutsideClick={true}
 *   showCloseButton={true}
 * />
 * ```
 */

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "../ui"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

/**
 * Props interface for the BaseDialog component
 * @interface CustomDialogProps
 */
interface CustomDialogProps {
  /** Controls the dialog's open state from outside the component */
  externalOpen?: boolean
  /** Callback function to update the external open state */
  setExternalOpen?: (externalOpen: boolean) => void
  /** Additional CSS classes for the dialog content container */
  contentClassName?: string
  /** Type of dialog which determines its styling and behavior */
  type?: "notification" | "others" | "email"
  /** Optional children elements to be rendered inside the dialog */
  children?: React.ReactNode
  /** The trigger element that opens the dialog (usually a button) */
  trigger?: React.ReactNode
  /** The title displayed in the dialog header */
  title: string
  /** The description text displayed in the dialog body */
  description: string
  /** Text for the confirm button (default: 'Confirm') */
  confirmText: string
  /** Text for the cancel button (default: 'Cancel') */
  cancelText?: string
  /** Callback function executed when the confirm button is clicked */
  onConfirm: () => void
  isLoading?: boolean
  emailVerification?: boolean
  cancelClassName?: string
  cancelBtnFirst?: boolean
  footerClassName?: string
  image?: string
  ghostButtons?: boolean
  confirmBtnClassName?: string
  /** Whether the dialog can be closed by clicking outside (default: true) */
  closeOnOutsideClick?: boolean
  /** Whether to show the X button at the top right (default: true) */
  showCloseButton?: boolean
}

export default function BaseDialog({
  trigger,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  type = "others",
  contentClassName,
  children,
  externalOpen,
  setExternalOpen,
  emailVerification,
  cancelClassName,
  cancelBtnFirst = true,
  footerClassName,
  image = "/assets/notif/notification.png",
  ghostButtons = false,
  closeOnOutsideClick = true,
  showCloseButton = true,
  confirmBtnClassName,
  isLoading,
}: CustomDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    // setIsOpen(false)
    // setExternalOpen?.(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setExternalOpen?.(open)
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsOpen(true)
  }

  return (
    <Dialog open={externalOpen ?? isOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <DialogTrigger asChild onClick={handleTriggerClick}>
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent
        className={cn("flex flex-col shadow-none border-none", contentClassName)}
        onPointerDownOutside={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
        onInteractOutside={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}>
        {showCloseButton && (
          <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
        {type === "others" ? (
          <DefaultDialogHeader title={title} description={description} />
        ) : (
          <NotificationDialogHeader title={title} description={description} image={image} />
        )}

        {children}

        <DialogFooter
          className={cn(
            "flex",
            {
              "!items-center !justify-center": !cancelText,
            },
            footerClassName,
          )}>
          {cancelBtnFirst && cancelText && (
            <DialogClose className={cancelClassName}>{cancelText}</DialogClose>
          )}
          <Button
            disabled={isLoading}
            variant={ghostButtons ? "ghost" : "blue"}
            onClick={handleConfirm}
            className={cn({
              "h-10 w-[120px]": emailVerification,
              "text-[#D2000A] border border-[#00000005] shadow-[0px_2px_8px_0px_#D2000A1F]":
                ghostButtons,
            })}>
            {confirmText}
          </Button>

          {!cancelBtnFirst && cancelText && (
            <DialogClose className={cancelClassName}>{cancelText}</DialogClose>
          )}
        </DialogFooter>

        {type === "email" && <RequestEmail />}
      </DialogContent>
    </Dialog>
  )
}

function NotificationDialogHeader({ title, description, image }: IHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={image} alt="Notification" width={120} height={120} className="rounded-full" />

      <DialogHeader className="flex flex-col items-center gap-1">
        <DialogTitle className="font-medium leading-normal text-center">{title}</DialogTitle>
        <DialogDescription className="leading-normal text-sm text-dark-gray text-center">
          {description}
        </DialogDescription>
      </DialogHeader>
    </div>
  )
}

function DefaultDialogHeader({ title, description }: Omit<IHeaderProps, "image">) {
  return (
    <DialogHeader className="flex flex-col items-center gap-1 mt-2">
      <DialogTitle className="font-medium text-center">{title}</DialogTitle>
      <DialogDescription className="text-sm text-dark-gray text-center">
        {description}
      </DialogDescription>
    </DialogHeader>
  )
}

function RequestEmail() {
  return (
    <div className="flex gap-1">
      <p className="leading-normal text-sm text-accent-foreground text-center">
        Can't find the email? check your spam folder or
      </p>
      <Button className="p-0 w-fit h-fit underline underline-offset-4 bg-transparent hover:bg-transparent text-dark-gray">
        request a new link
      </Button>
    </div>
  )
}

interface IHeaderProps {
  title: string
  description: string
  image: string
}
