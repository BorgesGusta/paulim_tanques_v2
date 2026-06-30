import { MessageCircle } from 'lucide-react'

import { contact } from '@/data/site'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'

export function ContactCta() {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`

  return (
    <section id="contato" className="section-anchor bg-brand-deep py-20 lg:py-28">
      <div className="section-shell flex flex-col items-center gap-8 text-center">
        <SectionHeading
          inverse
          eyebrow="Pronto para começar?"
          title="Fale com um especialista técnico agora"
          description="Sem formulários longos. Uma conversa técnica no WhatsApp resolve."
          className="items-center text-center"
        />

        <Button size="lg" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
          <MessageCircle />
          Iniciar diagnóstico no WhatsApp
        </Button>

        <p className="text-sm text-primary-foreground/60">
          Atendimento em dias úteis, 8h–18h
        </p>
      </div>
    </section>
  )
}
