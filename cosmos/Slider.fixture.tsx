import React, { useState } from 'react'
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from '../src/components/core/slider'
import { Label } from '../src/components/core/label'
import { FixtureWrapper } from './FixtureWrapper'

export default function SliderShowcase() {
  const [singleValue, setSingleValue] = useState(50)
  const [rangeValue, setRangeValue] = useState<number[]>([25, 75])

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Value Slider</h2>
        <div className="space-y-2">
          <Label>Volume: {singleValue}</Label>
          <Slider
            value={singleValue}
            onValueChange={(value) => {
              if (typeof value === 'number') {
                setSingleValue(value)
              }
            }}
            min={0}
            max={100}
            step={1}
          >
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Volume" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Range Slider</h2>
        <div className="space-y-2">
          <Label>Price Range: ${rangeValue[0]} - ${rangeValue[1]}</Label>
          <Slider
            value={rangeValue}
            onValueChange={(value) => {
              if (Array.isArray(value)) {
                setRangeValue(value)
              }
            }}
            min={0}
            max={1000}
            step={10}
          >
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb index={0} aria-label="Minimum price" />
                <SliderThumb index={1} aria-label="Maximum price" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Value Display</h2>
        <div className="space-y-2">
          <Slider
            defaultValue={75}
            min={0}
            max={100}
            step={5}
          >
            <SliderValue />
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Progress" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled Slider</h2>
        <div className="space-y-2">
          <Label>Disabled</Label>
          <Slider
            defaultValue={50}
            disabled
            min={0}
            max={100}
          >
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Disabled" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Vertical Slider</h2>
        <div className="flex items-center gap-8">
          <div className="space-y-2">
            <Label>Vertical</Label>
            <Slider
              defaultValue={50}
              orientation="vertical"
              min={0}
              max={100}
              className="h-[200px]"
            >
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb aria-label="Vertical" />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        </div>
      </section>
    </FixtureWrapper>
  )
}
