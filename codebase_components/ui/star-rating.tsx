import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  maxRating?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  className?: string
}

export function StarRating({
  rating,
  onRatingChange,
  maxRating = 5,
  size = "md",
  readonly = false,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1
        const isFilled = starRating <= rating
        const isHalfFilled = starRating === Math.ceil(rating) && rating % 1 !== 0

        return (
          <button
            key={`star-${starRating}`}
            type="button"
            onClick={() => handleStarClick(starRating)}
            disabled={readonly}
            className={cn(
              "transition-colors duration-200",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
            )}>
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300",
                !readonly && "hover:text-yellow-300 hover:fill-yellow-300",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
