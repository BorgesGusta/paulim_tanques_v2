import * as React from 'react'
import { Menu, MessageCircle } from 'lucide-react'

import { navItems } from '@/data/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

export function Header() {
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
                <Button variant="ghost" size="sm" asChild>
                  <a href={item.href}>{item.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild>
            <a href="#diagnostico">
              <MessageCircle />
              Falar com especialista
            </a>
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
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base"
                        asChild
                      />
                    }
                  >
                    <a href={item.href}>{item.label}</a>
                  </SheetClose>
                ))}
              </nav>

              <div className="px-4 pb-6">
                <SheetClose
                  render={
                    <Button className="w-full" asChild />
                  }
                >
                  <a href="#diagnostico">
                    <MessageCircle />
                    Falar com especialista
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
