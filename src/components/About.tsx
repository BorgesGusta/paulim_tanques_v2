import { CheckCircle2 } from 'lucide-react'
import { differentials } from '@/data/site'

export function About() {
  return (
    <section id="sobre" className="section-anchor bg-secondary py-20 lg:py-28">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2
              className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
            >
              Engenharia de proximidade desde 2009.
            </h2>
            <p className="text-base leading-7 text-muted-foreground max-w-[58ch]">
              Há mais de 15 anos a Paulim Tanques fabrica, fornece e mantém
              soluções para quem opera com tanques e equipamentos de abastecimento
              no Norte do Brasil. Mais de 400 projetos entregues — do posto à
              fazenda, da indústria ao aeroporto.
            </p>
          </div>

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

        {/* Image column */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-dark/10">
          <img
            src="/assets/about-team.jpg"
            alt="Equipe técnica Paulim Tanques trabalhando com equipamentos industriais"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
            }}
          />
        </div>
      </div>
    </section>
  )
}
