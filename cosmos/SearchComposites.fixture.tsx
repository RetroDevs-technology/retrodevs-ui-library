import { useState } from "react"
import { Package } from "lucide-react"

import {
  SearchEmptyState,
  SearchLoadingState,
  SearchResultCard,
  SearchSuggestions,
  SearchTypeFilters,
} from "../src/components/composites/search"
import type { SearchResultLike } from "../src/components/composites/search/types"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SearchCompositesShowcase() {
  const [types, setTypes] = useState<string[]>(["shipping_request"])
  const available = ["shipping_request", "contact", "invoice"]

  const [resultTitle] = useFixtureInput(
    "searchResultTitle",
    "ORD-10042 · Chicago → Austin",
  )
  const [resultDescription] = useFixtureInput(
    "searchResultDescription",
    "LTL · 2 pallets · Pickup next Tuesday.",
  )
  const [emptyQuery] = useFixtureInput("searchEmptyStateQuery", "no-match-example")
  const [loadingRows] = useFixtureInput("searchLoadingSkeletonRows", 2)
  const rows =
    typeof loadingRows === "number" && !Number.isNaN(loadingRows)
      ? Math.min(6, Math.max(1, Math.floor(loadingRows)))
      : 2

  const demoResult: SearchResultLike = {
    type: "shipping_request",
    title: resultTitle,
    description: resultDescription,
    metadata: { status: "In transit", trackingNumber: "1Z999AA10123456784" },
  }

  return (
    <FixtureWrapper title="Search composites">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        Result title/description, empty-state query, and loading skeleton row count.
      </p>
      <section className="space-y-4 max-w-lg border rounded-lg overflow-hidden">
        <SearchTypeFilters
          availableTypes={available}
          selectedTypes={types}
          onToggleType={(t) =>
            setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
          }
        />
        <SearchSuggestions
          suggestions={["recent: ORD-", "customer: acme", "invoice: INV-"]}
          onSelectSuggestion={() => undefined}
        />
        <SearchLoadingState rows={rows} />
        <div className="p-2">
          <SearchResultCard
            result={demoResult}
            renderIcon={() => <Package className="size-4" />}
            getTypeBadgeClassName={() => "border-primary/30 bg-primary/10 text-primary"}
          />
        </div>
        <SearchEmptyState query={emptyQuery} />
      </section>
    </FixtureWrapper>
  )
}
