import React, { useState } from 'react'
import { BaseSearchableSelect } from '../src/components/composites/searchable-select'
import { FixtureWrapper } from './FixtureWrapper'

const manyOptions = Array.from({ length: 100 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}))

const groupedOptions = [
  {
    value: 'fruits',
    label: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    items: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'lettuce', label: 'Lettuce' },
      { value: 'tomato', label: 'Tomato' },
      { value: 'cucumber', label: 'Cucumber' },
    ],
  },
]

export default function SearchableSelectShowcase() {
  const [basicValue, setBasicValue] = useState<string | undefined>()
  const [manyValue, setManyValue] = useState<string | undefined>()
  const [preSelectedValue, setPreSelectedValue] = useState<string>('option-3')
  const [customValue, setCustomValue] = useState<string | undefined>()

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Searchable Select</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search options..."
            items={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
              { value: '4', label: 'Option 4' },
              { value: '5', label: 'Option 5' },
            ]}
            value={basicValue}
            onChange={setBasicValue}
          />
          {basicValue && (
            <p className="text-sm text-muted-foreground">
              Selected: {basicValue}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Many Options (Search Functionality)</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select from 100 options"
            searchPlaceholder="Type to search..."
            items={manyOptions}
            value={manyValue}
            onChange={setManyValue}
            emptyMessage="No matching options found."
          />
          {manyValue && (
            <p className="text-sm text-muted-foreground">
              Selected: {manyValue}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Pre-selected Value</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search..."
            items={manyOptions.slice(0, 20)}
            value={preSelectedValue}
            onChange={setPreSelectedValue}
          />
          <p className="text-sm text-muted-foreground">
            Pre-selected: {preSelectedValue}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Loading State</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Loading..."
            items={[]}
            isLoading={true}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Empty State</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search..."
            items={[]}
            emptyMessage="No options available."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search..."
            label="Options"
            items={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
            value={customValue}
            onChange={setCustomValue}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled State</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search..."
            items={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
            disabled={true}
            value="1"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Width</h2>
        <div className="space-y-2">
          <BaseSearchableSelect
            placeholder="Select an option"
            searchPlaceholder="Search..."
            items={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
            width={300}
          />
        </div>
      </section>
    </FixtureWrapper>
  )
}
