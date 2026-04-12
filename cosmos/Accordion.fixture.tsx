import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src/components/core/accordion"
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AccordionShowcase() {
  const [title1] = useFixtureInput("accordionSection1Title", "Section one")
  const [body1] = useFixtureInput("accordionSection1Content", "Content for the first section.")
  const [title2] = useFixtureInput("accordionSection2Title", "Section two")
  const [body2] = useFixtureInput("accordionSection2Content", "Content for the second section.")

  return (
    <FixtureWrapper title="Accordion">
      <Accordion defaultValue={["a"]} className="max-w-md">
        <AccordionItem value="a">
          <AccordionTrigger>{title1}</AccordionTrigger>
          <AccordionContent>{body1}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>{title2}</AccordionTrigger>
          <AccordionContent>{body2}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </FixtureWrapper>
  )
}
