import React from "react"

import { Button } from "../src/components/core/button"
import { CardWrapper } from "../src/components/composites/layout/card-wrapper"
import { ErrorBoundary } from "../src/components/composites/layout/error-boundary"
import { LoadingFallback, LoadingSpinner } from "../src/components/composites/layout/loading-fallback"
import { FixtureWrapper } from "./FixtureWrapper"

function Boom() {
  throw new Error("Demo error for ErrorBoundary")
}

export default function LayoutCompositesShowcase() {
  const [show, setShow] = React.useState(false)

  return (
    <FixtureWrapper title="Layout composites">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Card wrapper</h2>
        <CardWrapper className="max-w-sm" onClick={() => undefined}>
          <p className="text-sm">Clickable card (keyboard accessible).</p>
        </CardWrapper>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Loading</h2>
        <LoadingFallback className="min-h-32" message="Loading fixture…" />
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Error boundary</h2>
        <Button type="button" variant="destructive" onClick={() => setShow(true)}>
          Trigger error UI
        </Button>
        {show ? (
          <ErrorBoundary
            fallback={
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
                Caught: custom fallback from fixture.
              </div>
            }
          >
            <Boom />
          </ErrorBoundary>
        ) : null}
      </section>
    </FixtureWrapper>
  )
}
