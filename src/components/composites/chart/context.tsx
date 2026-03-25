import * as React from "react"
import type { ChartContextProps } from "./types"

const ChartContext = React.createContext<ChartContextProps | null>(null)

/**
 * Hook to access chart context.
 * Must be used within a ChartContainer.
 */
export function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

export { ChartContext }
