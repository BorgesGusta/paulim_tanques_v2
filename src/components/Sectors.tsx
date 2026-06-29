import { sectors } from '@/data/site'

export function Sectors() {
  return (
    <section id="setores" className="section-anchor bg-brand-deep py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-primary-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Especialistas nos setores que mais dependem de confiabilidade.
          </h2>
          <p className="text-base leading-7 text-primary-foreground/70 max-w-[58ch]">
            Atendemos do posto ao aeroporto, da fazenda à indústria — sempre com
            orientação técnica e entrega direta.
          </p>
        </div>

        {/* Layout: featured (left) + 2×2 grid (right) on desktop */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Featured — first sector (Fazendas) */}
          <div className="relative overflow-hidden rounded-2xl min-h-[320px] lg:min-h-[420px]">
            <SectorImg src={sectors[0].imageSrc} alt={sectors[0].imageAlt} />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-lg font-bold text-primary-foreground">{sectors[0].label}</h3>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/75 max-w-[38ch]">
                {sectors[0].description}
              </p>
            </div>
          </div>

          {/* 2×2 grid — remaining 4 sectors */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sectors.slice(1).map((sector) => (
              <div key={sector.label} className="relative overflow-hidden rounded-2xl min-h-[190px]">
                <SectorImg src={sector.imageSrc} alt={sector.imageAlt} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/88 via-brand-deep/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold text-primary-foreground">{sector.label}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-primary-foreground/70">
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
  return (
    <>
      {/* Fallback color — always visible behind the image */}
      <div className="absolute inset-0 bg-brand-dark/40" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
        }}
      />
    </>
  )
}
