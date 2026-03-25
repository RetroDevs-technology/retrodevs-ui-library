import React, { useState } from 'react'
import { Calendar } from '../src/components/core/calendar'
import { FixtureWrapper } from './FixtureWrapper'
import { format } from 'date-fns'

export default function CalendarShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date Selection</h2>
        <div className="space-y-2">
          <Calendar
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
          />
          {singleDate && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDate, "PPP")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range Selection</h2>
        <div className="space-y-2">
          <Calendar
            mode="range"
            selected={rangeDate}
            onSelect={setRangeDate}
          />
          {rangeDate?.from && (
            <p className="text-sm text-muted-foreground">
              {rangeDate.from && format(rangeDate.from, "PPP")}
              {rangeDate.to && ` - ${format(rangeDate.to, "PPP")}`}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Multiple Date Selection</h2>
        <div className="space-y-2">
          <Calendar
            mode="multiple"
            selected={[new Date(), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Calendar with Restrictions</h2>
        <div className="space-y-2">
          <Calendar
            mode="single"
            disabled={(date) => date < new Date()}
            selected={singleDate}
            onSelect={setSingleDate}
          />
          <p className="text-sm text-muted-foreground">
            Past dates are disabled
          </p>
        </div>
      </section>
    </FixtureWrapper>
  )
}
