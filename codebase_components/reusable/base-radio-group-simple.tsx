import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { ControllerRenderProps } from "react-hook-form"
import BaseTooltip from "./base-tooltip"
import { HelpCircle } from "lucide-react"

export interface IRadioGroupSimpleItem {
  value: string
  label: string
  tooltip?: string
}

interface BaseRadioGroupSimpleProps {
  data: IRadioGroupSimpleItem[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function BaseRadioGroupSimple({
  data,
  value,
  onChange,
  className,
}: BaseRadioGroupSimpleProps & Partial<ControllerRenderProps>) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className={cn("flex flex-col gap-3", className)}>
      {data.map((item) => (
        <div key={item.value} className="flex items-center gap-2">
          <RadioGroupItem value={item.value} id={item.value} />
          <Label
            htmlFor={item.value}
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
    </RadioGroup>
  )
}

