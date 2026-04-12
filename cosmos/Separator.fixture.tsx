import React from "react"

import { Separator } from "../src/components/core/separator"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SeparatorShowcase() {
  return (
    <FixtureWrapper title="Separator">
      <div className="space-y-4 max-w-md">
        <div>
          <p className="text-sm">Section A</p>
          <Separator className="my-4" />
          <p className="text-sm">Section B</p>
        </div>
        <div className="flex h-12 items-center gap-4">
          <span className="text-sm">Left</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Right</span>
        </div>
      </div>
    </FixtureWrapper>
  )
}
