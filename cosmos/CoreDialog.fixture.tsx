import { useState } from "react"

import { Button, buttonVariants } from "../src/components/core/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/core/dialog"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CoreDialogShowcase() {
  const [open, setOpen] = useState(false)
  const [triggerLabel] = useFixtureInput("dialogTriggerLabel", "Open dialog")
  const [title] = useFixtureInput("dialogTitle", "Edit profile")
  const [description] = useFixtureInput(
    "dialogDescription",
    "Make changes here. Click save when you're done.",
  )
  const [body] = useFixtureInput("dialogBodyText", "Dialog body content.")
  const [cancelLabel] = useFixtureInput("dialogCancelLabel", "Cancel")
  const [saveLabel] = useFixtureInput("dialogSaveLabel", "Save")
  const [controlledTitle] = useFixtureInput("dialogControlledTitle", "Headless close")
  const [controlledDescription] = useFixtureInput(
    "dialogControlledDescription",
    "This dialog hides the built-in close icon.",
  )

  return (
    <FixtureWrapper title="Dialog (core)">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With trigger</h2>
        <Dialog>
          <DialogTrigger type="button" className={buttonVariants({ variant: "default" })}>
            {triggerLabel}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">{body}</p>
            <DialogFooter>
              <Button type="button" variant="outline">
                {cancelLabel}
              </Button>
              <Button type="button">{saveLabel}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Controlled (no close button variant)</h2>
        <Button type="button" onClick={() => setOpen(true)}>
          Open controlled
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>{controlledTitle}</DialogTitle>
              <DialogDescription>{controlledDescription}</DialogDescription>
            </DialogHeader>
            <Button type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </section>
    </FixtureWrapper>
  )
}
