import * as React from "react"
import { Avatar } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

/**
 * Avatar container component.
 * Wraps AvatarImage and AvatarFallback to display user avatars.
 *
 * @param props - Avatar component props (extends React.ComponentProps<typeof AvatarPrimitive.Root>)
 * @param props.className - Additional CSS classes
 * @returns Avatar root element
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const AvatarRoot = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof Avatar.Root>
>(({ className, ...props }, ref) => {
  return (
    <Avatar.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
})
AvatarRoot.displayName = "Avatar"

/**
 * Avatar image component.
 * Displays the user's avatar image with automatic fallback handling.
 *
 * @param props - AvatarImage component props (extends React.ComponentProps<typeof Avatar.Image>)
 * @param props.className - Additional CSS classes
 * @param props.src - Image source URL
 * @param props.alt - Alternative text for the image
 * @returns Avatar image element
 */
const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof Avatar.Image>
>(({ className, ...props }, ref) => {
  return (
    <Avatar.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

/**
 * Avatar fallback component.
 * Displays when the avatar image fails to load or is not provided.
 *
 * @param props - AvatarFallback component props (extends React.ComponentProps<typeof Avatar.Fallback>)
 * @param props.className - Additional CSS classes
 * @returns Avatar fallback element
 */
const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof Avatar.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <Avatar.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback }
