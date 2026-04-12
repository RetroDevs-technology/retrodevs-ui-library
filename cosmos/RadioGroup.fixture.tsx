import React from "react"

import { Label } from "../src/components/core/label"
import { RadioGroup, RadioGroupItem } from "../src/components/core/radio-group"
import { FixtureWrapper } from "./FixtureWrapper"

export default function RadioGroupShowcase() {
  return (
    <FixtureWrapper title="Radio group">
      <RadioGroup defaultValue="comfortable" className="max-w-xs space-y-3">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="rg-default" />
          <Label htmlFor="rg-default">Default spacing</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="rg-comfortable" />
          <Label htmlFor="rg-comfortable">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="rg-compact" />
          <Label htmlFor="rg-compact">Compact</Label>
        </div>
      </RadioGroup>
    </FixtureWrapper>
  )
}
