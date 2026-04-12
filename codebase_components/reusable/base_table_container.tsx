import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface BaseTableContainerProps {
  /** Filter button, TableSearch, export actions, etc. */
  toolbar?: ReactNode
  /** Merged with default outer card classes */
  className?: string
  /** Merged with default toolbar row classes */
  toolbarClassName?: string
  children: ReactNode
}

const defaultOuterClassName = "w-full border rounded-[12px] flex flex-col gap-4"
const defaultToolbarClassName = "flex items-end justify-end gap-2 pt-3 px-2"

export function BaseTableContainer({
  toolbar,
  className,
  toolbarClassName,
  children,
}: BaseTableContainerProps) {
  return (
    <div className={cn(defaultOuterClassName, className)}>
      {toolbar != null ? (
        <div className={cn(defaultToolbarClassName, toolbarClassName)}>{toolbar}</div>
      ) : null}
      {children}
    </div>
  )
}
