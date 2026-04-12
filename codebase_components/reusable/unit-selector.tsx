import { BaseSelect } from "./base-select"
import type { ControllerRenderProps } from "react-hook-form"

export type DimensionUnit = "in" | "ft" | "cm" | "m"
export type WeightUnit = "lbs" | "kg"

interface UnitSelectorProps {
  type: "dimension" | "weight"
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const dimensionUnits: { value: DimensionUnit; label: string }[] = [
  { value: "in", label: "in" },
  { value: "ft", label: "ft" },
  { value: "cm", label: "cm" },
  { value: "m", label: "m" },
]

const weightUnits: { value: WeightUnit; label: string }[] = [
  { value: "lbs", label: "lbs" },
  { value: "kg", label: "kg" },
]

export function UnitSelector({
  type,
  value,
  onChange,
  className,
}: UnitSelectorProps & Partial<ControllerRenderProps>) {
  const items = type === "dimension" ? dimensionUnits : weightUnits

  return (
    <BaseSelect
      placeholder=""
      items={items}
      value={value}
      onChange={onChange}
      triggerClassName={`w-[80px] h-10 bg-white ${className || ""}`}
    />
  )
}

