import { Separator } from "../src/components/core/separator"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SeparatorShowcase() {
  const [sectionA] = useFixtureInput("separatorSectionATitle", "Section A")
  const [sectionB] = useFixtureInput("separatorSectionBTitle", "Section B")
  const [leftCol] = useFixtureInput("separatorVerticalLeftLabel", "Left")
  const [rightCol] = useFixtureInput("separatorVerticalRightLabel", "Right")

  return (
    <FixtureWrapper title="Separator">
      <div className="space-y-4 max-w-md">
        <div>
          <p className="text-sm">{sectionA}</p>
          <Separator className="my-4" />
          <p className="text-sm">{sectionB}</p>
        </div>
        <div className="flex h-12 items-center gap-4">
          <span className="text-sm">{leftCol}</span>
          <Separator orientation="vertical" />
          <span className="text-sm">{rightCol}</span>
        </div>
      </div>
    </FixtureWrapper>
  )
}
