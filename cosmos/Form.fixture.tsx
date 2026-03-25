import React from 'react'
import { useForm } from 'react-hook-form'
import { FormBase, FormField, FormFooter } from '../src/components/modules/base-form'
import { Input } from '../src/components/core/input'
import { Textarea } from '../src/components/core/textarea'
import { Button } from '../src/components/core/button'
import { FixtureWrapper } from './FixtureWrapper'

interface FormValues {
  name: string
  email: string
  message: string
}

export default function FormShowcase() {
  const form1 = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const form2 = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Form</h2>
        <FormBase
          form={form1}
          onSubmit={(data) => {
            console.log('Form submitted:', data)
            alert('Form submitted! Check console for data.')
          }}
        >
          <FormField
            form={form1}
            name="name"
            label="Name"
            description="Enter your full name"
            showMessage
          >
            <Input placeholder="John Doe" />
          </FormField>

          <FormField
            form={form1}
            name="email"
            label="Email"
            description="Enter your email address"
            showMessage
          >
            <Input type="email" placeholder="john@example.com" />
          </FormField>

          <FormField
            form={form1}
            name="message"
            label="Message"
            description="Enter your message"
            showMessage
          >
            <Textarea placeholder="Your message here..." />
          </FormField>

          <FormFooter>
            <Button type="button" variant="outline" onClick={() => form1.reset()}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </FormFooter>
        </FormBase>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form with Error States</h2>
        <FormBase
          form={form2}
          onSubmit={(data) => console.log('Form submitted:', data)}
        >
          <FormField
            form={form2}
            name="name"
            label="Name"
            showMessage
            showError
          >
            <Input placeholder="Required field" />
          </FormField>

          <FormField
            form={form2}
            name="email"
            label="Email"
            showMessage
            showError
          >
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
