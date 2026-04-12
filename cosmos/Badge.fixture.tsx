import type { BadgeProps } from "../src/components/core/badge"
import { Badge } from "../src/components/core/badge"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "success",
  "warning",
  "new",
  "transit-destructive",
  "transit-warning",
  "transit-success",
  "transit-blue",
] as const satisfies readonly NonNullable<BadgeProps["variant"]>[]

export default function BadgeShowcase() {
  const [text] = useFixtureInput("badgeLabel", "Badge")
  const [variant] = useFixtureSelect("badgeVariant", {
    options: [...BADGE_VARIANTS],
    defaultValue: "default",
  })

  return (
    <FixtureWrapper title="Badge">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Badge text and variant from the fixture panel.
        </p>
        <Badge variant={variant as NonNullable<BadgeProps["variant"]>}>{text}</Badge>
      </section>

      <h2 className="text-lg font-semibold pt-4">All variants</h2>
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="new">New</Badge>
        <Badge variant="transit-blue">Transit</Badge>
      </div>
    </FixtureWrapper>
  )
}
