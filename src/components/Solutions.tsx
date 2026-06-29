import { Cylinder, Droplets, Gauge, Cable, Wrench } from 'lucide-react'
import { productCategories, equipmentItems } from '@/data/site'

const productIcons = [Cylinder, Droplets]
const equipmentIcons = [Gauge, Cable, Wrench]

export function Solutions() {
  return (
    <section id="solucoes" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        {/* Header — no eyebrow */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Do tanque à entrega: soluções para toda a cadeia de abastecimento.
          </h2>
          <p className="text-base leading-7 text-muted-foreground max-w-[60ch]">
            Fabricamos, fornecemos e mantemos. Cada produto é dimensionado para a
            sua operação — com orientação técnica antes da compra.
          </p>
        </div>

        {/* Tier 1 — 2 main product categories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {productCategories.map((cat, index) => {
            const Icon = productIcons[index]
            return (
              <div
                key={cat.title}
                className="rounded-2xl bg-brand-deep p-8 flex flex-col gap-5"
              >
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-brand-dark/40 p-3 shrink-0">
                    <Icon className="size-6 text-brand-light" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-primary-foreground leading-tight mt-1.5">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-primary-foreground/75 flex-1">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.models.map((model) => (
                    <span
                      key={model}
                      className="rounded-md bg-brand-dark/35 px-2.5 py-1 text-xs font-medium text-primary-foreground/85"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tier 2 — Equipment items, compact, below divider */}
        <div className="border-t border-border pt-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Equipamentos e peças
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipmentItems.map((item, index) => {
              const Icon = equipmentIcons[index]
              return (
                <div key={item.title} className="flex gap-4 items-start">
                  <Icon className="size-5 text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
