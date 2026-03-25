import React from 'react'
import { Textarea } from '../src/components/core/textarea'
import { Label } from '../src/components/core/label'
import { FixtureWrapper } from './FixtureWrapper'

export default function TextareaShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Textarea</h2>
        <Textarea placeholder="Enter your message..." />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex flex-col gap-2 w-96">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here..." />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <Textarea disabled placeholder="This textarea is disabled" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Default Value</h2>
        <Textarea defaultValue="This is a pre-filled textarea with some default content." />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Sizes</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Small</Label>
            <Textarea className="min-h-16" placeholder="Small textarea" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Medium</Label>
            <Textarea className="min-h-32" placeholder="Medium textarea" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Large</Label>
            <Textarea className="min-h-48" placeholder="Large textarea" />
          </div>
        </div>
      </section>
    </FixtureWrapper>
  )
}
