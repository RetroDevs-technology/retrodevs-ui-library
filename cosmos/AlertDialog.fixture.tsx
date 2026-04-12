import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/components/core/alert-dialog"
import { buttonVariants } from "../src/components/core/button"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AlertDialogShowcase() {
  const [triggerLabel] = useFixtureInput("alertDialogTriggerLabel", "Delete project")
  const [title] = useFixtureInput("alertDialogTitle", "Are you sure?")
  const [description] = useFixtureInput(
    "alertDialogDescription",
    "This action cannot be undone. This will permanently delete the project.",
  )
  const [cancelLabel] = useFixtureInput("alertDialogCancelLabel", "Cancel")
  const [confirmLabel] = useFixtureInput("alertDialogConfirmLabel", "Delete")

  return (
    <FixtureWrapper title="Alert Dialog">
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
          {triggerLabel}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction variant="destructive">{confirmLabel}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FixtureWrapper>
  )
}
