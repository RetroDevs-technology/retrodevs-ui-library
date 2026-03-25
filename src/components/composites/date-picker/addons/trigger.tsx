
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/core/button"

interface DatePickerTriggerProps {
  /** Display value to show in the trigger */
  displayValue: string
  /** Whether a date is selected */
  hasValue: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Trigger button component for the date picker.
 * Displays the selected date or placeholder with a calendar icon.
 */
export function DatePickerTrigger({
  displayValue,
  hasValue,
  className,
}: DatePickerTriggerProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !hasValue && "text-muted-foreground",
        className
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {displayValue}
    </Button>
  )
}
