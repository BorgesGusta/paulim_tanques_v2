import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  serif?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  serif = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Badge variant="brand" className={cn('mb-4', align === 'center' && 'mx-auto')}>
        <span className="size-2 rounded-full bg-signal" />
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          'text-balance text-4xl font-extrabold leading-[0.98] tracking-normal text-brand-dark md:text-6xl',
          serif && 'font-serif font-bold italic',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
