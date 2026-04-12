import { Toaster as Sonner, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"

import { useToasterTheme } from "./utils/themeIntegration"

const defaultToastClassNames = {
  toast:
    "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
  description: "group-[.toast]:text-muted-foreground",
  actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
  cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
}

/**
 * Toaster component for displaying toast notifications.
 * Integrates with next-themes for theme-aware styling.
 */
const Toaster = ({ toastOptions, ...props }: ToasterProps) => {
  const { theme, style } = useToasterTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={style}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...defaultToastClassNames,
          ...toastOptions?.classNames,
          toast: cn(defaultToastClassNames.toast, toastOptions?.classNames?.toast),
          description: cn(
            defaultToastClassNames.description,
            toastOptions?.classNames?.description
          ),
          actionButton: cn(
            defaultToastClassNames.actionButton,
            toastOptions?.classNames?.actionButton
          ),
          cancelButton: cn(
            defaultToastClassNames.cancelButton,
            toastOptions?.classNames?.cancelButton
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
