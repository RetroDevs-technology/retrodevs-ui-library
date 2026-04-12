import { ThemeProvider } from "next-themes"
import { toast } from "sonner"

import { Toaster } from "../src/components/composites/toaster"
import { Button } from "../src/components/core/button"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function ToasterShowcase() {
  const [toastTitle] = useFixtureInput("toastDemoTitle", "Event has been created")
  const [toastDescription] = useFixtureInput(
    "toastDemoDescription",
    "Monday, January 3rd at 6:00pm",
  )
  const [toastDuration] = useFixtureInput("toastDemoDurationMs", 4000)

  const duration =
    typeof toastDuration === "number" && !Number.isNaN(toastDuration)
      ? Math.max(1000, Math.min(20000, toastDuration))
      : 4000

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <FixtureWrapper>
        <Toaster />
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Live controls</h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Title, description, and duration (ms) for the sample toast below.
          </p>
          <Button
            type="button"
            onClick={() => {
              toast(toastTitle, {
                description: toastDescription,
                duration,
              })
            }}
          >
            Show configured toast
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Basic Toast</h2>
          <Button
            type="button"
            onClick={() => {
              toast("Event has been created")
            }}
          >
            Show Toast
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Toast Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              type="button"
              onClick={() => {
                toast("Default toast message")
              }}
            >
              Default
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                toast.error("Error toast message")
              }}
            >
              Error
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                toast.success("Success toast message")
              }}
            >
              Success
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                toast.info("Info toast message")
              }}
            >
              Info
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                toast.warning("Warning toast message")
              }}
            >
              Warning
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Toast with Action</h2>
          <Button
            type="button"
            onClick={() => {
              toast("Event has been created", {
                description: "Monday, January 3rd at 6:00pm",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }}
          >
            Toast with Action
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Long Duration</h2>
          <Button
            type="button"
            onClick={() => {
              toast("This toast will stay longer", {
                duration: 5000,
              })
            }}
          >
            Long Duration Toast
          </Button>
        </section>
      </FixtureWrapper>
    </ThemeProvider>
  )
}
