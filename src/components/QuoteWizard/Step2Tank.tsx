import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2, type TankLiquid } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const volumes = ['3000', '4000', '5000', '6000', '7000', '8000', '10000', '15000', '20000', '25000']
const liquids: { value: TankLiquid; label: string }[] = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'gasolina', label: 'Gasolina' },
  { value: 'etanol', label: 'Etanol' },
  { value: 'aviacao', label: 'Combustível de Aviação' },
  { value: 'querosene', label: 'Querosene' },
  { value: 'outro', label: 'Outro' },
]

export function Step2Tank() {
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
        <h3 className="text-lg font-bold text-foreground">Configuração do tanque estacionário</h3>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="tank-volume">Volume</FieldLabel>
          <Select value={form.tankVolume || null} onValueChange={(v) => update('tankVolume', v ?? '')}>
            <SelectTrigger id="tank-volume" className="w-full">
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

        {form.tankVolume === 'outro' && (
          <Field>
            <FieldLabel htmlFor="tank-volume-custom">Informe o volume</FieldLabel>
            <Input
              id="tank-volume-custom"
              placeholder="Ex.: 30.000 L"
              value={form.tankVolumeCustom}
              onChange={(e) => update('tankVolumeCustom', e.target.value)}
            />
          </Field>
        )}

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground mb-1">Tanque bipartido?</legend>
          <p className="text-xs text-muted-foreground -mt-1">Permite armazenar dois líquidos diferentes no mesmo tanque.</p>
          <div className="flex gap-3 mt-1">
            {[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }].map(({ value, label }) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => {
                  update('tankBipartido', value)
                  if (!value) {
                    setForm((prev) => ({ ...prev, tankLiquid2: '', tankLiquid2Custom: '' }))
                  }
                }}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  form.tankBipartido === value
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
          <FieldLabel htmlFor="tank-liquid">
            {form.tankBipartido ? 'Líquido armazenado (lado 1)' : 'Líquido armazenado'}
          </FieldLabel>
          <Select value={form.tankLiquid || null} onValueChange={(v) => update('tankLiquid', v as TankLiquid ?? '')}>
            <SelectTrigger id="tank-liquid" className="w-full">
              <SelectValue placeholder="Selecione o líquido" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {liquids.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {form.tankLiquid === 'outro' && (
          <Field>
            <FieldLabel htmlFor="tank-liquid-custom">Informe o líquido</FieldLabel>
            <Input
              id="tank-liquid-custom"
              placeholder="Ex.: Óleo vegetal"
              value={form.tankLiquidCustom}
              onChange={(e) => update('tankLiquidCustom', e.target.value)}
            />
          </Field>
        )}

        {form.tankBipartido && (
          <>
            <Field>
              <FieldLabel htmlFor="tank-liquid-2">Líquido armazenado (lado 2)</FieldLabel>
              <Select value={form.tankLiquid2 || null} onValueChange={(v) => update('tankLiquid2', v as TankLiquid ?? '')}>
                <SelectTrigger id="tank-liquid-2" className="w-full">
                  <SelectValue placeholder="Selecione o líquido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {liquids.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {form.tankLiquid2 === 'outro' && (
              <Field>
                <FieldLabel htmlFor="tank-liquid-2-custom">Informe o líquido do lado 2</FieldLabel>
                <Input
                  id="tank-liquid-2-custom"
                  placeholder="Ex.: Óleo vegetal"
                  value={form.tankLiquid2Custom}
                  onChange={(e) => update('tankLiquid2Custom', e.target.value)}
                />
              </Field>
            )}
          </>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="shrink-0 sm:w-56">
            <div className="aspect-video overflow-hidden rounded-xl border border-border bg-white">
              <img
                src={form.tankContainment ? '/assets/products/tanque-com-bacia.png' : '/assets/products/tanque-sem-bacia.png'}
                alt={form.tankContainment ? 'Tanque estacionário com bacia de contenção' : 'Tanque estacionário sem bacia de contenção'}
                className="h-full w-full object-contain p-2"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-foreground mb-1">Bacia de contenção?</legend>
              <p className="text-xs text-muted-foreground -mt-1">Estrutura que retém vazamentos ao redor do tanque.</p>
              <div className="flex gap-3 mt-1">
                {[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }].map(({ value, label }) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => update('tankContainment', value)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                      form.tankContainment === value
                        ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                        : 'border-border hover:border-brand-dark/40',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-foreground mb-1">Bomba instalada?</legend>
              <p className="text-xs text-muted-foreground -mt-1">Bomba e bico de abastecimento já montados no tanque.</p>
              <div className="flex gap-3 mt-1">
                {[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }].map(({ value, label }) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => update('tankPump', value)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                      form.tankPump === value
                        ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                        : 'border-border hover:border-brand-dark/40',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
