import type { ButtonProps } from '../src/components/core/button'
import { Button } from '../src/components/core/button'
import { useFixtureInput, useFixtureSelect } from './cosmos-playground'
import { FixtureWrapper } from './FixtureWrapper'

const PLAYGROUND_VARIANTS = [
  'default',
  'destructive',
  'destructiveMuted',
  'outline',
  'outlineBold',
  'outline_pagination',
  'secondary',
  'ghost',
  'link',
  'blue',
  'black',
] as const satisfies readonly NonNullable<ButtonProps['variant']>[]

export default function ButtonShowcase() {
  const [label] = useFixtureInput('buttonLabel', 'Interactive button')
  const [disabled] = useFixtureInput('buttonDisabled', false)
  const [variant] = useFixtureSelect('buttonVariant', {
    options: [...PLAYGROUND_VARIANTS],
    defaultValue: 'default',
  })
  const [size] = useFixtureSelect('buttonSize', {
    options: ['default', 'sm', 'lg', 'icon'],
    defaultValue: 'default',
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Use the Cosmos fixture panel: label, variant, size, disabled.
        </p>
        <Button
          type="button"
          variant={variant as NonNullable<ButtonProps['variant']>}
          size={size as NonNullable<ButtonProps['size']>}
          disabled={disabled}
        >
          {size === 'icon' ? '🚀' : label}
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">States</h2>
        <div className="flex gap-4">
          <Button disabled>Disabled</Button>
          <Button>Enabled</Button>
        </div>
      </section>
    </FixtureWrapper>
  )
}
