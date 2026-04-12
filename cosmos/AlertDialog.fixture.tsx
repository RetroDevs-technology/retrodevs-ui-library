import React from "react"

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
import { FixtureWrapper } from "./FixtureWrapper"

export default function AlertDialogShowcase() {
  return (
    <FixtureWrapper title="Alert Dialog">
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
          Delete project
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FixtureWrapper>
  )
}
