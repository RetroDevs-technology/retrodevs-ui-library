import { Switch } from "../src/components/core/switch"
import { Label } from "../src/components/core/label"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SwitchShowcase() {
  const [featureLabel] = useFixtureInput("switchFeatureLabel", "Airplane Mode")
  const [checked, setChecked] = useFixtureInput("switchChecked", false)
  const [disabled] = useFixtureInput("switchDisabled", false)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Label, checked, and disabled — fixture panel and the switch stay in sync.
        </p>
        <div className="flex items-center gap-2">
          <Switch
            id="airplane-live"
            checked={checked}
            disabled={disabled}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="airplane-live">{featureLabel}</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default</h2>
        <Switch />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Checked</h2>
        <Switch checked />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Label</h2>
        <div className="flex items-center gap-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled</h2>
        <div className="flex flex-col gap-2">
          <Switch disabled />
          <Switch disabled checked />
        </div>
      </section>
    </FixtureWrapper>
  )
}
