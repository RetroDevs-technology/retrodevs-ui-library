import BaseTooltip from "../src/components/modules/base-tooltip"
import { Button } from "../src/components/core/button"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function TooltipShowcase() {
  const [content] = useFixtureInput("tooltipContent", "This is a helpful tooltip")
  const [triggerLabel] = useFixtureInput("tooltipTriggerLabel", "Hover me")
  const [side] = useFixtureSelect("tooltipSide", {
    options: ["top", "right", "bottom", "left"],
    defaultValue: "top",
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">Tooltip content, trigger label, and side.</p>
        <BaseTooltip content={content} side={side as "top" | "right" | "bottom" | "left"}>
          <Button type="button">{triggerLabel}</Button>
        </BaseTooltip>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Positions</h2>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip content="Top tooltip" side="top">
            <Button variant="outline">Top</Button>
          </BaseTooltip>
          <BaseTooltip content="Right tooltip" side="right">
            <Button variant="outline">Right</Button>
          </BaseTooltip>
          <BaseTooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline">Bottom</Button>
          </BaseTooltip>
          <BaseTooltip content="Left tooltip" side="left">
            <Button variant="outline">Left</Button>
          </BaseTooltip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Alignments</h2>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip content="Start aligned" side="top" align="start">
            <Button variant="secondary">Start</Button>
          </BaseTooltip>
          <BaseTooltip content="Center aligned" side="top" align="center">
            <Button variant="secondary">Center</Button>
          </BaseTooltip>
          <BaseTooltip content="End aligned" side="top" align="end">
            <Button variant="secondary">End</Button>
          </BaseTooltip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Delay</h2>
        <BaseTooltip content="This tooltip has a longer delay" delayDuration={1000}>
          <Button variant="ghost">Hover (1s delay)</Button>
        </BaseTooltip>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Rich Content</h2>
        <BaseTooltip
          content={
            <div className="space-y-1">
              <p className="font-semibold">Rich Tooltip</p>
              <p className="text-xs">This tooltip contains multiple lines of content.</p>
            </div>
          }
        >
          <Button>Rich Content</Button>
        </BaseTooltip>
      </section>
    </FixtureWrapper>
  )
}
