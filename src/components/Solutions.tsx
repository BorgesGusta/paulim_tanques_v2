import {
  Container,
  ShieldCheck,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { solutions } from '@/data/site'

const solutionIcons = [
  Container,
  Workflow,
  Wrench,
  ShieldCheck,
] satisfies readonly LucideIcon[]

export function Solutions() {
  return (
    <section
      id="solucoes"
      className="section-anchor bg-background py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Soluções"
            title="Soluções para cada etapa da operação"
            description="A aplicação vem antes da especificação. A Paulim ajuda a identificar o componente, equipamento ou suporte adequado ao contexto."
          />
          <img
            className="aspect-[4/3] w-full rounded-xl object-cover"
            src="/assets/technical-equipment.webp"
            alt="Mangueiras, válvulas e conexões organizadas para atendimento técnico."
          />
        </div>

        <ol className="border-t">
          {solutions.map((solution, index) => {
            const Icon = solutionIcons[index]

            return (
              <li
                className="grid gap-5 border-b py-8 sm:grid-cols-[auto_1fr] sm:py-10"
                key={solution.title}
              >
                <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.025em]">
                    {solution.title}
                  </h3>
                  <p className="max-w-xl leading-7 text-muted-foreground">
                    {solution.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
