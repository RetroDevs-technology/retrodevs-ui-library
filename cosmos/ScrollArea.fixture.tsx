import { ScrollArea } from "../src/components/core/scroll-area"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function ScrollAreaShowcase() {
  const [rowCount] = useFixtureInput("scrollAreaRowCount", 40)
  const [rowPrefix] = useFixtureInput("scrollAreaRowPrefix", "Scrollable row")
  const n =
    typeof rowCount === "number" && !Number.isNaN(rowCount)
      ? Math.min(80, Math.max(5, Math.floor(rowCount)))
      : 40

  return (
    <FixtureWrapper title="Scroll area">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        How many rows to render (5–80) and the label prefix for each line.
      </p>
      <ScrollArea className="h-48 w-full max-w-md rounded-md border p-4">
        <div className="space-y-2 pr-4">
          {Array.from({ length: n }, (_, i) => (
            <p key={i} className="text-sm">
              {rowPrefix} {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </FixtureWrapper>
  )
}
