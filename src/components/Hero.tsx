import * as React from 'react'
import { CheckCircle2, ArrowDown, FileText, Clock, PackageCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/context/QuoteContext'
import { CatalogRequestButton } from '@/components/CatalogRequest'
import { trustItems } from '@/data/site'

const trustIcons = [Clock, PackageCheck, Truck]

function AnimatedValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const ref = React.useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = React.useState(match ? `0${match[2]}` : value)

  React.useEffect(() => {
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const target = Number(match[1])
    const suffix = match[2]
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        const duration = 1400
        const startTime = performance.now()

        function tick(now: number) {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(`${Math.round(target * eased)}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <span ref={ref}>{match ? display : value}</span>
}

type HeroMedia = { type: 'image' | 'video'; src: string }

const heroMedia: HeroMedia[] = [
  { type: 'image', src: '/assets/hero-truck-field-sunset.png' },
  { type: 'image', src: '/assets/hero-water-tower-farm-sunset.png' },
  { type: 'video', src: '/assets/hero-video.mp4' },
]

function HeroCarousel() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroMedia.length)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {heroMedia.map((media, i) => {
        const shared = {
          className:
            'absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,translate] duration-1000 ease-out motion-reduce:transition-none',
          style: {
            opacity: i === index ? 1 : 0,
            translate: i === index ? '0 0' : '3% 0',
          } as React.CSSProperties,
        }

        if (media.type === 'video') {
          return (
            <video
              key={media.src}
              src={media.src}
              aria-hidden="true"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              {...shared}
            />
          )
        }

        return (
          <img
            key={media.src}
            src={media.src}
            alt=""
            aria-hidden="true"
            fetchPriority={i === 0 ? 'high' : undefined}
            loading={i === 0 ? undefined : 'lazy'}
            {...shared}
          />
        )
      })}
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

      {/* Bottom scrim — legibility for the trust stats sitting on the image (desktop overlay only) */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 hidden h-56 lg:block"
        style={{
          background: 'linear-gradient(to top, oklch(0.17 0.03 145 / 0.85) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 section-shell flex flex-col justify-center gap-10 py-16 lg:max-w-2xl lg:py-24 lg:pb-36" style={{ minHeight: 'calc(100svh - 4rem)' }}>
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
            Soluções para operações que não podem parar.
          </h1>

          {/* Subtitle */}
          <p className="hero-enter max-w-[52ch] text-lg leading-8 text-primary-foreground/80" style={{ animationDelay: '240ms' }}>
            Fabricação, manutenção e entrega de tanques e equipamentos de
            abastecimento em toda a região Norte.
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

          <div className="hero-enter flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
            <Button
              size="lg"
              onClick={() => open()}
              className="shadow-lg shadow-brand-deep/30"
            >
              <FileText className="size-4" />
              Solicitar orçamento
            </Button>
            <CatalogRequestButton
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            />
          </div>
        </div>
      </div>

      {/* Trust stats — normal flow on mobile (so it never overlaps the taller
          stacked content), overlapping the bottom of the hero image on desktop
          where there's room to spare. */}
      <div className="relative z-20 bg-brand-deep/40 py-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:py-8">
        <div className="section-shell">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
            {trustItems.map((item, index) => {
              const Icon = trustIcons[index % trustIcons.length]
              return (
                <div
                  key={item.label}
                  className="reveal-stagger flex flex-col items-center gap-1.5 text-center"
                  style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
                >
                  <Icon className="size-5 text-brand-light" aria-hidden="true" />
                  <dt className="text-2xl font-extrabold text-primary-foreground leading-none sm:text-3xl">
                    <AnimatedValue value={item.value} />
                  </dt>
                  <dd className="text-xs text-primary-foreground/70 max-w-[18ch] leading-snug">
                    {item.label}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
