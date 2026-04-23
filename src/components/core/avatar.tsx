import type * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

interface AvatarContextValue {
  isImageLoaded: boolean
  setIsImageLoaded: (nextState: boolean) => void
}

const AvatarContext = createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
  const avatarContext = useContext(AvatarContext)
  if (!avatarContext) throw new Error("Avatar components must be rendered inside Avatar.")
  return avatarContext
}

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const contextValue = useMemo(() => ({ isImageLoaded, setIsImageLoaded }), [isImageLoaded])

  return (
    <AvatarContext.Provider value={contextValue}>
      <div
        data-slot="avatar"
        className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

function AvatarImage({
  className,
  src,
  onLoad,
  onError,
  ...props
}: React.ComponentProps<"img">) {
  const { isImageLoaded, setIsImageLoaded } = useAvatarContext()

  useEffect(() => {
    setIsImageLoaded(false)
  }, [src, setIsImageLoaded])

  return (
    <img
      data-slot="avatar-image"
      src={src}
      className={cn("aspect-square size-full", !isImageLoaded && "hidden", className)}
      onLoad={(event) => {
        setIsImageLoaded(true)
        onLoad?.(event)
      }}
      onError={(event) => {
        setIsImageLoaded(false)
        onError?.(event)
      }}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isImageLoaded } = useAvatarContext()
  if (isImageLoaded) return null

  return (
    <div
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
