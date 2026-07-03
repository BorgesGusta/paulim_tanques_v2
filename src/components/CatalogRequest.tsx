import * as React from 'react'
import { Download, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function CatalogRequestButton({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<Status>('idle')
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setError('Preencha nome e e-mail válidos.')
      return
    }
    setError(null)
    setStatus('loading')
    try {
      const res = await fetch('/api/send-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Não foi possível enviar agora. Tente novamente em instantes.')
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setStatus('idle')
      setError(null)
      setName('')
      setEmail('')
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className={className}>
        <Download className="size-4" />
        Solicitar catálogo
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton>
          <div className="flex flex-col gap-6 p-6">
            <DialogHeader>
              <DialogTitle>Receba o catálogo por e-mail</DialogTitle>
              <DialogDescription>
                Preencha seus dados e enviamos o catálogo completo de produtos agora mesmo.
              </DialogDescription>
            </DialogHeader>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="size-10 text-brand-dark" aria-hidden="true" />
                <p className="text-sm text-foreground">
                  Catálogo enviado! Confira a caixa de entrada de <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="cat-name">Nome</FieldLabel>
                  <Input
                    id="cat-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cat-email">E-mail</FieldLabel>
                  <Input
                    id="cat-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </Field>
                {error && <FieldError id="cat-error">{error}</FieldError>}
                <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full">
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar catálogo'
                  )}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
