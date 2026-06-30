import * as React from 'react'
import { MapPin, LocateFixed } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep3, type LocationType } from '@/lib/quote-form'
import { loadGoogleMaps, initAutocomplete, reverseGeocode } from '@/lib/google-maps'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'fazenda', label: 'Fazenda' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'industria', label: 'Indústria' },
  { value: 'posto', label: 'Posto de Combustível' },
  { value: 'outro', label: 'Outro' },
]

export function Step3Location() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)
  const [geoLoading, setGeoLoading] = React.useState(false)
  const [mapsReady, setMapsReady] = React.useState(false)
  const addressRef = React.useRef<HTMLInputElement>(null)

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
    })
    return cleanup
  }, [mapsReady, setForm])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleGeolocate() {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
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
      () => setGeoLoading(false),
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
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground mb-1">Tipo de local</legend>
          <div className="flex flex-wrap gap-2">
            {locationTypes.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => update('locationType', value)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  form.locationType === value
                    ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                    : 'border-border hover:border-brand-dark/40',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

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
          {form.lat && form.lng && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="size-3" />
              Localização capturada
            </p>
          )}
        </Field>
      </div>

      {error && <FieldError id="step3-error">{error}</FieldError>}

      <WizardNav onBack={() => setStep(2)} onNext={handleNext} />
    </div>
  )
}
