import { Skeleton } from "../src/components/core/skeleton"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SkeletonShowcase() {
  const [line2Width] = useFixtureInput("skeletonSecondLineWidthClass", "w-[80%]")

  return (
    <FixtureWrapper title="Skeleton">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        Second line uses a Tailwind width class from the fixture panel (e.g. w-[60%], w-full).
      </p>
      <div className="flex items-center gap-4 max-w-md">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className={`h-4 ${line2Width}`} />
        </div>
      </div>
    </FixtureWrapper>
  )
}
