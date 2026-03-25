import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '../src/components/composites/toaster'
import { toast } from 'sonner'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function ToasterShowcase() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <FixtureWrapper>
        <Toaster />
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Toast</h2>
        <Button
          onClick={() => {
            toast('Event has been created')
          }}
        >
          Show Toast
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Toast Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            onClick={() => {
              toast('Default toast message')
            }}
          >
            Default
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast.error('Error toast message')
            }}
          >
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              toast.success('Success toast message')
            }}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast.info('Info toast message')
            }}
          >
            Info
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              toast.warning('Warning toast message')
            }}
          >
            Warning
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Toast with Description</h2>
        <Button
          onClick={() => {
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
          }}
        >
          Toast with Description
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Toast with Action</h2>
        <Button
          onClick={() => {
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }}
        >
          Toast with Action
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Long Duration</h2>
        <Button
          onClick={() => {
            toast('This toast will stay longer', {
              duration: 5000,
            })
          }}
        >
          Long Duration Toast
        </Button>
      </section>
      </FixtureWrapper>
    </ThemeProvider>
  )
}
