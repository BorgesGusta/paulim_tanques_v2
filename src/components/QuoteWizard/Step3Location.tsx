import * as React from 'react'
import { MapPin, LocateFixed } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep3, type LocationType } from '@/lib/quote-form'
import { loadGoogleMaps, initAutocomplete, reverseGeocode, createMapWithMarker } from '@/lib/google-maps'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'fazenda', label: 'Fazenda' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'industria', label: 'Indústria' },
  { value: 'posto', label: 'Posto de Combustível' },
  { value: 'outro', label: 'Outro' },
]

// Marabá, PA — centro padrão do mapa até o usuário buscar ou compartilhar localização
const DEFAULT_CENTER = { lat: -5.3686, lng: -49.1178 }

export function Step3Location() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)
  const [geoLoading, setGeoLoading] = React.useState(false)
  const [mapsReady, setMapsReady] = React.useState(false)
  const addressRef = React.useRef<HTMLInputElement>(null)
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const mapControllerRef = React.useRef<{ setPosition: (lat: number, lng: number) => void } | null>(null)

  // Load Google Maps and attach autocomplete
  React.useEffect(() => {
    loadGoogleMaps()
      .then(() => setMapsReady(true))
      .catch(() => setMapsReady(false))
  }, [])

  React.useEffect(() => {
    if (!mapsReady || !addressRef.current) return
    const cleanup = initAutocomplete(addressRef.current, (address, lat, lng) => {
      setForm((prev) => ({ ...prev, address, lat, lng }))
      setError(null)
      mapControllerRef.current?.setPosition(lat, lng)
    })
    return cleanup
  }, [mapsReady, setForm])

  // Create the visual map + draggable pin once Maps is ready
  React.useEffect(() => {
    if (!mapsReady || !mapContainerRef.current) return
    const initialCenter = form.lat && form.lng ? { lat: form.lat, lng: form.lng } : DEFAULT_CENTER
    const controller = createMapWithMarker(mapContainerRef.current, initialCenter, (lat, lng) => {
      setForm((prev) => ({ ...prev, lat, lng }))
      reverseGeocode(lat, lng)
        .then((address) => setForm((prev) => ({ ...prev, address })))
        .catch(() => {})
    })
    mapControllerRef.current = controller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapsReady])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleGeolocate() {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        mapControllerRef.current?.setPosition(pos.coords.latitude, pos.coords.longitude)
        try {
          const address = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
          setForm((prev) => ({
            ...prev,
            address,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }))
        } catch {
          setForm((prev) => ({
            ...prev,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }))
        } finally {
          setGeoLoading(false)
        }
      },
      () => { setError('Não foi possível obter sua localização. Verifique as permissões.'); setGeoLoading(false) },
    )
  }

  function handleNext() {
    const err = validateStep3(form)
    if (err) { setError(err); return }
    setStep(4)
  }

  const showNameField = form.locationType === 'fazenda' || form.locationType === 'empresa' || form.locationType === 'industria'
  const showCnpj = form.locationType === 'empresa' || form.locationType === 'industria'

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={3} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Local de instalação</h3>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="loc-type">Tipo de local</FieldLabel>
          <Select
            value={form.locationType || null}
            onValueChange={(v) => update('locationType', (v as LocationType) ?? '')}
          >
            <SelectTrigger id="loc-type" className="w-full">
              <SelectValue placeholder="Selecione o tipo de local" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locationTypes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {showNameField && (
          <Field>
            <FieldLabel htmlFor="loc-name">
              {form.locationType === 'fazenda' ? 'Nome da fazenda' : 'Nome da empresa'}
            </FieldLabel>
            <Input
              id="loc-name"
              placeholder={form.locationType === 'fazenda' ? 'Ex.: Fazenda Santa Maria' : 'Ex.: Distribuidora Norte'}
              value={form.locationName}
              onChange={(e) => update('locationName', e.target.value)}
            />
          </Field>
        )}

        {showCnpj && (
          <Field>
            <FieldLabel htmlFor="loc-cnpj">CNPJ (opcional)</FieldLabel>
            <Input
              id="loc-cnpj"
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={(e) => update('cnpj', e.target.value)}
            />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="loc-address">Endereço</FieldLabel>
          <div className="flex gap-2">
            <Input
              id="loc-address"
              ref={addressRef}
              placeholder={mapsReady ? 'Digite ou busque o endereço...' : 'Digite o endereço'}
              value={form.address}
              onChange={(e) => {
                update('address', e.target.value)
                if (!e.target.value) setForm((prev) => ({ ...prev, lat: null, lng: null }))
              }}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleGeolocate}
              disabled={geoLoading}
              title="Usar minha localização"
            >
              {geoLoading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <LocateFixed className="size-4" />
              )}
            </Button>
          </div>
          {mapsReady && (
            <div
              ref={mapContainerRef}
              className="mt-2 h-56 w-full overflow-hidden rounded-lg border border-border bg-muted"
            />
          )}
          {mapsReady ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="size-3" />
              Arraste o pino no mapa para ajustar a localização exata.
            </p>
          ) : form.lat && form.lng ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="size-3" />
              Localização capturada
            </p>
          ) : null}
        </Field>
      </div>

      {error && <FieldError id="step3-error">{error}</FieldError>}

      <WizardNav onBack={() => setStep(2)} onNext={handleNext} />
    </div>
  )
}
