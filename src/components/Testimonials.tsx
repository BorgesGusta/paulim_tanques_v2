import { Quote } from 'lucide-react'
import { testimonials } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'

// TODO: Substituir pelos depoimentos reais dos clientes
export function Testimonials() {
  return (
    <section id="depoimentos" className="section-anchor bg-secondary py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-12">
        <SectionHeading title="O que nossos clientes dizem" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="reveal-stagger flex flex-col gap-4 rounded-2xl bg-card p-8 shadow-sm"
            >
              <Quote className="size-8 text-brand-dark/40" aria-hidden="true" />
              <p className="text-base leading-7 text-foreground">{testimonial.quote}</p>
              <div>
                <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
