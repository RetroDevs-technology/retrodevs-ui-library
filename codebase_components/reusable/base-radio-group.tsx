import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { ControllerRenderProps } from "react-hook-form"

export function BaseRadioGroup({
  data,
  value,
  onChange,
}: {
  data: IRadioGroupProps[]
} & Partial<ControllerRenderProps>) {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {data.map((item) => (
        <div key={item.value} className="w-full md:w-[520px] flex items-center">
          <RadioGroupItem value={item.value} id={item.value} className="hidden" />
          <Label
            htmlFor={item.value}
            className={cn(
              "flex flex-col items-start p-5 gap-4 rounded-xl border transition-colors duration-150",
              {
                "border-primary hover:border-primary": value === item.value,
                "border-border hover:border-primary": value !== item.value,
              },
            )}>
            <img src={item.src} alt={item.alt} width={36} height={36} />
            <div className="flex flex-col gap-2">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm font-normal text-dark-gray">{item.description}</p>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export interface IRadioGroupProps {
  value: string
  src: string
  alt: string
  title: string
  description: string
}
