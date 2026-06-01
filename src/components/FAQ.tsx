import { faqs } from '@/data/site';
import { SectionHeading } from '@/components/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

export function FAQ() {
  return (
    <section id="faq" className="section-anchor bg-white px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.82fr_1fr] lg:items-start">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Respostas rápidas para começar sua solicitação."
        />

        <Card className="border-border/80 bg-white px-6 shadow-none">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}
