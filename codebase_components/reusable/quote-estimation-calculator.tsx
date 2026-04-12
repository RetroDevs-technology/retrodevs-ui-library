import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { FormBase, FormField } from "./base-form"
import { BaseSelect } from "./base-select"
import { numberInputHandler } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calculator } from "lucide-react"
import { useState } from "react"

const quoteEstimationSchema = z.object({
  miles: z.coerce.number().min(0.01, "Miles must be greater than 0"),
  commodityType: z.enum(["dry_van", "tanker", "hazmat"], {
    required_error: "Please select a commodity type",
  }),
  driverType: z.enum(["solo", "team"], {
    required_error: "Please select driver type",
  }),
  weight: z.coerce.number().min(1, "Weight is required").max(45000, "Maximum weight is 45,000 lbs"),
  isUrgent: z.boolean(),
})

type QuoteEstimationFormData = z.infer<typeof quoteEstimationSchema>

interface EstimationResult {
  miles: number
  baseRatePerMile: number
  rateRange: { min: number; max: number }
  subtotal: { min: number; max: number }
  dispatcherBonus: number
  total: { min: number; max: number }
  breakdown: {
    label: string
    value: string
  }[]
}

const COMMODITY_OPTIONS = [
  {
    value: "dry_van",
    label: "Dry Van",
    description: "Standard dry van shipment",
  },
  {
    value: "tanker",
    label: "Tanker Endorsement Required",
    description: "Commodity requires tanker endorsement",
  },
  {
    value: "hazmat",
    label: "Hazmat Required",
    description: "Hazardous materials - verification needed",
  },
]

const DRIVER_TYPE_OPTIONS = [
  { value: "solo", label: "Solo Driver" },
  { value: "team", label: "Team Drivers (Critical/Hot Load)" },
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function calculateEstimate(data: QuoteEstimationFormData, miles: number): EstimationResult {
  // Base rates per mile based on commodity type
  let baseRateMin = 0
  let baseRateMax = 0

  if (data.commodityType === "dry_van") {
    baseRateMin = 2.8
    baseRateMax = 3.5
  } else if (data.commodityType === "tanker") {
    baseRateMin = 3.1
    baseRateMax = 4.0
  } else if (data.commodityType === "hazmat") {
    baseRateMin = 4.0
    baseRateMax = 7.0
  }

  // Team drivers (critical/hot load) adjustment
  if (data.driverType === "team" || data.isUrgent) {
    if (data.commodityType === "dry_van") {
      baseRateMin = 3.0
      baseRateMax = 4.0
    } else if (data.commodityType === "tanker") {
      baseRateMin = Math.max(baseRateMin, 3.5)
      baseRateMax = Math.max(baseRateMax, 4.5)
    } else if (data.commodityType === "hazmat") {
      baseRateMin = Math.max(baseRateMin, 4.5)
      baseRateMax = Math.max(baseRateMax, 7.5)
    }
  }

  // Calculate subtotal
  const subtotalMin = miles * baseRateMin
  const subtotalMax = miles * baseRateMax

  // Dispatcher bonus: $0.15 per mile
  const dispatcherBonus = miles * 0.15

  // Total (subtotal + dispatcher bonus)
  const totalMin = subtotalMin + dispatcherBonus
  const totalMax = subtotalMax + dispatcherBonus

  const breakdown = [
    { label: "Distance", value: `${miles.toLocaleString()} miles` },
    {
      label: "Rate per mile",
      value: `${formatCurrency(baseRateMin)} - ${formatCurrency(baseRateMax)}`,
    },
    {
      label: "Subtotal",
      value: `${formatCurrency(subtotalMin)} - ${formatCurrency(subtotalMax)}`,
    },
    { label: "Dispatcher bonus ($0.15/mile)", value: formatCurrency(dispatcherBonus) },
    {
      label: "Total Estimate",
      value: `${formatCurrency(totalMin)} - ${formatCurrency(totalMax)}`,
    },
  ]

  return {
    miles,
    baseRatePerMile: (baseRateMin + baseRateMax) / 2,
    rateRange: { min: baseRateMin, max: baseRateMax },
    subtotal: { min: subtotalMin, max: subtotalMax },
    dispatcherBonus,
    total: { min: totalMin, max: totalMax },
    breakdown,
  }
}

export function QuoteEstimationCalculator() {
  const [estimation, setEstimation] = useState<EstimationResult | null>(null)

  const form = useForm<QuoteEstimationFormData>({
    resolver: zodResolver(quoteEstimationSchema),
    defaultValues: {
      miles: 0,
      commodityType: "dry_van",
      driverType: "solo",
      weight: 0,
      isUrgent: false,
    },
  })

  const handleCalculate = (data: QuoteEstimationFormData) => {
    // Calculate estimate using the input miles
    const result = calculateEstimate(data, data.miles)
    setEstimation(result)
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Calculator className="w-5 h-5 text-primary flex-shrink-0" />
        <h3 className="font-semibold text-lg">Quote Estimation Calculator</h3>
      </div>

      <FormBase form={form} onSubmit={handleCalculate} className="flex flex-col gap-4 min-w-0">
        <div className="grid grid-cols-1 gap-4">
          <FormField form={form} name="miles" label="Miles" showError showMessage>
            <Input
              type="number"
              placeholder="Enter miles"
              min={0.01}
              step="0.01"
              value={form.watch("miles") || ""}
              onChange={numberInputHandler((value) => form.setValue("miles", value ?? 0), "float", 0)}
              className="w-full"
            />
          </FormField>

          <FormField form={form} name="weight" label="Weight (lbs)" showError showMessage>
            <Input
              type="number"
              placeholder="Enter weight"
              min={1}
              max={45000}
              value={form.watch("weight") || ""}
              onChange={numberInputHandler((value) => form.setValue("weight", value ?? 0), "float", 0)}
              className="w-full"
            />
          </FormField>

          <FormField
            form={form}
            name="commodityType"
            label="Commodity Type"
            showError
            showMessage>
            <BaseSelect
              items={COMMODITY_OPTIONS.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              placeholder="Select commodity type"
              value={form.watch("commodityType")}
              onChange={(value) => form.setValue("commodityType", value as any)}
              className="w-full"
              contentClassName="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-3rem)]"
            />
          </FormField>

          <FormField
            form={form}
            name="driverType"
            label="Driver Type"
            showError
            showMessage>
            <BaseSelect
              items={DRIVER_TYPE_OPTIONS}
              placeholder="Select driver type"
              value={form.watch("driverType")}
              onChange={(value) => form.setValue("driverType", value as any)}
              className="w-full"
              contentClassName="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-3rem)]"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <input
            type="checkbox"
            id="isUrgent"
            checked={form.watch("isUrgent")}
            onChange={(e) => form.setValue("isUrgent", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
          />
          <label htmlFor="isUrgent" className="text-sm font-medium text-gray-700">
            Urgent/Critical Load
          </label>
        </div>

        {form.watch("commodityType") === "hazmat" && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex-shrink-0">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Hazmat shipments require verification before finalizing the
              quote.
            </p>
          </div>
        )}

        <Button type="submit" className="w-full flex-shrink-0">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Estimate
        </Button>

        {estimation && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3 flex-shrink-0">
            <h4 className="font-semibold text-lg mb-3">Estimation Results</h4>
            {estimation.breakdown.map((item, idx) => (
              <div
                key={item.label}
                className={`flex justify-between items-start gap-2 ${idx === estimation.breakdown.length - 1
                  ? "pt-3 border-t border-gray-300 font-bold text-lg"
                  : ""
                  }`}>
                <span className="text-sm text-gray-700 flex-shrink-0">{item.label}:</span>
                <span
                  className={`text-sm text-right ${idx === estimation.breakdown.length - 1
                    ? "text-primary font-bold"
                    : "text-gray-900 font-medium"
                    }`}>
                  {item.value}
                </span>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Disclaimer:</strong> This is an estimated quote. Final pricing may vary
                based on driver availability, market conditions, and other factors. Please verify
                with management before finalizing.
              </p>
            </div>
          </div>
        )}
      </FormBase>
    </div>
  )
}

