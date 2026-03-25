import React, { useState } from 'react'
import BaseSideDrawer from '../src/components/modules/base-side-drawer'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function SideDrawerShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Right Side Drawer</h2>
        <BaseSideDrawer
          trigger={<Button>Open Right Side Drawer</Button>}
          title="Side Drawer Title"
          description="This is a side drawer from the right side"
          side="right"
          size="md"
        >
          <div className="p-4">
            <p>Side drawer content goes here.</p>
          </div>
        </BaseSideDrawer>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Left Side Drawer</h2>
        <BaseSideDrawer
          trigger={<Button variant="outline">Open Left Side Drawer</Button>}
          title="Left Side Drawer"
          description="This is a side drawer from the left side"
          side="left"
          size="lg"
        >
          <div className="p-4">
            <p>Left side drawer content.</p>
          </div>
        </BaseSideDrawer>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Side Drawer with Footer</h2>
        <BaseSideDrawer
          trigger={<Button variant="secondary">Side Drawer with Footer</Button>}
          title="Side Drawer with Footer"
          description="This side drawer has a footer"
          side="right"
          size="md"
          hasFooter={true}
          footerContent={<Button>Close</Button>}
        >
          <div className="p-4">
            <p>Side drawer content with footer below.</p>
          </div>
        </BaseSideDrawer>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Sizes</h2>
        <div className="flex gap-4">
          <BaseSideDrawer
            trigger={<Button size="sm">Small</Button>}
            title="Small Side Drawer"
            side="right"
            size="sm"
          >
            <div className="p-4">Small side drawer content</div>
          </BaseSideDrawer>
          <BaseSideDrawer
            trigger={<Button size="sm">Large</Button>}
            title="Large Side Drawer"
            side="right"
            size="xl"
          >
            <div className="p-4">Large side drawer content</div>
          </BaseSideDrawer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Controlled Side Drawer</h2>
        <div className="space-y-2">
          <Button onClick={() => setOpen(true)}>Open Controlled Side Drawer</Button>
          <BaseSideDrawer
            open={open}
            setOpen={setOpen}
            title="Controlled Side Drawer"
            description="This side drawer is controlled externally"
            side="right"
            size="md"
          >
            <div className="p-4">
              <p>This side drawer is controlled by state.</p>
              <Button onClick={() => setOpen(false)} className="mt-4">
                Close
              </Button>
            </div>
          </BaseSideDrawer>
        </div>
      </section>
    </FixtureWrapper>
  )
}
