import { Menu, MessageCircle, FileText } from 'lucide-react'

import { navItems } from '@/data/site'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { useQuote } from '@/context/QuoteContext'

export function Header() {
  const { open } = useQuote()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a href="#inicio" aria-label="Paulim Tanques — início da página">
          <img
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Button variant="ghost" size="sm" render={<a href={item.href} />}>
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button onClick={() => open()}>
            <FileText />
            Solicitar orçamento
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu de navegação"
                />
              }
            >
              <Menu />
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {navItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <a
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'w-full justify-start text-base',
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>

              <div className="px-4 pb-6">
                <SheetClose
                  render={
                    <button
                      type="button"
                      onClick={() => open()}
                      className={cn(buttonVariants(), 'w-full')}
                    />
                  }
                >
                  <MessageCircle />
                  Falar com especialista
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
