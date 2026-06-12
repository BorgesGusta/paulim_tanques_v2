import { CheckCircle2 } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'

const capabilities = [
  'Fabricação e adequação conforme a necessidade',
  'Manutenção e fornecimento de componentes',
  'Orientação técnica antes da decisão',
] as const

export function About() {
  return (
    <section
      id="paulim"
      className="section-anchor bg-background py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <img
          className="min-h-[30rem] w-full rounded-xl object-cover"
          src="/assets/technical-specialist.webp"
          alt="Especialista e gestor avaliando componentes de uma operação com tanque."
        />
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="A Paulim"
            title="Engenharia de proximidade"
            description="Conhecimento técnico para operações críticas, com atendimento próximo a quem precisa manter equipamentos, frotas e abastecimento funcionando."
          />
          <p className="leading-8 text-muted-foreground">
            Com base em Marabá e experiência no mercado do Norte, a Paulim reúne
            fabricação, manutenção, peças e orientação para apoiar decisões mais
            seguras e compatíveis com cada aplicação.
          </p>
          <ul className="flex flex-col gap-4">
            {capabilities.map((capability) => (
              <li
                className="flex items-start gap-3 font-semibold"
                key={capability}
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
