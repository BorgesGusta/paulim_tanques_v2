import { MessageCircle, Sparkles } from 'lucide-react';
import { contact } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Hero() {
  return (
    <section id="inicio" className="section-anchor p-2 md:p-3">
      <div className="relative mx-auto h-[calc(100vh-1rem)] max-h-[calc(100vh-1rem)] overflow-hidden rounded-[2rem] bg-brand-deep text-white shadow-2xl shadow-brand-deep/20 md:h-[calc(100vh-1.5rem)] md:max-h-[calc(100vh-1.5rem)] md:rounded-[2.5rem]">
        {/* Background image */}
        <img
          className="absolute inset-0 size-full object-cover object-[62%_center] opacity-35"
          src="/assets/hero-tanker-workshop.png"
          alt=""
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,31,11,.92)_0%,rgba(10,31,11,.78)_45%,rgba(10,31,11,.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-transparent" />

        {/* Decorative P watermark */}
        <span className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[22rem] font-extrabold leading-none text-white/[0.04] lg:block">
          P
        </span>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-center px-[6%] py-28 md:px-[8%] md:py-32 lg:px-[10%]">
          <div className="max-w-2xl animate-fade-in-up">
            <Badge variant="light" className="mb-6">
              <Sparkles className="size-3" />
              Tanques inflamáveis e vapor a frio
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-[0.96] tracking-tight md:text-5xl lg:text-6xl">
              Referência em tanques e frotas industriais.
            </h1>
            <p className="safe-copy mt-6 max-w-lg text-base leading-8 text-white/70 md:text-lg">
              Manutenção, adequação e atendimento especializado para operações que precisam de segurança e disponibilidade.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  Solicitar orçamento
                </a>
              </Button>
            </div>
          </div>

          {/* Floating trust card — top right */}
          <Card className="absolute right-10 top-28 hidden max-w-60 animate-float border-white/30 bg-white/92 p-5 text-brand-dark shadow-2xl shadow-black/15 backdrop-blur-sm lg:block xl:right-14">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-4xl font-extrabold leading-none text-primary">4.9</span>
              <div>
                <div className="flex gap-0.5 text-sm text-signal">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">Satisfação de clientes</p>
              </div>
            </div>
            <p className="text-xs font-semibold leading-5 text-muted-foreground">
              Avaliação em segurança, qualidade e prazo de entrega.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
