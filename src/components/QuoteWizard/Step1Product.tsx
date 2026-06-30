import * as React from 'react'
import { Cylinder, Droplets, Wrench } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep1, type QuoteProduct } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { cn } from '@/lib/utils'

const products: { value: QuoteProduct; label: string; description: string; Icon: React.ElementType }[] = [
  { value: 'caixa-dagua', label: "Caixa d'Água", description: 'Taça Cheia, Taça Vazia ou Tubular', Icon: Droplets },
  { value: 'tanque-estacionario', label: 'Tanque Estacionário', description: 'Diesel, gasolina, etanol e outros líquidos', Icon: Cylinder },
  { value: 'equipamentos', label: 'Equipamentos', description: 'Bombas, bicos, mangueiras e acessórios', Icon: Wrench },
]

export function Step1Product() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function handleSelect(value: QuoteProduct) {
    setForm((prev) => ({ ...prev, product: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep1(form)
    if (err) { setError(err); return }
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={1} total={4} />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-foreground">O que você precisa?</h3>
        <p className="text-sm text-muted-foreground">Selecione o produto principal da sua solicitação.</p>
      </div>

      <div className="flex flex-col gap-3">
        {products.map(({ value, label, description, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleSelect(value)}
            className={cn(
              'flex items-center gap-4 rounded-xl border p-4 text-left transition-colors',
              form.product === value
                ? 'border-brand-dark bg-brand-deep/5 ring-1 ring-brand-dark'
                : 'border-border hover:border-brand-dark/40 hover:bg-muted',
            )}
          >
            <span className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              form.product === value ? 'bg-brand-deep text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}>
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onNext={handleNext} />
    </div>
  )
}
