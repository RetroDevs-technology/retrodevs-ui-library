import React from "react"

import { ScrollArea } from "../src/components/core/scroll-area"
import { FixtureWrapper } from "./FixtureWrapper"

export default function ScrollAreaShowcase() {
  return (
    <FixtureWrapper title="Scroll area">
      <ScrollArea className="h-48 w-full max-w-md rounded-md border p-4">
        <div className="space-y-2 pr-4">
          {Array.from({ length: 40 }, (_, i) => (
            <p key={i} className="text-sm">
              Scrollable row {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </FixtureWrapper>
  )
}
