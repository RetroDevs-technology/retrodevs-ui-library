import { useEffect, useState } from "react"

import { Progress } from "../src/components/core/progress"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function ProgressShowcase() {
  const [animated, setAnimated] = useState(20)
  const [liveLabel] = useFixtureInput("progressLiveLabel", "Loading")
  const [liveValue] = useFixtureInput("progressLivePercent", 45)
  const [runAnimation] = useFixtureInput("progressAnimateFirstBar", true)

  const staticValue =
    typeof liveValue === "number" && !Number.isNaN(liveValue)
      ? Math.min(100, Math.max(0, liveValue))
      : 45

  useEffect(() => {
    if (!runAnimation) return
    const interval = setInterval(() => {
      setAnimated((current) => {
        if (current >= 100) return 0
        return Math.min(100, current + 10)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [runAnimation])

  const livePercent = runAnimation ? animated : staticValue

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Label, static percent (0–100), and toggle auto-advance for the first bar.
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">{liveLabel}</p>
          <Progress value={livePercent} />
          <p className="text-xs text-muted-foreground">{livePercent}%</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Progress States</h2>
        <div className="space-y-4">
          {[0, 25, 50, 75, 100].map((pct) => (
            <div key={pct} className="space-y-2">
              <p className="text-sm font-medium">{pct}% Complete</p>
              <Progress value={pct} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Indeterminate (visual placeholder)</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Radix <code className="text-xs">Progress</code> is driven by a numeric{" "}
          <code className="text-xs">value</code>. For a loading strip without a percent, use a separate
          skeleton or animation.
        </p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Processing…</p>
          <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
            <div className="bg-[#04AA01] absolute inset-y-0 left-0 w-1/3 animate-pulse rounded-full" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom track height</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Small</p>
            <Progress value={60} className="h-1" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Default</p>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Large</p>
            <Progress value={60} className="[&_[data-slot=progress-indicator]]:h-4" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Without label</h2>
        <div className="space-y-2">
          <Progress value={65} />
        </div>
      </section>
    </FixtureWrapper>
  )
}
