import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export interface StarRatingClassNames {
  root?: string
  starButton?: string
  starIcon?: string
}

export interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  maxRating?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  className?: string
  classNames?: StarRatingClassNames
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const

export function StarRating({
  rating,
  onRatingChange,
  maxRating = 5,
  size = "md",
  readonly = false,
  className,
  classNames,
}: StarRatingProps) {
  function handleStarClick(starValue: number) {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue)
    }
  }

  return (
    <div className={cn("flex gap-1", className, classNames?.root)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleStarClick(starValue)}
            disabled={readonly}
            className={cn(
              "transition-colors duration-200",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
              classNames?.starButton
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground fill-muted",
                !readonly && "hover:text-yellow-300 hover:fill-yellow-300",
                classNames?.starIcon
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
