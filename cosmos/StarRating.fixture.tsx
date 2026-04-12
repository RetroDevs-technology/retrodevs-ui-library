import { useState } from "react"

import { StarRating } from "../src/components/core/star-rating"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function StarRatingShowcase() {
  const [rating, setRating] = useState(3)
  const [maxRating] = useFixtureSelect("starRatingMaxStars", {
    options: ["3", "5", "7"],
    defaultValue: "5",
  })
  const [size] = useFixtureSelect("starRatingSize", {
    options: ["sm", "md", "lg"],
    defaultValue: "md",
  })
  const [readonlyScore] = useFixtureInput("starRatingReadonlyDisplayValue", 4)
  const max = Number.parseInt(maxRating, 10) || 5
  const readVal =
    typeof readonlyScore === "number" && !Number.isNaN(readonlyScore)
      ? Math.min(max, Math.max(0, readonlyScore))
      : 4

  return (
    <FixtureWrapper title="Star rating">
      <p className="text-sm text-muted-foreground mb-4 max-w-xl">
        Max stars, size, and read-only display value. Interactive row uses local state (click stars).
      </p>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Interactive</p>
          <StarRating
            rating={Math.min(rating, max)}
            maxRating={max}
            size={size as "sm" | "md" | "lg"}
            onRatingChange={setRating}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Read only</p>
          <StarRating rating={readVal} maxRating={max} size={size as "sm" | "md" | "lg"} readonly />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Large (interactive)</p>
          <StarRating
            rating={Math.min(rating, max)}
            maxRating={max}
            size="lg"
            onRatingChange={setRating}
          />
        </div>
      </div>
    </FixtureWrapper>
  )
}
