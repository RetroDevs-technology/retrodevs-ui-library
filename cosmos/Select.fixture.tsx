import { useState } from "react"

import { BaseSelect } from "../src/components/modules/base-select"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SelectShowcase() {
  const [value, setValue] = useState<string>("")

  const items = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ]

  const [placeholder] = useFixtureInput("selectPlaceholder", "Select an option")
  const [groupLabel] = useFixtureInput("selectGroupLabel", "Options")
  const [width] = useFixtureInput("selectTriggerWidthPx", 165)
  const [isLoading] = useFixtureInput("selectLoading", false)
  const w =
    typeof width === "number" && !Number.isNaN(width) ? Math.max(120, Math.min(400, width)) : 165

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Placeholder, group label, trigger width, and loading state (first block mirrors these).
        </p>
        <BaseSelect
          placeholder={placeholder}
          items={items}
          label={groupLabel}
          width={w}
          isLoading={isLoading}
          onChange={(val) => setValue(val)}
        />
        <p className="text-sm text-muted-foreground">Selected: {value || "None"}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <BaseSelect placeholder="Choose..." items={items} label="Options" onChange={(val) => setValue(val)} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Controlled Value</h2>
        <BaseSelect
          placeholder="Select an option"
          items={items}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <p className="text-sm text-muted-foreground">Selected: {value || "None"}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Loading State</h2>
        <BaseSelect placeholder="Loading..." items={[]} isLoading={true} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Width</h2>
        <BaseSelect placeholder="Wide select" items={items} width={300} onChange={(val) => setValue(val)} />
      </section>
    </FixtureWrapper>
  )
}
