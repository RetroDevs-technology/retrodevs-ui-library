import React, { useState } from 'react'
import { BaseSelect } from '../src/components/modules/base-select'
import { FixtureWrapper } from './FixtureWrapper'

export default function SelectShowcase() {
  const [value, setValue] = useState<string>('')

  const items = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ]

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Select</h2>
        <BaseSelect
          placeholder="Select an option"
          items={items}
          onChange={(val) => setValue(val)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <BaseSelect
          placeholder="Choose..."
          items={items}
          label="Options"
          onChange={(val) => setValue(val)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Controlled Value</h2>
        <BaseSelect
          placeholder="Select an option"
          items={items}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <p className="text-sm text-muted-foreground">Selected: {value || 'None'}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Loading State</h2>
        <BaseSelect
          placeholder="Loading..."
          items={[]}
          isLoading={true}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Width</h2>
        <BaseSelect
          placeholder="Wide select"
          items={items}
          width={300}
          onChange={(val) => setValue(val)}
        />
      </section>
    </FixtureWrapper>
  )
}
