import { cn } from '@/lib/utils'

interface FieldProps {
  className?: string
  children: React.ReactNode
  'data-invalid'?: boolean
}

export function Field({ className, children, ...props }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  )
}

interface FieldLabelProps {
  htmlFor: string
  children: React.ReactNode
  className?: string
}

export function FieldLabel({ htmlFor, children, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-semibold text-foreground', className)}
    >
      {children}
    </label>
  )
}

interface FieldErrorProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function FieldError({ id, children, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn('text-sm font-medium text-destructive', className)}
    >
      {children}
    </p>
  )
}

interface FieldDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function FieldDescription({ children, className }: FieldDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

interface FieldGroupProps {
  children: React.ReactNode
  className?: string
}

export function FieldGroup({ children, className }: FieldGroupProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {children}
    </div>
  )
}
