import type { ChartConfig } from "../types"

/**
 * Generates CSS styles for chart colors based on configuration.
 * Creates CSS custom properties for each configured color.
 * 
 * @param id - Unique chart ID
 * @param config - Chart configuration
 * @returns HTML style string or null
 */
export function generateChartStyles(
  id: string,
  config: ChartConfig
): string | null {
  const THEMES = { light: "", dark: ".dark" } as const
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  )

  if (!colorConfig.length) {
    return null
  }

  return Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join("\n")}
}
`
    )
    .join("\n")
}
