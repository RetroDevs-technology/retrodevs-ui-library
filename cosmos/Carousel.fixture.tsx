import { BaseCarousel } from "../src/components/modules/base-carousel"
import { Card, CardContent } from "../src/components/core/card"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CarouselShowcase() {
  const [slide1Title] = useFixtureInput("carouselSlide1Title", "Slide 1")
  const [slide1Body] = useFixtureInput(
    "carouselSlide1Body",
    "This is the first slide of the carousel.",
  )
  const [slide2Title] = useFixtureInput("carouselSlide2Title", "Slide 2")
  const [slide2Body] = useFixtureInput(
    "carouselSlide2Body",
    "This is the second slide of the carousel.",
  )
  const [slide3Title] = useFixtureInput("carouselSlide3Title", "Slide 3")
  const [slide3Body] = useFixtureInput(
    "carouselSlide3Body",
    "This is the third slide of the carousel.",
  )
  const [showIndicators] = useFixtureInput("carouselShowIndicatorsDemo", true)
  const [showNavigation] = useFixtureInput("carouselShowNavigationDemo", true)

  const items = [
    {
      id: "1",
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">{slide1Title}</h3>
            <p>{slide1Body}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "2",
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">{slide2Title}</h3>
            <p>{slide2Body}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "3",
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">{slide3Title}</h3>
            <p>{slide3Body}</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Edit slide titles and body copy; toggle indicators and navigation.
        </p>
        <BaseCarousel
          items={items}
          showIndicators={showIndicators}
          showNavigation={showNavigation}
          onSlideChange={(index) => console.log("Current slide:", index)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">No Indicators</h2>
        <BaseCarousel items={items} showIndicators={false} showNavigation={true} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">No Navigation</h2>
        <BaseCarousel items={items} showIndicators={true} showNavigation={false} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Minimal Carousel</h2>
        <BaseCarousel items={items} showIndicators={false} showNavigation={false} />
      </section>
    </FixtureWrapper>
  )
}
