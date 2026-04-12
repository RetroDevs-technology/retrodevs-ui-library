import { useForm } from "react-hook-form"

import { FormBase, FormField, FormFooter } from "../src/components/modules/base-form"
import { Input } from "../src/components/core/input"
import { Textarea } from "../src/components/core/textarea"
import { Button } from "../src/components/core/button"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

interface FormValues {
  name: string
  email: string
  message: string
}

export default function FormShowcase() {
  const form1 = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const form2 = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const [nameLabel] = useFixtureInput("moduleFormNameLabel", "Name")
  const [nameDesc] = useFixtureInput("moduleFormNameDescription", "Enter your full name")
  const [namePh] = useFixtureInput("moduleFormNamePlaceholder", "John Doe")
  const [emailLabel] = useFixtureInput("moduleFormEmailLabel", "Email")
  const [emailDesc] = useFixtureInput("moduleFormEmailDescription", "Enter your email address")
  const [emailPh] = useFixtureInput("moduleFormEmailPlaceholder", "john@example.com")
  const [messageLabel] = useFixtureInput("moduleFormMessageLabel", "Message")
  const [messageDesc] = useFixtureInput("moduleFormMessageDescription", "Enter your message")
  const [messagePh] = useFixtureInput("moduleFormMessagePlaceholder", "Your message here...")
  const [submitLabel] = useFixtureInput("moduleFormSubmitLabel", "Submit")
  const [resetLabel] = useFixtureInput("moduleFormResetLabel", "Reset")

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Labels, descriptions, placeholders, and primary actions for the basic form.
        </p>
        <FormBase
          form={form1}
          onSubmit={(data) => {
            console.log("Form submitted:", data)
            alert("Form submitted! Check console for data.")
          }}
        >
          <FormField form={form1} name="name" label={nameLabel} description={nameDesc} showMessage>
            <Input placeholder={namePh} />
          </FormField>

          <FormField form={form1} name="email" label={emailLabel} description={emailDesc} showMessage>
            <Input type="email" placeholder={emailPh} />
          </FormField>

          <FormField
            form={form1}
            name="message"
            label={messageLabel}
            description={messageDesc}
            showMessage
          >
            <Textarea placeholder={messagePh} />
          </FormField>

          <FormFooter>
            <Button type="button" variant="outline" onClick={() => form1.reset()}>
              {resetLabel}
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </FormFooter>
        </FormBase>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form with Error States</h2>
        <FormBase form={form2} onSubmit={(data) => console.log("Form submitted:", data)}>
          <FormField form={form2} name="name" label="Name" showMessage showError>
            <Input placeholder="Required field" />
          </FormField>

          <FormField form={form2} name="email" label="Email" showMessage showError>
            <Input type="email" placeholder="Invalid email" />
          </FormField>

          <FormFooter>
            <Button type="submit">Submit</Button>
          </FormFooter>
        </FormBase>
      </section>
    </FixtureWrapper>
  )
}
