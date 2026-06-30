# Quote Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a 4-step quote wizard that opens in a right-side Sheet panel, collects structured product/location/client data, posts to Google Sheets via Apps Script, then opens WhatsApp with a pre-formatted message.

**Architecture:** A `QuoteContext` holds open/close state, current step, and form data globally. `QuoteWizard` renders a `Sheet` with step-routing logic. Each step component is self-contained and reads/writes only its own slice of the form. The Sheet uses the existing `sheet.tsx` (Base UI Dialog under the hood, controlled via `open` prop).

**Tech Stack:** React 19, TypeScript 6, Tailwind CSS v4, Base UI (`@base-ui/react`), Lucide React, existing `sheet.tsx` / `button.tsx` / `input.tsx` / `select.tsx` / `field.tsx` / `textarea.tsx` UI components.

## Global Constraints

- No new UI libraries — use only components already in `src/components/ui/`
- Follow pattern of existing components: named exports, no default exports except `App.tsx`
- Tailwind v4 utility classes only — no arbitrary CSS files
- All user-facing strings in Portuguese (Brazil)
- `VITE_GOOGLE_MAPS_API_KEY` and `VITE_APPS_SCRIPT_URL` are env vars loaded via `import.meta.env`
- No test framework is set up — manual verification steps are used instead of automated tests
- Google Maps integration is additive: if the API key is missing, the address field degrades to a plain text input gracefully
- WhatsApp number: `5594999999999` (already in `src/lib/technical-request.ts` as `WHATSAPP_NUMBER`)

---

## File Map

### New files

| File | Responsibility |
|---|---|
| `src/context/QuoteContext.tsx` | Global state: open/close, step (1–5), form data, `openWithProduct()` |
| `src/lib/quote-form.ts` | `QuoteForm` type, per-step validators, WhatsApp message builder |
| `src/lib/apps-script.ts` | `postToSheet(data: QuoteForm): Promise<void>` — POST to Apps Script URL |
| `src/lib/google-maps.ts` | `loadGoogleMaps()`, `initAutocomplete()`, `reverseGeocode()` helpers |
| `src/components/QuoteWizard/index.tsx` | Sheet wrapper, step router |
| `src/components/QuoteWizard/StepIndicator.tsx` | "Etapa X de 4" progress bar |
| `src/components/QuoteWizard/WizardNav.tsx` | Voltar / Próximo / Enviar buttons |
| `src/components/QuoteWizard/Step1Product.tsx` | Product selection cards |
| `src/components/QuoteWizard/Step2WaterTank.tsx` | Model + volume (Caixa d'Água) |
| `src/components/QuoteWizard/Step2Tank.tsx` | Volume + liquid + bipartido (Tanque Estacionário) |
| `src/components/QuoteWizard/Step2Equipment.tsx` | Free-text description (Equipamentos) |
| `src/components/QuoteWizard/Step3Location.tsx` | Location type, name, CNPJ, address/map |
| `src/components/QuoteWizard/Step4Client.tsx` | Client data fields |
| `src/components/QuoteWizard/StepConfirm.tsx` | Summary + submit |

### Modified files

| File | Change |
|---|---|
| `src/App.tsx` | Wrap with `<QuoteProvider>`, add `<QuoteWizard />` |
| `src/components/Header.tsx` | Replace desktop CTA with "Solicitar orçamento" button calling `useQuote().open()` |
| `src/components/Hero.tsx` | Add secondary "Solicitar orçamento" button below proof points |
| `src/components/Solutions.tsx` | Add "Solicitar orçamento" button in each product card |
| `src/components/ContactCta.tsx` | Add secondary button alongside WhatsApp button |
| `.env.example` | Document `VITE_GOOGLE_MAPS_API_KEY` and `VITE_APPS_SCRIPT_URL` |

---

## Task 1: Types, validators, and WhatsApp builder (`src/lib/quote-form.ts`)

**Files:**
- Create: `src/lib/quote-form.ts`

**Interfaces:**
- Produces:
  - `QuoteForm` type (used by all steps and libs)
  - `emptyQuoteForm: QuoteForm`
  - `validateStep1(f: QuoteForm): string | null`
  - `validateStep2(f: QuoteForm): string | null`
  - `validateStep3(f: QuoteForm): string | null`
  - `validateStep4(f: QuoteForm): string | null`
  - `buildQuoteWhatsAppUrl(f: QuoteForm): string`

- [ ] **Step 1: Create `src/lib/quote-form.ts`**

```ts
import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export type QuoteProduct = 'caixa-dagua' | 'tanque-estacionario' | 'equipamentos'
export type WaterTankModel = 'taca-cheia' | 'taca-vazia' | 'tubular'
export type TankLiquid = 'diesel' | 'gasolina' | 'etanol' | 'aviacao' | 'outro'
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
      'taca-cheia': 'Taça Cheia',
      'taca-vazia': 'Taça Vazia',
      'tubular': 'Tubular',
    }
    const vol = f.waterTankVolume === 'outro'
      ? f.waterTankVolumeCustom
      : `${Number(f.waterTankVolume).toLocaleString('pt-BR')} L`
    return `Caixa d'Água ${modelMap[f.waterTankModel] ?? ''} — ${vol}`
  }
  if (f.product === 'tanque-estacionario') {
    const liquidMap: Record<string, string> = {
      diesel: 'Diesel', gasolina: 'Gasolina', etanol: 'Etanol',
      aviacao: 'Combustível de Aviação',
    }
    const vol = f.tankVolume === 'outro'
      ? f.tankVolumeCustom
      : `${Number(f.tankVolume).toLocaleString('pt-BR')} L`
    const liquid = f.tankLiquid === 'outro' ? f.tankLiquidCustom : (liquidMap[f.tankLiquid] ?? '')
    const bipartido = f.tankBipartido ? ' (bipartido)' : ''
    return `Tanque Estacionário ${vol} — ${liquid}${bipartido}`
  }
  return `Equipamentos: ${f.equipmentDescription}`
}

function locationLabel(f: QuoteForm): string {
  const typeMap: Record<string, string> = {
    fazenda: 'Fazenda', empresa: 'Empresa', industria: 'Indústria',
    posto: 'Posto de Combustível', outro: 'Outro',
  }
  const type = typeMap[f.locationType] ?? ''
  const name = f.locationName ? ` — ${f.locationName}` : ''
  const cnpj = f.cnpj ? ` (CNPJ: ${f.cnpj})` : ''
  return `${type}${name}${cnpj}`
}

export function buildQuoteWhatsAppUrl(f: QuoteForm): string {
  const lines = [
    'Solicitação de orçamento — Paulim Tanques',
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd c:/Users/angel/OneDrive/Documentos/paulimtanques
npx tsc --noEmit
```

Expected: no errors related to `quote-form.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/quote-form.ts
git commit -m "feat(quote): add QuoteForm types, validators, and WhatsApp builder"
```

---

## Task 2: Apps Script integration (`src/lib/apps-script.ts`)

**Files:**
- Create: `src/lib/apps-script.ts`
- Create: `.env.example` (if it doesn't exist)

**Interfaces:**
- Consumes: `QuoteForm` from `@/lib/quote-form`
- Produces: `postToSheet(data: QuoteForm): Promise<void>` — throws on network error

- [ ] **Step 1: Create `src/lib/apps-script.ts`**

```ts
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
```

> **Note:** Apps Script Web Apps require `Content-Type: text/plain` (not `application/json`) when called from a browser without a CORS proxy, because the preflight OPTIONS request is blocked. The script should use `JSON.parse(e.postData.contents)` on the receiving end.

- [ ] **Step 2: Create/update `.env.example`**

```
# Google Maps Places API key (for address autocomplete in quote wizard)
VITE_GOOGLE_MAPS_API_KEY=

# Google Apps Script Web App URL (for saving leads to Google Sheets)
VITE_APPS_SCRIPT_URL=
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/apps-script.ts .env.example
git commit -m "feat(quote): add Apps Script sheet integration"
```

---

## Task 3: Google Maps helpers (`src/lib/google-maps.ts`)

**Files:**
- Create: `src/lib/google-maps.ts`

**Interfaces:**
- Produces:
  - `loadGoogleMaps(): Promise<void>` — injects script tag if not already loaded
  - `initAutocomplete(input: HTMLInputElement, onPlace: (address: string, lat: number, lng: number) => void): () => void` — returns cleanup fn
  - `reverseGeocode(lat: number, lng: number): Promise<string>` — returns formatted address string

- [ ] **Step 1: Create `src/lib/google-maps.ts`**

```ts
declare global {
  interface Window {
    google: typeof google
    initGoogleMaps?: () => void
  }
}

let loadPromise: Promise<void> | null = null

export function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise
  if (typeof window.google !== 'undefined') return Promise.resolve()

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  if (!apiKey) {
    loadPromise = Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY not set'))
    return loadPromise
  }

  loadPromise = new Promise((resolve, reject) => {
    window.initGoogleMaps = () => resolve()
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps&loading=async`
    script.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(script)
  })

  return loadPromise
}

export function initAutocomplete(
  input: HTMLInputElement,
  onPlace: (address: string, lat: number, lng: number) => void,
): () => void {
  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    fields: ['formatted_address', 'geometry'],
    componentRestrictions: { country: 'br' },
  })

  const listener = autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    const lat = place.geometry?.location?.lat()
    const lng = place.geometry?.location?.lng()
    if (place.formatted_address && lat != null && lng != null) {
      onPlace(place.formatted_address, lat, lng)
    }
  })

  return () => window.google.maps.event.removeListener(listener)
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const geocoder = new window.google.maps.Geocoder()
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        resolve(results[0].formatted_address)
      } else {
        reject(new Error(`Geocoder failed: ${status}`))
      }
    })
  })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (the `google` global is declared inline).

- [ ] **Step 3: Commit**

```bash
git add src/lib/google-maps.ts
git commit -m "feat(quote): add Google Maps loader and autocomplete helpers"
```

---

## Task 4: QuoteContext (`src/context/QuoteContext.tsx`)

**Files:**
- Create: `src/context/QuoteContext.tsx`

**Interfaces:**
- Consumes: `QuoteForm`, `emptyQuoteForm`, `QuoteProduct` from `@/lib/quote-form`
- Produces:
  - `<QuoteProvider>` component
  - `useQuote(): QuoteContextValue`
  - `QuoteContextValue.open(product?: QuoteProduct): void`
  - `QuoteContextValue.close(): void`
  - `QuoteContextValue.isOpen: boolean`
  - `QuoteContextValue.step: number` (1–5)
  - `QuoteContextValue.setStep(n: number): void`
  - `QuoteContextValue.form: QuoteForm`
  - `QuoteContextValue.setForm(updater: (prev: QuoteForm) => QuoteForm): void`
  - `QuoteContextValue.reset(): void`

- [ ] **Step 1: Create `src/context/QuoteContext.tsx`**

```tsx
import * as React from 'react'
import { emptyQuoteForm, type QuoteForm, type QuoteProduct } from '@/lib/quote-form'

type QuoteContextValue = {
  isOpen: boolean
  open: (product?: QuoteProduct) => void
  close: () => void
  step: number
  setStep: (n: number) => void
  form: QuoteForm
  setForm: (updater: (prev: QuoteForm) => QuoteForm) => void
  reset: () => void
}

const QuoteContext = React.createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [form, setFormState] = React.useState<QuoteForm>(emptyQuoteForm)

  function open(product?: QuoteProduct) {
    if (product) {
      setFormState((prev) => ({ ...prev, product }))
      setStep(2)
    } else {
      setStep(1)
    }
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function reset() {
    setFormState(emptyQuoteForm)
    setStep(1)
  }

  function setForm(updater: (prev: QuoteForm) => QuoteForm) {
    setFormState(updater)
  }

  return (
    <QuoteContext.Provider value={{ isOpen, open, close, step, setStep, form, setForm, reset }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote(): QuoteContextValue {
  const ctx = React.useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/context/QuoteContext.tsx
git commit -m "feat(quote): add QuoteContext and QuoteProvider"
```

---

## Task 5: StepIndicator and WizardNav components

**Files:**
- Create: `src/components/QuoteWizard/StepIndicator.tsx`
- Create: `src/components/QuoteWizard/WizardNav.tsx`

**Interfaces:**
- Consumes: `useQuote` from `@/context/QuoteContext`, `Button` from `@/components/ui/button`
- `StepIndicator` props: `{ step: number; total: number }`
- `WizardNav` props: `{ onNext: () => void; onBack?: () => void; nextLabel?: string; loading?: boolean; disabled?: boolean }`

- [ ] **Step 1: Create `src/components/QuoteWizard/StepIndicator.tsx`**

```tsx
type Props = {
  step: number
  total: number
}

export function StepIndicator({ step, total }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-brand-dark' : 'bg-border'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Etapa {step} de {total}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/QuoteWizard/WizardNav.tsx`**

```tsx
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft } from 'lucide-react'

type Props = {
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  loading?: boolean
  disabled?: boolean
}

export function WizardNav({ onNext, onBack, nextLabel = 'Próximo', loading = false, disabled = false }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      {onBack ? (
        <Button variant="ghost" onClick={onBack} type="button">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      ) : (
        <div />
      )}
      <Button onClick={onNext} disabled={disabled || loading} type="button">
        {loading && <Spinner className="mr-2" />}
        {nextLabel}
      </Button>
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/QuoteWizard/StepIndicator.tsx src/components/QuoteWizard/WizardNav.tsx
git commit -m "feat(quote): add StepIndicator and WizardNav"
```

---

## Task 6: Step 1 — Product selection

**Files:**
- Create: `src/components/QuoteWizard/Step1Product.tsx`

**Interfaces:**
- Consumes: `useQuote` from `@/context/QuoteContext`, `validateStep1` from `@/lib/quote-form`, `WizardNav`, `StepIndicator`
- Produces: renders step 1 UI, advances to step 2 on valid selection

- [ ] **Step 1: Create `src/components/QuoteWizard/Step1Product.tsx`**

```tsx
import * as React from 'react'
import { Cylinder, Droplets, Wrench } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep1, type QuoteProduct } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { cn } from '@/lib/utils'

const products: { value: QuoteProduct; label: string; description: string; Icon: React.ElementType }[] = [
  { value: 'caixa-dagua', label: "Caixa d'Água", description: 'Taça Cheia, Taça Vazia ou Tubular', Icon: Droplets },
  { value: 'tanque-estacionario', label: 'Tanque Estacionário', description: 'Diesel, gasolina, etanol e outros líquidos', Icon: Cylinder },
  { value: 'equipamentos', label: 'Equipamentos', description: 'Bombas, bicos, mangueiras e acessórios', Icon: Wrench },
]

export function Step1Product() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function handleSelect(value: QuoteProduct) {
    setForm((prev) => ({ ...prev, product: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep1(form)
    if (err) { setError(err); return }
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={1} total={4} />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-foreground">O que você precisa?</h3>
        <p className="text-sm text-muted-foreground">Selecione o produto principal da sua solicitação.</p>
      </div>

      <div className="flex flex-col gap-3">
        {products.map(({ value, label, description, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleSelect(value)}
            className={cn(
              'flex items-center gap-4 rounded-xl border p-4 text-left transition-colors',
              form.product === value
                ? 'border-brand-dark bg-brand-deep/5 ring-1 ring-brand-dark'
                : 'border-border hover:border-brand-dark/40 hover:bg-muted',
            )}
          >
            <span className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              form.product === value ? 'bg-brand-deep text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}>
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onNext={handleNext} />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteWizard/Step1Product.tsx
git commit -m "feat(quote): add Step1 product selection"
```

---

## Task 7: Step 2 — Product configuration (3 variants)

**Files:**
- Create: `src/components/QuoteWizard/Step2WaterTank.tsx`
- Create: `src/components/QuoteWizard/Step2Tank.tsx`
- Create: `src/components/QuoteWizard/Step2Equipment.tsx`

**Interfaces:**
- Consumes: `useQuote`, `validateStep2`, `StepIndicator`, `WizardNav`, UI components
- Each component advances to step 3 on valid submission and goes back to step 1

- [ ] **Step 1: Create `src/components/QuoteWizard/Step2WaterTank.tsx`**

```tsx
import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2, type WaterTankModel } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const models: { value: WaterTankModel; label: string }[] = [
  { value: 'taca-cheia', label: 'Taça Cheia' },
  { value: 'taca-vazia', label: 'Taça Vazia' },
  { value: 'tubular', label: 'Tubular' },
]

const volumes = ['10000', '15000', '20000', '25000', '30000', '50000']

export function Step2WaterTank() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep2(form)
    if (err) { setError(err); return }
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={2} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Configuração da caixa d'água</h3>
      </div>

      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground mb-1">Modelo</legend>
          <div className="flex flex-wrap gap-2">
            {models.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => update('waterTankModel', value)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  form.waterTankModel === value
                    ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                    : 'border-border hover:border-brand-dark/40',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <Field>
          <FieldLabel htmlFor="wt-volume">Volume</FieldLabel>
          <Select value={form.waterTankVolume || null} onValueChange={(v) => update('waterTankVolume', v ?? '')}>
            <SelectTrigger id="wt-volume" className="w-full">
              <SelectValue placeholder="Selecione o volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {volumes.map((v) => (
                  <SelectItem key={v} value={v}>
                    {Number(v).toLocaleString('pt-BR')} L
                  </SelectItem>
                ))}
                <SelectItem value="outro">Outro volume</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {form.waterTankVolume === 'outro' && (
          <Field>
            <FieldLabel htmlFor="wt-volume-custom">Informe o volume</FieldLabel>
            <Input
              id="wt-volume-custom"
              placeholder="Ex.: 40.000 L"
              value={form.waterTankVolumeCustom}
              onChange={(e) => update('waterTankVolumeCustom', e.target.value)}
            />
          </Field>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/QuoteWizard/Step2Tank.tsx`**

```tsx
import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2, type TankLiquid } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const volumes = ['3000', '4000', '5000', '6000', '7000', '8000', '10000', '15000', '20000', '25000']
const liquids: { value: TankLiquid; label: string }[] = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'gasolina', label: 'Gasolina' },
  { value: 'etanol', label: 'Etanol' },
  { value: 'aviacao', label: 'Combustível de Aviação' },
  { value: 'outro', label: 'Outro' },
]

export function Step2Tank() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep2(form)
    if (err) { setError(err); return }
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={2} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Configuração do tanque estacionário</h3>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="tank-volume">Volume</FieldLabel>
          <Select value={form.tankVolume || null} onValueChange={(v) => update('tankVolume', v ?? '')}>
            <SelectTrigger id="tank-volume" className="w-full">
              <SelectValue placeholder="Selecione o volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {volumes.map((v) => (
                  <SelectItem key={v} value={v}>
                    {Number(v).toLocaleString('pt-BR')} L
                  </SelectItem>
                ))}
                <SelectItem value="outro">Outro volume</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {form.tankVolume === 'outro' && (
          <Field>
            <FieldLabel htmlFor="tank-volume-custom">Informe o volume</FieldLabel>
            <Input
              id="tank-volume-custom"
              placeholder="Ex.: 30.000 L"
              value={form.tankVolumeCustom}
              onChange={(e) => update('tankVolumeCustom', e.target.value)}
            />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="tank-liquid">Líquido armazenado</FieldLabel>
          <Select value={form.tankLiquid || null} onValueChange={(v) => update('tankLiquid', v as TankLiquid ?? '')}>
            <SelectTrigger id="tank-liquid" className="w-full">
              <SelectValue placeholder="Selecione o líquido" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {liquids.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {form.tankLiquid === 'outro' && (
          <Field>
            <FieldLabel htmlFor="tank-liquid-custom">Informe o líquido</FieldLabel>
            <Input
              id="tank-liquid-custom"
              placeholder="Ex.: Óleo vegetal"
              value={form.tankLiquidCustom}
              onChange={(e) => update('tankLiquidCustom', e.target.value)}
            />
          </Field>
        )}

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground mb-1">Tanque bipartido?</legend>
          <p className="text-xs text-muted-foreground -mt-1">Permite armazenar dois líquidos diferentes no mesmo tanque.</p>
          <div className="flex gap-3 mt-1">
            {[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }].map(({ value, label }) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => update('tankBipartido', value)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  form.tankBipartido === value
                    ? 'border-brand-dark bg-brand-deep text-primary-foreground'
                    : 'border-border hover:border-brand-dark/40',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
```

- [ ] **Step 3: Create `src/components/QuoteWizard/Step2Equipment.tsx`**

```tsx
import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep2 } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export function Step2Equipment() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function handleNext() {
    const err = validateStep2(form)
    if (err) { setError(err); return }
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={2} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Equipamentos necessários</h3>
        <p className="text-sm text-muted-foreground mt-1">Descreva os equipamentos, peças ou acessórios que precisa.</p>
      </div>

      <Field data-invalid={Boolean(error)}>
        <FieldLabel htmlFor="equip-desc">Descrição</FieldLabel>
        <Textarea
          id="equip-desc"
          rows={5}
          placeholder="Ex.: bomba elétrica 12V, bico de abastecimento, mangueira 2 polegadas..."
          value={form.equipmentDescription}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, equipmentDescription: e.target.value }))
            setError(null)
          }}
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>

      <WizardNav onBack={() => setStep(1)} onNext={handleNext} />
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/QuoteWizard/Step2WaterTank.tsx src/components/QuoteWizard/Step2Tank.tsx src/components/QuoteWizard/Step2Equipment.tsx
git commit -m "feat(quote): add Step2 configuration variants"
```

---

## Task 8: Step 3 — Location

**Files:**
- Create: `src/components/QuoteWizard/Step3Location.tsx`

**Interfaces:**
- Consumes: `useQuote`, `validateStep3`, `loadGoogleMaps`, `initAutocomplete`, `reverseGeocode`, UI components
- Advances to step 4, backs to step 2

- [ ] **Step 1: Create `src/components/QuoteWizard/Step3Location.tsx`**

```tsx
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

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(2)} onNext={handleNext} />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteWizard/Step3Location.tsx
git commit -m "feat(quote): add Step3 location with Maps autocomplete and geolocation"
```

---

## Task 9: Step 4 — Client data

**Files:**
- Create: `src/components/QuoteWizard/Step4Client.tsx`

**Interfaces:**
- Consumes: `useQuote`, `validateStep4`, UI components
- Advances to step 5 (confirm), backs to step 3

- [ ] **Step 1: Create `src/components/QuoteWizard/Step4Client.tsx`**

```tsx
import * as React from 'react'
import { useQuote } from '@/context/QuoteContext'
import { validateStep4 } from '@/lib/quote-form'
import { StepIndicator } from './StepIndicator'
import { WizardNav } from './WizardNav'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Step4Client() {
  const { form, setForm, setStep } = useQuote()
  const [error, setError] = React.useState<string | null>(null)

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep4(form)
    if (err) { setError(err); return }
    setStep(5)
  }

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator step={4} total={4} />

      <div>
        <h3 className="text-lg font-bold text-foreground">Seus dados</h3>
        <p className="text-sm text-muted-foreground mt-1">Para entrarmos em contato com o orçamento.</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="cl-name">Nome</FieldLabel>
          <Input
            id="cl-name"
            placeholder="Seu nome completo"
            autoComplete="name"
            value={form.clientName}
            onChange={(e) => update('clientName', e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cl-phone">WhatsApp com DDD</FieldLabel>
          <Input
            id="cl-phone"
            type="tel"
            inputMode="tel"
            placeholder="(94) 99999-9999"
            autoComplete="tel"
            value={form.clientPhone}
            onChange={(e) => update('clientPhone', e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cl-email">E-mail</FieldLabel>
          <Input
            id="cl-email"
            type="email"
            inputMode="email"
            placeholder="seu@email.com"
            autoComplete="email"
            value={form.clientEmail}
            onChange={(e) => update('clientEmail', e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="cl-city">Cidade</FieldLabel>
            <Input
              id="cl-city"
              placeholder="Marabá"
              autoComplete="address-level2"
              value={form.clientCity}
              onChange={(e) => update('clientCity', e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="cl-state">Estado</FieldLabel>
            <Input
              id="cl-state"
              placeholder="PA"
              maxLength={2}
              autoComplete="address-level1"
              value={form.clientState}
              onChange={(e) => update('clientState', e.target.value.toUpperCase())}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="cl-notes">Observações (opcional)</FieldLabel>
          <Textarea
            id="cl-notes"
            rows={3}
            placeholder="Informações adicionais relevantes para o orçamento..."
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </Field>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <WizardNav onBack={() => setStep(3)} onNext={handleNext} nextLabel="Revisar pedido" />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteWizard/Step4Client.tsx
git commit -m "feat(quote): add Step4 client data"
```

---

## Task 10: StepConfirm — Summary and submit

**Files:**
- Create: `src/components/QuoteWizard/StepConfirm.tsx`

**Interfaces:**
- Consumes: `useQuote`, `postToSheet` from `@/lib/apps-script`, `buildQuoteWhatsAppUrl`, `Button`, `Alert`

- [ ] **Step 1: Create `src/components/QuoteWizard/StepConfirm.tsx`**

```tsx
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
    if (status === 'success') {
      setTimeout(() => { close(); reset() }, 400)
    }
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteWizard/StepConfirm.tsx
git commit -m "feat(quote): add StepConfirm with summary and submit"
```

---

## Task 11: QuoteWizard root component (`src/components/QuoteWizard/index.tsx`)

**Files:**
- Create: `src/components/QuoteWizard/index.tsx`

**Interfaces:**
- Consumes: all Step components, `useQuote`, `Sheet`/`SheetContent`/`SheetHeader`/`SheetTitle` from `@/components/ui/sheet`

- [ ] **Step 1: Create `src/components/QuoteWizard/index.tsx`**

```tsx
import { useQuote } from '@/context/QuoteContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Step1Product } from './Step1Product'
import { Step2WaterTank } from './Step2WaterTank'
import { Step2Tank } from './Step2Tank'
import { Step2Equipment } from './Step2Equipment'
import { Step3Location } from './Step3Location'
import { Step4Client } from './Step4Client'
import { StepConfirm } from './StepConfirm'

function Step2Router() {
  const { form } = useQuote()
  if (form.product === 'caixa-dagua') return <Step2WaterTank />
  if (form.product === 'tanque-estacionario') return <Step2Tank />
  if (form.product === 'equipamentos') return <Step2Equipment />
  return null
}

const stepComponents: Record<number, React.ComponentType> = {
  1: Step1Product,
  2: Step2Router,
  3: Step3Location,
  4: Step4Client,
  5: StepConfirm,
}

export function QuoteWizard() {
  const { isOpen, close, step } = useQuote()
  const StepComponent = stepComponents[step]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        showCloseButton
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Solicitar orçamento</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 p-6">
          {StepComponent && <StepComponent />}
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteWizard/index.tsx
git commit -m "feat(quote): add QuoteWizard root with step router"
```

---

## Task 12: Wire up App.tsx and all entry points

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Solutions.tsx`
- Modify: `src/components/ContactCta.tsx`

**Interfaces:**
- Consumes: `QuoteProvider`, `useQuote` from `@/context/QuoteContext`, `QuoteWizard` from `@/components/QuoteWizard`

- [ ] **Step 1: Update `src/App.tsx`**

```tsx
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Solutions } from '@/components/Solutions'
import { Sectors } from '@/components/Sectors'
import { Process } from '@/components/Process'
import { About } from '@/components/About'
import { FAQ } from '@/components/FAQ'
import { ContactCta } from '@/components/ContactCta'
import { Footer } from '@/components/Footer'
import { QuoteProvider } from '@/context/QuoteContext'
import { QuoteWizard } from '@/components/QuoteWizard'

export default function App() {
  return (
    <QuoteProvider>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Solutions />
        <Sectors />
        <Process />
        <About />
        <FAQ />
        <ContactCta />
      </main>
      <Footer />
      <QuoteWizard />
    </QuoteProvider>
  )
}
```

- [ ] **Step 2: Update `src/components/Header.tsx`**

Replace the desktop CTA button. Add import for `useQuote` and a `FileText` icon. The existing mobile menu WhatsApp link stays unchanged.

```tsx
import { Menu, MessageCircle, FileText } from 'lucide-react'
import { navItems } from '@/data/site'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { useQuote } from '@/context/QuoteContext'

export function Header() {
  const { open } = useQuote()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a href="#inicio" aria-label="Paulim Tanques — início da página">
          <img
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Button variant="ghost" size="sm" render={<a href={item.href} />}>
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button onClick={() => open()}>
            <FileText />
            Solicitar orçamento
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu de navegação"
                />
              }
            >
              <Menu />
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {navItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <a
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'w-full justify-start text-base',
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>

              <div className="px-4 pb-6">
                <SheetClose
                  render={
                    <a
                      href="#diagnostico"
                      className={cn(buttonVariants(), 'w-full')}
                    />
                  }
                >
                  <MessageCircle />
                  Falar com especialista
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Update `src/components/Hero.tsx`** — add secondary button below proof points

In Hero.tsx, after the closing `</div>` of the proof points `flex flex-wrap` div and before the closing `</div>` of the `flex flex-col gap-6` column, add:

```tsx
// Add this import at the top:
import { useQuote } from '@/context/QuoteContext'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Inside Hero(), before the return:
const { open } = useQuote()

// Add this button after the proof points div (after the closing </div> of the flex flex-wrap):
<Button variant="outline" onClick={() => open()} className="self-start border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
  <FileText className="size-4" />
  Solicitar orçamento
</Button>
```

The full updated Hero.tsx:

```tsx
import { CheckCircle2, ArrowDown, FileText } from 'lucide-react'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/context/QuoteContext'

export function Hero() {
  const { open } = useQuote()

  return (
    <section
      id="inicio"
      className="section-anchor relative overflow-hidden"
      style={{ minHeight: 'calc(100svh - 4rem)' }}
    >
      <img
        src="/assets/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(115deg, oklch(0.32 0.10 145 / 0.96) 0%, oklch(0.32 0.10 145 / 0.88) 48%, oklch(0.32 0.10 145 / 0.60) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 section-shell flex flex-col gap-10 py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-sm font-semibold text-primary-foreground/70">
            Mais de 400 projetos entregues. 15 anos no Norte do Brasil
          </p>

          <h1
            className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          <p className="max-w-[52ch] text-lg leading-8 text-primary-foreground/80">
            Fabricação, manutenção e fornecimento de tanques, caixas d'água e
            equipamentos para transporte e abastecimento em toda a região Norte.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Entrega até o cliente
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Fabricação sob medida
              </span>
            </div>
            <a
              href="#solucoes"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/70 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              Conhecer soluções
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <Button
            variant="outline"
            onClick={() => open()}
            className="self-start border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <FileText className="size-4" />
            Solicitar orçamento
          </Button>
        </div>

        <div id="diagnostico" className="section-anchor lg:col-span-5">
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Update `src/components/Solutions.tsx`** — add button in each product card

```tsx
import { Cylinder, Droplets, Gauge, Cable, Wrench, FileText } from 'lucide-react'
import { productCategories, equipmentItems } from '@/data/site'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/context/QuoteContext'
import type { QuoteProduct } from '@/lib/quote-form'

const productIcons = [Cylinder, Droplets]
const equipmentIcons = [Gauge, Cable, Wrench]

const productKeys: QuoteProduct[] = ['caixa-dagua', 'tanque-estacionario']

export function Solutions() {
  const { open } = useQuote()

  return (
    <section id="solucoes" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2
            className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'pretty' } as React.CSSProperties}
          >
            Do tanque à entrega, soluções para toda a cadeia de abastecimento.
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            Fabricamos, fornecemos e mantemos. Cada produto é dimensionado para a
            sua operação, com orientação técnica antes da compra.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {productCategories.map((cat, index) => {
            const Icon = productIcons[index]
            const productKey = productKeys[index]
            return (
              <div
                key={cat.title}
                className="rounded-2xl bg-brand-deep p-8 flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-xl bg-brand-dark/40 p-3 shrink-0">
                    <Icon className="size-6 text-brand-light" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-primary-foreground leading-tight">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-primary-foreground/75 flex-1">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.models.map((model) => (
                    <span
                      key={model}
                      className="rounded-md bg-brand-dark/35 px-2.5 py-1 text-xs font-medium text-primary-foreground/85"
                    >
                      {model}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => open(productKey)}
                  className="self-start border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <FileText className="size-3.5" />
                  Solicitar orçamento
                </Button>
              </div>
            )
          })}
        </div>

        <div className="border-t border-border pt-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Equipamentos e peças
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipmentItems.map((item, index) => {
              const Icon = equipmentIcons[index]
              return (
                <div key={item.title} className="flex gap-4 items-start">
                  <Icon className="size-5 text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => open('equipamentos')}
            >
              <FileText className="size-3.5" />
              Solicitar orçamento de equipamentos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Update `src/components/ContactCta.tsx`**

```tsx
import { MessageCircle, FileText } from 'lucide-react'
import { contact } from '@/data/site'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/SectionHeading'
import { useQuote } from '@/context/QuoteContext'

export function ContactCta() {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`
  const { open } = useQuote()

  return (
    <section id="contato" className="section-anchor bg-brand-deep py-20 lg:py-28">
      <div className="section-shell flex flex-col items-center gap-8 text-center">
        <SectionHeading
          inverse
          eyebrow="Pronto para começar?"
          title="Fale com um especialista técnico agora"
          description="Sem formulários longos. Uma conversa técnica no WhatsApp resolve."
          className="items-center text-center"
        />

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
            <MessageCircle />
            Iniciar diagnóstico no WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => open()}
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <FileText />
            Solicitar orçamento
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60">
          Atendimento em dias úteis, 8h–18h
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/components/Header.tsx src/components/Hero.tsx src/components/Solutions.tsx src/components/ContactCta.tsx
git commit -m "feat(quote): wire up QuoteWizard and entry points across landing page"
```

---

## Task 13: Manual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify wizard opens from all entry points**

Open `http://localhost:5173` and test:
1. Click "Solicitar orçamento" in the Header — wizard opens at Step 1
2. Click "Solicitar orçamento" in the Hero — wizard opens at Step 1
3. Click "Solicitar orçamento" in a Solutions product card — wizard opens at Step 2 with that product pre-selected
4. Click "Solicitar orçamento de equipamentos" in Solutions equipment section — opens at Step 2 with Equipamentos selected
5. Click "Solicitar orçamento" in ContactCta — wizard opens at Step 1

- [ ] **Step 3: Verify step flow — Caixa d'Água path**

1. Step 1: select "Caixa d'Água" → click Próximo → Step 2 shows model + volume
2. Select model and volume → click Próximo → Step 3 shows location
3. Select location type "Fazenda" → name field appears → fill address → click Próximo → Step 4
4. Fill client data → click "Revisar pedido" → StepConfirm shows summary
5. Click "Confirmar e enviar" → if `VITE_APPS_SCRIPT_URL` not set, logs warning → status becomes error → "Abrir WhatsApp" appears → click opens WhatsApp with pre-formatted message

- [ ] **Step 4: Verify step flow — Tanque Estacionário path**

1. Step 1: select "Tanque Estacionário" → Step 2 shows volume, liquid, bipartido
2. Select "Outro" volume → custom input appears
3. Select bipartido "Sim" → verify it highlights
4. Complete remaining steps and verify WhatsApp message includes all fields

- [ ] **Step 5: Verify validation**

1. Try advancing Step 1 without selecting product → error message appears
2. Try advancing Step 2 without filling required fields → error appears
3. Try advancing Step 4 with invalid phone (fewer than 10 digits) → error appears

- [ ] **Step 6: Verify mobile layout**

Resize browser to mobile width (375px) — Sheet should fill full screen, all steps should be scrollable.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(quote): complete quote wizard implementation"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered in task |
|---|---|
| Wizard in 4 steps | Tasks 6–10 |
| Step 1: Produto (Caixa d'Água, Tanque, Equipamentos) | Task 6 |
| Step 2A: Caixa d'Água — modelo + volume | Task 7 |
| Step 2B: Tanque — volume + líquido + bipartido | Task 7 |
| Step 2C: Equipamentos — descrição livre | Task 7 |
| Step 3: Local — tipo, nome, CNPJ, endereço/mapa | Task 8 |
| Google Maps Places autocomplete | Task 3, Task 8 |
| Geolocalização com botão | Task 8 |
| Lat/lng capturados | Tasks 1, 3, 8 |
| Step 4: Dados do cliente | Task 9 |
| POST para Google Apps Script | Task 2 |
| Dados salvos na planilha (estrutura de colunas) | Task 2 |
| Fallback se POST falhar (ainda abre WhatsApp) | Task 10 |
| Abre WhatsApp com mensagem pré-formatada | Tasks 1, 10 |
| Botão no Header | Task 12 |
| Botão no Hero | Task 12 |
| Botões nos cards de produto (Solutions) | Task 12 |
| Botão no ContactCta | Task 12 |
| Sheet lateral (painel direito) | Task 11 |
| Produto pré-selecionado quando aberto via card | Tasks 4, 12 |
| Env vars documentadas em `.env.example` | Task 2 |
