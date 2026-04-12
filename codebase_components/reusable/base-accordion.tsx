import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function BaseAccordion({
  data,
  type = "multiple",
}: {
  data: IBaseAccordion[]
  type?: "multiple" | "single"
}) {
  if (type === "single") {
    return (
      <Accordion type="single" className="w-full flex flex-col gap-6" defaultValue={data[0]?.value}>
        {data.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="w-full flex flex-col gap-4">
            <AccordionTrigger className="py-2 border-b border-border rounded-none hover:no-underline text-base font-medium text-graphite">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }

  return (
    <Accordion
      type="multiple"
      className="w-full flex flex-col gap-6"
      defaultValue={data.map((item) => item.value)}>
      {data.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="w-full flex flex-col gap-4">
          <AccordionTrigger className="py-2 border-b border-border rounded-none hover:no-underline text-base font-medium text-graphite">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

interface IBaseAccordion {
  value: string
  trigger: string
  content: React.ReactNode
}
