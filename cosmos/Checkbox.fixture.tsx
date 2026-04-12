import { Checkbox } from "../src/components/core/checkbox"
import { Label } from "../src/components/core/label"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CheckboxShowcase() {
  const [termsLabel] = useFixtureInput("checkboxTermsLabel", "Accept terms and conditions")
  const [checked, setChecked] = useFixtureInput("checkboxControlledChecked", false)
  const [disabled] = useFixtureInput("checkboxControlledDisabled", false)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Label text plus controlled checked and disabled (fixture panel drives state).
        </p>
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms-live"
            checked={checked}
            disabled={disabled}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="terms-live">{termsLabel}</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default</h2>
        <Checkbox id="default" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Checked</h2>
        <Checkbox checked />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <div className="flex flex-col gap-2">
          <Checkbox disabled />
          <Checkbox disabled checked />
        </div>
      </section>
    </FixtureWrapper>
  )
}
