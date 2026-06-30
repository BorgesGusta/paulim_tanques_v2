import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2, type WaterTankModel } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const models: { value: WaterTankModel; label: string }[] = [
  { value: 'taca-cheia', label: 'Taça Cheia' },
  { value: 'taca-vazia', label: 'Taça Vazia' },
  { value: 'tubular', label: 'Tubular' },
]

const volumes = ['10000', '15000', '20000', '25000', '30000', '50000']

export function Step2WaterTank() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep2(form)
    if (err) { setError(err); return }
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={2} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Configuração da caixa d'água</h3>
      </div>

      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground mb-1">Modelo</legend>
          <div className="flex flex-wrap gap-2">
            {models.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => update('waterTankModel', value)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  form.waterTankModel === value
                    ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                    : 'border-border hover:border-brand-dark/40',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <Field>
          <FieldLabel htmlFor="wt-volume">Volume</FieldLabel>
          <Select value={form.waterTankVolume || null} onValueChange={(v) => update('waterTankVolume', v ?? '')}>
            <SelectTrigger id="wt-volume" className="w-full">
              <SelectValue placeholder="Selecione o volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {volumes.map((v) => (
                  <SelectItem key={v} value={v}>
                    {Number(v).toLocaleString('pt-BR')} L
                  </SelectItem>
                ))}
                <SelectItem value="outro">Outro volume</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {form.waterTankVolume === 'outro' && (
          <Field>
            <FieldLabel htmlFor="wt-volume-custom">Informe o volume</FieldLabel>
            <Input
              id="wt-volume-custom"
              placeholder="Ex.: 40.000 L"
              value={form.waterTankVolumeCustom}
              onChange={(e) => update('waterTankVolumeCustom', e.target.value)}
            />
          </Field>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
