import React from "react"

import { FadeIn, FadeInOnScroll, FadeInStagger } from "../src/components/animations"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AnimationsShowcase() {
  return (
    <FixtureWrapper title="Animations">
      <FadeIn>
        <p className="text-sm text-muted-foreground">Fade in (default direction up)</p>
      </FadeIn>

      <FadeInStagger
        className="space-y-2"
        children={[
          <div key="a" className="rounded border p-3 text-sm">
            Stagger item 1
          </div>,
          <div key="b" className="rounded border p-3 text-sm">
            Stagger item 2
          </div>,
          <div key="c" className="rounded border p-3 text-sm">
            Stagger item 3
          </div>,
        ]}
      />

      <div className="h-40 overflow-y-auto border rounded-md p-4">
        <div className="h-32" />
        <FadeInOnScroll>
          <p className="text-sm">This fades in when scrolled into view.</p>
        </FadeInOnScroll>
        <div className="h-32" />
      </div>
    </FixtureWrapper>
  )
}
