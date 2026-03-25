import { useTheme } from "next-themes"
import type { ToasterProps } from "sonner"

/**
 * Hook to get theme-aware toaster props.
 * Integrates with next-themes for theme-aware styling.
 * 
 * @returns Theme value and style props for Toaster
 */
export function useToasterTheme() {
  const { theme = "system" } = useTheme()

  return {
    theme: theme as ToasterProps["theme"],
    style: {
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
    } as React.CSSProperties,
  }
}
