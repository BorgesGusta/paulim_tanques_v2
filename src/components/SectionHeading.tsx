import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  inverse?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <p
        className={cn(
          'text-sm font-bold uppercase tracking-[0.16em]',
          inverse ? 'text-primary-foreground/70' : 'text-primary',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] md:text-5xl',
          inverse && 'text-primary-foreground',
        )}
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
