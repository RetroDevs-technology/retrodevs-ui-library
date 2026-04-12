import { BaseSelect } from "./base-select"
import type { ControllerRenderProps } from "react-hook-form"

export type TemperatureUnit = "°F" | "°C"

interface TemperatureUnitSelectorProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const temperatureUnits: { value: TemperatureUnit; label: string }[] = [
  { value: "°F", label: "°F" },
  { value: "°C", label: "°C" },
]

export function TemperatureUnitSelector({
  value,
  onChange,
  className,
}: TemperatureUnitSelectorProps & Partial<ControllerRenderProps>) {
  return (
    <BaseSelect
      placeholder=""
      items={temperatureUnits}
      value={value}
      onChange={onChange}
      triggerClassName={`w-[80px] h-10 bg-white ${className || ""}`}
    />
  )
}

