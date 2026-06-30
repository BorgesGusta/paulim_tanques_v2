import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft } from 'lucide-react'

type Props = {
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  loading?: boolean
  disabled?: boolean
}

export function WizardNav({ onNext, onBack, nextLabel = 'Próximo', loading = false, disabled = false }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      {onBack ? (
        <Button variant="ghost" onClick={onBack} type="button">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      ) : (
        <div />
      )}
      <Button onClick={onNext} disabled={disabled || loading} type="button">
        {loading && <Spinner className="mr-2" />}
        {nextLabel}
      </Button>
    </div>
  )
}
