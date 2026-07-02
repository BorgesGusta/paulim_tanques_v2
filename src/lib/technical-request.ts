export const WHATSAPP_NUMBER = '5594991562929'

export const segments = [
  'Fazendas',
  'Postos e distribuidoras',
  'Indústrias',
  'Transporte e aviação',
  'Empresas em geral',
  'Outro',
] as const

export type Segment = (typeof segments)[number]

export type TechnicalRequest = {
  name: string
  company: string
  city: string
  phone: string
  segment: Segment | ''
  details: string
}

export type TechnicalRequestErrors = Partial<
  Record<keyof TechnicalRequest, string>
>

export const emptyTechnicalRequest: TechnicalRequest = {
  name: '',
  company: '',
  city: '',
  phone: '',
  segment: '',
  details: '',
}

export function validateTechnicalRequest(
  request: TechnicalRequest,
): TechnicalRequestErrors {
  const errors: TechnicalRequestErrors = {}
  const phoneDigits = request.phone.replace(/\D/g, '')

  if (!request.name.trim()) {
    errors.name = 'Informe seu nome.'
  }

  if (!request.company.trim()) {
    errors.company = 'Informe a empresa ou operação.'
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Informe um telefone com DDD.'
  }

  if (!request.segment) {
    errors.segment = 'Selecione o segmento da operação.'
  }

  if (request.details.trim().length < 12) {
    errors.details = 'Descreva brevemente o que sua operação precisa.'
  }

  return errors
}

export function buildWhatsAppUrl(request: TechnicalRequest): string {
  const message = [
    'Solicitação técnica - Paulim Tanques',
    '',
    `Nome: ${request.name.trim()}`,
    `Empresa/operação: ${request.company.trim()}`,
    ...(request.city.trim() ? [`Cidade/Município: ${request.city.trim()}`] : []),
    `Telefone: ${request.phone.trim()}`,
    `Segmento: ${request.segment}`,
    `Necessidade: ${request.details.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
