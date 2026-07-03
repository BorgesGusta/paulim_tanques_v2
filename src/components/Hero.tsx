import * as React from 'react'
import { CheckCircle2, ArrowDown, FileText } from 'lucide-react'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/context/QuoteContext'

const heroImages = [
  '/assets/hero-truck-field-sunset.png',
  '/assets/hero-water-tower-farm-sunset.png',
]

function HeroCarousel() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out motion-reduce:transition-none"
          style={{ opacity: i === index ? 1 : 0 }}
          fetchPriority={i === 0 ? 'high' : undefined}
          loading={i === 0 ? undefined : 'lazy'}
        />
      ))}
    </>
  )
}

export function Hero() {
  const { open } = useQuote()

  return (
    <section
      id="inicio"
      className="section-anchor relative overflow-hidden"
      style={{ minHeight: 'calc(100svh - 4rem)' }}
    >
      {/* Background carousel */}
      <HeroCarousel />

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
          {/* Evidence line */}
          <p className="hero-enter text-sm font-semibold text-primary-foreground/70" style={{ animationDelay: '80ms' }}>
            Mais de 400 projetos entregues. 15 anos no Norte do Brasil
          </p>

          {/* H1 */}
          <h1
            className="hero-enter font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', textWrap: 'balance', animationDelay: '160ms' } as React.CSSProperties}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          {/* Subtitle */}
          <p className="hero-enter max-w-[52ch] text-lg leading-8 text-primary-foreground/80" style={{ animationDelay: '240ms' }}>
            Fabricação, manutenção, fornecimento de tanques,
            equipamentos para transporte e abastecimento em toda a região Norte.
          </p>

          {/* Proof points */}
          <div className="hero-enter flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: '300ms' }}>
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

          <Button
            variant="outline"
            onClick={() => open()}
            className="hero-enter self-start border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            style={{ animationDelay: '360ms' }}
          >
            <FileText className="size-4" />
            Solicitar orçamento
          </Button>
        </div>

        {/* Form column */}
        <div
          id="diagnostico"
          className="hero-enter section-anchor lg:col-span-5"
          style={{ animationDelay: '200ms' }}
        >
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
