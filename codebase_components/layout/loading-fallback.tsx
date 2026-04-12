export function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <div className="relative size-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="font-input-mono text-secondary/80 animate-pulse">Loading...</p>
    </div>
  )
}

export function LoadingSpinner({ color }: { color?: string }) {
  return (
    <div className="relative size-full ">
      <div
        className={`absolute inset-0 rounded-full border-4 border-${
          color ? `[${color}]` : "secondary/20"
        }  border-none `}
      />
      <div
        className={`absolute inset-0 rounded-full border-4 border-${
          color ? `[${color}]` : "secondary"
        } border-t-transparent animate-spin`}
      />
    </div>
  )
}
