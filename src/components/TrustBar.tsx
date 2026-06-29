import { Clock, PackageCheck, Truck } from 'lucide-react'
import { trustItems } from '@/data/site'

const icons = [Clock, PackageCheck, Truck]

export function TrustBar() {
  return (
    <section aria-label="Credenciais da Paulim Tanques" className="bg-brand-deep py-10">
      <div className="section-shell">
        <dl className="reveal flex flex-wrap items-start justify-center gap-10 sm:gap-16">
          {trustItems.map((item, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-5 text-brand-light" aria-hidden="true" />
                <dt className="text-2xl font-extrabold text-primary-foreground leading-none">
                  {item.value}
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
