/**
 * A reusable modal component built on top of shadcn/ui Dialog.
 * Provides a flexible way to display content in a modal dialog with various customization options.
 * Supports different sizes, footer content, and overlay behaviors.
 *
 * @example
 * ```tsx
 * <BaseModal
 *   trigger={<Button>Open Modal</Button>}
 *   title="Modal Title"
 *   description="Modal description"
 *   size="large"
 *   hasFooter
 *   footerContent={<Button>Close</Button>}
 * >
 *   <div>Modal content goes here</div>
 * </BaseModal>
 * ```
 */
import * as React from "react"
import type { ReactNode } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../core/dialog"
import { cn } from "@/lib/utils"

/** Available modal size options */
const sizeClasses = {
  /** Small modal (415px max width) */
  small: "sm:max-w-[415px]",
  /** Large modal (864px max width) */
  large: "sm:max-w-[864px]",
  /** Extra large modal (1124px max width) */
  xl: "sm:max-w-[1124px]",
  /** Full height modal with vertical scrolling */
  full: " h-full sm:overflow-y-auto w-full max-w-full",
}

interface CustomModalProps {
  /** Trigger element that opens the modal (usually a button) */
  trigger?: ReactNode
  /** Modal title (visually hidden by default) */
  title?: string
  /** Modal description (visually hidden by default) */
  description?: string
  /** Modal content */
  children: ReactNode
  /** Additional CSS classes for the modal */
  className?: string
  /** Controlled open state */
  open?: boolean
  /** Callback when modal closes */
  onClose?: (open: boolean) => void
  /** Modal size variant */
  size?: keyof typeof sizeClasses

  /** Whether to show the footer section */
  hasFooter?: boolean
  /** Footer content (usually buttons) */
  footerContent?: ReactNode
  /** Whether to disable closing on overlay click */
  disableOverlayClick?: boolean
}

/**
 * Base modal component that provides a consistent way to display content in a modal dialog.
 * Supports various customization options including size, footer, and overlay behaviors.
 */
function BaseModal({
  trigger,
  title,
  description,
  children,
  open,
  onClose,
  size = "small",
  hasFooter = false,
  footerContent,
  className,
  disableOverlayClick = false,
}: CustomModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onClose?.(nextOpen)
      }}>
      {trigger ? (
        <DialogTrigger asChild>
          {React.isValidElement(trigger) ? trigger : <button type="button">{trigger}</button>}
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn(
          ` ${sizeClasses[size]} p-0 rounded-[8px]  block w-[90%] sm:w-full`,
          className,
        )}
        onPointerDownOutside={disableOverlayClick ? (e) => e.preventDefault() : undefined}
        onInteractOutside={disableOverlayClick ? (e) => e.preventDefault() : undefined}
        onClick={(e) => e.stopPropagation()}>
        <div className="sr-only">
          <DialogHeader
            className={cn("w-full flex flex-col items-center justify-center font-input-mono")}>
            <DialogTitle>{title || "Modal Dialog"}</DialogTitle>
            <DialogDescription>{description || "Modal content"}</DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col">{children}</div>

        {hasFooter && <div className="mt-auto pt-4 ml-auto">{footerContent}</div>}
      </DialogContent>
    </Dialog>
  )
}

export default BaseModal
