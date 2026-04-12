import { FadeIn, FadeInOnScroll, FadeInStagger } from "../src/components/animations"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AnimationsShowcase() {
  const [fadeCaption] = useFixtureInput(
    "animationFadeInCaption",
    "Fade in (default direction up)",
  )
  const [stagger1] = useFixtureInput("animationStaggerItem1", "Stagger item 1")
  const [stagger2] = useFixtureInput("animationStaggerItem2", "Stagger item 2")
  const [stagger3] = useFixtureInput("animationStaggerItem3", "Stagger item 3")
  const [scrollText] = useFixtureInput(
    "animationScrollRevealText",
    "This fades in when scrolled into view.",
  )

  return (
    <FixtureWrapper title="Animations">
      <p className="text-sm text-muted-foreground mb-4 max-w-xl">
        Copy for fade, stagger items, and scroll-reveal block from the fixture panel.
      </p>
      <FadeIn>
        <p className="text-sm text-muted-foreground">{fadeCaption}</p>
      </FadeIn>

      <FadeInStagger
        className="space-y-2"
        children={[
          <div key="a" className="rounded border p-3 text-sm">
            {stagger1}
          </div>,
          <div key="b" className="rounded border p-3 text-sm">
            {stagger2}
          </div>,
          <div key="c" className="rounded border p-3 text-sm">
            {stagger3}
          </div>,
        ]}
      />

      <div className="h-40 overflow-y-auto border rounded-md p-4">
        <div className="h-32" />
        <FadeInOnScroll>
          <p className="text-sm">{scrollText}</p>
        </FadeInOnScroll>
        <div className="h-32" />
      </div>
    </FixtureWrapper>
  )
}
