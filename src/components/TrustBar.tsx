import * as React from 'react'
import { Clock, PackageCheck, Truck } from 'lucide-react'
import { trustItems } from '@/data/site'

const icons = [Clock, PackageCheck, Truck]

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

export function TrustBar() {
  return (
    <section aria-label="Credenciais da Paulim Tanques" className="bg-brand-deep py-10 lg:py-12">
      <div className="section-shell">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {trustItems.map((item, index) => {
            const Icon = icons[index % icons.length]
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
                <dd className="text-xs text-primary-foreground/60 max-w-[18ch] leading-snug">
                  {item.label}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
