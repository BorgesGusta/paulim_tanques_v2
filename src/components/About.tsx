import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'

const differentials = [
  'Consultoria técnica antes da venda',
  'Peças originais e compatíveis em estoque',
  'Suporte pós-entrega incluído',
  'Equipe especializada em campo',
] as const

export function About() {
  return (
    <section id="sobre" className="section-anchor bg-secondary py-20 lg:py-28">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Sobre nós"
            title="Engenharia de proximidade desde 2009"
            description="Há mais de 15 anos a Paulim Tanques oferece soluções técnicas para quem opera com tanques e equipamentos de abastecimento no Norte do Brasil. Mais do que vender peças, a Paulim orienta, indica e acompanha cada operação."
          />
          <ul className="flex flex-col gap-3">
            {differentials.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-brand-dark shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <ImagePlaceholder
          label="Foto: equipe técnica Paulim Tanques"
          className="aspect-[4/3] w-full"
        />
      </div>
    </section>
  )
}
