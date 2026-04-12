import { Switch } from "@/components/ui/switch"
import type { ControllerRenderProps } from "react-hook-form"

export function BaseSwitch({
  value,
  onChange,
  formItemId,
  ...props
}: Partial<ControllerRenderProps> & {
  formItemId?: string
}) {
  return <Switch id={formItemId} checked={value as boolean} onCheckedChange={onChange} {...props} />
}
