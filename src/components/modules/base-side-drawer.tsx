/**
 * A reusable side drawer component built on top of shadcn/ui Sheet.
 * Provides a flexible way to display content in a sliding panel with various customization options.
 * Supports different sizes, positions, navigation, and footer content.
 *
 * @example
 * ```tsx
 * <BaseSideDrawer
 *   trigger={<Button>Open Side Drawer</Button>}
 *   title="Side Drawer Title"
 *   description="Side drawer description"
 *   side="right"
 *   size="md"
 *   hasNav
 *   hasFooter
 *   footerContent={<Button>Close</Button>}
 * >
 *   <div>Side drawer content goes here</div>
 * </BaseSideDrawer>
 * ```
 */
import * as React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/core/sheet'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useState } from 'react'

import clsx from 'clsx'

/** Available side drawer size options */
const SIDE_DRAWER_SIZES = {
  /** Default size (fit content) */
  default: 'max-w-fit',
  /** Small size (384px max width) */
  sm: 'sm:max-w-sm',
  /** Medium size (448px max width) */
  md: 'sm:max-w-md',
  /** Large size (512px max width) */
  lg: 'sm:max-w-lg',
  /** Extra large size (576px max width) */
  xl: 'sm:max-w-xl',
  /** Full size (100% width and height) */
  full: 'max-w-full h-full sm:overflow-y-auto',
} as const

/** Side drawer variant styles using class-variance-authority */
const sideDrawerVariants = cva('gap-4 border-none', {
  variants: {
    size: SIDE_DRAWER_SIZES,
  },
  defaultVariants: {
    size: 'md',
  },
})

type SideDrawerVariantProps = VariantProps<typeof sideDrawerVariants>

interface CustomSideDrawerProps extends SideDrawerVariantProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when side drawer state changes */
  setOpen?: (open: boolean) => void
  /** Position of the side drawer relative to the viewport */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Trigger element that opens the side drawer */
  trigger?: ReactNode
  /** Additional CSS classes for the trigger */
  triggerClassName?: string
  /** Side drawer title */
  title: string
  /** Side drawer description */
  description?: string
  /** Side drawer content */
  children: ReactNode
  /** Additional CSS classes for the content */
  contentClassName?: string
  /** Whether to show the navigation bar */
  hasNav?: boolean
  /** Navigation bar content */
  navChildren?: ReactNode
  /** Whether to show the footer */
  hasFooter?: boolean
  /** Footer content */
  footerContent?: ReactNode
  /** Function to call when closing the side drawer */
  closeFunction?: () => void
}

/**
 * Base side drawer component that provides a consistent way to display content in a sliding panel.
 * Supports various customization options including size, position, navigation, and footer.
 */
export default function BaseSideDrawer({
  open = false,
  hasFooter = false,
  footerContent,
  setOpen,
  side = 'right',
  size = 'md',
  title,
  description,
  trigger,
  triggerClassName = '',
  contentClassName = '',
  children,
  hasNav = false,
  navChildren,
}: CustomSideDrawerProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open)
    setOpen?.(open)
  }

  return (
    <Sheet open={open ? open : internalOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <SheetTrigger 
          render={React.isValidElement(trigger) ? trigger : <button>{trigger}</button>}
          className={triggerClassName}
        />
      )}
      <SheetContent
        side={side}
        className={cn(
          contentClassName,
          sideDrawerVariants({ size }),
          `${hasNav ? '[&>button]:hidden scrollbar-none' : ''}`,
        )}>
        {hasNav && <SideDrawerNav>{navChildren}</SideDrawerNav>}

        <SheetHeader className='w-full flex flex-col items-center justify-center sr-only'>
          <SheetTitle className='text-2xl'>{title}</SheetTitle>
          <SheetDescription className='text-lg'>{description}</SheetDescription>
        </SheetHeader>

        {children}

        {hasFooter && <SheetFooter className='mt-auto pt-4'>{footerContent || null}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

/**
 * Navigation component for the side drawer that provides a consistent header with close button.
 * Supports custom content and close functionality.
 */
function SideDrawerNav({
  children,
  closeFunction,
}: {
  /** Navigation content */
  children: ReactNode
  /** Function to call when closing the side drawer */
  closeFunction?: CustomSideDrawerProps['closeFunction']
}) {
  return (
    <nav
      className={clsx(
        'max-w-[var(--max-width)] w-full flex items-center px-[1rem] md:px-[2rem] fixed top-0  backdrop-blur-sm',
        {
          'justify-end py-3 bg-transparent': !children,
          'bg-white/10 justify-between': children,
        },
      )}>
      {children}
      <SheetClose onClick={closeFunction} className='p-2 hover:bg-white/10 rounded-lg size-6'>
        <X />
      </SheetClose>
    </nav>
  )
}
