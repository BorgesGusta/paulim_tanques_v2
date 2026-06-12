import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/data/site'

export function Process() {
  return (
    <section className="bg-brand-deep py-20 text-primary-foreground md:py-28">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading
          inverse
          eyebrow="Como funciona"
          title="Do diagnóstico à solução certa"
          description="Um fluxo curto para transformar contexto operacional em uma conversa técnica produtiva."
        />
        <ol className="grid border-y border-primary-foreground/20 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li
              className="flex min-h-80 flex-col justify-between gap-10 border-b border-primary-foreground/20 py-8 last:border-b-0 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              key={step.number}
            >
              <span className="font-display text-7xl font-bold leading-none text-brand-light">
                {step.number}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="leading-7 text-primary-foreground/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
