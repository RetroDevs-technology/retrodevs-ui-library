import type { ControllerRenderProps } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

export function BaseBooleanCheckbox({
  value,
  onChange,
  id,
  label,
}: {
  id: string
  label: string
} & Partial<ControllerRenderProps>) {
  return (
    <div className="w-full flex justify-between">
      <Label htmlFor={id} className="text-sm font-medium leading-[100%] text-graphite">
        {label}
      </Label>

      <Checkbox
        id={id}
        checked={value}
        onCheckedChange={(checked) => {
          onChange?.(checked === true)
        }}
        className="size-[18px] hover:border-primary-600 transition-colors duration-200"
      />
    </div>
  )
}
