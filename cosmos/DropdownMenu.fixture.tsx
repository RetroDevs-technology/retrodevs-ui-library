import React from 'react'
import BaseDropdown from '../src/components/modules/base-dropdown'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function DropdownMenuShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Dropdown</h2>
        <BaseDropdown
          trigger={<Button>Open Menu</Button>}
          items={[
            { label: 'Profile', onClick: () => console.log('Profile clicked') },
            { label: 'Settings', onClick: () => console.log('Settings clicked') },
            { label: 'Logout', onClick: () => console.log('Logout clicked') },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Navigation Example</h2>
        <p className="text-sm text-muted-foreground">
          In your app, handle navigation in onClick handlers using your router
        </p>
        <BaseDropdown
          trigger={<Button variant="outline">Navigation Menu</Button>}
          items={[
            { label: 'Home', onClick: () => console.log('Navigate to /') },
            { label: 'Profile', onClick: () => console.log('Navigate to /profile') },
            { label: 'Settings', onClick: () => console.log('Navigate to /settings') },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Icons</h2>
        <BaseDropdown
          trigger={<Button variant="outline">Menu with Icons</Button>}
          items={[
            { label: 'Edit', icon: <span>✏️</span>, onClick: () => console.log('Edit') },
            { label: 'Copy', icon: <span>📋</span>, onClick: () => console.log('Copy') },
            { label: 'Delete', icon: <span>🗑️</span>, onClick: () => console.log('Delete') },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Positions</h2>
        <div className="flex flex-wrap gap-4">
          <BaseDropdown
            trigger={<Button size="sm">Top</Button>}
            items={[{ label: 'Item 1', onClick: () => {} }]}
            side="top"
          />
          <BaseDropdown
            trigger={<Button size="sm">Right</Button>}
            items={[{ label: 'Item 1', onClick: () => {} }]}
            side="right"
          />
          <BaseDropdown
            trigger={<Button size="sm">Bottom</Button>}
            items={[{ label: 'Item 1', onClick: () => {} }]}
            side="bottom"
          />
          <BaseDropdown
            trigger={<Button size="sm">Left</Button>}
            items={[{ label: 'Item 1', onClick: () => {} }]}
            side="left"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Header</h2>
        <BaseDropdown
          trigger={<Button variant="secondary">Menu with Header</Button>}
          header={<div className="text-sm font-semibold">User Menu</div>}
          items={[
            { label: 'Profile', onClick: () => console.log('Profile') },
            { label: 'Settings', onClick: () => console.log('Settings') },
            { label: 'Logout', onClick: () => console.log('Logout') },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Alignments</h2>
        <div className="flex flex-wrap gap-4">
          <BaseDropdown
            trigger={<Button size="sm">Start</Button>}
            items={[{ label: 'Item', onClick: () => {} }]}
            align="start"
          />
          <BaseDropdown
            trigger={<Button size="sm">Center</Button>}
            items={[{ label: 'Item', onClick: () => {} }]}
            align="center"
          />
          <BaseDropdown
            trigger={<Button size="sm">End</Button>}
            items={[{ label: 'Item', onClick: () => {} }]}
            align="end"
          />
        </div>
      </section>
    </FixtureWrapper>
  )
}
