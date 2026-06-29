import * as React from 'react'

import {
  emptyTechnicalRequest,
  validateTechnicalRequest,
  buildWhatsAppUrl,
  segments,
  type TechnicalRequest,
  type TechnicalRequestErrors,
} from '@/lib/technical-request'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2Icon, TriangleAlertIcon } from 'lucide-react'

export function TechnicalRequestForm() {
  const [values, setValues] = React.useState<TechnicalRequest>(
    emptyTechnicalRequest,
  )
  const [errors, setErrors] = React.useState<TechnicalRequestErrors>({})
  const [isPreparing, setIsPreparing] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const [fallbackUrl, setFallbackUrl] = React.useState<string | null>(null)
  const [wasOpened, setWasOpened] = React.useState(false)

  const nameRef = React.useRef<HTMLInputElement>(null)
  const companyRef = React.useRef<HTMLInputElement>(null)
  const phoneRef = React.useRef<HTMLInputElement>(null)
  const segmentRef = React.useRef<HTMLButtonElement>(null)
  const detailsRef = React.useRef<HTMLTextAreaElement>(null)

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [])

  function handleChange(
    field: keyof TechnicalRequest,
    value: string,
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setFallbackUrl(null)
    setWasOpened(false)

    const validationErrors = validateTechnicalRequest(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      // Focus first invalid field in order
      if (validationErrors.name) {
        nameRef.current?.focus()
      } else if (validationErrors.company) {
        companyRef.current?.focus()
      } else if (validationErrors.phone) {
        phoneRef.current?.focus()
      } else if (validationErrors.segment) {
        segmentRef.current?.focus()
      } else if (validationErrors.details) {
        detailsRef.current?.focus()
      }
      return
    }

    setIsPreparing(true)
    timerRef.current = setTimeout(() => {
      setIsPreparing(false)
      setIsConfirmOpen(true)
      timerRef.current = null
    }, 150)
  }

  function handleOpenWhatsApp() {
    const url = buildWhatsAppUrl(values)
    const openedWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (openedWindow !== null) {
      setWasOpened(true)
    } else {
      setFallbackUrl(url)
    }
    setIsConfirmOpen(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Diagnóstico inicial
        </p>
        <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
          Fale com um especialista técnico
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Preencha os dados abaixo e enviaremos sua solicitação diretamente
          pelo WhatsApp.
        </p>
      </div>

      {/* Form */}
      <form
        noValidate
        aria-label="Formulário de diagnóstico técnico"
        onSubmit={handleSubmit}
      >
        <FieldGroup>
          {/* Row 1: Name + Company */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Name */}
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="tr-name">Nome</FieldLabel>
              <Input
                id="tr-name"
                ref={nameRef}
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'tr-name-error' : undefined}
              />
              {errors.name && (
                <FieldError id="tr-name-error">{errors.name}</FieldError>
              )}
            </Field>

            {/* Company */}
            <Field data-invalid={Boolean(errors.company)}>
              <FieldLabel htmlFor="tr-company">Empresa / operação</FieldLabel>
              <Input
                id="tr-company"
                ref={companyRef}
                type="text"
                placeholder="Nome da empresa ou operação"
                autoComplete="organization"
                value={values.company}
                onChange={(e) => handleChange('company', e.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? 'tr-company-error' : undefined
                }
              />
              {errors.company && (
                <FieldError id="tr-company-error">{errors.company}</FieldError>
              )}
            </Field>
          </div>

          {/* Row 2: Phone + Segment */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Phone */}
            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="tr-phone">Telefone com DDD</FieldLabel>
              <Input
                id="tr-phone"
                ref={phoneRef}
                type="tel"
                placeholder="(94) 99999-9999"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'tr-phone-error' : undefined}
              />
              {errors.phone && (
                <FieldError id="tr-phone-error">{errors.phone}</FieldError>
              )}
            </Field>

            {/* Segment */}
            <Field data-invalid={Boolean(errors.segment)}>
              <FieldLabel htmlFor="tr-segment">Segmento</FieldLabel>
              <Select
                value={values.segment || null}
                onValueChange={(value) =>
                  handleChange('segment', value ?? '')
                }
              >
                <SelectTrigger
                  id="tr-segment"
                  ref={segmentRef}
                  className="w-full"
                  aria-invalid={Boolean(errors.segment)}
                  aria-describedby={
                    errors.segment ? 'tr-segment-error' : undefined
                  }
                >
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {segments.map((seg) => (
                      <SelectItem key={seg} value={seg}>
                        {seg}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.segment && (
                <FieldError id="tr-segment-error">{errors.segment}</FieldError>
              )}
            </Field>
          </div>

          {/* Details */}
          <Field data-invalid={Boolean(errors.details)}>
            <FieldLabel htmlFor="tr-details">
              Descreva brevemente o que sua operação precisa
            </FieldLabel>
            <Textarea
              id="tr-details"
              ref={detailsRef}
              placeholder="Ex.: tanque de 20.000 L para armazenagem de diesel, com saída lateral..."
              rows={4}
              className="min-h-24"
              value={values.details}
              onChange={(e) => handleChange('details', e.target.value)}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={
                errors.details ? 'tr-details-error' : undefined
              }
            />
            {errors.details && (
              <FieldError id="tr-details-error">{errors.details}</FieldError>
            )}
          </Field>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isPreparing}
            >
              {isPreparing ? (
                <>
                  <Spinner className="mr-2" />
                  Preparando…
                </>
              ) : (
                'Enviar solicitação'
              )}
            </Button>
          </div>

        </FieldGroup>
      </form>

      {/* Success alert */}
      {wasOpened && (
        <Alert className="mt-4">
          <CheckCircle2Icon />
          <AlertTitle>Solicitação enviada!</AlertTitle>
          <AlertDescription>
            O WhatsApp foi aberto com sua mensagem. Em breve um especialista
            entrará em contato.
          </AlertDescription>
        </Alert>
      )}

      {/* Fallback alert (popup blocked) */}
      {fallbackUrl && (
        <Alert variant="destructive" className="mt-4">
          <TriangleAlertIcon />
          <AlertTitle>Não foi possível abrir o WhatsApp</AlertTitle>
          <AlertDescription>
            Seu navegador bloqueou a abertura automática.{' '}
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui para abrir manualmente
            </a>
            .
          </AlertDescription>
        </Alert>
      )}

      {/* Confirmation dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar solicitação</AlertDialogTitle>
            <AlertDialogDescription>
              Revise os dados antes de enviar pelo WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <dl className="rounded-lg bg-muted px-4 py-3 text-sm">
            <div className="flex justify-between gap-2 py-1">
              <dt className="font-medium text-foreground">Empresa</dt>
              <dd className="text-muted-foreground">{values.company}</dd>
            </div>
            <div className="flex justify-between gap-2 py-1">
              <dt className="font-medium text-foreground">Telefone</dt>
              <dd className="text-muted-foreground">{values.phone}</dd>
            </div>
            <div className="flex justify-between gap-2 py-1">
              <dt className="font-medium text-foreground">Segmento</dt>
              <dd className="text-muted-foreground">{values.segment}</dd>
            </div>
          </dl>

          <AlertDialogFooter>
            <AlertDialogCancel>Revisar</AlertDialogCancel>
            <AlertDialogAction onClick={handleOpenWhatsApp}>
              Abrir WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
