import React from "react"

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "../src/components/core/combobox"
import { FixtureWrapper } from "./FixtureWrapper"

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
]

export default function ComboboxShowcase() {
  return (
    <FixtureWrapper title="Combobox (core)">
      <Combobox items={items} defaultValue={null}>
        <div className="flex w-80 max-w-full items-center gap-1">
          <ComboboxInput placeholder="Pick a framework…" className="flex-1" />
          <ComboboxTrigger />
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={6}>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxEmpty>No matches.</ComboboxEmpty>
                {items.map((item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </FixtureWrapper>
  )
}
