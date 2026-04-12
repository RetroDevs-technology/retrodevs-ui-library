import BaseConfirmation from "../src/components/modules/base-confirmation"
import { Button } from "../src/components/core/button"
import type { ButtonProps } from "../src/components/core/button"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

const ACTION_VARIANTS = [
  "default",
  "destructive",
  "secondary",
  "outline",
  "ghost",
  "link",
] as const satisfies readonly NonNullable<ButtonProps["variant"]>[]

export default function ConfirmationShowcase() {
  const [triggerLabel] = useFixtureInput("confirmationTriggerLabel", "Open Confirmation")
  const [title] = useFixtureInput("confirmationTitle", "Confirm Action")
  const [description] = useFixtureInput(
    "confirmationDescription",
    "Are you sure you want to proceed with this action?",
  )
  const [confirmText] = useFixtureInput("confirmationConfirmLabel", "Confirm")
  const [cancelText] = useFixtureInput("confirmationCancelLabel", "Cancel")
  const [actionVariant] = useFixtureSelect("confirmationActionVariant", {
    options: [...ACTION_VARIANTS],
    defaultValue: "default",
  })

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Trigger, copy, button labels, and confirm button variant.
        </p>
        <BaseConfirmation
          trigger={<Button type="button">{triggerLabel}</Button>}
          title={title}
          description={description}
          confirmText={confirmText}
          cancelText={cancelText}
          actionVariant={actionVariant as NonNullable<ButtonProps["variant"]>}
          onConfirm={() => console.log("Confirmed")}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Destructive Confirmation</h2>
        <BaseConfirmation
          trigger={<Button variant="destructive">Delete Item</Button>}
          title="Delete Confirmation"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          actionVariant="destructive"
          onConfirm={() => console.log("Deleted")}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Actions</h2>
        <BaseConfirmation
          trigger={<Button variant="outline">Custom Confirmation</Button>}
          title="Custom Title"
          description="This is a confirmation dialog with custom button text."
          confirmText="Save"
          cancelText="Discard"
          actionVariant="default"
          onConfirm={() => console.log("Saved")}
        />
      </section>
    </FixtureWrapper>
  )
}
