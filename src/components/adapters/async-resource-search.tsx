import { Package, Search } from "lucide-react"
import * as React from "react"

import { Input } from "@/components/core/input"
import { ScrollArea } from "@/components/core/scroll-area"
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value"
import { cn } from "@/lib/utils"

export interface AsyncResourceSearchProps<T> {
  placeholder?: string
  minQueryLength?: number
  debounceMs?: number
  fetchResults: (query: string) => Promise<T[]>
  getItemId: (item: T) => string
  renderPrimary: (item: T) => React.ReactNode
  renderSecondary?: (item: T) => React.ReactNode
  renderBadge?: (item: T) => React.ReactNode
  onSelect: (item: T) => void
  className?: string
  inputClassName?: string
}

export function AsyncResourceSearch<T>({
  placeholder = "Search…",
  minQueryLength = 3,
  debounceMs = 500,
  fetchResults,
  getItemId,
  renderPrimary,
  renderSecondary,
  renderBadge,
  onSelect,
  className,
  inputClassName,
}: AsyncResourceSearchProps<T>) {
  const [searchValue, setSearchValue] = React.useState("")
  const debounced = useDebouncedValue(searchValue, debounceMs)
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<T[]>([])

  React.useEffect(() => {
    let cancelled = false
    if (debounced.length < minQueryLength) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    void fetchResults(debounced)
      .then((rows) => {
        if (!cancelled) setResults(rows)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [debounced, fetchResults, minQueryLength])

  const showHint =
    debounced.length > 0 && debounced.length < minQueryLength && searchValue.length > 0

  return (
    <div className={cn("flex flex-col h-full p-4 gap-4", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn("pl-10 h-10 rounded-lg", inputClassName)}
        />
      </div>

      {showHint ? (
        <div className="text-sm text-muted-foreground text-center py-4">
          Enter at least {minQueryLength} characters to search
        </div>
      ) : null}

      {debounced.length >= minQueryLength ? (
        <ScrollArea className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((item) => (
                <button
                  key={getItemId(item)}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {renderPrimary(item)}
                      </p>
                      {renderBadge ? renderBadge(item) : null}
                    </div>
                    {renderSecondary ? (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {renderSecondary(item)}
                      </p>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Package className="w-12 h-12 mb-3 opacity-40" />
              <p className="font-medium text-foreground mb-1">No results</p>
              <p className="text-sm text-center">Try a different search term</p>
            </div>
          )}
        </ScrollArea>
      ) : null}

      {!debounced && !searchValue ? (
        <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground">
          <Search className="w-12 h-12 mb-3 opacity-40" />
          <p className="font-medium text-foreground mb-1">Search</p>
          <p className="text-sm text-center max-w-xs">
            Type in the field above to load results from your API.
          </p>
        </div>
      ) : null}
    </div>
  )
}
