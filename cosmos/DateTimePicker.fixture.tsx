import React, { useState } from 'react'
import { BaseDateTimePicker } from '../src/components/composites/date-time-picker'
import { FixtureWrapper } from './FixtureWrapper'
import { format } from 'date-fns'

export default function DateTimePickerShowcase() {
  const [singleDateTime, setSingleDateTime] = useState<Date | undefined>(new Date())
  const [rangeDateTime, setRangeDateTime] = useState<{ from?: Date; to?: Date } | undefined>()

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date + Time</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="single"
            value={singleDateTime}
            onChange={(value) => {
              if (value instanceof Date) {
                setSingleDateTime(value)
              }
            }}
            showTime={true}
            use12Hour={false}
          />
          {singleDateTime && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDateTime, "PPP p")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date + Time (12-Hour)</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="single"
            value={singleDateTime}
            onChange={(value) => {
              if (value instanceof Date) {
                setSingleDateTime(value)
              }
            }}
            showTime={true}
            use12Hour={true}
          />
          {singleDateTime && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDateTime, "PPP h:mm a")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range + Time</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="range"
            value={rangeDateTime}
            onChange={(value) => {
              if (value && typeof value === "object" && "from" in value) {
                setRangeDateTime(value)
              }
            }}
            showTime={true}
            use12Hour={false}
          />
          {rangeDateTime?.from && (
            <p className="text-sm text-muted-foreground">
              {format(rangeDateTime.from, "PPP p")}
              {rangeDateTime.to && ` - ${format(rangeDateTime.to, "PPP p")}`}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range + Time (12-Hour)</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="range"
            value={rangeDateTime}
            onChange={(value) => {
              if (value && typeof value === "object" && "from" in value) {
                setRangeDateTime(value)
              }
            }}
            showTime={true}
            use12Hour={true}
          />
          {rangeDateTime?.from && (
            <p className="text-sm text-muted-foreground">
              {format(rangeDateTime.from, "PPP h:mm a")}
              {rangeDateTime.to && ` - ${format(rangeDateTime.to, "PPP h:mm a")}`}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Only (No Time)</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="single"
            value={singleDateTime}
            onChange={(value) => {
              if (value instanceof Date) {
                setSingleDateTime(value)
              }
            }}
            showTime={false}
          />
          {singleDateTime && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDateTime, "PPP")}
            </p>
          )}
        </div>
      </section>
    </FixtureWrapper>
  )
}
