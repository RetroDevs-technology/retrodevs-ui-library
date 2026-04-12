import React, { useState } from "react"

import { StarRating } from "../src/components/core/star-rating"
import { FixtureWrapper } from "./FixtureWrapper"

export default function StarRatingShowcase() {
  const [rating, setRating] = useState(3)

  return (
    <FixtureWrapper title="Star rating">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Interactive</p>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Read only</p>
          <StarRating rating={4} readonly />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Large</p>
          <StarRating rating={2} size="lg" onRatingChange={setRating} />
        </div>
      </div>
    </FixtureWrapper>
  )
}
