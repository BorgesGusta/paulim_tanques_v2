import { Separator } from '@/components/ui/separator'
import { contact, navItems } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-brand-deep py-14 text-primary-foreground">
      <div className="section-shell flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div className="flex max-w-sm flex-col gap-5">
            <span className="inline-flex w-fit rounded-lg bg-card p-3">
              <img
                className="w-48"
                src="/assets/paulim-tanques-logo.png"
                alt="Paulim Tanques"
              />
            </span>
            <p className="leading-7 text-primary-foreground/70">
              Soluções técnicas para transporte, abastecimento e operações que
              dependem de segurança e disponibilidade.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <strong>Navegação</strong>
            {navItems.map((item) => (
              <a
                className="inline-flex min-h-11 items-center text-primary-foreground/70 hover:text-primary-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <strong>Atendimento</strong>
            <span className="text-primary-foreground/70">
              {contact.serviceArea}
            </span>
            <a
              className="inline-flex min-h-11 items-center text-primary-foreground/70 hover:text-primary-foreground"
              href={`https://wa.me/${contact.whatsappNumber}`}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp de demonstração: {contact.whatsappLabel}
            </a>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        <div className="flex flex-col gap-2 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Paulim Tanques.</p>
          <p>Número de contato provisório para demonstração.</p>
        </div>
      </div>
    </footer>
  )
}
