import { useState } from "react"
import { format } from "date-fns"

import { BaseDateTimePicker } from "../src/components/composites/date-time-picker"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function DateTimePickerShowcase() {
  const [singleDateTime, setSingleDateTime] = useState<Date | undefined>(new Date())
  const [rangeDateTime, setRangeDateTime] = useState<{ from?: Date; to?: Date } | undefined>()

  const [showTime] = useFixtureInput("dateTimeShowTime", true)
  const [use12Hour] = useFixtureInput("dateTimeUse12Hour", false)
  const [rangeShowTime] = useFixtureInput("dateTimeRangeShowTime", true)
  const [rangeUse12] = useFixtureInput("dateTimeRangeUse12Hour", false)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date + Time (live)</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Toggle 24h vs 12h and show/hide time from the fixture panel.
        </p>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="single"
            value={singleDateTime}
            onChange={(value) => {
              if (value instanceof Date) {
                setSingleDateTime(value)
              }
            }}
            showTime={showTime}
            use12Hour={use12Hour}
          />
          {singleDateTime && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(singleDateTime, showTime ? (use12Hour ? "PPP h:mm a" : "PPP p") : "PPP")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range + Time (live)</h2>
        <div className="space-y-2">
          <BaseDateTimePicker
            mode="range"
            value={rangeDateTime}
            onChange={(value) => {
              if (value && typeof value === "object" && "from" in value) {
                setRangeDateTime(value)
              }
            }}
            showTime={rangeShowTime}
            use12Hour={rangeUse12}
          />
          {rangeDateTime?.from && (
            <p className="text-sm text-muted-foreground">
              {format(
                rangeDateTime.from,
                rangeShowTime ? (rangeUse12 ? "PPP h:mm a" : "PPP p") : "PPP",
              )}
              {rangeDateTime.to &&
                ` - ${format(rangeDateTime.to, rangeShowTime ? (rangeUse12 ? "PPP h:mm a" : "PPP p") : "PPP")}`}
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
