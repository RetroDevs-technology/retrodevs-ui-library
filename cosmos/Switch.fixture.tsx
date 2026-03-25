import React from 'react'
import { Switch } from '../src/components/core/switch'
import { Label } from '../src/components/core/label'
import { FixtureWrapper } from './FixtureWrapper'

export default function SwitchShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default</h2>
        <Switch />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Checked</h2>
        <Switch checked />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex items-center gap-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <div className="flex flex-col gap-2">
          <Switch disabled />
          <Switch disabled checked />
        </div>
      </section>
    </FixtureWrapper>
  )
}
