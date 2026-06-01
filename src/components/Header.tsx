import { Menu, MessageCircle } from 'lucide-react';
import { contact } from '@/data/site';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const headerNavItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export function Header() {
  return (
    <header className="fixed left-1/2 top-4 z-50 flex w-[calc(100vw-1.5rem)] max-w-[1260px] -translate-x-1/2 items-center justify-between gap-2 md:top-6 md:w-[calc(100vw-3rem)]">
      {/* Logo pill */}
      <a
        className="flex h-14 min-w-0 shrink-0 items-center rounded-full border border-white/75 bg-white/95 px-3 shadow-2xl shadow-brand-deep/10 backdrop-blur-xl md:h-[54px]"
        href="#inicio"
        aria-label="Paulim Tanques"
      >
        <span className="flex min-w-0 items-center">
          <img
            className="h-auto w-28 md:w-32"
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
          />
        </span>
      </a>

      {/* Desktop navigation pill */}
      <div className="hidden h-[54px] items-center justify-center rounded-full border border-white/75 bg-white/95 px-5 shadow-2xl shadow-brand-deep/10 backdrop-blur-xl lg:flex">
        <nav className="flex items-center gap-0.5" aria-label="Navegação principal">
          {headerNavItems.map((item) => (
            <a
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-bold text-brand-deep transition hover:bg-secondary hover:text-primary xl:px-4"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* CTA pill — desktop */}
      <a
        className="hidden h-[54px] shrink-0 items-center justify-center rounded-full border border-white/75 bg-white/95 px-8 text-sm font-extrabold text-brand-deep shadow-2xl shadow-brand-deep/10 backdrop-blur-xl transition hover:bg-secondary md:flex"
        href={contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        Orçamento
      </a>

      {/* Mobile menu */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/75 bg-white/95 text-brand-deep shadow-lg shadow-brand-deep/10 backdrop-blur-xl transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Abrir menu"
              type="button"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Paulim Tanques</SheetTitle>
              <SheetDescription className="sr-only">
                Menu de navegação da Paulim Tanques
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-8 grid gap-3" aria-label="Navegação mobile">
              {headerNavItems.map((item) => (
                <a
                  className="rounded-xl border border-border px-4 py-3 text-sm font-bold text-brand-dark transition hover:bg-secondary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Button asChild className="mt-8 w-full">
              <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle />
                Solicitar orçamento
              </a>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
