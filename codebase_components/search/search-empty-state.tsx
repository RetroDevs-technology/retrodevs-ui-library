import { SearchX } from "lucide-react"

interface SearchEmptyStateProps {
  query: string
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchX className="size-12 text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-1">No results found</h3>
      <p className="text-xs text-gray-500 max-w-sm">
        We couldn't find any results for <span className="font-medium">"{query}"</span>. Try
        adjusting your search terms or filters.
      </p>
    </div>
  )
}

