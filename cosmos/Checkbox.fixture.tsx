import React from 'react'
import { Checkbox } from '../src/components/core/checkbox'
import { Label } from '../src/components/core/label'
import { FixtureWrapper } from './FixtureWrapper'

export default function CheckboxShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default</h2>
        <Checkbox id="default" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Checked</h2>
        <Checkbox checked />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <div className="flex flex-col gap-2">
          <Checkbox disabled />
          <Checkbox disabled checked />
        </div>
      </section>
    </FixtureWrapper>
  )
}
