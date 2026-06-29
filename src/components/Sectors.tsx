import { sectors } from '@/data/site'
import { SectionHeading } from '@/components/SectionHeading'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'

const sectorDescriptions: Record<string, string> = {
  'Postos e distribuidoras de combustíveis':
    'Abastecimento seguro e confiável para operações de distribuição e revenda de combustíveis.',
  Agronegócio:
    'Equipamentos e componentes para transporte de insumos e defensivos no campo.',
  'Transporte e aviação':
    'Soluções de alta performance para frotas de caminhões-tanque e operações aeroportuárias.',
  Indústrias:
    'Reservatórios e acessórios para processos industriais que exigem precisão e durabilidade.',
}

export function Sectors() {
  return (
    <section id="setores" className="section-anchor bg-brand-deep py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          inverse
          eyebrow="Quem atendemos"
          title="Especialistas nos setores que mais dependem de confiabilidade"
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <div key={sector} className="rounded-xl bg-brand-dark/30 p-6 flex flex-col gap-3">
              <ImagePlaceholder label={sector} className="aspect-video w-full" />
              <h3 className="text-base font-bold text-primary-foreground">{sector}</h3>
              <p className="text-sm leading-6 text-primary-foreground/70">
                {sectorDescriptions[sector]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
