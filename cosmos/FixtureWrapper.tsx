import React from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { Switch } from '../src/components/core/switch'
import { Moon, Sun } from 'lucide-react'

interface FixtureWrapperProps {
  title?: string
  children: React.ReactNode
}

/**
 * Dark mode toggle component.
 * Internal component that uses the theme hook.
 */
function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
      <Sun className="size-4" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light')
        }}
      />
      <Moon className="size-4" />
    </div>
  )
}

/**
 * Reusable wrapper component for Cosmos fixtures.
 * Provides consistent background, padding, and layout for all component showcases.
 * Includes dark mode toggle functionality.
 *
 * For editable props in the Cosmos UI, use `useFixtureInput` / `useFixtureSelect` from
 * `cosmos/cosmos-playground.ts`.
 *
 * @param props - FixtureWrapper props
 * @param props.title - Optional title to display at the top
 * @param props.children - Fixture content to wrap
 * @returns Wrapped fixture content with theme provider
 */
export function FixtureWrapper({ title, children }: FixtureWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background p-8">
        <DarkModeToggle />
        {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
