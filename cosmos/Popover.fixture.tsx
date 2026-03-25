import React from 'react'
import { BasePopover } from '../src/components/modules/base-popover'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

export default function PopoverShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Popover</h2>
        <BasePopover
          trigger={<Button>Open Popover</Button>}
          content={
            <div className="p-4">
              <p className="text-sm">This is popover content.</p>
            </div>
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Popover with List</h2>
        <BasePopover
          trigger={<Button variant="outline">Show Options</Button>}
          content={
            <div className="p-2">
              <div className="px-3 py-2 hover:bg-accent cursor-pointer rounded-sm">
                Option 1
              </div>
              <div className="px-3 py-2 hover:bg-accent cursor-pointer rounded-sm">
                Option 2
              </div>
              <div className="px-3 py-2 hover:bg-accent cursor-pointer rounded-sm">
                Option 3
              </div>
            </div>
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Popover with Form</h2>
        <BasePopover
          trigger={<Button variant="secondary">Edit</Button>}
          content={
            <div className="p-4 space-y-2 w-64">
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <Button size="sm" className="w-full">
                Save
              </Button>
            </div>
          }
        />
      </section>
    </FixtureWrapper>
  )
}
