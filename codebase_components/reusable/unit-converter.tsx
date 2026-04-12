import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { BaseSelect } from "./base-select"
import { Gauge, RotateCcw } from "lucide-react"
import { useState, useEffect } from "react"

type ConversionCategory = "weight" | "dimensions" | "volume_cubic" | "volume_liquid"

interface ConversionUnit {
  label: string
  symbol: string
  toBase: (value: number) => number // Convert to base unit
  fromBase: (value: number) => number // Convert from base unit
}

const CONVERSION_CATEGORIES = {
  weight: {
    label: "Weight",
    unit1: { label: "Pounds", symbol: "lbs", toBase: (v: number) => v * 0.453592, fromBase: (v: number) => v * 2.20462 },
    unit2: { label: "Kilograms", symbol: "kg", toBase: (v: number) => v, fromBase: (v: number) => v },
  },
  dimensions: {
    label: "Dimensions",
    unit1: { label: "Feet", symbol: "ft", toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v * 3.28084 },
    unit2: { label: "Meters", symbol: "m", toBase: (v: number) => v, fromBase: (v: number) => v },
  },
  volume_cubic: {
    label: "Volume (Cubic)",
    unit1: { label: "Cubic Feet", symbol: "ft³", toBase: (v: number) => v * 0.0283168, fromBase: (v: number) => v * 35.3147 },
    unit2: { label: "Cubic Meters", symbol: "m³", toBase: (v: number) => v, fromBase: (v: number) => v },
  },
  volume_liquid: {
    label: "Volume (Liquid)",
    unit1: { label: "Gallons", symbol: "gal", toBase: (v: number) => v * 3.78541, fromBase: (v: number) => v * 0.264172 },
    unit2: { label: "Liters", symbol: "L", toBase: (v: number) => v, fromBase: (v: number) => v },
  },
} as const

const CATEGORY_OPTIONS = [
  { value: "weight", label: "Weight (lbs ↔ kg)" },
  { value: "dimensions", label: "Dimensions (ft ↔ m)" },
  { value: "volume_cubic", label: "Volume - Cubic (ft³ ↔ m³)" },
  { value: "volume_liquid", label: "Volume - Liquid (gal ↔ L)" },
]

function formatNumber(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) return ""
  // Format with appropriate decimal places
  // For large numbers (6+ digits), show fewer decimals
  if (value >= 1000000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }
  if (value >= 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 4 })
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: 6, minimumFractionDigits: 0 })
}

export function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>("weight")
  const [value1, setValue1] = useState<string>("")
  const [value2, setValue2] = useState<string>("")
  const [isConvertingFrom1, setIsConvertingFrom1] = useState(false)
  const [isConvertingFrom2, setIsConvertingFrom2] = useState(false)

  const currentCategory = CONVERSION_CATEGORIES[category]

  // Convert from unit1 to unit2
  const convertToUnit2 = (val: number): number => {
    if (Number.isNaN(val) || val === 0) return 0
    const baseValue = currentCategory.unit1.toBase(val)
    return currentCategory.unit2.fromBase(baseValue)
  }

  // Convert from unit2 to unit1
  const convertToUnit1 = (val: number): number => {
    if (Number.isNaN(val) || val === 0) return 0
    const baseValue = currentCategory.unit2.toBase(val)
    return currentCategory.unit1.fromBase(baseValue)
  }

  // Handle input change for unit1
  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue1(inputValue)

    if (inputValue === "" || inputValue === "-" || inputValue === ".") {
      setValue2("")
      setIsConvertingFrom1(false)
      setIsConvertingFrom2(false)
      return
    }

    const numValue = Number.parseFloat(inputValue)
    if (!Number.isNaN(numValue) && Number.isFinite(numValue)) {
      setIsConvertingFrom1(true)
      setIsConvertingFrom2(false)
      const converted = convertToUnit2(numValue)
      setValue2(formatNumber(converted))
    } else {
      setValue2("")
    }
  }

  // Handle input change for unit2
  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue2(inputValue)

    if (inputValue === "" || inputValue === "-" || inputValue === ".") {
      setValue1("")
      setIsConvertingFrom1(false)
      setIsConvertingFrom2(false)
      return
    }

    const numValue = Number.parseFloat(inputValue)
    if (!Number.isNaN(numValue) && Number.isFinite(numValue)) {
      setIsConvertingFrom1(false)
      setIsConvertingFrom2(true)
      const converted = convertToUnit1(numValue)
      setValue1(formatNumber(converted))
    } else {
      setValue1("")
    }
  }

  // Reset when category changes
  useEffect(() => {
    setValue1("")
    setValue2("")
    setIsConvertingFrom1(false)
    setIsConvertingFrom2(false)
  }, [category])

  const handleClear = () => {
    setValue1("")
    setValue2("")
    setIsConvertingFrom1(false)
    setIsConvertingFrom2(false)
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Gauge className="w-5 h-5 text-primary flex-shrink-0" />
        <h3 className="font-semibold text-lg">Unit Converter</h3>
      </div>

      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-col gap-2">
          <label htmlFor="conversion-category" className="text-sm font-medium text-gray-700">
            Conversion Type
          </label>
          <BaseSelect
            items={CATEGORY_OPTIONS}
            placeholder="Select conversion type"
            value={category}
            onChange={(value) => setCategory(value as ConversionCategory)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="unit1-input" className="text-sm font-medium text-gray-700">
              {currentCategory.unit1.label} ({currentCategory.unit1.symbol})
            </label>
            <Input
              id="unit1-input"
              type="text"
              inputMode="decimal"
              placeholder="Enter value"
              value={value1}
              onChange={handleValue1Change}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-center text-gray-400 text-2xl font-bold">
            ↔
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="unit2-input" className="text-sm font-medium text-gray-700">
              {currentCategory.unit2.label} ({currentCategory.unit2.symbol})
            </label>
            <Input
              id="unit2-input"
              type="text"
              inputMode="decimal"
              placeholder="Enter value"
              value={value2}
              onChange={handleValue2Change}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="w-full flex-shrink-0">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {(value1 || value2) && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg flex-shrink-0">
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Conversion Info</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <strong>Category:</strong> {currentCategory.label}
              </p>
              {value1 && value2 && (
                <p>
                  <strong>Formula:</strong> {currentCategory.unit1.symbol} ×{" "}
                  {(
                    currentCategory.unit1.toBase(1) * currentCategory.unit2.fromBase(1)
                  ).toFixed(6)}{" "}
                  = {currentCategory.unit2.symbol}
                </p>
              )}
            </div>
          </div>
        )}

        {!value1 && !value2 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
            <Gauge className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-medium text-gray-600 mb-1">Unit Converter</p>
            <p className="text-sm text-gray-400 text-center">
              Select a conversion type and enter a value in either field to see the conversion
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

