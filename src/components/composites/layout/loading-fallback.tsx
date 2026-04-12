import { cn } from "@/lib/utils"

export interface LoadingFallbackProps {
  className?: string
  message?: string
}

export function LoadingFallback({ className, message = "Loading..." }: LoadingFallbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 min-h-[200px]",
        className
      )}
    >
      <div className="relative size-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  )
}

export interface LoadingSpinnerProps {
  className?: string
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("relative size-full", className)}>
      <div className="absolute inset-0 rounded-full border-4 border-secondary/20" />
      <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
    </div>
  )
}
