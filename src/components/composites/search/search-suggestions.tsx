import { Sparkles } from "lucide-react"

import { Button } from "@/components/core/button"
import { cn } from "@/lib/utils"

export interface SearchSuggestionsProps {
  suggestions: string[]
  onSelectSuggestion: (suggestion: string) => void
  className?: string
}

export function SearchSuggestions({
  suggestions,
  onSelectSuggestion,
  className,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className={cn("p-3 border-b border-border", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={`${suggestion}-${index}`}
            variant="ghost"
            size="sm"
            onClick={() => onSelectSuggestion(suggestion)}
            className="h-7 text-xs rounded-full bg-muted/60 hover:bg-muted text-foreground"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}
