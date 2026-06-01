import { Clock3, Truck } from 'lucide-react';
import { differentials } from '@/data/site';
import { BrandIcon } from '@/components/BrandIcon';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/ui/card';

export function Differentials() {
  return (
    <section id="diferenciais" className="section-anchor bg-white px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        {/* Left: images grid + stat cards */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            <img
              className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover shadow-lg shadow-brand-deep/8"
              src="/assets/maintenance-valves.png"
              alt="Manutenção de válvulas em tanque industrial."
            />
            <img
              className="aspect-square w-full rounded-2xl object-cover shadow-lg shadow-brand-deep/8"
              src="/assets/cold-vapor-service.png"
              alt="Serviço de vapor a frio."
            />
            <img
              className="aspect-square w-full rounded-2xl object-cover shadow-lg shadow-brand-deep/8"
              src="/assets/hero-tanker-workshop.png"
              alt="Oficina de caminhões-tanque."
            />
          </div>

          {/* Stat cards */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Card className="flex items-center gap-3 border-border/80 bg-white p-4 shadow-none">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-brand-dark">Atendimento ágil</p>
                <p className="text-xs text-muted-foreground">Prazo confiável</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 border-border/80 bg-white p-4 shadow-none">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-brand-dark">50+ frotas</p>
                <p className="text-xs text-muted-foreground">Clientes atendidos</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: text content */}
        <div>
          <SectionHeading
            eyebrow="Diferenciais"
            title="Confiabilidade e qualidade no detalhe."
          />
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Nossa equipe é treinada para atuar com critério técnico em cada etapa, desde a avaliação inicial até a liberação do equipamento. O compromisso é entregar segurança, prazo e resultado para operações que não podem parar.
          </p>

          <div className="mt-8 space-y-5">
            {differentials.slice(0, 3).map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <BrandIcon name={item.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-brand-dark">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
