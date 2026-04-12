import { useState } from "react"
import { Settings, User } from "lucide-react"

import BaseAvatar from "../src/components/modules/base-avatar"
import { BaseCard } from "../src/components/modules/base-card"
import { BaseCarousel } from "../src/components/modules/base-carousel"
import BaseDropdown from "../src/components/modules/base-dropdown"
import { BasePopover } from "../src/components/modules/base-popover"
import { BaseSelect } from "../src/components/modules/base-select"
import { BaseTab, type ITabProps } from "../src/components/modules/base-tab"
import BaseTooltip from "../src/components/modules/base-tooltip"
import { Button } from "../src/components/core/button"
import { FixtureWrapper } from "./FixtureWrapper"

const tabs: ITabProps[] = [
  {
    value: "profile",
    name: "Profile",
    element: <p className="text-sm text-muted-foreground">Profile panel content.</p>,
  },
  {
    value: "settings",
    name: "Settings",
    element: <p className="text-sm text-muted-foreground">Settings panel content.</p>,
  },
  {
    value: "support",
    name: "Support",
    element: <p className="text-sm text-muted-foreground">Support panel content.</p>,
  },
]

export default function BaseModulesShowcase() {
  const [active, setActive] = useState<string | undefined>("profile")

  return (
    <FixtureWrapper title="Module templates (Base*)">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BasePopover</h2>
        <BasePopover
          trigger={<Button type="button">Open popover</Button>}
          content={<div className="p-4 text-sm w-56">Popover content from the module template.</div>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseSelect</h2>
        <div className="max-w-xs">
          <BaseSelect
            placeholder="Select option"
            items={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
            ]}
            label="Demo"
            onChange={() => undefined}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseDropdown</h2>
        <BaseDropdown
          trigger={<Button type="button">Open menu</Button>}
          items={[
            { label: "Profile", onClick: () => undefined, icon: <User className="size-4" /> },
            { label: "Settings", onClick: () => undefined, icon: <Settings className="size-4" /> },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseTooltip</h2>
        <BaseTooltip content="Tooltip from module template">
          <Button type="button" variant="outline">
            Hover me
          </Button>
        </BaseTooltip>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseAvatar</h2>
        <div className="flex gap-4 items-center">
          <BaseAvatar src={null} alt="User" size="md" />
          <BaseAvatar src="https://github.com/shadcn.png" alt="Shadcn" size="lg" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseCard</h2>
        <BaseCard
          title="Card title"
          description="Module card with footer"
          content={<p className="text-sm">Body content.</p>}
          footer={<Button size="sm">Action</Button>}
          className="max-w-sm"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseTab</h2>
        <BaseTab tab={tabs} activeTab={active} setActiveTab={setActive} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BaseCarousel</h2>
        <div className="max-w-md">
          <BaseCarousel
            items={[
              { id: "1", content: <div className="p-8 bg-muted rounded-md text-center">Slide 1</div> },
              { id: "2", content: <div className="p-8 bg-muted rounded-md text-center">Slide 2</div> },
              { id: "3", content: <div className="p-8 bg-muted rounded-md text-center">Slide 3</div> },
            ]}
            showIndicators
            showNavigation
          />
        </div>
      </section>
    </FixtureWrapper>
  )
}
