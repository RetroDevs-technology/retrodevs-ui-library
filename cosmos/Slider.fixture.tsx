import { useState } from "react"

import { Label } from "../src/components/core/label"
import { Slider } from "../src/components/core/slider"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SliderShowcase() {
  const [rangeValue, setRangeValue] = useState<number[]>([25, 75])
  const [volumeLabel] = useFixtureInput("sliderVolumeLabel", "Volume")
  const [maxVolume] = useFixtureInput("sliderVolumeMax", 100)
  const [singleValue, setSingleValue] = useFixtureInput("sliderVolumeValue", 50)
  const max =
    typeof maxVolume === "number" && !Number.isNaN(maxVolume)
      ? Math.min(200, Math.max(10, maxVolume))
      : 100
  const vol =
    typeof singleValue === "number" && !Number.isNaN(singleValue)
      ? Math.min(max, Math.max(0, singleValue))
      : 50

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Label, max, and current value (fixture panel); drag the thumb to update the value input.
        </p>
        <div className="space-y-2">
          <Label>
            {volumeLabel}: {vol}
          </Label>
          <Slider
            value={[vol]}
            onValueChange={(v) => {
              const next = v[0]
              if (typeof next === "number") setSingleValue(next)
            }}
            min={0}
            max={max}
            step={1}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Range Slider</h2>
        <div className="space-y-2">
          <Label>Price Range: ${rangeValue[0]} - ${rangeValue[1]}</Label>
          <Slider
            value={rangeValue}
            onValueChange={(v) => {
              if (v.length >= 2) setRangeValue(v)
            }}
            min={0}
            max={1000}
            step={10}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default value</h2>
        <div className="space-y-2">
          <Slider defaultValue={[75]} min={0} max={100} step={5} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled Slider</h2>
        <div className="space-y-2">
          <Label>Disabled</Label>
          <Slider defaultValue={[50]} disabled min={0} max={100} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Vertical Slider</h2>
        <div className="flex items-center gap-8">
          <div className="space-y-2">
            <Label>Vertical</Label>
            <Slider
              defaultValue={[50]}
              orientation="vertical"
              min={0}
              max={100}
              className="h-[200px]"
            />
          </div>
        </div>
      </section>
    </FixtureWrapper>
  )
}
