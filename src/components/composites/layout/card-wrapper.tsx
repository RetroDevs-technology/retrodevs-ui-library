import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardWrapperProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function CardWrapper({ children, className, onClick }: CardWrapperProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        "flex flex-col p-4 border border-border shadow-none rounded-xl gap-6 w-full max-w-[361px] transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
