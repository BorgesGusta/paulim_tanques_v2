import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep4 } from '@/lib/quote-form'
import { loadGoogleMaps, initCityAutocomplete } from '@/lib/google-maps'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Step4Client() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)
  const cityRef = React.useRef<HTMLInputElement>(null)

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  React.useEffect(() => {
    let cleanup: (() => void) | undefined
    loadGoogleMaps()
      .then(() => {
        if (!cityRef.current) return
        cleanup = initCityAutocomplete(cityRef.current, (city, state) => {
          setForm((prev) => ({ ...prev, clientCity: city, clientState: state }))
          setError(null)
        })
      })
      .catch(() => {})
    return () => cleanup?.()
  }, [setForm])

  function handleNext() {
    const err = validateStep4(form)
    if (err) { setError(err); return }
    setStep(5)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={4} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Seus dados</h3>
        <p className="text-sm text-muted-foreground mt-1">Para entrarmos em contato com o orçamento.</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="cl-name">Nome</FieldLabel>
          <Input
            id="cl-name"
            placeholder="Seu nome completo"
            autoComplete="name"
            value={form.clientName}
            onChange={(e) => update('clientName', e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cl-phone">WhatsApp com DDD</FieldLabel>
          <Input
            id="cl-phone"
            type="tel"
            inputMode="tel"
            placeholder="(94) 99156-2929"
            autoComplete="tel"
            value={form.clientPhone}
            onChange={(e) => update('clientPhone', e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cl-email">E-mail</FieldLabel>
          <Input
            id="cl-email"
            type="email"
            inputMode="email"
            placeholder="seu@email.com"
            autoComplete="email"
            value={form.clientEmail}
            onChange={(e) => update('clientEmail', e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="cl-city">Cidade</FieldLabel>
            <Input
              id="cl-city"
              ref={cityRef}
              placeholder="Digite e selecione sua cidade"
              autoComplete="address-level2"
              value={form.clientCity}
              onChange={(e) => update('clientCity', e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="cl-state">Estado</FieldLabel>
            <Input
              id="cl-state"
              placeholder="PA"
              maxLength={2}
              autoComplete="address-level1"
              value={form.clientState}
              onChange={(e) => update('clientState', e.target.value.toUpperCase())}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="cl-notes">Observações (opcional)</FieldLabel>
          <Textarea
            id="cl-notes"
            rows={3}
            placeholder="Informações adicionais relevantes para o orçamento..."
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </Field>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(3)} onNext={handleNext} nextLabel="Revisar pedido" />
    </div>
  )
}
