import { buttonVariants } from "../src/components/core/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../src/components/core/sheet"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SheetShowcase() {
  const [rightTrigger] = useFixtureInput("sheetRightTriggerLabel", "Right sheet")
  const [rightTitle] = useFixtureInput("sheetRightTitle", "Panel title")
  const [rightDescription] = useFixtureInput(
    "sheetRightDescription",
    "Slide-over content from the right.",
  )
  const [rightBody] = useFixtureInput("sheetRightBody", "Sheet body.")

  return (
    <FixtureWrapper title="Sheet">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        Right sheet: trigger, title, description, and body from the fixture panel.
      </p>
      <div className="flex flex-wrap gap-4">
        <Sheet>
          <SheetTrigger type="button" className={buttonVariants({ variant: "outline" })}>
            {rightTrigger}
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{rightTitle}</SheetTitle>
              <SheetDescription>{rightDescription}</SheetDescription>
            </SheetHeader>
            <p className="text-sm text-muted-foreground mt-4">{rightBody}</p>
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
