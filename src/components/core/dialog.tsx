import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dialog root component.
 * Controls the open/closed state of the dialog.
 *
 * @param props - Dialog props (extends React.ComponentProps<typeof Dialog.Root>)
 * @param props.open - Controlled open state
 * @param props.defaultOpen - Uncontrolled default open state
 * @param props.onOpenChange - Callback when open state changes
 * @returns Dialog root element
 */
function DialogRoot({
  ...props
}: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="dialog" {...props} />
}
DialogRoot.displayName = "Dialog"

/**
 * Dialog trigger component.
 * Element that opens the dialog when clicked.
 *
 * @param props - DialogTrigger props (extends React.ComponentProps<typeof Dialog.Trigger>)
 * @returns Dialog trigger element
 */
const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Dialog.Trigger>
>((props, ref) => {
  return <Dialog.Trigger ref={ref} data-slot="dialog-trigger" {...props} />
})
DialogTrigger.displayName = "DialogTrigger"

function DialogPortal({
  ...props
}: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close data-slot="dialog-close" {...props} />
}

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Backdrop
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "data-[open]:animate-in data-[closed]:animate-out data-[closed]:duration-200 data-[open]:duration-200 data-[closed]:fade-out-0 data-[open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
})
DialogOverlay.displayName = "DialogOverlay"

/**
 * Dialog content component.
 * The main content container of the dialog with overlay and close button.
 *
 * @param props - DialogContent props (extends React.ComponentProps<typeof Dialog.Popup>)
 * @param props.className - Additional CSS classes
 * @param props.children - Dialog content
 * @returns Dialog content element
 */
const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Popup
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg transition-all data-[open]:animate-in data-[closed]:animate-out data-[closed]:duration-200 data-[open]:duration-200 data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[open]:bg-accent data-[open]:text-muted-foreground">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Popup>
    </DialogPortal>
  )
})
DialogContent.displayName = "DialogContent"

/**
 * Dialog header component.
 * Container for dialog title and description.
 *
 * @param props - DialogHeader props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Dialog header element
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Dialog footer component.
 * Container for dialog action buttons.
 *
 * @param props - DialogFooter props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Dialog footer element
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Dialog title component.
 * Displays the dialog title with proper accessibility.
 *
 * @param props - DialogTitle props (extends React.ComponentProps<typeof Dialog.Title>)
 * @param props.className - Additional CSS classes
 * @returns Dialog title element
 */
const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
})
DialogTitle.displayName = "DialogTitle"

/**
 * Dialog description component.
 * Displays descriptive text below the title.
 *
 * @param props - DialogDescription props (extends React.ComponentProps<typeof Dialog.Description>)
 * @param props.className - Additional CSS classes
 * @returns Dialog description element
 */
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
})
DialogDescription.displayName = "DialogDescription"

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
