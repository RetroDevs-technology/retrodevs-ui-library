import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ControllerRenderProps } from "react-hook-form"

export function BaseCheckbox({
  data,
  value,
  onChange,
}: {
  data: IBaseCheckbox
} & Partial<ControllerRenderProps>) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-start gap-1.5">
        {data.description && <p className="text-xs">{data.description}</p>}
        {data.items.map((item) => (
          <div key={item.id} className="flex gap-1.5">
            <Label htmlFor={item.id} className="text-xs font-medium">
              {item.label}
            </Label>

            <Checkbox
              id={item.id}
              checked={value === item.id}
              onCheckedChange={(checked) => {
                onChange?.(checked ? item.id : "")
              }}
              className="size-4"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export interface IBaseCheckbox {
  description?: string
  items: { label: string; id: string }[]
}
