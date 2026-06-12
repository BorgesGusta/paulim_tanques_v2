import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ContactCta() {
  return (
    <section className="bg-brand-light py-16 text-brand-deep md:py-20">
      <div className="section-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em]">
            Próximo passo
          </p>
          <h2 className="font-display text-balance text-4xl font-bold leading-none tracking-[-0.04em] md:text-5xl">
            Conte o que sua operação precisa
          </h2>
        </div>
        <Button asChild className="min-h-11" size="lg" variant="secondary">
          <a href="#diagnostico">
            Preencher formulário técnico
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </section>
  )
}
