import { CheckCircle2, ArrowDown } from 'lucide-react'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section
      id="inicio"
      className="section-anchor relative overflow-hidden"
      style={{ minHeight: 'calc(100svh - 4rem)' }}
    >
      {/* Background image */}
      <img
        src="/assets/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Overlay — heavy on left (text), lighter on right (form) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(115deg, oklch(0.32 0.10 145 / 0.96) 0%, oklch(0.32 0.10 145 / 0.88) 48%, oklch(0.32 0.10 145 / 0.60) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 section-shell flex flex-col gap-10 py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        {/* Headline column */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Evidence line — concrete data, not a generic label */}
          <p className="text-sm font-semibold text-primary-foreground/70">
            Mais de 400 projetos entregues. 15 anos no Norte do Brasil
          </p>

          {/* H1 */}
          <h1
            className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          {/* Subtitle */}
          <p className="max-w-[52ch] text-lg leading-8 text-primary-foreground/80">
            Fabricação, manutenção, fornecimento de tanques,
            equipamentos para transporte e abastecimento em toda a região Norte.
          </p>

          {/* Proof points */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Entrega até o cliente
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Fabricação sob medida
              </span>
            </div>
            <a
              href="#solucoes"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/70 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              Conhecer soluções
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Form column */}
        <div id="diagnostico" className="section-anchor lg:col-span-5">
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
