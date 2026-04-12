import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../src/components/composites/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

const baseData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
  { name: "Jun", value: 239 },
]

export default function ChartShowcase() {
  const [seriesLabel] = useFixtureInput("chartSeriesLabel", "Value")
  const [scalePercent] = useFixtureInput("chartValueScalePercent", 100)
  const [tooltipSuffix] = useFixtureInput("chartTooltipValueSuffix", "")
  const scale =
    typeof scalePercent === "number" && !Number.isNaN(scalePercent)
      ? Math.max(10, Math.min(200, scalePercent)) / 100
      : 1
  const data = baseData.map((row) => ({
    ...row,
    value: Math.round(row.value * scale),
  }))

  const chartConfig = {
    value: {
      label: seriesLabel,
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Series label, scale bars (10–200%), and optional tooltip suffix on the second chart.
        </p>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Chart with Custom Tooltip</h2>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}${tooltipSuffix}`, seriesLabel]}
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </section>
    </FixtureWrapper>
  )
}
