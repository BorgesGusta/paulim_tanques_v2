import { SectionHeading } from '@/components/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data/site'

export function FAQ() {
  return (
    <section
      id="duvidas"
      className="section-anchor bg-card py-20 md:py-28"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1fr]">
        <SectionHeading
          eyebrow="Dúvidas"
          title="Informação suficiente para começar"
          description="Você não precisa dominar a terminologia técnica para solicitar uma avaliação."
        />
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="max-w-2xl leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
