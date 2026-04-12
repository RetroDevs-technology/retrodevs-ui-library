import React, { useState } from "react"

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
import { FixtureWrapper } from "./FixtureWrapper"

export default function CoreDialogShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <FixtureWrapper title="Dialog (core)">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With trigger</h2>
        <Dialog>
          <DialogTrigger type="button" className={buttonVariants({ variant: "default" })}>
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Dialog body content.</p>
            <DialogFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="button">Save</Button>
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
              <DialogTitle>Headless close</DialogTitle>
              <DialogDescription>This dialog hides the built-in close icon.</DialogDescription>
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
