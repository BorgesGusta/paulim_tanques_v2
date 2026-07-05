import * as React from 'react'
import { Download, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { loadGoogleMaps, initCityAutocomplete } from '@/lib/google-maps'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Interest = 'caixa-dagua' | 'tanque' | ''

const waterVolumes = ['10000', '15000', '20000', '25000', '30000', '50000']
const tankVolumes = ['3000', '4000', '5000', '6000', '7000', '8000', '10000', '15000', '20000', '25000']

export function CatalogRequestButton({
  className,
  size = 'default',
}: {
  className?: string
  size?: 'default' | 'lg'
}) {
  const [open, setOpen] = React.useState(false)

  const [name, setName] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')
  const [interest, setInterest] = React.useState<Interest>('')
  const [volume, setVolume] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [city, setCity] = React.useState('')

  const [status, setStatus] = React.useState<Status>('idle')
  const [error, setError] = React.useState<string | null>(null)
  const cityRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!open) return
    let cleanup: (() => void) | undefined
    loadGoogleMaps()
      .then(() => {
        if (!cityRef.current) return
        cleanup = initCityAutocomplete(cityRef.current, (cityName) => setCity(cityName))
      })
      .catch(() => {})
    return () => cleanup?.()
  }, [open])

  function reset() {
    setStatus('idle')
    setError(null)
    setName('')
    setWhatsapp('')
    setInterest('')
    setVolume('')
    setEmail('')
    setCity('')
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !whatsapp.trim() || !email.trim() || !email.includes('@')) {
      setError('Preencha nome, WhatsApp e e-mail válidos.')
      return
    }

    setError(null)
    setStatus('loading')
    try {
      const res = await fetch('/api/send-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, interest, volume, email, city }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Não foi possível enviar agora. Tente novamente em instantes.')
    }
  }

  const volumeOptions = interest === 'caixa-dagua' ? waterVolumes : interest === 'tanque' ? tankVolumes : []

  return (
    <>
      <Button variant="outline" size={size} onClick={() => setOpen(true)} className={className}>
        <Download className="size-4" />
        Solicitar catálogo
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton>
          <div className="flex flex-col gap-6 p-6">
            <DialogHeader>
              <DialogTitle>Receba o catálogo por e-mail</DialogTitle>
              <DialogDescription>
                Responda rapidinho e já te enviamos o catálogo certo pro que você precisa.
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
                  <FieldLabel htmlFor="cat-whatsapp">WhatsApp com DDD</FieldLabel>
                  <Input
                    id="cat-whatsapp"
                    type="tel"
                    inputMode="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(94) 99999-9999"
                  />
                </Field>

                <fieldset className="flex flex-col gap-2">
                  <legend className="text-sm font-semibold text-foreground mb-1">
                    Você tem interesse em
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'caixa-dagua' as const, label: "Caixa d'Água" },
                      { value: 'tanque' as const, label: 'Tanque Estacionário' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setInterest(value)
                          setVolume('')
                        }}
                        className={cn(
                          'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                          interest === value
                            ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                            : 'border-border hover:border-brand-dark/40',
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {interest && (
                  <Field>
                    <FieldLabel htmlFor="cat-volume">
                      {interest === 'caixa-dagua' ? 'Volume da caixa d\'água' : 'Capacidade do tanque'}
                    </FieldLabel>
                    <Select value={volume || null} onValueChange={(v) => setVolume(v ?? '')}>
                      <SelectTrigger id="cat-volume" className="w-full">
                        <SelectValue placeholder="Selecione o volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {volumeOptions.map((v) => (
                            <SelectItem key={v} value={v}>
                              {Number(v).toLocaleString('pt-BR')} L
                            </SelectItem>
                          ))}
                          <SelectItem value="outro">Ainda não sei / outro</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}

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

                <Field>
                  <FieldLabel htmlFor="cat-city">Cidade</FieldLabel>
                  <Input
                    id="cat-city"
                    ref={cityRef}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Onde é (ou vai ser) a operação"
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
