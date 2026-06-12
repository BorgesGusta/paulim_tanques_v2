import { ArrowDown, CheckCircle2 } from 'lucide-react'

import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section
      id="inicio"
      className="section-anchor bg-brand-deep text-primary-foreground"
    >
      <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-[1.12fr_.88fr]">
        <div className="relative isolate flex min-h-[38rem] min-w-0 items-end overflow-hidden">
          <img
            className="absolute inset-0 size-full object-cover object-right"
            src="/assets/hero-tanker-operation.webp"
            alt="Especialista inspecionando equipamentos de um caminhão-tanque em operação."
          />
          <div className="absolute inset-0 bg-brand-deep/75" />
          <div className="section-shell relative flex flex-col gap-7 py-16 lg:py-24">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
              Especialista desde o início
            </p>
            <h1 className="font-display text-balance max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
              Soluções técnicas para operações que não podem parar.
            </h1>
            <p className="safe-copy max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Peças, equipamentos e suporte especializado para transporte e
              abastecimento com segurança.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 font-bold">
                <CheckCircle2 aria-hidden="true" />
                15 anos de experiência técnica
              </span>
              <a
                className="inline-flex min-h-11 items-center gap-2 font-bold underline decoration-brand-light decoration-2 underline-offset-8"
                href="#solucoes"
              >
                Conhecer soluções
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div
          id="diagnostico"
          className="section-anchor flex min-w-0 items-center bg-card px-5 py-12 text-card-foreground sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-xl">
            <TechnicalRequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
