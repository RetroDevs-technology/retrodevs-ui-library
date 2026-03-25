import React from 'react'
import BaseAvatar from '../src/components/modules/base-avatar'
import { FixtureWrapper } from './FixtureWrapper'

export default function AvatarShowcase() {
  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Image</h2>
        <BaseAvatar
          src="https://github.com/shadcn.png"
          alt="User profile"
          size="md"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Fallback Only</h2>
        <BaseAvatar
          src={null}
          alt="User"
          size="md"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Sizes</h2>
        <div className="flex items-center gap-4">
          <BaseAvatar size="sm" />
          <BaseAvatar size="md" />
          <BaseAvatar size="lg" />
          <BaseAvatar size="xl" />
          <BaseAvatar size="huge" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Fallback</h2>
        <BaseAvatar
          src={null}
          fallback={<span>JD</span>}
          size="md"
        />
      </section>
    </FixtureWrapper>
  )
}
