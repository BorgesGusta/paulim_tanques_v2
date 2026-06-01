import { CheckCircle2, Sparkles } from 'lucide-react';
import { serviceFeatures, serviceGallery } from '@/data/site';
import { Badge } from '@/components/ui/badge';

export function Services() {
  return (
    <section id="servicos" className="section-anchor">
      {/* ── Block 1: Image gallery ── */}
      <div className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          {/* Heading with decorative sparkles */}
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Sparkles className="size-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Serviços especializados</span>
                <Sparkles className="size-4" />
              </div>
              <h2 className="text-balance text-4xl font-extrabold leading-[0.98] text-brand-dark md:text-6xl">
                Soluções técnicas que elevam sua operação.
              </h2>
            </div>
            <a
              className="mt-4 hidden shrink-0 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-secondary md:inline-flex"
              href="#contato"
            >
              Solicitar avaliação
            </a>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Atendimento direcionado a empresas, transportadoras, indústrias, postos e frotas que dependem de tanques confiáveis.
          </p>

          {/* Image gallery */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {serviceGallery.map((item, index) => (
              <div key={item.label} className={`animate-fade-in-up anim-delay-${index + 1}`}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                    src={item.image}
                    alt={item.label}
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-brand-dark">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Decorative dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="size-2 rounded-full bg-primary/30" />
            <span className="size-2 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>

      {/* ── Block 2: Features + image ── */}
      <div className="bg-background px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left: heading + features */}
          <div>
            <h2 className="text-balance text-4xl font-extrabold leading-[0.98] text-brand-dark md:text-[3.25rem]">
              Intervenções técnicas para{' '}
              <Badge variant="pill-inline">frotas e operações</Badge>{' '}
              de alta exigência.
            </h2>

            <ul className="mt-10 space-y-4">
              {serviceFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-base font-semibold text-brand-dark">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-[1.75rem] shadow-2xl shadow-brand-deep/10">
            <img
              className="aspect-[4/3] w-full object-cover"
              src="/assets/maintenance-valves.png"
              alt="Técnico trabalhando em válvulas de tanque."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
