import React from "react"

import { buttonVariants } from "../src/components/core/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../src/components/core/sheet"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SheetShowcase() {
  return (
    <FixtureWrapper title="Sheet">
      <div className="flex flex-wrap gap-4">
        <Sheet>
          <SheetTrigger type="button" className={buttonVariants({ variant: "outline" })}>
            Right sheet
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Panel title</SheetTitle>
              <SheetDescription>Slide-over content from the right.</SheetDescription>
            </SheetHeader>
            <p className="text-sm text-muted-foreground mt-4">Sheet body.</p>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger type="button" className={buttonVariants({ variant: "secondary" })}>
            Left sheet
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Left panel</SheetTitle>
              <SheetDescription>Content from the left side.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </FixtureWrapper>
  )
}
