import { SearchX } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SearchEmptyStateProps {
  query: string
  className?: string
}

export function SearchEmptyState({ query, className }: SearchEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <SearchX className="size-12 text-muted-foreground mb-4" />
      <h3 className="text-sm font-medium text-foreground mb-1">No results found</h3>
      <p className="text-xs text-muted-foreground max-w-sm">
        We couldn&apos;t find any results for{" "}
        <span className="font-medium">&quot;{query}&quot;</span>. Try adjusting your search terms or
        filters.
      </p>
    </div>
  )
}
