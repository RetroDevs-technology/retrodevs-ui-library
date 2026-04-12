import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useState } from "react"

interface ArrayInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
  id: string
  label?: string
  error?: string
  required?: boolean
}

export function ArrayInput({
  value = [],
  onChange,
  placeholder = "Enter a value and press Enter",
  className,
  id,
  label,
  error,
  required = false,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addItem(inputValue.trim())
    }
  }

  const addItem = (item: string) => {
    if (item && !value.includes(item)) {
      onChange([...value, item])
      setInputValue("")
    }
  }

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className={cn("block text-sm font-medium text-gray-700 mb-2", error && "text-red-600")}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="space-y-2">
        <Input
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={cn("h-12", error && "border-red-500 focus-visible:ring-red-500", className)}
        />

        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((item, index) => (
              <div
                key={item}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-blue-200"
                  onClick={() => removeItem(index)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
