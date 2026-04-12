import React from "react"

import { buttonVariants } from "../src/components/core/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../src/components/core/collapsible"
import { cn } from "../src/lib/utils"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CollapsibleShowcase() {
  return (
    <FixtureWrapper title="Collapsible">
      <Collapsible className="max-w-md space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-medium">Toggle details</h3>
          <CollapsibleTrigger
            type="button"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Toggle
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <p className="text-sm text-muted-foreground">
            Hidden content appears here when expanded. Use the trigger to open and close.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </FixtureWrapper>
  )
}
