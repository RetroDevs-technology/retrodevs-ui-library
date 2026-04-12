import React from "react"
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
import { FixtureWrapper } from "./FixtureWrapper"

interface DemoValues {
  username: string
}

export default function CoreFormShowcase() {
  const form = useForm<DemoValues>({
    defaultValues: { username: "" },
  })

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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </FixtureWrapper>
  )
}
