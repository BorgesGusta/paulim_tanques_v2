import { Cylinder, Cable, Wrench, ShieldAlert } from 'lucide-react'
import { solutions } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'

const icons = [Cylinder, Cable, Wrench, ShieldAlert]

export function Solutions() {
  return (
    <section id="solucoes" className="section-anchor py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Soluções para toda a cadeia de transporte e abastecimento"
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={solution.title}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4"
              >
                <Icon className="size-8 text-brand-dark" aria-hidden="true" />
                <h3 className="text-lg font-bold text-foreground">{solution.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground flex-1">{solution.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
