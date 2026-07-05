import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2, type WaterTankModel } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const models: { value: WaterTankModel; label: string; description: string }[] = [
  {
    value: 'coluna-cheia',
    label: 'Coluna Cheia',
    description: 'A coluna de sustentação também é preenchida com água, aumentando a capacidade total de armazenamento.',
  },
  {
    value: 'coluna-seca',
    label: 'Coluna Seca',
    description: 'A coluna de sustentação é apenas estrutural. Só o reservatório no topo armazena água.',
  },
  {
    value: 'tubular',
    label: 'Tubular',
    description: 'Formato tubular contínuo, sem separação entre reservatório e coluna de sustentação.',
  },
]

const modelImages: Record<WaterTankModel, string> = {
  'coluna-cheia': '/assets/products/caixa-dagua-coluna-cheia.png',
  'coluna-seca': '/assets/products/caixa-dagua-coluna-seca.png',
  'tubular': '/assets/products/caixa-dagua-tubular.png',
}

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

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Illustration — full image visible, no cropping */}
        {form.waterTankModel && (
          <div className="flex shrink-0 flex-col gap-2 sm:w-44">
            <div className="aspect-3/4 overflow-hidden rounded-xl border border-border bg-white">
              <img
                src={modelImages[form.waterTankModel]}
                alt={`Caixa d'água modelo ${models.find((m) => m.value === form.waterTankModel)?.label}`}
                className="h-full w-full object-contain p-2"
              />
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              {models.find((m) => m.value === form.waterTankModel)?.description}
            </p>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4">
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
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
