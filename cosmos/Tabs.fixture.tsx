import { useState } from "react"

import { BaseTab } from "../src/components/modules/base-tab"
import { Card, CardContent } from "../src/components/core/card"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function TabsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("profile")
  const [activeTabWithImages, setActiveTabWithImages] = useState<string>("profile")

  const [profileText] = useFixtureInput("tabsProfilePanelText", "Profile content goes here")
  const [payoutText] = useFixtureInput("tabsPayoutPanelText", "Payout content goes here")
  const [settingsText] = useFixtureInput("tabsSettingsPanelText", "Settings content goes here")
  const [supportText] = useFixtureInput("tabsSupportPanelText", "Support content goes here")

  const placeholderIcon = "https://via.placeholder.com/17x18"

  const tabs = [
    {
      value: "profile" as const,
      image: placeholderIcon,
      name: "Profile",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>{profileText}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "payout" as const,
      image: placeholderIcon,
      name: "Payout",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>{payoutText}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "settings" as const,
      image: placeholderIcon,
      name: "Settings",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>{settingsText}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "support" as const,
      image: placeholderIcon,
      name: "Support",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>{supportText}</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  const tabsWithImages = [
    {
      value: "profile" as const,
      image: "https://via.placeholder.com/16x16",
      name: "Profile",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Profile content with image icon</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "payout" as const,
      image: "https://via.placeholder.com/16x16",
      name: "Payout",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Payout content with image icon</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "settings" as const,
      image: "https://via.placeholder.com/17x18",
      name: "Settings",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Settings content</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "support" as const,
      image: "https://via.placeholder.com/17x18",
      name: "Support",
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Support content</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Base Tabs (panel copy)</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Edit the four panel bodies from the fixture panel.
        </p>
        <BaseTab activeTab={activeTab} setActiveTab={setActiveTab} tab={tabs} />
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold">Base Tabs (with icons)</h2>
        <BaseTab
          activeTab={activeTabWithImages}
          setActiveTab={setActiveTabWithImages}
          tab={tabsWithImages}
        />
      </section>
    </FixtureWrapper>
  )
}
