import { Checkbox, Input, Textarea } from "@/components/ui"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { BaseSelect } from "./base-select"

interface DynamicFieldProps {
  type: "text" | "email" | "number" | "date" | "select" | "checkbox" | "yesno" | "textarea"
  value: any
  onChange: (value: any) => void
  placeholder?: string
  className?: string
  id: string
  items?: Array<{ value: string; label: string }>
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: ReactNode
}

export function DynamicField({
  type,
  value,
  onChange,
  placeholder,
  className,
  id,
  items = [],
  checked = false,
  onCheckedChange,
  children,
}: DynamicFieldProps) {
  const baseClassName = "h-10"

  switch (type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseClassName, className)}
        />
      )

    case "textarea":
      return (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseClassName, className)}
        />
      )

    case "select":
      return (
        <BaseSelect
          items={items}
          placeholder={placeholder || ""}
          value={value}
          onChange={onChange}
          className={className}
        />
      )

    case "checkbox":
      return (
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={cn("h-5 w-5", className)}
        />
      )

    case "yesno":
      return (
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-yes`}
              checked={value === true}
              onCheckedChange={(checked) => onChange(checked ? true : null)}
              className={cn("h-5 w-5", className)}
            />
            <label
              htmlFor={`${id}-yes`}
              className="text-sm font-medium text-gray-700 cursor-pointer">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-no`}
              checked={value === false}
              onCheckedChange={(checked) => onChange(checked ? false : null)}
              className={cn("h-5 w-5", className)}
            />
            <label
              htmlFor={`${id}-no`}
              className="text-sm font-medium text-gray-700 cursor-pointer">
              No
            </label>
          </div>
        </div>
      )

    default:
      return children || null
  }
}
