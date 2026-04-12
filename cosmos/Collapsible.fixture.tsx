import { buttonVariants } from "../src/components/core/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../src/components/core/collapsible"
import { cn } from "../src/lib/utils"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CollapsibleShowcase() {
  const [heading] = useFixtureInput("collapsibleHeading", "Toggle details")
  const [triggerLabel] = useFixtureInput("collapsibleTriggerLabel", "Toggle")
  const [panelText] = useFixtureInput(
    "collapsiblePanelText",
    "Hidden content appears here when expanded. Use the trigger to open and close.",
  )

  return (
    <FixtureWrapper title="Collapsible">
      <Collapsible className="max-w-md space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-medium">{heading}</h3>
          <CollapsibleTrigger
            type="button"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            {triggerLabel}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <p className="text-sm text-muted-foreground">{panelText}</p>
        </CollapsibleContent>
      </Collapsible>
    </FixtureWrapper>
  )
}
