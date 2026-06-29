import { ArrowDown, CheckCircle2 } from 'lucide-react'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section
      id="inicio"
      className="section-anchor relative min-h-svh overflow-hidden"
    >
      {/* Background image */}
      <ImagePlaceholder
        label="Foto: caminhão-tanque em operação de campo"
        className="absolute inset-0 z-0 h-full w-full rounded-none border-0"
      />

      {/* Diagonal overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.32 0.10 145 / 0.92) 0%, oklch(0.32 0.10 145 / 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 section-shell flex min-h-svh flex-col gap-10 py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Headline column */}
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Especialista desde o início
          </p>

          {/* H1 */}
          <h1
            className="mt-3 font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground reveal-up"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            Peças, equipamentos e suporte especializado para transporte e
            abastecimento com segurança.
          </p>

          {/* Proofs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className="size-5 shrink-0 text-green-400"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-primary-foreground/90">
                15 anos de experiência técnica
              </span>
            </div>

            <a
              href="#solucoes"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline"
            >
              Conhecer soluções
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Form column */}
        <div id="diagnostico" className="section-anchor lg:col-span-5">
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
