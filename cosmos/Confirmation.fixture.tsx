import React from 'react'
import BaseConfirmation from '../src/components/modules/base-confirmation'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function ConfirmationShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Confirmation</h2>
        <BaseConfirmation
          trigger={<Button>Open Confirmation</Button>}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={() => console.log('Confirmed')}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Destructive Confirmation</h2>
        <BaseConfirmation
          trigger={<Button variant="destructive">Delete Item</Button>}
          title="Delete Confirmation"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          actionVariant="destructive"
          onConfirm={() => console.log('Deleted')}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Actions</h2>
        <BaseConfirmation
          trigger={<Button variant="outline">Custom Confirmation</Button>}
          title="Custom Title"
          description="This is a confirmation dialog with custom button text."
          confirmText="Save"
          cancelText="Discard"
          actionVariant="default"
          onConfirm={() => console.log('Saved')}
        />
      </section>
    </FixtureWrapper>
  )
}
