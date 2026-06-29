import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  inverse?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'text-sm font-bold uppercase tracking-[0.16em]',
            inverse ? 'text-primary-foreground/70' : 'text-primary',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'font-display text-balance font-bold leading-[1.02] tracking-[-0.035em]',
          inverse ? 'text-primary-foreground' : 'text-foreground',
        )}
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-7',
            inverse ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
