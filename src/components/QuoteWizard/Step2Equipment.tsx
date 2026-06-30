import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2 } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export function Step2Equipment() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function handleNext() {
    const err = validateStep2(form)
    if (err) { setError(err); return }
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={2} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Equipamentos necessários</h3>
        <p className="text-sm text-muted-foreground mt-1">Descreva os equipamentos, peças ou acessórios que precisa.</p>
      </div>

      <Field data-invalid={Boolean(error)}>
        <FieldLabel htmlFor="equip-desc">Descrição</FieldLabel>
        <Textarea
          id="equip-desc"
          rows={5}
          placeholder="Ex.: bomba elétrica 12V, bico de abastecimento, mangueira 2 polegadas..."
          value={form.equipmentDescription}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, equipmentDescription: e.target.value }))
            setError(null)
          }}
        />
        {error && <FieldError id="equip-desc-error">{error}</FieldError>}
      </Field>

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
