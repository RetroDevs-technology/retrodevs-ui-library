import React from 'react'
import { BaseCarousel } from '../src/components/modules/base-carousel'
import { Card, CardContent } from '../src/components/core/card'
import { FixtureWrapper } from './FixtureWrapper'

export default function CarouselShowcase() {
  const items = [
    {
      id: '1',
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Slide 1</h3>
            <p>This is the first slide of the carousel.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: '2',
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Slide 2</h3>
            <p>This is the second slide of the carousel.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: '3',
      content: (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Slide 3</h3>
            <p>This is the third slide of the carousel.</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Full Featured Carousel</h2>
        <BaseCarousel
          items={items}
          showIndicators={true}
          showNavigation={true}
          onSlideChange={(index) => console.log('Current slide:', index)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">No Indicators</h2>
        <BaseCarousel
          items={items}
          showIndicators={false}
          showNavigation={true}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">No Navigation</h2>
        <BaseCarousel
          items={items}
          showIndicators={true}
          showNavigation={false}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Minimal Carousel</h2>
        <BaseCarousel
          items={items}
          showIndicators={false}
          showNavigation={false}
        />
      </section>
    </FixtureWrapper>
  )
}
