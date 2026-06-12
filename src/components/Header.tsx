import { Menu, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navItems } from '@/data/site'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="section-shell flex min-h-20 items-center justify-between gap-6">
        <a
          className="inline-flex min-h-11 items-center"
          href="#inicio"
          aria-label="Paulim Tanques - início"
        >
          <img
            className="h-auto w-40"
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
          />
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <Button asChild key={item.href} variant="ghost">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="min-h-11">
            <a href="#diagnostico">
              <MessageCircle data-icon="inline-start" />
              Falar com especialista
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="size-11 lg:hidden"
              size="icon"
              type="button"
              variant="outline"
              aria-label="Abrir menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Paulim Tanques</SheetTitle>
              <SheetDescription>
                Navegue pelas soluções e acesse o diagnóstico técnico.
              </SheetDescription>
            </SheetHeader>
            <nav
              className="flex flex-col gap-2 px-4"
              aria-label="Navegação mobile"
            >
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    className="inline-flex min-h-11 items-center border-b py-3 font-semibold"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-4 min-h-11">
                  <a href="#diagnostico">
                    <MessageCircle data-icon="inline-start" />
                    Falar com especialista
                  </a>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
