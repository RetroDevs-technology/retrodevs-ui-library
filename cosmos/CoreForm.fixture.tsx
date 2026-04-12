import { useForm } from "react-hook-form"

import { Button } from "../src/components/core/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../src/components/core/form"
import { Input } from "../src/components/core/input"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

interface DemoValues {
  username: string
}

export default function CoreFormShowcase() {
  const form = useForm<DemoValues>({
    defaultValues: { username: "" },
  })

  const [fieldLabel] = useFixtureInput("formUsernameLabel", "Username")
  const [placeholder] = useFixtureInput("formUsernamePlaceholder", "shadcn")
  const [description] = useFixtureInput(
    "formUsernameDescription",
    "This is your public display name.",
  )
  const [submitLabel] = useFixtureInput("formSubmitLabel", "Submit")

  return (
    <FixtureWrapper title="Form (core)">
      <Form {...form}>
        <form
          className="max-w-sm space-y-6"
          onSubmit={form.handleSubmit(() => {
            form.setError("username", { message: "Showcase only — no server." })
          })}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>{description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{submitLabel}</Button>
        </form>
      </Form>
    </FixtureWrapper>
  )
}
