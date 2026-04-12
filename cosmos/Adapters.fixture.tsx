import { useState } from "react"
import { MessageCircle } from "lucide-react"

import { AsyncResourceSearch } from "../src/components/adapters/async-resource-search"
import { FloatingPanelShell } from "../src/components/adapters/floating-panel-shell"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AdaptersShowcase() {
  const [open, setOpen] = useState(true)
  const [searchPlaceholder] = useFixtureInput(
    "adapterSearchPlaceholder",
    "Type 3+ chars (mock API)…",
  )
  const [minQueryLength] = useFixtureInput("adapterSearchMinQueryLength", 3)
  const [panelTitle] = useFixtureInput("adapterPanelTitle", "Messages")
  const [panelBody] = useFixtureInput(
    "adapterPanelBody",
    "Host app renders list or thread here.",
  )
  const minLen =
    typeof minQueryLength === "number" && !Number.isNaN(minQueryLength)
      ? Math.max(1, Math.min(10, minQueryLength))
      : 3

  return (
    <FixtureWrapper title="Adapters">
      <section className="space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">Async resource search</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder and minimum query length from the fixture panel.
        </p>
        <div className="h-72 border rounded-lg overflow-hidden">
          <AsyncResourceSearch
            placeholder={searchPlaceholder}
            minQueryLength={minLen}
            fetchResults={async (query) => {
              await new Promise((r) => setTimeout(r, 400))
              return [
                { id: "1", title: `${query} · Result A`, subtitle: "Line haul" },
                { id: "2", title: `${query} · Result B`, subtitle: "Parcel" },
              ]
            }}
            getItemId={(item) => item.id}
            renderPrimary={(item) => item.title}
            renderSecondary={(item) => item.subtitle}
            onSelect={() => undefined}
          />
        </div>
      </section>

      <section className="space-y-4 relative min-h-[200px]">
        <h2 className="text-lg font-semibold">Floating panel shell</h2>
        <p className="text-sm text-muted-foreground">
          Panel is fixed bottom-right; toggle to preview open/closed. Title and body from fixtures.
        </p>
        <button type="button" className="text-sm underline" onClick={() => setOpen((o) => !o)}>
          Toggle panel
        </button>
        <FloatingPanelShell
          open={open}
          onClose={() => setOpen(false)}
          title={panelTitle}
          icon={<MessageCircle className="size-5" />}
        >
          <div className="p-4 text-sm text-muted-foreground">{panelBody}</div>
        </FloatingPanelShell>
      </section>
    </FixtureWrapper>
  )
}
