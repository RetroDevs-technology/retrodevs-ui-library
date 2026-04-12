import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

interface TableSearchProps {
  /** Search placeholder text */
  placeholder?: string
  /** Current search value */
  value?: string
  /** Search change handler */
  onChange?: (value: string) => void
  /** Search submit handler */
  onSubmit?: (value: string) => void
  /** Clear search handler */
  onClear?: () => void
  /** Minimum characters before searching */
  minSearchLength?: number
}

export function TableSearch({
  placeholder = "Search by number / item / status...",
  value = "",
  onChange,
  onSubmit,
  onClear,
  minSearchLength = 4,
}: TableSearchProps) {
  const [localValue, setLocalValue] = useState(value)

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value)
  }, [value])
  return (
    <div className="flex items-center w-full max-w-sm lg:max-w-none">
      {/* Search Input */}
      <div className="relative flex-1 w-full lg:w-[481px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="size-5" />
        </span>
        <Input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => {
            const newValue = e.target.value
            setLocalValue(newValue)
            // Only trigger search if value is empty (to clear) or meets minimum length
            if (newValue === "" || newValue.length >= minSearchLength) {
              onChange?.(newValue)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit?.(localValue)
            }
          }}
          className="pl-10 pr-10 h-10 rounded-full bg-white border border-[#E5E7EB] shadow-none text-sm placeholder:text-[#B0B7C3] focus:border-[#0046C9] focus:ring-0"
        />
        {localValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLocalValue("")
              onClear?.()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full">
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default TableSearch
