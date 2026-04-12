import { useState } from "react"

import BaseSideDrawer from "../src/components/modules/base-side-drawer"
import { Button } from "../src/components/core/button"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SideDrawerShowcase() {
  const [open, setOpen] = useState(false)
  const [triggerLabel] = useFixtureInput("sideDrawerTriggerLabel", "Open Right Side Drawer")
  const [title] = useFixtureInput("sideDrawerTitle", "Side Drawer Title")
  const [description] = useFixtureInput(
    "sideDrawerDescription",
    "This is a side drawer from the right side",
  )
  const [body] = useFixtureInput("sideDrawerBody", "Side drawer content goes here.")
  const [side] = useFixtureSelect("sideDrawerSide", {
    options: ["right", "left"],
    defaultValue: "right",
  })
  const [size] = useFixtureSelect("sideDrawerSize", {
    options: ["sm", "md", "lg", "xl"],
    defaultValue: "md",
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Trigger label, title, description, body, side (left/right), and size for the first drawer.
        </p>
        <BaseSideDrawer
          trigger={<Button type="button">{triggerLabel}</Button>}
          title={title}
          description={description}
          side={side as "right" | "left"}
          size={size as "sm" | "md" | "lg" | "xl"}
        >
          <div className="p-4">
            <p>{body}</p>
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
          footerContent={<Button type="button">Close</Button>}
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
          <Button type="button" onClick={() => setOpen(true)}>
            Open Controlled Side Drawer
          </Button>
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
              <Button type="button" onClick={() => setOpen(false)} className="mt-4">
                Close
              </Button>
            </div>
          </BaseSideDrawer>
        </div>
      </section>
    </FixtureWrapper>
  )
}
