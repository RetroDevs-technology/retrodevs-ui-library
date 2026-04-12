import React from "react"

import { InputAutocomplete } from "../src/components/composites/forms/input-autocomplete"
import { FixtureWrapper } from "./FixtureWrapper"

interface Fruit {
  id: string
  name: string
}

const fruits: Fruit[] = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Cherry" },
  { id: "4", name: "Date" },
]

export default function InputAutocompleteShowcase() {
  return (
    <FixtureWrapper title="Input autocomplete">
      <div className="max-w-md">
        <InputAutocomplete<Fruit>
          title="Pick a fruit"
          placeholder="Type to search…"
          minQueryLength={1}
          debounceMs={200}
          allowTypedInput
          loadOptions={async (query) => {
            const q = query.toLowerCase()
            return fruits.filter((f) => f.name.toLowerCase().includes(q))
          }}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item.id}
          onSelect={() => undefined}
        />
      </div>
    </FixtureWrapper>
  )
}
