import { processSteps } from '@/data/site'

export function Process() {
  return (
    <section id="processo" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Do diagnóstico à entrega: um processo pensado para não travar sua operação.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {processSteps.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Circle + connector */}
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-deep text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <div
                    className="hidden sm:block h-px flex-1 bg-brand-dark/25"
                    aria-hidden="true"
                  />
                )}
              </div>
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
