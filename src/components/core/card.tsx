import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card container component.
 * Provides a styled container for card content with consistent spacing and styling.
 *
 * @param props - Card component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card container element
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 * ```
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card header component.
 * Container for card title, description, and action elements.
 *
 * @param props - CardHeader component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card header element
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card title component.
 * Displays the main title of the card.
 *
 * @param props - CardTitle component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card title element
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Card description component.
 * Displays secondary descriptive text below the title.
 *
 * @param props - CardDescription component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card description element
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Card action component.
 * Container for action buttons or controls, typically positioned in the header.
 *
 * @param props - CardAction component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card action element
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card content component.
 * Main content area of the card with proper padding.
 *
 * @param props - CardContent component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card content element
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Card footer component.
 * Container for footer content, typically action buttons.
 *
 * @param props - CardFooter component props (extends React.ComponentProps<"div">)
 * @param props.className - Additional CSS classes
 * @returns Card footer element
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
