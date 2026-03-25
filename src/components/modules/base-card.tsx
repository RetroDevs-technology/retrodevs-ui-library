/**
 * A reusable card component built on top of shadcn/ui Card.
 * Provides a simplified API for creating cards with title, description, content, and footer.
 * Automatically composes CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
 *
 * @example
 * ```tsx
 * <BaseCard
 *   title="Card Title"
 *   description="Card description"
 *   content={<p>Card content goes here</p>}
 *   footer={<Button>Action</Button>}
 * />
 * ```
 */
import type { ReactNode } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../core/card'

interface BaseCardProps {
  /** Card title */
  title?: string
  /** Card description */
  description?: string
  /** Main card content (alternative to children prop) */
  content?: ReactNode
  /** Footer content (buttons, actions) */
  footer?: ReactNode
  /** Action button/control in header (uses CardAction) */
  action?: ReactNode
  /** Additional CSS classes for the Card */
  className?: string
  /** Card content (alternative to content prop) */
  children?: ReactNode
}

/**
 * Base card component that provides a simplified way to create cards.
 * Automatically composes CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
 *
 * @param props - BaseCard component props
 * @param props.title - Card title
 * @param props.description - Card description
 * @param props.content - Main card content (or use children)
 * @param props.footer - Footer content
 * @param props.action - Action button in header
 * @param props.className - Additional CSS classes
 * @param props.children - Alternative to content prop
 * @returns Card component with simplified API
 */
export function BaseCard({
  title,
  description,
  content,
  footer,
  action,
  className,
  children,
}: BaseCardProps) {
  const hasHeader = title || description || action
  const cardContent = content || children

  return (
    <Card className={className}>
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {cardContent && <CardContent>{cardContent}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
