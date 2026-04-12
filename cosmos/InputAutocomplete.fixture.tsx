import { InputAutocomplete } from "../src/components/composites/forms/input-autocomplete"
import { useFixtureInput } from "./cosmos-playground"
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
  const [title] = useFixtureInput("autocompleteFieldTitle", "Pick a fruit")
  const [placeholder] = useFixtureInput("autocompletePlaceholder", "Type to search…")
  const [minQueryLength] = useFixtureInput("autocompleteMinQueryLength", 1)
  const [debounceMs] = useFixtureInput("autocompleteDebounceMs", 200)
  const minLen =
    typeof minQueryLength === "number" && !Number.isNaN(minQueryLength)
      ? Math.max(0, minQueryLength)
      : 1
  const debounce =
    typeof debounceMs === "number" && !Number.isNaN(debounceMs) ? Math.max(0, debounceMs) : 200

  return (
    <FixtureWrapper title="Input autocomplete">
      <div className="max-w-md space-y-2">
        <p className="text-sm text-muted-foreground">
          Adjust title, placeholder, min query length, and debounce from the fixture panel.
        </p>
        <InputAutocomplete<Fruit>
          title={title}
          placeholder={placeholder}
          minQueryLength={minLen}
          debounceMs={debounce}
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
