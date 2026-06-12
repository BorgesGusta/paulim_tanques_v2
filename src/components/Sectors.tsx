import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { sectors } from '@/data/site'

export function Sectors() {
  return (
    <section
      id="setores"
      className="section-anchor bg-card py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Setores atendidos"
            title="Experiência onde a operação exige precisão"
            description="Atendimento técnico para empresas que dependem de disponibilidade, compatibilidade e segurança."
          />
          <ol className="border-t">
            {sectors.map((sector, index) => (
              <li
                className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b py-5"
                key={sector}
              >
                <span className="font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-bold">{sector}</span>
                <ArrowUpRight
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>

        <img
          className="min-h-[28rem] w-full rounded-xl object-cover"
          src="/assets/sector-operations.webp"
          alt="Operação de caminhão-tanque em área logística com contexto regional."
        />
      </div>
    </section>
  )
}
