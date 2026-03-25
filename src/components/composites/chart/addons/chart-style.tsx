import { generateChartStyles } from "../utils/themeHandling"
import type { ChartConfig } from "../types"

interface ChartStyleProps {
  /** Unique chart ID */
  id: string
  /** Chart configuration */
  config: ChartConfig
}

/**
 * Chart style component that generates CSS for chart colors.
 */
export function ChartStyle({ id, config }: ChartStyleProps) {
  const styles = generateChartStyles(id, config)

  if (!styles) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: styles,
      }}
    />
  )
}
