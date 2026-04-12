import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ControllerRenderProps } from "react-hook-form"
import BaseTooltip from "./base-tooltip"
import { HelpCircle } from "lucide-react"

export interface ICheckboxGroupItem {
  id: string
  label: string
  tooltip?: string
}

interface BaseCheckboxGroupProps {
  data: ICheckboxGroupItem[]
  value?: string[]
  onChange?: (value: string[]) => void
  className?: string
}

export function BaseCheckboxGroup({
  data,
  value = [],
  onChange,
  className,
}: BaseCheckboxGroupProps & Partial<ControllerRenderProps>) {
  const handleCheckedChange = (itemId: string, checked: boolean) => {
    if (!onChange) return

    if (checked) {
      onChange([...value, itemId])
    } else {
      onChange(value.filter((id: string) => id !== itemId))
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            id={item.id}
            checked={value.includes(item.id)}
            onCheckedChange={(checked) => handleCheckedChange(item.id, checked as boolean)}
          />
          <Label
            htmlFor={item.id}
            className={cn(
              "flex items-center gap-2 cursor-pointer text-sm font-normal",
              "hover:text-primary",
            )}>
            {item.label}
            {item.tooltip && (
              <BaseTooltip content={item.tooltip} side="top" align="start">
                <HelpCircle className="size-4 text-muted-foreground cursor-help" />
              </BaseTooltip>
            )}
          </Label>
        </div>
      ))}
    </div>
  )
}

