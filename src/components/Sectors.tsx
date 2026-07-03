import { sectors } from '@/data/site'
import { useParallax } from '@/lib/use-parallax'

export function Sectors() {
  return (
    <section id="setores" className="section-anchor bg-brand-deep pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div className="section-shell flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2
            className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-primary-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'pretty' } as React.CSSProperties}
          >
            Especialistas nos setores que mais dependem de confiabilidade.
          </h2>
          <p className="text-base leading-7 text-primary-foreground/70">
            Atendemos do posto ao aeroporto, da fazenda à indústria. Sempre com
            orientação técnica e entrega direta.
          </p>
        </div>

        {/* Layout: featured (left) + 2×2 grid (right) on desktop */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Featured — first sector (Fazendas) */}
          <div className="group relative overflow-hidden rounded-2xl min-h-80 lg:min-h-105 cursor-default">
            <SectorImg src={sectors[0].imageSrc} alt={sectors[0].imageAlt} />
            <div className="absolute inset-0 bg-linear-to-t from-brand-deep/90 via-brand-deep/20 to-transparent transition-opacity duration-280 ease-out motion-reduce:transition-none group-hover:opacity-0" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-deep/95 via-brand-deep/60 to-brand-deep/10 opacity-0 transition-opacity duration-280 ease-out motion-reduce:transition-none group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-[calc(1rem+1.5em+0.25rem)] transition-transform duration-280 ease-out motion-reduce:transition-none group-hover:translate-y-0">
              <h3 className="text-lg font-bold text-primary-foreground">{sectors[0].label}</h3>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/75 max-w-[38ch] opacity-0 transition-opacity duration-200 delay-50 motion-reduce:transition-none group-hover:opacity-100">
                {sectors[0].description}
              </p>
            </div>
          </div>

          {/* 2×2 grid — remaining 4 sectors */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sectors.slice(1).map((sector) => (
              <div key={sector.label} className="group relative overflow-hidden rounded-2xl min-h-47.5 cursor-default">
                <SectorImg src={sector.imageSrc} alt={sector.imageAlt} />
                <div className="absolute inset-0 bg-linear-to-t from-brand-deep/88 via-brand-deep/20 to-transparent transition-opacity duration-280 ease-out motion-reduce:transition-none group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-t from-brand-deep/95 via-brand-deep/55 to-brand-deep/10 opacity-0 transition-opacity duration-280 ease-out motion-reduce:transition-none group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-[calc(0.625rem+1.25em+0.125rem)] transition-transform duration-280 ease-out motion-reduce:transition-none group-hover:translate-y-0">
                  <h3 className="text-sm font-bold text-primary-foreground">{sector.label}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-primary-foreground/70 opacity-0 transition-opacity duration-200 delay-50 motion-reduce:transition-none group-hover:opacity-100">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectorImg({ src, alt }: { src: string; alt: string }) {
  const { ref, offset } = useParallax<HTMLImageElement>(0.08)

  return (
    <>
      {/* Fallback color — always visible behind the image */}
      <div className="absolute inset-0 bg-brand-dark/40" aria-hidden="true" />
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full scale-125 object-cover object-center"
        style={{ translate: `0 ${offset}px` }}
        loading="lazy"
        onError={(e) => {
          ; (e.currentTarget as HTMLImageElement).style.opacity = '0'
        }}
      />
    </>
  )
}
