import { MessageCircle } from 'lucide-react';
import { contact } from '@/data/site';
import { Button } from '@/components/ui/button';

export function ContactCta() {
  return (
    <section id="contato" className="section-anchor bg-background p-2 md:p-3">
      <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-brand-deep text-white shadow-2xl shadow-brand-deep/20 md:rounded-[2.5rem]">
        {/* Background image */}
        <img
          className="absolute inset-0 size-full object-cover opacity-25"
          src="/assets/cold-vapor-service.png"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/85 to-brand-deep/70" />

        {/* Content — centered */}
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <h2 className="text-balance text-4xl font-extrabold leading-[0.98] md:text-6xl">
            Solicite um orçamento para sua frota ou operação.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-white/70">
            Envie os dados iniciais pelo WhatsApp e avance para uma avaliação técnica com a Paulim Tanques.
          </p>

          {/* Two buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="glass" size="lg">
              <a href={`tel:${contact.phoneRaw}`}>
                {contact.phoneLabel}
              </a>
            </Button>
            <Button asChild size="lg">
              <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
