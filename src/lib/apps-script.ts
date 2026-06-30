import type { QuoteForm } from '@/lib/quote-form'

export async function postToSheet(data: QuoteForm): Promise<void> {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined
  if (!url) {
    console.warn('VITE_APPS_SCRIPT_URL not set — skipping sheet post')
    return
  }

  const payload = {
    timestamp: new Date().toISOString(),
    nome: data.clientName,
    whatsapp: data.clientPhone,
    email: data.clientEmail,
    produto: data.product,
    // step 2 fields
    modeloCaixa: data.waterTankModel || null,
    volumeCaixa: data.waterTankVolume === 'outro' ? data.waterTankVolumeCustom : data.waterTankVolume || null,
    volumeTanque: data.tankVolume === 'outro' ? data.tankVolumeCustom : data.tankVolume || null,
    liquidoTanque: data.tankLiquid === 'outro' ? data.tankLiquidCustom : data.tankLiquid || null,
    bipartido: data.tankBipartido || null,
    equipamentos: data.equipmentDescription || null,
    // step 3 fields
    tipoLocal: data.locationType,
    nomeLocal: data.locationName || null,
    cnpj: data.cnpj || null,
    endereco: data.address,
    latitude: data.lat,
    longitude: data.lng,
    // step 4 fields
    cidade: data.clientCity,
    estado: data.clientState,
    observacoes: data.notes || null,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // Apps Script requires text/plain for no-cors
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Apps Script responded with ${res.status}`)
  }
}
