import { Component, type ErrorInfo, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div
          className={cn(
            "min-h-screen flex items-center justify-center p-6",
            this.props.className
          )}
        >
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">
              We&apos;re working on fixing this issue.{" "}
              {this.state.error?.message ? (
                <span className="block mt-2 text-xs font-mono">{this.state.error.message}</span>
              ) : null}
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
