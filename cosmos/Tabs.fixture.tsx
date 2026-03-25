import React, { useState } from 'react'
import { BaseTab } from '../src/components/modules/base-tab'
import { Card, CardContent } from '../src/components/core/card'
import { FixtureWrapper } from './FixtureWrapper'

export default function TabsShowcase() {
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [activeTabWithImages, setActiveTabWithImages] = useState<string>('profile')

  const tabs = [
    {
      value: 'profile' as const,
      name: 'Profile',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Profile content goes here</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'payout' as const,
      name: 'Payout',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Payout content goes here</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'settings' as const,
      name: 'Settings',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Settings content goes here</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'support' as const,
      name: 'Support',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Support content goes here</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  const tabsWithImages = [
    {
      value: 'profile' as const,
      image: 'https://via.placeholder.com/16x16',
      name: 'Profile',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Profile content with image icon</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'payout' as const,
      image: 'https://via.placeholder.com/16x16',
      name: 'Payout',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Payout content with image icon</p>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'settings' as const,
      name: 'Settings',
      element: (
        <Card>
          <CardContent className="p-6">
            <p>Settings content without image</p>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Base Tabs (Without Images)</h2>
        <BaseTab activeTab={activeTab} setActiveTab={setActiveTab} tab={tabs} />
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold">Base Tabs (With Optional Images)</h2>
        <BaseTab
          activeTab={activeTabWithImages}
          setActiveTab={setActiveTabWithImages}
          tab={tabsWithImages}
        />
      </section>
    </FixtureWrapper>
  )
}
