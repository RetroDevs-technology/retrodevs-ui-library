

import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonProps } from './button'

/**
 * AlertDialog action button props.
 * Extends AlertDialog Close props and includes button variant.
 */
interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>,
    Pick<ButtonProps, 'variant'> {}

/**
 * AlertDialog root component.
 * Controls the open/closed state of the alert dialog.
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * AlertDialog trigger component.
 * Element that opens the alert dialog when clicked.
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * AlertDialog portal component.
 * Portals the dialog content to the document body.
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/**
 * AlertDialog overlay component.
 * Backdrop that appears behind the dialog content.
 *
 * @param props - AlertDialogOverlay props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog overlay element
 */
const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = 'AlertDialogOverlay'

/**
 * AlertDialog content component.
 * Main content container of the alert dialog.
 *
 * @param props - AlertDialogContent props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog content element
 */
const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = 'AlertDialogContent'

/**
 * AlertDialog header component.
 * Container for alert dialog title and description.
 *
 * @param props - AlertDialogHeader props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog header element
 */
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

/**
 * AlertDialog footer component.
 * Container for alert dialog action buttons.
 *
 * @param props - AlertDialogFooter props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog footer element
 */
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

/**
 * AlertDialog title component.
 * Displays the alert dialog title with proper accessibility.
 *
 * @param props - AlertDialogTitle props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog title element
 */
const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

/**
 * AlertDialog description component.
 * Displays descriptive text below the alert dialog title.
 *
 * @param props - AlertDialogDescription props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog description element
 */
const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-light', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

/**
 * AlertDialog action button component.
 * Primary action button in the alert dialog footer.
 *
 * @param props - AlertDialogAction props
 * @param props.className - Additional CSS classes
 * @param props.variant - Button variant style
 * @returns AlertDialog action button element
 */
const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <AlertDialogPrimitive.Close
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  ),
)
AlertDialogAction.displayName = 'AlertDialogAction'

/**
 * AlertDialog cancel button component.
 * Cancel/close button in the alert dialog footer.
 *
 * @param props - AlertDialogCancel props
 * @param props.className - Additional CSS classes
 * @returns AlertDialog cancel button element
 */
const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Close
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
    {...props}
  />
))
AlertDialogCancel.displayName = 'AlertDialogCancel'

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
