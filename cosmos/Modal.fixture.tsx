import React, { useState } from 'react'
import BaseModal from '../src/components/modules/base-modal'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function ModalShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Small Modal</h2>
        <BaseModal
          trigger={<Button>Open Small Modal</Button>}
          title="Small Modal"
          description="This is a small modal dialog"
          size="small"
        >
          <div className="p-6">
            <p className="mb-4">This is a small modal with default width.</p>
            <p>Modal content goes here.</p>
          </div>
        </BaseModal>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Large Modal</h2>
        <BaseModal
          trigger={<Button variant="outline">Open Large Modal</Button>}
          title="Large Modal"
          description="This is a large modal dialog"
          size="large"
        >
          <div className="p-6">
            <p className="mb-4">This is a large modal with extended width.</p>
            <p>Perfect for forms, detailed content, or multiple columns.</p>
          </div>
        </BaseModal>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Full Height Modal</h2>
        <BaseModal
          trigger={<Button variant="secondary">Open Full Height Modal</Button>}
          title="Full Height Modal"
          description="This modal takes full height with scrolling"
          size="full"
        >
          <div className="p-6">
            <p className="mb-4">This modal has full height with vertical scrolling.</p>
            <div className="space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>Scrollable content item {i + 1}</p>
              ))}
            </div>
          </div>
        </BaseModal>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Modal with Footer</h2>
        <BaseModal
          trigger={<Button variant="default">Modal with Footer</Button>}
          title="Modal with Footer"
          description="This modal has a footer section"
          size="small"
          hasFooter={true}
          footerContent={
            <div className="flex gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          }
        >
          <div className="p-6">
            <p>This modal includes a footer with action buttons.</p>
          </div>
        </BaseModal>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Controlled Modal</h2>
        <div className="space-y-2">
          <Button onClick={() => setOpen(true)}>Open Controlled Modal</Button>
          <BaseModal
            open={open}
            onClose={setOpen}
            title="Controlled Modal"
            description="This modal is controlled externally"
            size="small"
          >
            <div className="p-6">
              <p className="mb-4">This modal is controlled by React state.</p>
              <Button onClick={() => setOpen(false)}>Close Modal</Button>
            </div>
          </BaseModal>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Modal with Disabled Overlay Click</h2>
        <BaseModal
          trigger={<Button variant="destructive">Modal (No Overlay Close)</Button>}
          title="Modal with Disabled Overlay"
          description="This modal cannot be closed by clicking the overlay"
          size="small"
          disableOverlayClick={true}
        >
          <div className="p-6">
            <p className="mb-4">
              This modal cannot be closed by clicking outside. You must use the close button or ESC key.
            </p>
            <p>Useful for important confirmations or required actions.</p>
          </div>
        </BaseModal>
      </section>
    </FixtureWrapper>
  )
}
