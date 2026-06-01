import { contact, navItems, services } from '@/data/site';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-white px-5 pb-6 pt-16 md:pt-20">
      <div className="mx-auto max-w-6xl">
        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_.7fr_.7fr_.7fr]">
          {/* Brand */}
          <div>
            <img
              className="mb-5 w-48"
              src="/assets/paulim-tanques-logo.png"
              alt="Paulim Tanques"
            />
            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              {contact.serviceArea}
            </p>
          </div>

          {/* Contato */}
          <div>
            <strong className="block text-sm font-extrabold text-brand-dark">Contato</strong>
            <a
              className="mt-4 block text-sm text-muted-foreground transition hover:text-primary"
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="mt-3 block text-sm text-muted-foreground transition hover:text-primary"
              href={`tel:${contact.phoneRaw}`}
            >
              {contact.phoneLabel}
            </a>
          </div>

          {/* Navegação */}
          <div>
            <strong className="block text-sm font-extrabold text-brand-dark">Navegação</strong>
            {navItems.map((item) => (
              <a
                className="mt-3 block text-sm text-muted-foreground transition hover:text-primary"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Serviços */}
          <div>
            <strong className="block text-sm font-extrabold text-brand-dark">Serviços</strong>
            {services.slice(0, 4).map((service) => (
              <a
                className="mt-3 block text-sm text-muted-foreground transition hover:text-primary"
                href="#servicos"
                key={service.title}
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Paulim Tanques. Todos os direitos reservados.</p>
          <p>Desenvolvido com dedicação técnica.</p>
        </div>

        {/* Giant brand text */}
        <p className="mt-8 select-none text-center text-[clamp(3.5rem,18vw,13rem)] font-extrabold leading-none text-brand-dark/[0.06]">
          Paulim
        </p>
      </div>
    </footer>
  );
}
