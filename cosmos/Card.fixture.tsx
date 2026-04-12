import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../src/components/core/card'
import { BaseCard } from '../src/components/modules/base-card'
import { Button } from '../src/components/core/button'
import { useFixtureInput } from './cosmos-playground'
import { FixtureWrapper } from './FixtureWrapper'

export default function CardShowcase() {
  const [baseTitle] = useFixtureInput('baseCardTitle', 'Card Title')
  const [baseDescription] = useFixtureInput(
    'baseCardDescription',
    'Card description goes here',
  )
  const [baseBody] = useFixtureInput('baseCardBody', 'This is the card content area.')

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseCard — live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Title, description, and body from the fixture panel.
        </p>
        <BaseCard
          className="w-96"
          title={baseTitle}
          description={baseDescription}
          content={<p>{baseBody}</p>}
          footer={<Button type="button">Action</Button>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Standard Card (Manual Composition)</h2>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area.</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple Card (Manual Composition)</h2>
        <Card className="w-96">
          <CardContent className="pt-6">
            <p>Simple card with just content.</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold">BaseCard - Full Card</h2>
        <BaseCard
          className="w-96"
          title="Card Title"
          description="Card description goes here"
          content={<p>This is the card content area.</p>}
          footer={<Button>Action</Button>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseCard - Simple Card</h2>
        <BaseCard className="w-96" content={<p>Simple card with just content.</p>} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseCard - With Title Only</h2>
        <BaseCard
          className="w-96"
          title="Card with Title"
          content={<p>Card content without description.</p>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseCard - With Action Button</h2>
        <BaseCard
          className="w-96"
          title="Card with Action"
          description="This card has an action button in the header"
          content={<p>Card content goes here.</p>}
          action={<Button variant="ghost" size="sm">Edit</Button>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseCard - Using Children</h2>
        <BaseCard className="w-96" title="Card Title" description="Using children prop">
          <p>This content is passed as children instead of the content prop.</p>
        </BaseCard>
      </section>
    </FixtureWrapper>
  )
}
