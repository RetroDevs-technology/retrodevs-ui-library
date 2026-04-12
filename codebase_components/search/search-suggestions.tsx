import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface SearchSuggestionsProps {
  suggestions: string[]
  onSelectSuggestion: (suggestion: string) => void
}

export function SearchSuggestions({
  suggestions,
  onSelectSuggestion,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="p-3 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-gray-600">Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onSelectSuggestion(suggestion)}
            className={cn(
              "h-7 text-xs rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700",
            )}>
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}

