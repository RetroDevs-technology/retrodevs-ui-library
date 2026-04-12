import React, { useState } from "react"
import { Package } from "lucide-react"

import {
  SearchEmptyState,
  SearchLoadingState,
  SearchResultCard,
  SearchSuggestions,
  SearchTypeFilters,
} from "../src/components/composites/search"
import type { SearchResultLike } from "../src/components/composites/search/types"
import { FixtureWrapper } from "./FixtureWrapper"

const demoResult: SearchResultLike = {
  type: "shipping_request",
  title: "ORD-10042 · Chicago → Austin",
  description: "LTL · 2 pallets · Pickup next Tuesday.",
  metadata: { status: "In transit", trackingNumber: "1Z999AA10123456784" },
}

export default function SearchCompositesShowcase() {
  const [types, setTypes] = useState<string[]>(["shipping_request"])
  const available = ["shipping_request", "contact", "invoice"]

  return (
    <FixtureWrapper title="Search composites">
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
        <SearchLoadingState rows={2} />
        <div className="p-2">
          <SearchResultCard
            result={demoResult}
            renderIcon={() => <Package className="size-4" />}
            getTypeBadgeClassName={() => "border-primary/30 bg-primary/10 text-primary"}
          />
        </div>
        <SearchEmptyState query="no-match-example" />
      </section>
    </FixtureWrapper>
  )
}
