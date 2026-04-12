import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { DynamicField } from "./dynamic-field"

interface FieldWrapperProps {
  type: "text" | "email" | "number" | "date" | "select" | "checkbox" | "yesno" | "textarea"
  id: string
  label: string
  value: any
  onChange: (value: any) => void
  placeholder?: string
  className?: string
  items?: Array<{ value: string; label: string }>
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  error?: string
  required?: boolean
  children?: ReactNode
}

export function FieldWrapper({
  type,
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  items = [],
  checked = false,
  onCheckedChange,
  error,
  required = false,
  children,
}: FieldWrapperProps) {
  // For checkboxes, use checked and onCheckedChange instead of value and onChange
  const checkboxValue = type === "checkbox" ? checked : value
  const checkboxOnChange = type === "checkbox" ? onCheckedChange : onChange
  const textareaValue = type === "textarea" ? value : ""
  const textareaOnChange = type === "textarea" ? onChange : () => {}
  return (
    <div className="flex flex-col ">
      <label
        htmlFor={id}
        className={cn("block text-sm font-medium text-gray-700 mb-2", error && "text-red-600")}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <DynamicField
        type={type}
        id={id}
        value={checkboxValue}
        onChange={checkboxOnChange as (value: any) => void}
        placeholder={placeholder}
        className={cn(className, error && "border-red-500 focus-visible:ring-red-500")}
        items={items}
        checked={checked}
        onCheckedChange={onCheckedChange}>
        {children}
      </DynamicField>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
