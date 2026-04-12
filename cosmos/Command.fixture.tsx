import React, { useState } from "react"

import { Button } from "../src/components/core/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../src/components/core/command"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CommandShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <FixtureWrapper title="Command">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Inline palette</h2>
        <Command className="rounded-lg border shadow-md max-w-lg">
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>Billing</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Command dialog</h2>
        <Button type="button" onClick={() => setOpen(true)}>
          Open command dialog
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>Create project</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Invite team</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>
    </FixtureWrapper>
  )
}
