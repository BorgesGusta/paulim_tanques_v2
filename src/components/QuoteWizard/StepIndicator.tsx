type Props = {
  step: number
  total: number
}

export function StepIndicator({ step, total }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-brand-dark' : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Etapa {step} de {total}
      </p>
    </div>
  )
}
