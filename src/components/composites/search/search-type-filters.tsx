import { Button } from "@/components/core/button"
import { cn } from "@/lib/utils"

export interface SearchTypeFiltersProps<T extends string = string> {
  availableTypes: T[]
  selectedTypes: T[]
  onToggleType: (type: T) => void
  formatTypeLabel?: (type: T) => string
  className?: string
}

function defaultFormatTypeLabel(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function SearchTypeFilters<T extends string = string>({
  availableTypes,
  selectedTypes,
  onToggleType,
  formatTypeLabel = defaultFormatTypeLabel as (type: T) => string,
  className,
}: SearchTypeFiltersProps<T>) {
  if (availableTypes.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2 p-3 border-b border-border", className)}>
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
              !isSelected && "bg-background text-foreground hover:bg-muted"
            )}
          >
            {formatTypeLabel(type)}
          </Button>
        )
      })}
    </div>
  )
}
