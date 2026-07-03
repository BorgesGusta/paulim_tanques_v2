import * as React from 'react'
import { CheckCircle2, ArrowDown, FileText } from 'lucide-react'
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
          className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,translate] duration-1000 ease-out motion-reduce:transition-none"
          style={{
            opacity: i === index ? 1 : 0,
            translate: i === index ? '0 0' : '3% 0',
          }}
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

      {/* Overlay — heavy on the left, where the text needs contrast, fading out
          well before the right edge so the photo shows through clearly there. */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(100deg, oklch(0.32 0.10 145 / 0.97) 0%, oklch(0.32 0.10 145 / 0.9) 34%, oklch(0.32 0.10 145 / 0.35) 58%, oklch(0.32 0.10 145 / 0) 78%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 section-shell flex min-h-full flex-col justify-center gap-10 py-16 lg:max-w-2xl lg:py-24" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        <div className="flex flex-col gap-6">
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
            Fabricamos, mantemos e entregamos tanques e equipamentos de
            abastecimento direto na sua operação — em toda a região Norte, sem enrolação.
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
            size="lg"
            onClick={() => open()}
            className="hero-enter self-start shadow-lg shadow-brand-deep/30"
            style={{ animationDelay: '360ms' }}
          >
            <FileText className="size-4" />
            Solicitar orçamento
          </Button>
        </div>
      </div>
    </section>
  )
}
