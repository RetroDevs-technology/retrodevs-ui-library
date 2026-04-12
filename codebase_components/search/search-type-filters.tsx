import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { EntityType } from "@/models/search.model"

interface SearchTypeFiltersProps {
  availableTypes: EntityType[]
  selectedTypes: EntityType[]
  onToggleType: (type: EntityType) => void
}

function formatTypeLabel(type: EntityType): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function SearchTypeFilters({
  availableTypes,
  selectedTypes,
  onToggleType,
}: SearchTypeFiltersProps) {
  if (availableTypes.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200">
      {availableTypes.map((type) => {
        const isSelected = selectedTypes.includes(type)
        return (
          <Button
            key={type}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleType(type)}
            className={cn(
              "h-7 text-xs rounded-full",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-white text-gray-700 hover:bg-gray-50",
            )}>
            {formatTypeLabel(type)}
          </Button>
        )
      })}
    </div>
  )
}

