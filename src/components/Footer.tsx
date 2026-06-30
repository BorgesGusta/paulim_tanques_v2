import { navItems, contact } from '@/data/site'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="section-shell flex flex-col gap-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_auto] sm:items-start">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-3">
            <img
              src="/assets/paulim-tanques-logo.png"
              alt="Paulim Tanques"
              className="h-8 w-auto object-contain brightness-0 invert self-start"
            />
            <p className="text-sm text-background/60">
              Especialistas em equipamentos para transporte e abastecimento.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-background/40">
              Navegação
            </p>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-background/40">
              Contato
            </p>
            <address className="not-italic text-sm text-background/70 flex flex-col gap-1">
              <span>{contact.whatsappLabel}</span>
              <span>{contact.serviceArea}</span>
            </address>
          </div>
        </div>

        <Separator className="bg-background/10" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between text-xs text-background/40">
          <span>© {new Date().getFullYear()} Paulim Tanques. Todos os direitos reservados.</span>
          <span>Marabá, Pará, Brasil</span>
        </div>
      </div>
    </footer>
  )
}
