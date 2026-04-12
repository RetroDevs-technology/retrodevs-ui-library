import React from "react"

import { Badge } from "../src/components/core/badge"
import { FixtureWrapper } from "./FixtureWrapper"

export default function BadgeShowcase() {
  return (
    <FixtureWrapper title="Badge">
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="new">New</Badge>
        <Badge variant="transit-blue">Transit</Badge>
      </div>
    </FixtureWrapper>
  )
}
