import { Building2 } from 'lucide-react'
import { clientLogos } from '@/data/site'

// TODO: Substituir pelas logos reais dos clientes (ver TODO em src/data/site.ts)
export function ClientLogos() {
  const track = [...clientLogos, ...clientLogos]

  return (
    <section aria-label="Empresas que confiam na Paulim Tanques" className="overflow-hidden bg-foreground py-6">
      <p className="section-shell mb-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-background/50">
        Empresas que confiam na Paulim
      </p>
      <div className="marquee-track flex w-max items-center gap-12">
        {track.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex h-12 w-32 shrink-0 items-center justify-center"
          >
            {client.logoSrc ? (
              <img
                src={client.logoSrc}
                alt={client.name}
                className="max-h-10 max-w-full object-contain opacity-70 grayscale transition-opacity hover:opacity-100"
              />
            ) : (
              <div className="flex items-center gap-2 text-background/35">
                <Building2 className="size-5" aria-hidden="true" />
                <span className="text-sm font-medium">{client.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
