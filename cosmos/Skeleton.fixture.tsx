import React from "react"

import { Skeleton } from "../src/components/core/skeleton"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SkeletonShowcase() {
  return (
    <FixtureWrapper title="Skeleton">
      <div className="flex items-center gap-4 max-w-md">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </FixtureWrapper>
  )
}
