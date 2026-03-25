import React, { useState } from 'react'
import { DatePicker } from '../src/components/composites/date-picker'
import { FixtureWrapper } from './FixtureWrapper'
import { format } from 'date-fns'

export default function DatePickerShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<{ from?: Date; to?: Date } | undefined>()

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date Picker</h2>
        <div className="space-y-2">
          <DatePicker
            date={singleDate}
            onDateChange={setSingleDate}
            placeholder="Pick a date"
          />
          {singleDate && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDate, "PPP")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range Picker</h2>
        <div className="space-y-2">
          <DatePicker
            mode="range"
            selected={rangeDate}
            onRangeChange={setRangeDate}
            placeholder="Pick a date range"
          />
          {rangeDate?.from && (
            <p className="text-sm text-muted-foreground">
              {format(rangeDate.from, "PPP")}
              {rangeDate.to && ` - ${format(rangeDate.to, "PPP")}`}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Picker with Restrictions</h2>
        <div className="space-y-2">
          <DatePicker
            date={singleDate}
            onDateChange={setSingleDate}
            disabled={(date) => date < new Date()}
            placeholder="Pick a future date"
          />
          <p className="text-sm text-muted-foreground">
            Past dates are disabled
          </p>
        </div>
      </section>
    </FixtureWrapper>
  )
}
