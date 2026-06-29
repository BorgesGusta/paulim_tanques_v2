import { processSteps } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'

export function Process() {
  return (
    <section id="processo" className="section-anchor py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Do diagnóstico à entrega: um processo pensado para não travar sua operação"
          className="mb-12 max-w-2xl"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-brand-light/40">
                {step.number}
              </span>
              <h3 className="text-base font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
