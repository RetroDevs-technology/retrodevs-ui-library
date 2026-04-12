import { useState } from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Calendar } from "../src/components/core/calendar"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function CalendarShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  const [singleCaption] = useFixtureInput("calendarSingleSelectionCaption", "Selected:")
  const [rangeCaption] = useFixtureInput("calendarRangeSelectionCaption", "Range:")
  const [restrictionHint] = useFixtureInput(
    "calendarPastDatesHint",
    "Past dates are disabled",
  )
  const [blockPast] = useFixtureInput("calendarBlockPastDates", true)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date Selection</h2>
        <div className="space-y-2">
          <Calendar mode="single" selected={singleDate} onSelect={setSingleDate} />
          {singleDate && (
            <p className="text-sm text-muted-foreground">
              {singleCaption} {format(singleDate, "PPP")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Date Range Selection</h2>
        <div className="space-y-2">
          <Calendar mode="range" selected={rangeDate} onSelect={setRangeDate} />
          {rangeDate?.from && (
            <p className="text-sm text-muted-foreground">
              {rangeCaption}{" "}
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
            disabled={blockPast ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) : undefined}
            selected={singleDate}
            onSelect={setSingleDate}
          />
          <p className="text-sm text-muted-foreground">{restrictionHint}</p>
        </div>
      </section>
    </FixtureWrapper>
  )
}
