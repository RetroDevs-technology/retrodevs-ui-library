import { motion } from "framer-motion"
import { type ReactNode, isValidElement } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
}: FadeInProps) {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    none: { opacity: 0 },
  }

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      animate={{ y: 0, x: 0, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}>
      {children}
    </motion.div>
  )
}

interface FadeInStaggerProps {
  children: ReactNode[]
  delay?: number
  duration?: number
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export function FadeInStagger({
  children,
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.1,
  direction = "up",
  className,
}: FadeInStaggerProps) {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    none: { opacity: 0 },
  }

  return (
    <motion.div className={className}>
      {children.map((child, index) => {
        const key = isValidElement(child) && child.key ? child.key : `fade-in-stagger-${index}`
        return (
          <motion.div
            key={key}
            initial={directionVariants[direction]}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{
              duration,
              delay: delay + index * staggerDelay,
              ease: "easeOut",
            }}>
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

interface FadeInOnScrollProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  threshold?: number
}

export function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  threshold = 0.1,
}: FadeInOnScrollProps) {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    none: { opacity: 0 },
  }

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}>
      {children}
    </motion.div>
  )
}
