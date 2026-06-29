import { ShieldCheck, Headset, MapPin } from 'lucide-react'
import { trustItems } from '@/data/site'

const icons = [ShieldCheck, Headset, MapPin]

export function TrustBar() {
  return (
    <section className="bg-brand-deep py-10">
      <div className="section-shell flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {trustItems.map((item, index) => {
          const Icon = icons[index % icons.length]
          return (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              <Icon className="size-6 text-primary-foreground/70" aria-hidden="true" />
              <span className="text-2xl font-extrabold text-primary-foreground">{item.value}</span>
              <span className="text-xs uppercase tracking-[0.12em] text-primary-foreground/60">{item.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
