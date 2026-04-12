import { cn } from "@/lib/utils"

export function CardWrapper({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.()
        }
      }}
      className={cn(
        "flex flex-col p-4 border border-border shadow-none rounded-xl gap-6 w-[361px] transition-all duration-300",
        className,
        onClick && "cursor-pointer",
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  )
}
