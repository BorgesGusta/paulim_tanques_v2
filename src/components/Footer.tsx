import type * as React from 'react'
import { MapPin, Mail } from 'lucide-react'
import { navItems, contact } from '@/data/site'
import { Separator } from '@/components/ui/separator'

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.399-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.054-.06 1.37-.06 4.041 0 2.67.01 2.987.06 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.041.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344.466-.182.8-.399 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.054.06-1.37.06-4.041 0-2.67-.01-2.987-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.09 3.09 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.05-1.37-.06-4.041-.06Zm0 3.064a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27Zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.53 17.52 2.04 12 2.04S2 6.53 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

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
            <address className="not-italic text-sm text-background/70 flex flex-col gap-1.5 max-w-60">
              <span>{contact.whatsappLabel}</span>
              <a href={`mailto:${contact.email}`} className="hover:text-background transition-colors">
                {contact.email}
              </a>
              <span className="flex items-start gap-1.5">
                <MapPin className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
                {contact.address}
              </span>
            </address>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Paulim Tanques"
                className="text-background/60 hover:text-background transition-colors"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Paulim Tanques"
                className="text-background/60 hover:text-background transition-colors"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Enviar e-mail para a Paulim Tanques"
                className="text-background/60 hover:text-background transition-colors"
              >
                <Mail className="size-5" />
              </a>
            </div>
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
