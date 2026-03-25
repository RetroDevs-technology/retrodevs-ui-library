import { Toaster as Sonner, ToasterProps } from "sonner"
import { useToasterTheme } from "./utils/themeIntegration"

/**
 * Toaster component for displaying toast notifications.
 * Integrates with next-themes for theme-aware styling.
 *
 * @param props - Toaster props (extends ToasterProps from sonner)
 * @param props.position - Toast position (default: "bottom-right")
 * @param props.richColors - Enable rich color variants
 * @returns Toaster element
 *
 * @example
 * ```tsx
 * <Toaster position="top-right" />
 * ```
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme, style } = useToasterTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={style}
      {...props}
    />
  )
}

export { Toaster }
