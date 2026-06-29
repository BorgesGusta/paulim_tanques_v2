import { faqs, contact } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function FAQ() {
  return (
    <section id="faq" className="section-anchor py-20 lg:py-28">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Dúvidas frequentes"
            title="Perguntas que chegam antes da compra"
          />
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'self-start')}
          >
            Falar com especialista
          </a>
        </div>
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={String(index)}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
