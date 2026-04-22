import * as React from "react"

import { Button } from "@/components/core/button"
import { Input } from "@/components/core/input"
import { ScrollArea } from "@/components/core/scroll-area"
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value"
import { cn } from "@/lib/utils"

export interface AutocompleteOption<T> {
  label: string
  value: string
  data: T
  isTyped?: boolean
}

export interface InputAutocompleteProps<T> {
  title?: string
  placeholder?: string
  /** Minimum query length before calling `loadOptions` */
  minQueryLength?: number
  debounceMs?: number
  loadOptions: (query: string) => Promise<T[]>
  getOptionLabel: (item: T) => string
  getOptionValue: (item: T) => string
  onSelect: (selected: T | string) => void
  defaultValue?: T | null
  allowTypedInput?: boolean
  className?: string
  inputClassName?: string
  listClassName?: string
}

export function InputAutocomplete<T>({
  title,
  placeholder = "Search...",
  minQueryLength = 2,
  debounceMs = 400,
  loadOptions,
  getOptionLabel,
  getOptionValue,
  onSelect,
  defaultValue = null,
  allowTypedInput = false,
  className,
  inputClassName,
  listClassName,
}: InputAutocompleteProps<T>) {
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, debounceMs)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [options, setOptions] = React.useState<T[]>([])

  React.useEffect(() => {
    if (defaultValue) {
      setSearch(getOptionLabel(defaultValue))
    }
  }, [defaultValue, getOptionLabel])

  React.useEffect(() => {
    let cancelled = false
    if (debouncedSearch.length < minQueryLength) {
      setOptions([])
      setLoading(false)
      return
    }
    setLoading(true)
    void loadOptions(debouncedSearch).then((rows) => {
      if (!cancelled) {
        setOptions(rows)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [debouncedSearch, loadOptions, minQueryLength])

  const mapped: AutocompleteOption<T>[] = React.useMemo(() => {
    const base = options.map((item) => ({
      label: getOptionLabel(item),
      value: getOptionValue(item),
      data: item,
      isTyped: false as const,
    }))
    if (allowTypedInput && search.trim().length >= minQueryLength) {
      const typed: AutocompleteOption<T> = {
        label: `"${search.trim()}" (add new)`,
        value: `typed:${search.trim()}`,
        data: search.trim() as unknown as T,
        isTyped: true,
      }
      return [typed, ...base]
    }
    return base
  }, [allowTypedInput, getOptionLabel, getOptionValue, minQueryLength, options, search])

  function handleSelect(opt: AutocompleteOption<T>) {
    if (opt.isTyped) {
      const text = search.trim()
      setSearch(text)
      onSelect(text)
    } else {
      setSearch(opt.label)
      onSelect(opt.data)
    }
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && allowTypedInput && search.trim().length >= minQueryLength) {
      onSelect(search.trim())
      setOpen(false)
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      {title ? <p className="text-sm text-[#141414] mb-2">{title}</p> : null}
      <Input
        className={cn("w-full", inputClassName)}
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={handleKeyDown}
      />
      {open && search.length >= minQueryLength ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-popover p-2 shadow-md",
            listClassName
          )}
        >
          <ScrollArea className="max-h-[250px] flex flex-col pr-1">
            {loading ? <div className="p-2 text-sm text-muted-foreground">Loading...</div> : null}
            {!loading && mapped.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">No results found</div>
            ) : null}
            <ul className="flex flex-col gap-1">
              {mapped.map((item) => (
                <li key={item.value}>
                  <Button
                    type="button"
                    variant="ghost"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "text-start justify-start text-sm h-8 w-full px-2 rounded-md",
                      item.isTyped
                        ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-blue-800"
                        : "bg-[#F0F0F0] text-[#141414] hover:bg-gray-800 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      ) : null}
    </div>
  )
}
