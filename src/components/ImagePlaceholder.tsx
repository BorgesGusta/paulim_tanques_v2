import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label: string
  className?: string
  aspectRatio?: string
}

export function ImagePlaceholder({
  label,
  className,
  aspectRatio,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-dark/25 bg-brand-dark/10',
        aspectRatio,
        className,
      )}
    >
      <ImageIcon
        className="size-10 text-brand-dark/35"
        aria-hidden="true"
      />
      <p className="max-w-[20ch] text-center text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
