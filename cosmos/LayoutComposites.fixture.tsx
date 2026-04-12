import { useState } from "react"

import { Button } from "../src/components/core/button"
import { CardWrapper } from "../src/components/composites/layout/card-wrapper"
import { ErrorBoundary } from "../src/components/composites/layout/error-boundary"
import { LoadingFallback, LoadingSpinner } from "../src/components/composites/layout/loading-fallback"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

function Boom(): never {
  throw new Error("Demo error for ErrorBoundary")
}

export default function LayoutCompositesShowcase() {
  const [show, setShow] = useState(false)
  const [cardBody] = useFixtureInput(
    "layoutCardWrapperBody",
    "Clickable card (keyboard accessible).",
  )
  const [loadingMessage] = useFixtureInput("layoutLoadingMessage", "Loading fixture…")
  const [errorTriggerLabel] = useFixtureInput("layoutErrorTriggerLabel", "Trigger error UI")
  const [errorFallbackNote] = useFixtureInput(
    "layoutErrorFallbackNote",
    "Caught: custom fallback from fixture.",
  )

  return (
    <FixtureWrapper title="Layout composites">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Card wrapper</h2>
        <CardWrapper className="max-w-sm" onClick={() => undefined}>
          <p className="text-sm">{cardBody}</p>
        </CardWrapper>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Loading</h2>
        <LoadingFallback className="min-h-32" message={loadingMessage} />
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Error boundary</h2>
        <Button type="button" variant="destructive" onClick={() => setShow(true)}>
          {errorTriggerLabel}
        </Button>
        {show ? (
          <ErrorBoundary
            fallback={
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
                {errorFallbackNote}
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
