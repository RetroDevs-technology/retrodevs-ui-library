import { Label } from "../src/components/core/label"
import { RadioGroup, RadioGroupItem } from "../src/components/core/radio-group"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function RadioGroupShowcase() {
  const [labelDefault] = useFixtureInput("radioOptionDefaultLabel", "Default spacing")
  const [labelComfortable] = useFixtureInput("radioOptionComfortableLabel", "Comfortable")
  const [labelCompact] = useFixtureInput("radioOptionCompactLabel", "Compact")
  const [defaultSelection] = useFixtureSelect("radioDefaultValue", {
    options: ["default", "comfortable", "compact"],
    defaultValue: "comfortable",
  })

  return (
    <FixtureWrapper title="Radio group">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        Option labels and which value is selected by default.
      </p>
      <RadioGroup defaultValue={defaultSelection} className="max-w-xs space-y-3">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="rg-default" />
          <Label htmlFor="rg-default">{labelDefault}</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="rg-comfortable" />
          <Label htmlFor="rg-comfortable">{labelComfortable}</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="rg-compact" />
          <Label htmlFor="rg-compact">{labelCompact}</Label>
        </div>
      </RadioGroup>
    </FixtureWrapper>
  )
}
