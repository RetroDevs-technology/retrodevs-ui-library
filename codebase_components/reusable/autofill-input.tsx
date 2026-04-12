import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface AutofillSuggestion {
  id: string
  label: string
}

interface AutofillInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  suggestions?: AutofillSuggestion[]
  onSuggestionSelect?: (suggestion: AutofillSuggestion) => void
  onManualEntry?: () => void
  showManualEntry?: boolean
  onChange?: (value: string) => void
}

export function AutofillInput({
  suggestions = [],
  onSuggestionSelect,
  onManualEntry,
  showManualEntry = true,
  onChange,
  className,
  ...props
}: AutofillInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<AutofillSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchValue, setSearchValue] = useState("")
  const [isManualMode, setIsManualMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange?.(value)

    // If user starts typing in manual mode, reset to normal mode
    if (isManualMode && value.length > 0) {
      setIsManualMode(false)
    }

    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
      setIsOpen(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setIsOpen(false)
      setFilteredSuggestions([])
      // Reset manual mode when input is cleared
      setIsManualMode(false)
    }
  }

  const handleInputFocus = () => {
    if (!isManualMode && suggestions.length > 0) {
      setFilteredSuggestions(suggestions)
      setIsOpen(true)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearchValue("")
      setFilteredSuggestions([])
      setSelectedIndex(-1)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
      setSelectedIndex(-1)
    } else {
      setFilteredSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: AutofillSuggestion) => {
    onChange?.(suggestion.label)
    onSuggestionSelect?.(suggestion)
    setIsOpen(false)
    setFilteredSuggestions([])
    setIsManualMode(false)
    inputRef.current?.focus()
  }

  const handleManualEntry = () => {
    setIsManualMode(true)
    setIsOpen(false)
    setFilteredSuggestions([])
    setSearchValue("")
    onManualEntry?.()
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const resetManualMode = () => {
    setIsManualMode(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            className={cn("pr-8 w-full", className)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            {...props}
          />
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              if (suggestions.length > 0) {
                setFilteredSuggestions(suggestions)
                setIsOpen(!isOpen)
              }
            }}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="start" side="right" sideOffset={8}>
        <div className="p-3 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Autofill details</h4>
          <Input
            ref={searchInputRef}
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="w-full"
          />
        </div>

        <div className="p-2 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                selectedIndex === index && "bg-blue-50 text-blue-900",
              )}
              onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.label}
            </button>
          ))}

          {filteredSuggestions.length === 0 && searchValue && (
            <div className="px-3 py-2 text-sm text-gray-500">No suggestions found</div>
          )}

          {showManualEntry && (
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors focus:outline-none mt-2 border-t border-gray-100"
              onClick={handleManualEntry}>
              Enter manually
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
