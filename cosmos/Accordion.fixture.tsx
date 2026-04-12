import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src/components/core/accordion"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AccordionShowcase() {
  return (
    <FixtureWrapper title="Accordion">
      <Accordion defaultValue={["a"]} className="max-w-md">
        <AccordionItem value="a">
          <AccordionTrigger>Section one</AccordionTrigger>
          <AccordionContent>Content for the first section.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section two</AccordionTrigger>
          <AccordionContent>Content for the second section.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </FixtureWrapper>
  )
}
