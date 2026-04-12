import { Textarea } from "../src/components/core/textarea"
import { Label } from "../src/components/core/label"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function TextareaShowcase() {
  const [placeholder] = useFixtureInput("textareaPlaceholder", "Enter your message...")
  const [disabled] = useFixtureInput("textareaDisabled", false)
  const [minHeight] = useFixtureSelect("textareaMinHeightClass", {
    options: ["min-h-16", "min-h-32", "min-h-48"],
    defaultValue: "min-h-32",
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Placeholder, disabled, and min-height preset for the demo field.
        </p>
        <Textarea className={minHeight} placeholder={placeholder} disabled={disabled} />
      </section>

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
