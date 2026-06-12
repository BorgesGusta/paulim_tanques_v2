import { trustItems } from '@/data/site'

export function TrustBar() {
  return (
    <section
      className="bg-brand-light text-brand-deep"
      aria-label="Provas de confiança"
    >
      <ul className="section-shell grid gap-px bg-brand-deep/20 py-px md:grid-cols-3">
        {trustItems.map((item) => (
          <li
            className="flex flex-col gap-1 bg-brand-light px-5 py-7 md:px-8"
            key={item.value}
          >
            <strong className="text-xl font-extrabold">{item.value}</strong>
            <span className="text-sm font-semibold text-brand-deep/80">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
