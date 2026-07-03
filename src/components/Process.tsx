import { MessageCircle, Search, Truck } from 'lucide-react'
import { processSteps } from '@/data/site'

const stepIcons = [MessageCircle, Search, Truck]

export function Process() {
  return (
    <section id="processo" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2
            className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'pretty' } as React.CSSProperties}
          >
            Do diagnóstico à entrega, um processo pensado para não travar sua operação.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index]
            return (
            <div
              key={step.number}
              className="reveal-stagger flex flex-col gap-5"
              style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
            >
              {/* Icon badge with step number + connector */}
              <div className="flex items-center gap-4">
                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-deep">
                  <Icon className="size-6 text-primary-foreground" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand-deep ring-2 ring-background">
                    {index + 1}
                  </span>
                </div>
                <div
                  className="hidden h-px flex-1 bg-brand-dark/20 sm:block"
                  aria-hidden="true"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
