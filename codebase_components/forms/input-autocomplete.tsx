import { useDebounce } from "@/hooks/use-debounce"
import api from "@/services/http.service"
import * as RadixPopover from "@radix-ui/react-popover"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Button, Input, Popover } from "@/components/ui"
import { PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * Represents a dropdown option with label, value, and full data
 */
export interface SearchableInputOption<T> {
  label: string
  value: T[keyof T]
  extra: T
}

interface SearchableInputProps<T extends object> {
  title?: string
  placeholder?: string
  valueKey: keyof T
  labelKey: (item: T) => string
  fetchKey: keyof typeof queries
  onSelect: (selected: T | string | null) => void
  defaultValue?: T
  params?: Record<string, string | number | boolean>
  onSearch?: (query: string) => Promise<T[]>
  allowTypedInput?: boolean
}

function SearchableInput<T extends object>({
  title,
  placeholder = "Search...",
  valueKey,
  labelKey,
  fetchKey,
  onSelect,
  defaultValue,
  params,
  onSearch,
  allowTypedInput = false,
}: SearchableInputProps<T>) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SearchableInputOption<T> | null>(null)

  const defVal = useMemo(() => {
    if (!defaultValue) return null
    return {
      label: labelKey(defaultValue),
      value: defaultValue[valueKey],
      extra: defaultValue,
    }
  }, [defaultValue, labelKey, valueKey])

  const { data, isLoading } = useQuery<T[]>({
    queryKey: [debouncedSearch, fetchKey],
    queryFn: async () => {
      if (onSearch) {
        return await onSearch(debouncedSearch) // ✅ directly T[]
      }

      const res = await api.get<{
        data: T[]
        meta: any
      }>(`/${queries[fetchKey]}`, {
        params: {
          ...queryParams,
          search: debouncedSearch,
          ...params,
        },
      })

      return res.data.data // ✅ directly T[]
    },
    enabled: debouncedSearch.length >= 2,
  })

  const options: SearchableInputOption<T>[] = useMemo(() => {
    const searchResults = data
      ? data.map((item) => ({
        label: labelKey(item),
        value: item[valueKey],
        extra: item,
      }))
      : []

    // Add typed input as first option if user has typed something and allowTypedInput is enabled
    if (allowTypedInput && search.trim() && search.trim().length >= 2) {
      const typedOption: SearchableInputOption<T> = {
        label: `"${search.trim()}" (add new)`,
        value: search.trim() as unknown as T[keyof T],
        extra: search.trim() as unknown as T,
      }
      return [typedOption, ...searchResults]
    }

    return searchResults
  }, [data, labelKey, valueKey, search, allowTypedInput])

  const handleSelect = useCallback(
    (opt: SearchableInputOption<T>) => {
      setSelected(opt)

      // If it's a typed option, show just the typed text without the "(add new)" suffix
      if (opt.label.includes("(add new)")) {
        const typedText = opt.label.replace('"', "").replace('" (add new)', "")
        setSearch(typedText)
        onSelect(typedText) // Return the string directly
      } else {
        setSearch(opt.label)
        onSelect(opt.extra as T) // Return the full object
      }

      setOpen(false)
    },
    [onSelect],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        // If user has typed something and allowTypedInput is enabled, return the search term
        if (allowTypedInput && search.trim() && search.trim().length >= 2) {
          onSelect(search.trim())
          setOpen(false)
        }
      }
    },
    [search, onSelect, allowTypedInput],
  )

  useEffect(() => {
    if (defVal) {
      setSelected(defVal)
      setSearch(defVal.label) // Set the search input to show the default value's label
    }
  }, [defVal])

  return (
    <div className="w-full">
      {title && <p className="text-sm text-[#141414] mb-2">{title}</p>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <Input
            className="w-full"
            placeholder={placeholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setOpen(true)
            }}
            onKeyDown={handleKeyDown}
          />
        </PopoverTrigger>

        <RadixPopover.Content
          side="bottom" // force below
          align="start" // left-align with trigger (you can also use "center" or "end")
          sideOffset={4} // spacing from the trigger
          avoidCollisions={false}
          className="min-w-[var(--radix-popover-trigger-width)] z-[9999] bg-white p-2 shadow-md rounded-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}>
          <ScrollArea className="max-h-[250px] flex flex-col pr-1">
            {isLoading && <div className="p-2 text-sm">Loading...</div>}
            {!isLoading && options.length === 0 && (
              <div className="p-2 text-sm">No results found</div>
            )}
            <ul className="flex flex-col gap-1">
              {options.map((item, index) => {
                const isTypedOption = item.label.includes("(add new)")
                return (
                  <RadixPopover.Close asChild key={String(item.value)}>
                    <Button
                      onClick={() => handleSelect(item)}
                      className={`text-start justify-start text-sm h-8 ${isTypedOption
                        ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-blue-800"
                        : "bg-[#F0F0F0] text-[#141414] hover:bg-gray-800 hover:text-white"
                        }`}>
                      <div className="flex items-center gap-2">
                        <span className={isTypedOption ? "font-medium" : ""}>{item.label}</span>
                      </div>
                    </Button>
                  </RadixPopover.Close>
                )
              })}
            </ul>
          </ScrollArea>
        </RadixPopover.Content>
      </Popover>
    </div>
  )
}

export default SearchableInput

const queries = {
  drivers: "admin/drivers",
  contacts: "shipping-requests/contacts",
  users: "chats/users",
}

const queryParams = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  search: "",
}
