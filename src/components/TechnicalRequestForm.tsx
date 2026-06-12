import { useEffect, useRef, useState, type FormEvent } from 'react'

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import {
  buildWhatsAppUrl,
  emptyTechnicalRequest,
  segments,
  validateTechnicalRequest,
  type TechnicalRequest,
} from '@/lib/technical-request'

type ValidationErrors = ReturnType<typeof validateTechnicalRequest>
type FieldName = keyof TechnicalRequest

const fieldOrder: FieldName[] = [
  'name',
  'company',
  'phone',
  'segment',
  'details',
]

export function TechnicalRequestForm() {
  const [values, setValues] = useState<TechnicalRequest>(() => ({
    ...emptyTechnicalRequest,
  }))
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isPreparing, setIsPreparing] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null)
  const [wasOpened, setWasOpened] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const segmentRef = useRef<HTMLButtonElement>(null)
  const detailsRef = useRef<HTMLTextAreaElement>(null)
  const preparationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (preparationTimerRef.current) {
        clearTimeout(preparationTimerRef.current)
      }
    }
  }, [])

  function updateValue<Field extends FieldName>(
    field: Field,
    value: TechnicalRequest[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }))

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  function focusFirstError(nextErrors: ValidationErrors) {
    const refs = {
      name: nameRef,
      company: companyRef,
      phone: phoneRef,
      segment: segmentRef,
      details: detailsRef,
    }
    const firstInvalidField = fieldOrder.find((field) => nextErrors[field])

    if (firstInvalidField) {
      refs[firstInvalidField].current?.focus()
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (preparationTimerRef.current) {
      clearTimeout(preparationTimerRef.current)
      preparationTimerRef.current = null
    }

    const nextErrors = validateTechnicalRequest(values)

    setFallbackUrl(null)
    setWasOpened(false)
    setErrors(nextErrors)

    if (fieldOrder.some((field) => nextErrors[field])) {
      setIsPreparing(false)
      focusFirstError(nextErrors)
      return
    }

    setIsPreparing(true)
    preparationTimerRef.current = setTimeout(() => {
      setIsPreparing(false)
      setIsConfirmOpen(true)
      preparationTimerRef.current = null
    }, 150)
  }

  function handleOpenWhatsApp() {
    const url = buildWhatsAppUrl(values)
    const openedWindow = window.open(url, '_blank', 'noopener,noreferrer')

    setIsConfirmOpen(false)

    if (openedWindow) {
      setWasOpened(true)
      setFallbackUrl(null)
      return
    }

    setWasOpened(false)
    setFallbackUrl(url)
  }

  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Diagnóstico inicial
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Fale com um especialista técnico
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Conte o contexto da operação. Você revisa os dados antes de abrir a
          conversa.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="technical-name">Nome</FieldLabel>
              <Input
                className="h-11"
                ref={nameRef}
                id="technical-name"
                name="name"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'technical-name-error' : undefined
                }
                onChange={(event) => updateValue('name', event.target.value)}
              />
              {errors.name ? (
                <FieldError id="technical-name-error">
                  {errors.name}
                </FieldError>
              ) : null}
            </Field>

            <Field data-invalid={Boolean(errors.company)}>
              <FieldLabel htmlFor="technical-company">
                Empresa ou operação
              </FieldLabel>
              <Input
                className="h-11"
                ref={companyRef}
                id="technical-company"
                name="company"
                autoComplete="organization"
                value={values.company}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? 'technical-company-error' : undefined
                }
                onChange={(event) => updateValue('company', event.target.value)}
              />
              {errors.company ? (
                <FieldError id="technical-company-error">
                  {errors.company}
                </FieldError>
              ) : null}
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="technical-phone">
                Telefone com DDD
              </FieldLabel>
              <Input
                className="h-11"
                ref={phoneRef}
                id="technical-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? 'technical-phone-error' : undefined
                }
                onChange={(event) => updateValue('phone', event.target.value)}
              />
              <FieldDescription>
                Usaremos este número somente para o atendimento solicitado.
              </FieldDescription>
              {errors.phone ? (
                <FieldError id="technical-phone-error">
                  {errors.phone}
                </FieldError>
              ) : null}
            </Field>

            <Field data-invalid={Boolean(errors.segment)}>
              <FieldLabel htmlFor="technical-segment">Segmento</FieldLabel>
              <Select
                value={values.segment}
                onValueChange={(value) =>
                  updateValue(
                    'segment',
                    value as TechnicalRequest['segment'],
                  )
                }
              >
                <SelectTrigger
                  ref={segmentRef}
                  id="technical-segment"
                  className="!h-11 w-full"
                  aria-invalid={Boolean(errors.segment)}
                  aria-describedby={
                    errors.segment ? 'technical-segment-error' : undefined
                  }
                >
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {segments.map((segment) => (
                      <SelectItem key={segment} value={segment}>
                        {segment}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.segment ? (
                <FieldError id="technical-segment-error">
                  {errors.segment}
                </FieldError>
              ) : null}
            </Field>
          </div>

          <Field data-invalid={Boolean(errors.details)}>
            <FieldLabel htmlFor="technical-details">
              O que sua operação precisa?
            </FieldLabel>
            <Textarea
              className="min-h-28"
              ref={detailsRef}
              id="technical-details"
              name="details"
              rows={5}
              value={values.details}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={
                errors.details ? 'technical-details-error' : undefined
              }
              placeholder="Descreva o equipamento, a aplicação ou a necessidade da operação."
              onChange={(event) => updateValue('details', event.target.value)}
            />
            <FieldDescription>
              Uma breve descrição já ajuda o especialista a iniciar a análise.
            </FieldDescription>
            {errors.details ? (
              <FieldError id="technical-details-error">
                {errors.details}
              </FieldError>
            ) : null}
          </Field>

          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full sm:w-fit"
            disabled={isPreparing}
          >
            {isPreparing ? (
              <>
                <Spinner />
                Preparando dados...
              </>
            ) : (
              'Enviar dados técnicos'
            )}
          </Button>
        </FieldGroup>
      </form>

      {wasOpened ? (
        <Alert className="mt-6">
          <AlertTitle>Conversa aberta</AlertTitle>
          <AlertDescription>
            Os dados foram preparados e o WhatsApp foi aberto em uma nova aba.
          </AlertDescription>
        </Alert>
      ) : null}

      {fallbackUrl ? (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Não foi possível abrir uma nova aba</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col items-start gap-3">
            <span>
              O navegador bloqueou a abertura automática. Use o link abaixo
              para continuar.
            </span>
            <Button
              asChild
              className="min-h-11 w-full whitespace-normal"
              variant="outline"
            >
              <a href={fallbackUrl} target="_blank" rel="noreferrer">
                Abrir WhatsApp manualmente
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar dados técnicos</AlertDialogTitle>
            <AlertDialogDescription>
              Revise as informações principais antes de abrir a conversa com o
              especialista.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <dl className="grid gap-4 rounded-2xl bg-muted p-4 text-sm">
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Empresa</dt>
              <dd className="font-semibold text-foreground">
                {values.company}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Telefone</dt>
              <dd className="font-semibold text-foreground">{values.phone}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Segmento</dt>
              <dd className="font-semibold text-foreground">
                {values.segment}
              </dd>
            </div>
          </dl>

          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">
              Revisar dados
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11"
              onClick={handleOpenWhatsApp}
            >
              Abrir conversa no WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
