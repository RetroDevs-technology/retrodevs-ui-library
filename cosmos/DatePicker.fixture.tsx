import { useState } from "react"
import { format } from "date-fns"

import { BaseDatePicker, DatePicker } from "../src/components/composites/date-picker"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function DatePickerShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<{ from?: Date; to?: Date } | undefined>()
  const [baseSingle, setBaseSingle] = useState<Date | undefined>(undefined)

  const [singlePlaceholder] = useFixtureInput("datePickerSinglePlaceholder", "Pick a date")
  const [rangePlaceholder] = useFixtureInput("datePickerRangePlaceholder", "Pick a date range")
  const [futurePlaceholder] = useFixtureInput("datePickerFuturePlaceholder", "Pick a future date")
  const [blockPast] = useFixtureInput("datePickerBlockPastDates", true)

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">BaseDatePicker (value / onChange, desktop)</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Matches Formatic shipment-style picker; on narrow viewports uses the mobile sheet implementation.
        </p>
        <BaseDatePicker
          mode="single"
          value={baseSingle}
          onChange={(v) => setBaseSingle(v instanceof Date ? v : undefined)}
          placeholder="Pick a date"
        />
        {baseSingle && (
          <p className="text-sm text-muted-foreground">Selected: {format(baseSingle, "PPP")}</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Single Date Picker (legacy)</h2>
        <div className="space-y-2">
          <DatePicker
            date={singleDate}
            onDateChange={setSingleDate}
            placeholder={singlePlaceholder}
          />
          {singleDate && (
            <p className="text-sm text-muted-foreground">Selected: {format(singleDate, "PPP")}</p>
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
            placeholder={rangePlaceholder}
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
            disabled={
              blockPast ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) : undefined
            }
            placeholder={futurePlaceholder}
          />
        </div>
      </section>
    </FixtureWrapper>
  )
}
