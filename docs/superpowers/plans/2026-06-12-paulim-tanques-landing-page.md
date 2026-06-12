# Paulim Tanques Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page B2B responsiva para a Paulim Tanques, com diagnóstico técnico como conversão principal e encaminhamento confirmado para o WhatsApp.

**Architecture:** A aplicação permanece como uma SPA React/Vite. Conteúdo institucional fica centralizado em `src/data/site.ts`, a validação e a montagem da mensagem ficam em funções puras em `src/lib/technical-request.ts`, e as seções visuais ficam em componentes pequenos sob `src/components`. Componentes interativos básicos são instalados pelo CLI oficial do shadcn/ui e adaptados aos tokens da marca em `src/index.css`.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, shadcn/ui com Radix, Lucide, Vitest, Testing Library e Montserrat variável empacotada localmente.

---

## File Structure

**Create:**

- `components.json` - configuração oficial do shadcn/ui para Vite, Tailwind 4 e alias `@/`.
- `src/lib/utils.ts` - helper `cn` gerado/esperado pelo shadcn/ui.
- `src/lib/technical-request.ts` - tipos, validação e geração da URL do WhatsApp.
- `src/lib/technical-request.test.ts` - testes unitários da validação e da mensagem.
- `src/test/setup.ts` - matchers DOM e limpeza entre testes.
- `src/data/site.ts` - navegação, soluções, setores, processo, FAQ e configuração provisória de contato.
- `src/components/TechnicalRequestForm.tsx` - formulário, confirmação e fallback do WhatsApp.
- `src/components/TechnicalRequestForm.test.tsx` - testes de validação e confirmação.
- `src/components/Header.tsx` - navegação desktop e `Sheet` mobile.
- `src/components/Hero.tsx` - promessa, fotografia e formulário.
- `src/components/TrustBar.tsx` - evidências curtas.
- `src/components/Solutions.tsx` - soluções por necessidade.
- `src/components/Sectors.tsx` - setores atendidos.
- `src/components/Process.tsx` - três etapas do diagnóstico.
- `src/components/About.tsx` - bloco Engenharia de Proximidade.
- `src/components/FAQ.tsx` - dúvidas com `Accordion`.
- `src/components/ContactCta.tsx` - conversão final.
- `src/components/Footer.tsx` - navegação e informações confirmadas.
- `src/components/SectionHeading.tsx` - título de seção consistente.
- `src/components/ui/*.tsx` - componentes adicionados pelo CLI oficial.
- `src/App.test.tsx` - teste semântico da página completa.
- `public/assets/paulim-tanques-logo.png` - cópia pública do logo real.
- `public/assets/hero-tanker-operation.png` - fotografia principal.
- `public/assets/technical-equipment.png` - detalhe de componentes.
- `public/assets/technical-specialist.png` - especialista em inspeção.
- `public/assets/sector-operations.png` - contexto operacional secundário.

**Modify:**

- `package.json` - scripts de teste e dependências.
- `package-lock.json` - lockfile atualizado pelo npm.
- `vite.config.ts` - alias `@` e configuração Vitest.
- `tsconfig.app.json` - alias TypeScript e tipos de teste.
- `tsconfig.node.json` - inclusão da configuração Vite/Vitest.
- `src/main.tsx` - import da Montserrat local e entrada da aplicação.
- `src/App.tsx` - composição semântica da landing page.
- `src/index.css` - tokens shadcn, paleta oficial, base, responsividade e movimento reduzido.
- `index.html` - idioma, SEO, tema e viewport com safe area.
- `public/favicon.svg` - favicon coerente com a marca.

**Do not restore:**

- Componentes e assets marcados como removidos no estado atual do Git. Eles são somente referência histórica e não devem ser restaurados em massa.
- `src/App.css`; todo o estilo global permanece em `src/index.css`.

---

### Task 1: Produce and Stage the Visual Assets

**Files:**

- Create: `public/assets/paulim-tanques-logo.png`
- Create: `public/assets/hero-tanker-operation.png`
- Create: `public/assets/technical-equipment.png`
- Create: `public/assets/technical-specialist.png`
- Create: `public/assets/sector-operations.png`

- [ ] **Step 1: Create the public asset directory and copy the approved logo**

Run:

```powershell
New-Item -ItemType Directory -Force public\assets
Copy-Item -LiteralPath docs\logo.png -Destination public\assets\paulim-tanques-logo.png
```

Expected: `public/assets/paulim-tanques-logo.png` exists and remains visually identical to `docs/logo.png`.

- [ ] **Step 2: Generate the hero photograph**

Use the built-in image generation tool with this exact production brief:

```text
Use case: photorealistic-natural
Asset type: desktop and mobile landing-page hero photograph
Primary request: a modern Brazilian stainless-steel tanker truck stopped in a clean, organized fuel or logistics operation while a trained technical specialist inspects the side equipment
Composition/framing: wide 16:10 frame; truck and specialist concentrated from center to right; calm negative space on the left for headline copy; camera at chest height; no dramatic distortion
Lighting/mood: natural early-morning daylight, credible industrial realism, technical authority with human proximity
Color palette: realistic steel, asphalt and neutral workwear; restrained green details compatible with #065320 and #3DAA34
Constraints: appropriate PPE, clean safe environment, authentic hoses and fittings, no visible brand logos, no text, no watermark
Avoid: improvised workshop, dirty unsafe scene, dramatic fire or danger, glossy 3D render, corporate handshake stock photo
```

Copy the selected generated file to `public/assets/hero-tanker-operation.png`.

- [ ] **Step 3: Generate the technical equipment photograph**

Use the built-in image generation tool:

```text
Use case: product-mockup
Asset type: landing-page solution-section photograph
Primary request: close technical view of organized tanker-truck hoses, stainless-steel valves, couplings, seals and safety components on a clean service bench
Composition/framing: horizontal 4:3 editorial product photograph with clear material texture and one strong focal point
Lighting/mood: natural workshop daylight, controlled and professional
Color palette: steel gray, graphite, black rubber and restrained green accents
Constraints: no labels, no invented certification marks, no text, no watermark
Avoid: catalog cutout on white, clutter, rust, unsafe setup, glossy 3D render
```

Copy the selected file to `public/assets/technical-equipment.png`.

- [ ] **Step 4: Generate the specialist photograph**

Use the built-in image generation tool:

```text
Use case: photorealistic-natural
Asset type: institutional landing-page photograph
Primary request: Brazilian industrial technical specialist wearing correct PPE and inspecting tanker equipment with a client fleet manager nearby, focused on the equipment rather than posing
Composition/framing: horizontal 4:3 candid editorial frame, medium distance, faces natural and secondary to the technical activity
Lighting/mood: daylight, organized facility, approachable expertise
Color palette: neutrals with subtle green workwear details
Constraints: professional safety posture, realistic tools and tanker context, no brand logos, no text, no watermark
Avoid: staged handshake, looking at camera, improvised workshop, excessive sparks, cold corporate office
```

Copy the selected file to `public/assets/technical-specialist.png`.

- [ ] **Step 5: Generate the secondary operations photograph**

Use the built-in image generation tool:

```text
Use case: photorealistic-natural
Asset type: landing-page sectors photograph
Primary request: a clean tanker-truck operation connecting transport, fuel distribution and agribusiness in northern Brazil, with a safe loading area and agricultural landscape in the distance
Composition/framing: wide 16:9 documentary photograph, equipment in foreground, operational context in background
Lighting/mood: bright natural daylight, reliable regional operation
Constraints: appropriate PPE, no visible logos, no text, no watermark
Avoid: visual collage, dramatic hazards, luxury advertising look, blue/yellow brand styling
```

Copy the selected file to `public/assets/sector-operations.png`.

- [ ] **Step 6: Inspect every asset**

Open all five files and verify:

- Logo proportions are unchanged.
- No generated image contains text, watermarks, fake logos or unsafe PPE.
- Hero has usable copy space and still crops meaningfully at portrait/mobile ratios.
- The four photographs feel like one visual family.

- [ ] **Step 7: Commit only the approved assets**

```powershell
git add -- public/assets/paulim-tanques-logo.png public/assets/hero-tanker-operation.png public/assets/technical-equipment.png public/assets/technical-specialist.png public/assets/sector-operations.png
git commit -m "assets: add Paulim landing page imagery"
```

---

### Task 2: Bootstrap shadcn/ui and the Test Harness

**Files:**

- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/test/setup.ts`
- Create: `src/components/ui/*.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`
- Modify: `tsconfig.node.json`
- Modify: `src/index.css`

- [ ] **Step 1: Install testing and font dependencies**

Run:

```powershell
npm install @fontsource-variable/montserrat lucide-react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: packages appear in `package.json` and `package-lock.json`.

- [ ] **Step 2: Initialize the official shadcn/ui registry**

Run:

```powershell
npx shadcn@latest init --preset radix-nova --yes
npx shadcn@latest info --json
```

Expected: `components.json` reports Vite, React client components, Tailwind v4, Radix primitives, Lucide icons, `src/index.css`, and aliases under `@/`.

- [ ] **Step 3: Read current component documentation before installation**

Run:

```powershell
npx shadcn@latest docs button field input select textarea accordion sheet alert-dialog alert separator spinner
```

Expected: the CLI prints official documentation URLs for every requested component.

- [ ] **Step 4: Add the required shadcn/ui components**

Run:

```powershell
npx shadcn@latest add button field input select textarea accordion sheet alert-dialog alert separator spinner --yes
```

Expected: source files are created under the `ui` path reported by `npx shadcn@latest info`.

- [ ] **Step 5: Add test scripts**

Modify the `scripts` object in `package.json` to contain:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "test": "vitest",
  "test:run": "vitest run",
  "preview": "vite preview"
}
```

- [ ] **Step 6: Configure aliases and Vitest**

Replace `vite.config.ts` with:

```ts
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

Add these options to `compilerOptions` in `tsconfig.app.json`:

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  },
  "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]
}
```

Ensure `tsconfig.node.json` includes:

```json
{
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 7: Create the test setup**

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  configurable: true,
  value: () => false,
})

Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
  configurable: true,
  value: () => undefined,
})

Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
  configurable: true,
  value: () => undefined,
})

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: () => undefined,
})
```

- [ ] **Step 8: Verify the harness has no tests yet**

Run:

```powershell
npm run test:run -- --passWithNoTests
npm run build
```

Expected: both commands exit with code `0`.

- [ ] **Step 9: Review generated UI components**

Read every generated file and verify:

- `SheetContent` includes accessible title support.
- `SelectItem` is used beneath `SelectGroup`.
- Form composition supports `FieldGroup`, `Field`, `FieldLabel`, `FieldDescription` and `FieldError`.
- Button icons follow the generated component API.
- No generated file imports from a wrong alias.

- [ ] **Step 10: Commit the infrastructure**

```powershell
git add -- components.json package.json package-lock.json vite.config.ts tsconfig.app.json tsconfig.node.json src/index.css src/lib/utils.ts src/test/setup.ts src/components/ui/accordion.tsx src/components/ui/alert-dialog.tsx src/components/ui/alert.tsx src/components/ui/button.tsx src/components/ui/field.tsx src/components/ui/input.tsx src/components/ui/select.tsx src/components/ui/separator.tsx src/components/ui/sheet.tsx src/components/ui/spinner.tsx src/components/ui/textarea.tsx
git commit -m "build: initialize shadcn and frontend tests"
```

---

### Task 3: Build the Technical Request Domain with TDD

**Files:**

- Create: `src/lib/technical-request.test.ts`
- Create: `src/lib/technical-request.ts`
- Create: `src/data/site.ts`

- [ ] **Step 1: Write failing validation and URL tests**

Create `src/lib/technical-request.test.ts`:

```ts
import {
  buildWhatsAppUrl,
  emptyTechnicalRequest,
  validateTechnicalRequest,
} from '@/lib/technical-request'

describe('validateTechnicalRequest', () => {
  it('requires every field', () => {
    expect(validateTechnicalRequest(emptyTechnicalRequest)).toEqual({
      name: 'Informe seu nome.',
      company: 'Informe a empresa ou operação.',
      phone: 'Informe um telefone com DDD.',
      segment: 'Selecione o segmento da operação.',
      details: 'Descreva brevemente o que sua operação precisa.',
    })
  })

  it('rejects a telephone without a Brazilian DDD', () => {
    expect(
      validateTechnicalRequest({
        name: 'Ana Souza',
        company: 'Frota Norte',
        phone: '9999-9999',
        segment: 'Transporte e aviação',
        details: 'Precisamos avaliar mangueiras de descarga.',
      }).phone,
    ).toBe('Informe um telefone com DDD.')
  })

  it('accepts a complete request', () => {
    expect(
      validateTechnicalRequest({
        name: 'Ana Souza',
        company: 'Frota Norte',
        phone: '(94) 99999-9999',
        segment: 'Transporte e aviação',
        details: 'Precisamos avaliar mangueiras de descarga.',
      }),
    ).toEqual({})
  })
})

describe('buildWhatsAppUrl', () => {
  it('encodes a structured technical message', () => {
    const url = buildWhatsAppUrl({
      name: 'Ana Souza',
      company: 'Frota Norte',
      phone: '(94) 99999-9999',
      segment: 'Transporte e aviação',
      details: 'Precisamos avaliar mangueiras de descarga.',
    })

    expect(url).toContain('https://wa.me/5594999999999?text=')
    expect(decodeURIComponent(url)).toContain('Solicitação técnica - Paulim Tanques')
    expect(decodeURIComponent(url)).toContain('Nome: Ana Souza')
    expect(decodeURIComponent(url)).toContain('Segmento: Transporte e aviação')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```powershell
npm run test:run -- src/lib/technical-request.test.ts
```

Expected: FAIL because `@/lib/technical-request` does not exist.

- [ ] **Step 3: Implement the minimal domain module**

Create `src/lib/technical-request.ts`:

```ts
export const WHATSAPP_NUMBER = '5594999999999'

export const segments = [
  'Postos e distribuidoras',
  'Agronegócio',
  'Transporte e aviação',
  'Indústrias',
  'Outro',
] as const

export type Segment = (typeof segments)[number]

export interface TechnicalRequest {
  name: string
  company: string
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
  phone: '',
  segment: '',
  details: '',
}

export function validateTechnicalRequest(
  request: TechnicalRequest,
): TechnicalRequestErrors {
  const errors: TechnicalRequestErrors = {}
  const phoneDigits = request.phone.replace(/\D/g, '')

  if (!request.name.trim()) errors.name = 'Informe seu nome.'
  if (!request.company.trim()) errors.company = 'Informe a empresa ou operação.'
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Informe um telefone com DDD.'
  }
  if (!request.segment) errors.segment = 'Selecione o segmento da operação.'
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
    `Telefone: ${request.phone.trim()}`,
    `Segmento: ${request.segment}`,
    `Necessidade: ${request.details.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
```

- [ ] **Step 4: Run the domain tests**

Run:

```powershell
npm run test:run -- src/lib/technical-request.test.ts
```

Expected: all four tests PASS.

- [ ] **Step 5: Create typed site content**

Create `src/data/site.ts` with these exported values:

```ts
import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export const navItems = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Setores', href: '#setores' },
  { label: 'A Paulim', href: '#paulim' },
  { label: 'Dúvidas', href: '#duvidas' },
] as const

export const trustItems = [
  { value: '15 anos', label: 'de experiência técnica' },
  { value: 'Atendimento técnico', label: 'orientação antes da compra' },
  { value: 'Norte do Brasil', label: 'base regional em Marabá' },
] as const

export const solutions = [
  {
    title: 'Equipamentos',
    description:
      'Reservatórios e componentes para manter transporte e abastecimento confiáveis.',
    icon: 'container',
  },
  {
    title: 'Mangueiras e conexões',
    description:
      'Soluções de sucção, descarga, vedação e acoplamento para cada aplicação.',
    icon: 'workflow',
  },
  {
    title: 'Peças e acessórios',
    description:
      'Itens compatíveis para manutenção, reposição e adequação de caminhões-tanque.',
    icon: 'wrench',
  },
  {
    title: 'Segurança e sinalização',
    description:
      'EPIs e sinalização que ajudam a organizar operações com cargas sensíveis.',
    icon: 'shield',
  },
] as const

export const sectors = [
  'Postos e distribuidoras de combustíveis',
  'Agronegócio',
  'Transporte e aviação',
  'Indústrias',
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Envie o contexto',
    description:
      'Informe operação, segmento e necessidade, mesmo sem conhecer o nome técnico da peça.',
  },
  {
    number: '02',
    title: 'Receba uma análise',
    description:
      'Um especialista organiza as informações e identifica os próximos dados necessários.',
  },
  {
    number: '03',
    title: 'Avance com segurança',
    description:
      'A Paulim recomenda a solução, o fornecimento ou o atendimento adequado ao caso.',
  },
] as const

export const faqs = [
  {
    question: 'Preciso saber o nome exato da peça?',
    answer:
      'Não. Descreva a aplicação, o equipamento e o problema percebido. Fotos e medidas podem ser solicitadas pelo especialista na conversa.',
  },
  {
    question: 'A Paulim atende empresas com frota?',
    answer:
      'Sim. O atendimento é direcionado a proprietários, gestores de frota, manutenção, compras e segurança de operações B2B.',
  },
  {
    question: 'Quais segmentos podem solicitar atendimento?',
    answer:
      'Postos e distribuidoras, agronegócio, transporte, aviação, indústrias e outras operações que utilizam tanques ou componentes relacionados.',
  },
  {
    question: 'O formulário já gera um orçamento?',
    answer:
      'Não. Ele reúne o contexto inicial para que um especialista avalie a necessidade antes de recomendar produtos, serviços ou próximos passos.',
  },
] as const

export const contact = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLabel: '(94) 99999-9999',
  serviceArea: 'Marabá e Norte do Brasil',
} as const
```

- [ ] **Step 6: Commit the tested domain**

```powershell
git add -- src/lib/technical-request.ts src/lib/technical-request.test.ts src/data/site.ts
git commit -m "feat: add technical request domain"
```

---

### Task 4: Build the Form Interaction with TDD

**Files:**

- Create: `src/components/TechnicalRequestForm.test.tsx`
- Create: `src/components/TechnicalRequestForm.tsx`

- [ ] **Step 1: Write the failing interaction tests**

Create `src/components/TechnicalRequestForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

describe('TechnicalRequestForm', () => {
  it('shows specific errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<TechnicalRequestForm />)

    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe um telefone com DDD.')).toBeInTheDocument()
    expect(
      screen.getByText('Selecione o segmento da operação.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toHaveFocus()
  })

  it('asks for confirmation before opening WhatsApp', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({} as Window)
    render(<TechnicalRequestForm />)

    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('Empresa ou operação'), 'Frota Norte')
    await user.type(screen.getByLabelText('Telefone com DDD'), '(94) 99999-9999')
    await user.click(screen.getByRole('combobox', { name: 'Segmento' }))
    await user.click(
      screen.getByRole('option', { name: 'Transporte e aviação' }),
    )
    await user.type(
      screen.getByLabelText('O que sua operação precisa?'),
      'Precisamos avaliar mangueiras de descarga.',
    )
    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Confirmar dados técnicos' }),
    ).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()

    await user.click(
      await screen.findByRole('button', {
        name: 'Abrir conversa no WhatsApp',
      }),
    )

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/5594999999999?text='),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('shows a direct fallback link when the browser blocks the new window', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'open').mockReturnValue(null)
    render(<TechnicalRequestForm />)

    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('Empresa ou operação'), 'Frota Norte')
    await user.type(screen.getByLabelText('Telefone com DDD'), '(94) 99999-9999')
    await user.click(screen.getByRole('combobox', { name: 'Segmento' }))
    await user.click(screen.getByRole('option', { name: 'Indústrias' }))
    await user.type(
      screen.getByLabelText('O que sua operação precisa?'),
      'Precisamos avaliar um reservatório metálico.',
    )
    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Abrir conversa no WhatsApp' }),
    )

    expect(
      await screen.findByRole('link', { name: 'Abrir WhatsApp manualmente' }),
    ).toHaveAttribute('href', expect.stringContaining('https://wa.me/'))
  })
})
```

- [ ] **Step 2: Run the tests and verify they fail**

Run:

```powershell
npm run test:run -- src/components/TechnicalRequestForm.test.tsx
```

Expected: FAIL because `TechnicalRequestForm` does not exist.

- [ ] **Step 3: Implement the accessible form**

Create `src/components/TechnicalRequestForm.tsx`:

```tsx
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
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
  type TechnicalRequestErrors,
} from '@/lib/technical-request'

export function TechnicalRequestForm() {
  const [values, setValues] = useState<TechnicalRequest>(emptyTechnicalRequest)
  const [errors, setErrors] = useState<TechnicalRequestErrors>({})
  const [isPreparing, setIsPreparing] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState('')
  const [wasOpened, setWasOpened] = useState(false)
  const timerRef = useRef<number | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const segmentRef = useRef<HTMLButtonElement>(null)
  const detailsRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  function updateValue<Key extends keyof TechnicalRequest>(
    key: Key,
    value: TechnicalRequest[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function focusFirstError(nextErrors: TechnicalRequestErrors) {
    if (nextErrors.name) return nameRef.current?.focus()
    if (nextErrors.company) return companyRef.current?.focus()
    if (nextErrors.phone) return phoneRef.current?.focus()
    if (nextErrors.segment) return segmentRef.current?.focus()
    if (nextErrors.details) detailsRef.current?.focus()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateTechnicalRequest(values)
    setErrors(nextErrors)
    setFallbackUrl('')
    setWasOpened(false)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setIsPreparing(true)
    timerRef.current = window.setTimeout(() => {
      setIsPreparing(false)
      setIsConfirmOpen(true)
    }, 150)
  }

  function openWhatsApp() {
    const url = buildWhatsAppUrl(values)
    const opened = window.open(url, '_blank', 'noopener,noreferrer')
    setIsConfirmOpen(false)
    setWasOpened(Boolean(opened))

    if (!opened) setFallbackUrl(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
          Diagnóstico inicial
        </p>
        <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-card-foreground">
          Fale com um especialista técnico
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Conte o contexto da operação. Você revisa os dados antes de abrir a conversa.
        </p>
      </div>

      <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
        <FieldGroup>
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input
              id="name"
              ref={nameRef}
              value={values.name}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              onChange={(event) => updateValue('name', event.target.value)}
            />
            {errors.name ? (
              <FieldDescription className="text-destructive" role="alert">
                {errors.name}
              </FieldDescription>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(errors.company)}>
            <FieldLabel htmlFor="company">Empresa ou operação</FieldLabel>
            <Input
              id="company"
              ref={companyRef}
              value={values.company}
              aria-invalid={Boolean(errors.company)}
              autoComplete="organization"
              onChange={(event) => updateValue('company', event.target.value)}
            />
            {errors.company ? (
              <FieldDescription className="text-destructive" role="alert">
                {errors.company}
              </FieldDescription>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(errors.phone)}>
            <FieldLabel htmlFor="phone">Telefone com DDD</FieldLabel>
            <Input
              id="phone"
              ref={phoneRef}
              value={values.phone}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              inputMode="tel"
              placeholder="(94) 99999-9999"
              onChange={(event) => updateValue('phone', event.target.value)}
            />
            {errors.phone ? (
              <FieldDescription className="text-destructive" role="alert">
                {errors.phone}
              </FieldDescription>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(errors.segment)}>
            <FieldLabel htmlFor="segment">Segmento</FieldLabel>
            <Select
              value={values.segment}
              onValueChange={(value) =>
                updateValue('segment', value as TechnicalRequest['segment'])
              }
            >
              <SelectTrigger
                id="segment"
                ref={segmentRef}
                aria-invalid={Boolean(errors.segment)}
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
              <FieldDescription className="text-destructive" role="alert">
                {errors.segment}
              </FieldDescription>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(errors.details)}>
            <FieldLabel htmlFor="details">
              O que sua operação precisa?
            </FieldLabel>
            <Textarea
              id="details"
              ref={detailsRef}
              value={values.details}
              aria-invalid={Boolean(errors.details)}
              placeholder="Ex.: avaliar mangueiras de descarga e conexões do tanque."
              rows={4}
              onChange={(event) => updateValue('details', event.target.value)}
            />
            {errors.details ? (
              <FieldDescription className="text-destructive" role="alert">
                {errors.details}
              </FieldDescription>
            ) : null}
          </Field>
        </FieldGroup>

        <Button className="w-full" disabled={isPreparing} size="lg" type="submit">
          {isPreparing ? <Spinner data-icon="inline-start" /> : null}
          {isPreparing ? 'Preparando dados...' : 'Enviar dados técnicos'}
        </Button>
      </form>

      {wasOpened ? (
        <Alert aria-live="polite">
          <AlertTitle>Conversa aberta</AlertTitle>
          <AlertDescription>
            Os dados foram preparados para você continuar no WhatsApp.
          </AlertDescription>
        </Alert>
      ) : null}

      {fallbackUrl ? (
        <Alert aria-live="assertive" variant="destructive">
          <AlertTitle>O navegador bloqueou a nova janela</AlertTitle>
          <AlertDescription>
            <a
              className="font-bold underline underline-offset-4"
              href={fallbackUrl}
              rel="noreferrer"
              target="_blank"
            >
              Abrir WhatsApp manualmente
            </a>
          </AlertDescription>
        </Alert>
      ) : null}

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar dados técnicos</AlertDialogTitle>
            <AlertDialogDescription>
              Confira antes de abrir a conversa com o especialista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <dl className="grid gap-3 rounded-lg bg-muted p-4 text-sm">
            <div>
              <dt className="font-semibold text-muted-foreground">Empresa</dt>
              <dd className="font-bold text-foreground">{values.company}</dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">Telefone</dt>
              <dd className="font-bold text-foreground">{values.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">Segmento</dt>
              <dd className="font-bold text-foreground">{values.segment}</dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel>Revisar dados</AlertDialogCancel>
            <AlertDialogAction onClick={openWhatsApp}>
              Abrir conversa no WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
```

- [ ] **Step 4: Run the interaction tests**

Run:

```powershell
npm run test:run -- src/components/TechnicalRequestForm.test.tsx
```

Expected: all three tests PASS.

- [ ] **Step 5: Run all tests**

Run:

```powershell
npm run test:run
```

Expected: seven tests PASS.

- [ ] **Step 6: Commit the form**

```powershell
git add -- src/components/TechnicalRequestForm.tsx src/components/TechnicalRequestForm.test.tsx
git commit -m "feat: add confirmed technical request form"
```

---

### Task 5: Compose the Landing Page Sections

**Files:**

- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/TrustBar.tsx`
- Create: `src/components/Solutions.tsx`
- Create: `src/components/Sectors.tsx`
- Create: `src/components/Process.tsx`
- Create: `src/components/About.tsx`
- Create: `src/components/FAQ.tsx`
- Create: `src/components/ContactCta.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/SectionHeading.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add a semantic smoke test before composing the page**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('Paulim Tanques landing page', () => {
  it('exposes the primary sections and technical conversion', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Soluções técnicas para operações que não podem parar.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Soluções para cada etapa da operação',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Do diagnóstico à solução certa' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: 'Enviar dados técnicos' }),
    ).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run the smoke test and verify it fails**

Run:

```powershell
npm run test:run -- src/App.test.tsx
```

Expected: FAIL because the starter page does not contain the approved content.

- [ ] **Step 3: Create the shared section heading**

Create `src/components/SectionHeading.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  inverse?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <p
        className={cn(
          'text-sm font-bold uppercase tracking-[0.16em]',
          inverse ? 'text-primary-foreground/70' : 'text-primary',
        )}
      >
        {eyebrow}
      </p>
      <h2 className="font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-7',
            inverse ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 4: Create the responsive header**

Create `src/components/Header.tsx`:

```tsx
import { Menu, MessageCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navItems } from '@/data/site'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="section-shell flex min-h-20 items-center justify-between gap-6">
        <a
          className="inline-flex min-h-11 items-center"
          href="#inicio"
          aria-label="Paulim Tanques - início"
        >
          <img
            className="h-auto w-40"
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
          />
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <Button asChild key={item.href} variant="ghost">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href="#diagnostico">
              <MessageCircle data-icon="inline-start" />
              Falar com especialista
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden"
              size="icon"
              type="button"
              variant="outline"
              aria-label="Abrir menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Paulim Tanques</SheetTitle>
              <SheetDescription>
                Navegue pelas soluções e acesse o diagnóstico técnico.
              </SheetDescription>
            </SheetHeader>
            <nav
              className="flex flex-col gap-2 px-4"
              aria-label="Navegação mobile"
            >
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    className="inline-flex min-h-11 items-center border-b py-3 font-semibold"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  className={cn(buttonVariants(), 'mt-4')}
                  href="#diagnostico"
                >
                  <MessageCircle data-icon="inline-start" />
                  Falar com especialista
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
```

- [ ] **Step 5: Create the hero**

Create `src/components/Hero.tsx`:

```tsx
import { ArrowDown, CheckCircle2 } from 'lucide-react'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section id="inicio" className="section-anchor bg-brand-deep text-primary-foreground">
      <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-[1.12fr_.88fr]">
        <div className="relative isolate flex min-h-[38rem] items-end overflow-hidden">
          <img
            className="absolute inset-0 size-full object-cover object-center"
            src="/assets/hero-tanker-operation.png"
            alt="Especialista inspecionando equipamentos de um caminhão-tanque em operação."
          />
          <div className="absolute inset-0 bg-brand-deep/70" />
          <div className="section-shell relative flex flex-col gap-7 py-16 lg:py-24">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
              Especialista desde o início
            </p>
            <h1 className="font-display text-balance max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
              Soluções técnicas para operações que não podem parar.
            </h1>
            <p className="safe-copy max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Peças, equipamentos e suporte especializado para transporte e
              abastecimento com segurança.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 font-bold">
                <CheckCircle2 aria-hidden="true" />
                15 anos de experiência técnica
              </span>
              <a
                className="inline-flex min-h-11 items-center gap-2 font-bold underline decoration-brand-light decoration-2 underline-offset-8"
                href="#solucoes"
              >
                Conhecer soluções
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div
          id="diagnostico"
          className="section-anchor flex items-center bg-card px-5 py-12 text-card-foreground sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-xl">
            <TechnicalRequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create trust, solutions and sectors**

Create `src/components/TrustBar.tsx`:

```tsx
import { trustItems } from '@/data/site'

export function TrustBar() {
  return (
    <section className="bg-brand-light text-brand-deep" aria-label="Provas de confiança">
      <ul className="section-shell grid gap-px bg-brand-deep/20 py-px md:grid-cols-3">
        {trustItems.map((item) => (
          <li className="flex flex-col gap-1 bg-brand-light px-5 py-7 md:px-8" key={item.value}>
            <strong className="text-xl font-extrabold">{item.value}</strong>
            <span className="text-sm font-semibold text-brand-deep/80">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

Create `src/components/Solutions.tsx`:

```tsx
import {
  Container,
  ShieldCheck,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { solutions } from '@/data/site'

const solutionIcons = {
  container: Container,
  workflow: Workflow,
  wrench: Wrench,
  shield: ShieldCheck,
} satisfies Record<(typeof solutions)[number]['icon'], LucideIcon>

export function Solutions() {
  return (
    <section id="solucoes" className="section-anchor bg-background py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Soluções"
            title="Soluções para cada etapa da operação"
            description="A aplicação vem antes da especificação. A Paulim ajuda a identificar o componente, equipamento ou suporte adequado ao contexto."
          />
          <img
            className="aspect-[4/3] w-full rounded-xl object-cover"
            src="/assets/technical-equipment.png"
            alt="Mangueiras, válvulas e conexões organizadas para atendimento técnico."
          />
        </div>

        <ol className="border-t">
          {solutions.map((solution, index) => {
            const Icon = solutionIcons[solution.icon]

            return (
              <li
                className="grid gap-5 border-b py-8 sm:grid-cols-[auto_1fr] sm:py-10"
                key={solution.title}
              >
                <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.025em]">
                    {solution.title}
                  </h3>
                  <p className="max-w-xl leading-7 text-muted-foreground">
                    {solution.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
```

Create `src/components/Sectors.tsx`:

```tsx
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { sectors } from '@/data/site'

export function Sectors() {
  return (
    <section id="setores" className="section-anchor bg-card py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Setores atendidos"
            title="Experiência onde a operação exige precisão"
            description="Atendimento técnico para empresas que dependem de disponibilidade, compatibilidade e segurança."
          />
          <ol className="border-t">
            {sectors.map((sector, index) => (
              <li
                className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b py-5"
                key={sector}
              >
                <span className="font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-bold">{sector}</span>
                <ArrowUpRight className="text-muted-foreground" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <img
          className="min-h-[28rem] w-full rounded-xl object-cover"
          src="/assets/sector-operations.png"
          alt="Operação de caminhão-tanque em área logística com contexto regional."
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create process and company sections**

Create `src/components/Process.tsx`:

```tsx
import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/data/site'

export function Process() {
  return (
    <section className="bg-brand-deep py-20 text-primary-foreground md:py-28">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading
          inverse
          eyebrow="Como funciona"
          title="Do diagnóstico à solução certa"
          description="Um fluxo curto para transformar contexto operacional em uma conversa técnica produtiva."
        />
        <ol className="grid border-y border-primary-foreground/20 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li
              className="flex min-h-80 flex-col justify-between gap-10 border-b border-primary-foreground/20 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              key={step.number}
            >
              <span className="font-display text-7xl font-bold leading-none text-brand-light">
                {step.number}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="leading-7 text-primary-foreground/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

Create `src/components/About.tsx`:

```tsx
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'

const capabilities = [
  'Fabricação e adequação conforme a necessidade',
  'Manutenção e fornecimento de componentes',
  'Orientação técnica antes da decisão',
] as const

export function About() {
  return (
    <section id="paulim" className="section-anchor bg-background py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <img
          className="min-h-[30rem] w-full rounded-xl object-cover"
          src="/assets/technical-specialist.png"
          alt="Especialista e gestor avaliando componentes de uma operação com tanque."
        />
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="A Paulim"
            title="Engenharia de proximidade"
            description="Conhecimento técnico para operações críticas, com atendimento próximo a quem precisa manter equipamentos, frotas e abastecimento funcionando."
          />
          <p className="leading-8 text-muted-foreground">
            Com base em Marabá e experiência no mercado do Norte, a Paulim reúne
            fabricação, manutenção, peças e orientação para apoiar decisões mais
            seguras e compatíveis com cada aplicação.
          </p>
          <ul className="flex flex-col gap-4">
            {capabilities.map((capability) => (
              <li className="flex items-start gap-3 font-semibold" key={capability}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create FAQ, final CTA and footer**

Create `src/components/FAQ.tsx`:

```tsx
import { SectionHeading } from '@/components/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data/site'

export function FAQ() {
  return (
    <section id="duvidas" className="section-anchor bg-card py-20 md:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[.72fr_1fr]">
        <SectionHeading
          eyebrow="Dúvidas"
          title="Informação suficiente para começar"
          description="Você não precisa dominar a terminologia técnica para solicitar uma avaliação."
        />
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="max-w-2xl leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

Create `src/components/ContactCta.tsx`:

```tsx
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactCta() {
  return (
    <section className="bg-brand-light py-16 text-brand-deep md:py-20">
      <div className="section-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em]">
            Próximo passo
          </p>
          <h2 className="font-display text-balance text-4xl font-bold leading-none tracking-[-0.04em] md:text-5xl">
            Conte o que sua operação precisa
          </h2>
        </div>
        <Button asChild size="lg" variant="secondary">
          <a href="#diagnostico">
            Preencher formulário técnico
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </section>
  )
}
```

Create `src/components/Footer.tsx`:

```tsx
import { contact, navItems } from '@/data/site'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-brand-deep py-14 text-primary-foreground">
      <div className="section-shell flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div className="flex max-w-sm flex-col gap-5">
            <span className="inline-flex w-fit rounded-lg bg-card p-3">
              <img
                className="w-48"
                src="/assets/paulim-tanques-logo.png"
                alt="Paulim Tanques"
              />
            </span>
            <p className="leading-7 text-primary-foreground/70">
              Soluções técnicas para transporte, abastecimento e operações que
              dependem de segurança e disponibilidade.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <strong>Navegação</strong>
            {navItems.map((item) => (
              <a
                className="inline-flex min-h-11 items-center text-primary-foreground/70 hover:text-primary-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <strong>Atendimento</strong>
            <span className="text-primary-foreground/70">{contact.serviceArea}</span>
            <a
              className="inline-flex min-h-11 items-center text-primary-foreground/70 hover:text-primary-foreground"
              href={`https://wa.me/${contact.whatsappNumber}`}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp de demonstração: {contact.whatsappLabel}
            </a>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        <div className="flex flex-col gap-2 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Paulim Tanques.</p>
          <p>Número de contato provisório para demonstração.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 9: Compose the application**

Replace `src/App.tsx` with:

```tsx
import { About } from '@/components/About'
import { ContactCta } from '@/components/ContactCta'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Process } from '@/components/Process'
import { Sectors } from '@/components/Sectors'
import { Solutions } from '@/components/Solutions'
import { TrustBar } from '@/components/TrustBar'

export default function App() {
  return (
    <>
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
    </>
  )
}
```

- [ ] **Step 10: Run tests**

Run:

```powershell
npm run test:run
```

Expected: all unit, interaction and smoke tests PASS.

- [ ] **Step 11: Commit the section composition**

```powershell
git add -- src/App.tsx src/App.test.tsx src/components/Header.tsx src/components/Hero.tsx src/components/TrustBar.tsx src/components/Solutions.tsx src/components/Sectors.tsx src/components/Process.tsx src/components/About.tsx src/components/FAQ.tsx src/components/ContactCta.tsx src/components/Footer.tsx src/components/SectionHeading.tsx
git commit -m "feat: compose Paulim landing page"
```

---

### Task 6: Apply the Brand System and Responsive Behavior

**Files:**

- Modify: `src/index.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Import the local Montserrat variable font**

Replace `src/main.tsx` with:

```tsx
import '@fontsource-variable/montserrat'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2: Define the exact semantic tokens**

In the shadcn-generated `src/index.css`, preserve the generated component tokens but set the light theme to:

```css
:root {
  --radius: 0.625rem;
  --background: #f7f8f4;
  --foreground: #172019;
  --card: #ffffff;
  --card-foreground: #172019;
  --popover: #ffffff;
  --popover-foreground: #172019;
  --primary: #0d8336;
  --primary-foreground: #ffffff;
  --secondary: #e9f3e6;
  --secondary-foreground: #065320;
  --muted: #eef1eb;
  --muted-foreground: #5c675e;
  --accent: #dcefd7;
  --accent-foreground: #065320;
  --destructive: #b42318;
  --border: #d7ded5;
  --input: #cbd5c9;
  --ring: #3daa34;
  --brand-light: #6ab42d;
  --brand-mid: #3daa34;
  --brand-dark: #0d8336;
  --brand-deep: #065320;
  --mineral: #f7f8f4;
  --graphite: #172019;
}
```

Expose the four brand colors and fonts in `@theme inline`:

```css
--font-sans: 'Montserrat Variable', 'Montserrat', Arial, sans-serif;
--font-display: 'Montserrat Variable', 'Montserrat', Arial, sans-serif;
--color-brand-light: var(--brand-light);
--color-brand-mid: var(--brand-mid);
--color-brand-dark: var(--brand-dark);
--color-brand-deep: var(--brand-deep);
--color-mineral: var(--mineral);
--color-graphite: var(--graphite);
```

Do not define a fifth green or a yellow signal color.

- [ ] **Step 3: Add the global base**

Use:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply min-w-80 overflow-x-hidden bg-background font-sans text-foreground antialiased;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  button,
  a,
  input,
  textarea,
  select {
    -webkit-tap-highlight-color: transparent;
  }

  img {
    @apply block max-w-full;
  }

  ::selection {
    background: #6ab42d;
    color: #065320;
  }
}
```

- [ ] **Step 4: Add responsive utilities and restrained motion**

Add:

```css
@layer utilities {
  .section-shell {
    @apply mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12;
  }

  .section-anchor {
    scroll-margin-top: 6rem;
  }

  .text-balance {
    text-wrap: balance;
  }

  .safe-copy {
    overflow-wrap: anywhere;
  }
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-up {
  animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Check component styling rules**

Search:

```powershell
rg "space-[xy]-|bg-(blue|yellow|emerald)|text-(blue|yellow|emerald)|rounded-full" src
```

Expected:

- No `space-x-*` or `space-y-*`.
- No generic blue, yellow or emerald utility.
- `rounded-full` is limited to true circular indicators or icon containers, not most cards/buttons.

- [ ] **Step 6: Run automated verification**

Run:

```powershell
npm run lint
npm run test:run
npm run build
```

Expected: all commands exit with code `0`.

- [ ] **Step 7: Commit the brand system**

```powershell
git add -- src/index.css src/main.tsx
git commit -m "style: apply Paulim brand system"
```

---

### Task 7: Add Metadata, Favicon and Production Details

**Files:**

- Modify: `index.html`
- Modify: `public/favicon.svg`

- [ ] **Step 1: Replace the document metadata**

Set `index.html` to:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, viewport-fit=cover"
    />
    <meta name="theme-color" content="#065320" />
    <meta
      name="description"
      content="Soluções técnicas, peças, equipamentos e suporte especializado para operações com caminhões-tanque, combustíveis e cargas sensíveis."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Paulim Tanques | Soluções técnicas para sua operação</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Replace the Vite favicon with a compact brand symbol**

Replace `public/favicon.svg` with this small truck-and-tank symbol. It is used
only as a browser icon and does not replace or redraw the official page logo:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#065320"/>
  <path fill="#6AB42D" d="M25 17h25a6 6 0 0 1 6 6v16H25V17Z"/>
  <path fill="#fff" d="M8 26h14v13H8V26Zm3-7h11v7H11a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3Z"/>
  <path fill="#fff" d="M8 42h48v4H8z"/>
  <circle cx="18" cy="48" r="5" fill="#6AB42D"/>
  <circle cx="45" cy="48" r="5" fill="#6AB42D"/>
</svg>
```

- [ ] **Step 3: Run production verification**

Run:

```powershell
npm run lint
npm run test:run
npm run build
```

Expected: all commands exit with code `0`; `dist/index.html` contains the new title and description.

- [ ] **Step 4: Commit metadata**

```powershell
git add -- index.html public/favicon.svg
git commit -m "chore: add Paulim landing metadata"
```

---

### Task 8: Browser QA and Final Hardening

**Files:**

- Modify only files implicated by observed defects.

- [ ] **Step 1: Start the development server**

Run:

```powershell
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL, normally `http://127.0.0.1:5173`.

- [ ] **Step 2: Inspect desktop rendering with the Browser plugin**

Open the Vite URL at approximately 1440×1000 and verify:

- Header navigation and logo are clear.
- Hero H1, evidence and form fit without clipping.
- Hero image retains technical subject and negative space.
- The four official greens dominate without blue/yellow leakage.
- No section resembles a dense product catalog.
- FAQ, confirmation dialog and mobile sheet have accessible titles.
- Browser console has no errors or React warnings.

- [ ] **Step 3: Test the full form flow**

In the browser:

1. Submit empty and confirm errors appear beside fields.
2. Fill valid data.
3. Confirm the review dialog appears before WhatsApp.
4. Confirm the generated URL begins with `https://wa.me/5594999999999`.
5. Cancel once and verify form data remains.
6. Reopen and complete the action.

- [ ] **Step 4: Inspect mobile rendering**

Test widths `320`, `375`, `768` and a landscape mobile viewport:

- Header becomes a Sheet menu.
- All tap targets are at least 44 pixels.
- Form fields remain at least 16 pixels in font size.
- Hero becomes one column without hiding the form.
- Sector and solution layouts reflow without horizontal scrolling.
- Images use intentional crops.
- Final CTA remains visible and readable.

- [ ] **Step 5: Test keyboard and reduced motion**

Verify:

- Tab order follows header, hero, form and page sections.
- Focus rings are visible on every interactive control.
- Escape closes Sheet and AlertDialog.
- Accordion works with keyboard.
- With reduced motion enabled, reveal animations are effectively disabled.

- [ ] **Step 6: Fix observed defects with focused tests**

For each behavior defect:

1. Add or adjust a failing Vitest/Testing Library test.
2. Run that test and observe failure.
3. Apply the smallest implementation change.
4. Re-run the focused test.
5. Re-run the complete suite.

- [ ] **Step 7: Run final verification**

Run:

```powershell
npm run lint
npm run test:run
npm run build
git diff --check
```

Expected: all commands exit with code `0`.

- [ ] **Step 8: Review the final diff**

Run:

```powershell
git status --short
git diff --stat
git diff -- src index.html components.json package.json vite.config.ts tsconfig.app.json tsconfig.node.json
```

Verify that no unrelated user changes were reverted or staged.

- [ ] **Step 9: Commit final hardening**

```powershell
git add -- index.html public/favicon.svg public/assets/paulim-tanques-logo.png public/assets/hero-tanker-operation.png public/assets/technical-equipment.png public/assets/technical-specialist.png public/assets/sector-operations.png components.json package.json package-lock.json vite.config.ts tsconfig.app.json tsconfig.node.json src/App.tsx src/App.test.tsx src/main.tsx src/index.css src/data/site.ts src/lib/utils.ts src/lib/technical-request.ts src/lib/technical-request.test.ts src/test/setup.ts src/components/TechnicalRequestForm.tsx src/components/TechnicalRequestForm.test.tsx src/components/Header.tsx src/components/Hero.tsx src/components/TrustBar.tsx src/components/Solutions.tsx src/components/Sectors.tsx src/components/Process.tsx src/components/About.tsx src/components/FAQ.tsx src/components/ContactCta.tsx src/components/Footer.tsx src/components/SectionHeading.tsx src/components/ui/accordion.tsx src/components/ui/alert-dialog.tsx src/components/ui/alert.tsx src/components/ui/button.tsx src/components/ui/field.tsx src/components/ui/input.tsx src/components/ui/select.tsx src/components/ui/separator.tsx src/components/ui/sheet.tsx src/components/ui/spinner.tsx src/components/ui/textarea.tsx
git commit -m "fix: harden responsive landing experience"
```

Only create this commit when there are actual QA fixes. Otherwise leave the preceding verified commits as the final state.

---

## Final Acceptance Checklist

- [ ] First fold communicates specialist guidance and shows the technical form.
- [ ] Form validates locally, confirms data, opens the provisional WhatsApp and exposes a blocked-popup fallback.
- [ ] Content follows the approved sequence: header, hero/form, trust, solutions, sectors, process, company, FAQ, final CTA and footer.
- [ ] Exact brand greens are `#6AB42D`, `#3DAA34`, `#0D8336` and `#065320`.
- [ ] Montserrat is bundled; Designer Regular remains an explicit future replacement.
- [ ] Real logo is preserved.
- [ ] No fake address, certification, client, metric or production phone number is introduced.
- [ ] shadcn/ui components are installed through the official CLI and reviewed after generation.
- [ ] WCAG 2.2 AA essentials are covered: semantics, contrast, labels, keyboard, focus and reduced motion.
- [ ] Desktop and mobile rendering are visually inspected.
- [ ] Lint, all tests, production build and `git diff --check` pass.
