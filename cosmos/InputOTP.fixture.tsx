import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../src/components/core/input-otp"
import { useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function InputOTPShowcase() {
  const [lengthKey] = useFixtureSelect("otpCodeLength", {
    options: ["4", "6"],
    defaultValue: "6",
  })
  const maxLength = lengthKey === "4" ? 4 : 6

  return (
    <FixtureWrapper title="Input OTP">
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        Choose 4 or 6 digits from the fixture panel (layout updates for each length).
      </p>
      <InputOTP maxLength={maxLength}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          {maxLength === 6 ? <InputOTPSlot index={2} /> : null}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {maxLength === 6 ? (
            <>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </>
          ) : (
            <>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </>
          )}
        </InputOTPGroup>
      </InputOTP>
    </FixtureWrapper>
  )
}
