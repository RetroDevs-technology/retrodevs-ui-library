/**
 * A reusable confirmation dialog component built on top of shadcn/ui AlertDialog.
 * Provides a consistent way to display confirmation dialogs with customizable content and actions.
 *
 * @example
 * ```tsx
 * <BaseConfirmation
 *   trigger={<Button>Delete Item</Button>}
 *   title="Delete Confirmation"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   actionVariant="destructive"
 *   onConfirm={() => handleDelete()}
 * />
 * ```
 */


import * as React from 'react'
import { useState } from 'react'
import type { ButtonProps } from '../core/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../core/alert-dialog'

interface CustomConfirmationProps {
  /** The trigger element that opens the confirmation dialog (usually a button) */
  trigger: React.ReactNode
  /** The title displayed in the dialog header */
  title: string
  /** The description text displayed in the dialog body */
  description: string
  /** Text for the confirm button (default: 'Confirm') */
  confirmText?: string
  /** Text for the cancel button (default: 'Cancel') */
  cancelText?: string
  /** Variant of the confirm button (inherits from ButtonProps) */
  actionVariant?: ButtonProps['variant']
  /** Callback function executed when the confirm button is clicked */
  onConfirm: () => void
}

/**
 * Base confirmation dialog component that provides a consistent way to display confirmation dialogs.
 *
 * @param props - BaseConfirmation component props
 * @returns Confirmation dialog component
 */
function BaseConfirmation({
  trigger,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  actionVariant = 'secondary',
}: CustomConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsOpen(true)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger 
        render={React.isValidElement(trigger) ? trigger : <button>{trigger}</button>}
        onClick={handleTriggerClick}
      />
      <AlertDialogContent className='max-w-lg rounded-md border-border'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} variant={actionVariant}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BaseConfirmation
