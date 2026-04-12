import { FormField } from "./base-form"
import { BaseSelect } from "./base-select"
import { UnitSelector } from "./unit-selector"
import { TemperatureUnitSelector } from "./temperature-unit-selector"
import { BaseRadioGroupSimple } from "./base-radio-group-simple"
import { Input } from "@/components/ui"
import { numberInputHandler } from "@/lib/utils"
import { LabelWithTooltip } from "./label-with-tooltip"
import type { UseFormReturn } from "react-hook-form"
import { X } from "lucide-react"
import { Button } from "@/components/ui"

interface QuoteItemFormProps {
  form: UseFormReturn<any>
  index: number
  onRemove: () => void
  canRemove: boolean
}

const packagingTypes = [
  { value: "pallet", label: "Pallet" },
  { value: "box", label: "Box" },
  { value: "crate", label: "Crate" },
  { value: "drum", label: "Drum" },
  { value: "bag", label: "Bag" },
  { value: "other", label: "Other" },
]

const freightClasses = [
  { value: "50", label: "50" },
  { value: "55", label: "55" },
  { value: "60", label: "60" },
  { value: "65", label: "65" },
  { value: "70", label: "70" },
  { value: "77.5", label: "77.5" },
  { value: "85", label: "85" },
  { value: "92.5", label: "92.5" },
  { value: "100", label: "100" },
  { value: "110", label: "110" },
  { value: "125", label: "125" },
  { value: "150", label: "150" },
  { value: "175", label: "175" },
  { value: "200", label: "200" },
  { value: "250", label: "250" },
  { value: "300", label: "300" },
  { value: "400", label: "400" },
  { value: "500", label: "500" },
  { value: "unknown", label: "I don't know" },
]



export function QuoteItemForm({ form, index, onRemove, canRemove }: QuoteItemFormProps) {

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Item {index + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField form={form} name={`items.${index}.quantity`} label="Quantity" showError showMessage>
          {(field) => (
            <Input
              type="number"
              min="1"
              value={field.value ? String(field.value) : ""}
              onChange={numberInputHandler(field.onChange, "int", 0)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        </FormField>

        <FormField form={form} name={`items.${index}.packagingType`} label="Packaging type" showError showMessage>
          {(field) => (
            <BaseSelect
              {...field}
              placeholder="Select packaging type"
              items={packagingTypes}
              triggerClassName="w-full bg-white"
            />
          )}
        </FormField>
      </div>

      <div className="space-y-4">
        <LabelWithTooltip
          label="Dimensions"
          tooltip="Enter the length, width, and height of your item"
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField form={form} name={`items.${index}.length`} label="" showError showMessage>
            {(field) => (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={field.value ? String(field.value) : ""}
                onChange={numberInputHandler(field.onChange, "float", 0)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                placeholder="Length"
              />
            )}
          </FormField>
          <FormField form={form} name={`items.${index}.width`} label="" showError showMessage>
            {(field) => (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={field.value ? String(field.value) : ""}
                onChange={numberInputHandler(field.onChange, "float", 0)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                placeholder="Width"
              />
            )}
          </FormField>
          <FormField form={form} name={`items.${index}.height`} label="" showError showMessage>
            {(field) => (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={field.value ? String(field.value) : ""}
                onChange={numberInputHandler(field.onChange, "float", 0)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                placeholder="Height"
              />
            )}
          </FormField>
        </div>
        <FormField form={form} name={`items.${index}.dimensionUnit`} label="" showError showMessage>
          <UnitSelector type="dimension" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          form={form}
          name={`items.${index}.weight`}
          label="Weight"
          showMessage
          showError>
          {(field) => (
            <Input
              type="number"
              min="0"
              step="0.01"
              value={field.value ? String(field.value) : ""}
              onChange={numberInputHandler(field.onChange, "float", 0)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        </FormField>

        <FormField form={form} name={`items.${index}.weightUnit`} label="Weight Units" showError showMessage>
          <UnitSelector type="weight" />
        </FormField>
      </div>

      <div className="flex flex-col gap-2">
        <LabelWithTooltip
          label="Freight class"
          tooltip="Freight class determines pricing based on density, handling, and liability"
        />
        <FormField form={form} name={`items.${index}.freightClass`} label="" showError showMessage>
          {(field) => (
            <BaseSelect
              {...field}
              placeholder="Select freight class"
              items={freightClasses}
              triggerClassName="w-full bg-white"
            />
          )}
        </FormField>
      </div>


    </div>
  )
}

