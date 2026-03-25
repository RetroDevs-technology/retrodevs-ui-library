import React, { useState } from 'react'
import { TimePicker } from '../src/components/composites/time-picker'
import { FixtureWrapper } from './FixtureWrapper'
import { format } from 'date-fns'

export default function TimePickerShowcase() {
  const [time24, setTime24] = useState<Date | undefined>(new Date())
  const [time12, setTime12] = useState<Date | undefined>(new Date())

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">24-Hour Format</h2>
        <div className="space-y-2">
          <TimePicker
            value={time24}
            onChange={setTime24}
            use12Hour={false}
          />
          {time24 && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(time24, "HH:mm")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">12-Hour Format (AM/PM)</h2>
        <div className="space-y-2">
          <TimePicker
            value={time12}
            onChange={setTime12}
            use12Hour={true}
          />
          {time12 && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(time12, "h:mm a")}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disabled Time Picker</h2>
        <div className="space-y-2">
          <TimePicker
            value={new Date()}
            onChange={() => {}}
            disabled={true}
          />
        </div>
      </section>
    </FixtureWrapper>
  )
}
