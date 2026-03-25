import React from 'react'
import { Label } from '../src/components/core/label'
import { Input } from '../src/components/core/input'
import { Checkbox } from '../src/components/core/checkbox'
import { FixtureWrapper } from './FixtureWrapper'

export default function LabelShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Input</h2>
        <div className="flex flex-col gap-2 w-64">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Checkbox</h2>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Required Field</h2>
        <div className="flex flex-col gap-2 w-64">
          <Label htmlFor="required">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="required" placeholder="Required field" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Standalone Label</h2>
        <Label>This is a standalone label</Label>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Multiple Labels</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first">First Name</Label>
            <Input id="first" placeholder="John" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="last">Last Name</Label>
            <Input id="last" placeholder="Doe" />
          </div>
        </div>
      </section>
    </FixtureWrapper>
  )
}
