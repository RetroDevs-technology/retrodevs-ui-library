import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import type { ControllerRenderProps } from "react-hook-form"

export function BaseInputOtp({ value, onChange, ...props }: Partial<ControllerRenderProps>) {
  return (
    <InputOTP maxLength={6} value={value} onChange={onChange} {...props}>
      <InputOTPGroup className="w-[520px] flex items-center justify-between">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
