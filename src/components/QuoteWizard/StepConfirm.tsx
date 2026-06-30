import * as React from 'react'
import { MessageCircle, CheckCircle2, TriangleAlert } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'
import { buildQuoteWhatsAppUrl } from '@/lib/quote-form'
import { postToSheet } from '@/lib/apps-script'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function StepConfirm() {
  const { form, setStep, close, reset } = useQuote()
  const [status, setStatus] = React.useState<Status>('idle')
  const whatsappUrl = buildQuoteWhatsAppUrl(form)

  React.useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => { close(); reset() }, 400)
      return () => clearTimeout(timer)
    }
  }, [status, close, reset])

  async function handleSubmit() {
    setStatus('loading')
    try {
      await postToSheet(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function openWhatsApp() {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const productLabels: Record<string, string> = {
    'caixa-dagua': "Caixa d'Água",
    'tanque-estacionario': 'Tanque Estacionário',
    'equipamentos': 'Equipamentos',
  }

  const locationLabels: Record<string, string> = {
    fazenda: 'Fazenda', empresa: 'Empresa', industria: 'Indústria',
    posto: 'Posto de Combustível', outro: 'Outro',
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">Resumo do pedido</h3>
        <p className="text-sm text-muted-foreground mt-1">Confira os dados antes de enviar.</p>
      </div>

      <dl className="flex flex-col gap-3 rounded-xl bg-muted p-4 text-sm">
        <Row label="Produto" value={productLabels[form.product] ?? form.product} />
        {form.product === 'caixa-dagua' && form.waterTankModel && (
          <Row label="Modelo" value={form.waterTankModel.replace(/-/g, ' ')} />
        )}
        {form.product === 'caixa-dagua' && form.waterTankVolume && (
          <Row label="Volume" value={form.waterTankVolume === 'outro' ? form.waterTankVolumeCustom : `${Number(form.waterTankVolume).toLocaleString('pt-BR')} L`} />
        )}
        {form.product === 'tanque-estacionario' && form.tankVolume && (
          <Row label="Volume" value={form.tankVolume === 'outro' ? form.tankVolumeCustom : `${Number(form.tankVolume).toLocaleString('pt-BR')} L`} />
        )}
        {form.product === 'tanque-estacionario' && form.tankLiquid && (
          <Row label="Líquido" value={form.tankLiquid === 'outro' ? form.tankLiquidCustom : form.tankLiquid} />
        )}
        {form.product === 'tanque-estacionario' && (
          <Row label="Bipartido" value={form.tankBipartido ? 'Sim' : 'Não'} />
        )}
        {form.product === 'equipamentos' && (
          <Row label="Equipamentos" value={form.equipmentDescription} />
        )}
        <div className="border-t border-border my-1" />
        <Row label="Local" value={locationLabels[form.locationType] ?? ''} />
        {form.locationName && <Row label="Nome" value={form.locationName} />}
        {form.cnpj && <Row label="CNPJ" value={form.cnpj} />}
        <Row label="Endereço" value={form.address} />
        <div className="border-t border-border my-1" />
        <Row label="Nome" value={form.clientName} />
        <Row label="WhatsApp" value={form.clientPhone} />
        <Row label="E-mail" value={form.clientEmail} />
        <Row label="Cidade/Estado" value={`${form.clientCity} / ${form.clientState}`} />
        {form.notes && <Row label="Observações" value={form.notes} />}
      </dl>

      {status === 'error' && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Não foi possível salvar os dados</AlertTitle>
          <AlertDescription>
            Você ainda pode enviar pelo WhatsApp. Seus dados não serão perdidos.
          </AlertDescription>
        </Alert>
      )}

      {status === 'success' && (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Dados salvos com sucesso!</AlertTitle>
          <AlertDescription>Abra o WhatsApp para finalizar o contato.</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-3">
        {status === 'idle' && (
          <Button size="lg" onClick={handleSubmit} className="w-full">
            Confirmar e enviar
          </Button>
        )}
        {status === 'loading' && (
          <Button size="lg" disabled className="w-full">
            <Spinner className="mr-2" /> Salvando...
          </Button>
        )}
        {(status === 'success' || status === 'error') && (
          <Button size="lg" className="w-full" onClick={openWhatsApp}>
            <MessageCircle className="size-4 mr-2" />
            Abrir WhatsApp
          </Button>
        )}
        <Button variant="ghost" onClick={() => setStep(4)} className="w-full">
          Voltar e editar
        </Button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-medium text-foreground shrink-0">{label}</dt>
      <dd className="text-muted-foreground text-right">{value}</dd>
    </div>
  )
}
