import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export type QuoteProduct = 'caixa-dagua' | 'tanque-estacionario' | 'equipamentos'
export type WaterTankModel = 'coluna-cheia' | 'coluna-seca' | 'tubular'
export type TankLiquid = 'diesel' | 'gasolina' | 'etanol' | 'aviacao' | 'querosene' | 'outro'
export type LocationType = 'fazenda' | 'empresa' | 'industria' | 'posto' | 'outro'

export type QuoteForm = {
  // Step 1
  product: QuoteProduct | ''

  // Step 2 – Caixa d'Água
  waterTankModel: WaterTankModel | ''
  waterTankVolume: string   // '10000' | '15000' | '20000' | '25000' | '30000' | '50000' | 'outro'
  waterTankVolumeCustom: string

  // Step 2 – Tanque Estacionário
  tankVolume: string        // '3000'|'4000'|'5000'|'6000'|'7000'|'8000'|'10000'|'15000'|'20000'|'25000'|'outro'
  tankVolumeCustom: string
  tankLiquid: TankLiquid | ''
  tankLiquidCustom: string
  tankBipartido: boolean
  tankLiquid2: TankLiquid | ''
  tankLiquid2Custom: string
  tankContainment: boolean
  tankPump: boolean

  // Step 2 – Equipamentos
  equipmentDescription: string

  // Step 3
  locationType: LocationType | ''
  locationName: string
  cnpj: string
  address: string
  lat: number | null
  lng: number | null

  // Step 4
  clientName: string
  clientPhone: string
  clientEmail: string
  clientCity: string
  clientState: string
  notes: string
}

export const emptyQuoteForm: QuoteForm = {
  product: '',
  waterTankModel: '',
  waterTankVolume: '',
  waterTankVolumeCustom: '',
  tankVolume: '',
  tankVolumeCustom: '',
  tankLiquid: '',
  tankLiquidCustom: '',
  tankBipartido: false,
  tankLiquid2: '',
  tankLiquid2Custom: '',
  tankContainment: false,
  tankPump: false,
  equipmentDescription: '',
  locationType: '',
  locationName: '',
  cnpj: '',
  address: '',
  lat: null,
  lng: null,
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  clientCity: '',
  clientState: '',
  notes: '',
}

export function validateStep1(f: QuoteForm): string | null {
  if (!f.product) return 'Selecione o produto desejado.'
  return null
}

export function validateStep2(f: QuoteForm): string | null {
  if (f.product === 'caixa-dagua') {
    if (!f.waterTankModel) return 'Selecione o modelo da caixa d\'água.'
    if (!f.waterTankVolume) return 'Selecione o volume desejado.'
    if (f.waterTankVolume === 'outro' && !f.waterTankVolumeCustom.trim())
      return 'Informe o volume desejado.'
  }
  if (f.product === 'tanque-estacionario') {
    if (!f.tankVolume) return 'Selecione o volume do tanque.'
    if (f.tankVolume === 'outro' && !f.tankVolumeCustom.trim())
      return 'Informe o volume desejado.'
    if (!f.tankLiquid) return 'Selecione o líquido armazenado.'
    if (f.tankLiquid === 'outro' && !f.tankLiquidCustom.trim())
      return 'Informe o líquido armazenado.'
    if (f.tankBipartido) {
      if (!f.tankLiquid2) return 'Selecione o líquido do segundo lado do tanque.'
      if (f.tankLiquid2 === 'outro' && !f.tankLiquid2Custom.trim())
        return 'Informe o líquido do segundo lado do tanque.'
    }
  }
  if (f.product === 'equipamentos') {
    if (f.equipmentDescription.trim().length < 10)
      return 'Descreva os equipamentos necessários.'
  }
  return null
}

export function validateStep3(f: QuoteForm): string | null {
  if (!f.locationType) return 'Selecione o tipo de local.'
  if ((f.locationType === 'fazenda' || f.locationType === 'empresa' || f.locationType === 'industria') && !f.locationName.trim())
    return 'Informe o nome do local.'
  if (!f.address.trim()) return 'Informe o endereço ou compartilhe a localização.'
  return null
}

export function validateStep4(f: QuoteForm): string | null {
  if (!f.clientName.trim()) return 'Informe seu nome.'
  const phoneDigits = f.clientPhone.replace(/\D/g, '')
  if (phoneDigits.length < 10 || phoneDigits.length > 13)
    return 'Informe um WhatsApp com DDD.'
  if (!f.clientEmail.trim() || !f.clientEmail.includes('@'))
    return 'Informe um e-mail válido.'
  if (!f.clientCity.trim()) return 'Informe a cidade.'
  if (!f.clientState.trim()) return 'Informe o estado.'
  return null
}

function productLabel(f: QuoteForm): string {
  if (f.product === 'caixa-dagua') {
    const modelMap: Record<string, string> = {
      'coluna-cheia': 'Coluna Cheia',
      'coluna-seca': 'Coluna Seca',
      'tubular': 'Tubular',
    }
    const vol = f.waterTankVolume === 'outro'
      ? f.waterTankVolumeCustom
      : `${Number(f.waterTankVolume).toLocaleString('pt-BR')} L`
    return `Caixa d'Água ${modelMap[f.waterTankModel] ?? ''} (${vol})`
  }
  if (f.product === 'tanque-estacionario') {
    const liquidMap: Record<string, string> = {
      diesel: 'Diesel', gasolina: 'Gasolina', etanol: 'Etanol',
      aviacao: 'Combustível de Aviação', querosene: 'Querosene',
    }
    const vol = f.tankVolume === 'outro'
      ? f.tankVolumeCustom
      : `${Number(f.tankVolume).toLocaleString('pt-BR')} L`
    const liquid = f.tankLiquid === 'outro' ? f.tankLiquidCustom : (liquidMap[f.tankLiquid] ?? '')
    const extras = [
      f.tankContainment ? 'com bacia de contenção' : null,
      f.tankPump ? 'com bomba instalada' : null,
    ].filter(Boolean).join(', ')
    const extrasSuffix = extras ? ` (${extras})` : ''
    if (f.tankBipartido) {
      const liquid2 = f.tankLiquid2 === 'outro' ? f.tankLiquid2Custom : (liquidMap[f.tankLiquid2] ?? '')
      return `Tanque Estacionário Bipartido ${vol}, Lado 1: ${liquid}, Lado 2: ${liquid2}${extrasSuffix}`
    }
    return `Tanque Estacionário ${vol}, ${liquid}${extrasSuffix}`
  }
  return `Equipamentos: ${f.equipmentDescription}`
}

function locationLabel(f: QuoteForm): string {
  const typeMap: Record<string, string> = {
    fazenda: 'Fazenda', empresa: 'Empresa', industria: 'Indústria',
    posto: 'Posto de Combustível', outro: 'Outro',
  }
  const type = typeMap[f.locationType] ?? ''
  const name = f.locationName ? ` (${f.locationName})` : ''
  const cnpj = f.cnpj ? ` (CNPJ: ${f.cnpj})` : ''
  return `${type}${name}${cnpj}`
}

export function buildQuoteWhatsAppUrl(f: QuoteForm): string {
  const lines = [
    'Solicitação de orçamento, Paulim Tanques',
    '',
    `Produto: ${productLabel(f)}`,
    `Local: ${locationLabel(f)}`,
    `Endereço: ${f.address}`,
    ...(f.lat && f.lng ? [`Coordenadas: ${f.lat.toFixed(6)}, ${f.lng.toFixed(6)}`] : []),
    '',
    `Nome: ${f.clientName}`,
    `WhatsApp: ${f.clientPhone}`,
    `E-mail: ${f.clientEmail}`,
    `Cidade/Estado: ${f.clientCity} / ${f.clientState}`,
    ...(f.notes.trim() ? [`Observações: ${f.notes}`] : []),
  ]
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}
