import React from 'react'
import { Input } from '../src/components/core/input'
import { Label } from '../src/components/core/label'
import { FixtureWrapper } from './FixtureWrapper'

export default function InputShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default</h2>
        <Input placeholder="Enter text..." />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex flex-col gap-2 w-64">
          <Label htmlFor="input">Email</Label>
          <Input id="input" type="email" placeholder="email@example.com" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <Input disabled placeholder="Disabled input" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Input Types</h2>
        <div className="flex flex-col gap-4 w-64">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
        </div>
      </section>
    </FixtureWrapper>
  )
}
