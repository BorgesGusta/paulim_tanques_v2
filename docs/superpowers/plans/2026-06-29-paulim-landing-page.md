# Paulim Tanques Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir do zero a landing page da Paulim Tanques — hero full-bleed com formulário de diagnóstico técnico flutuante, 9 seções de conversão, sistema visual em verdes OKLCH, Montserrat Variable, acessibilidade WCAG 2.2 AA.

**Architecture:** Single-page React 19 + Vite 8. App.tsx compõe seções em ordem; cada seção é um componente isolado sem estado próprio, exceto TechnicalRequestForm que gerencia todo o fluxo de envio via WhatsApp. Dados estáticos centralizados em `src/data/site.ts`. Tokens de cor e tipografia definidos em `src/index.css` via CSS custom properties + `@theme inline`.

**Tech Stack:** React 19, Vite 8, Tailwind v4 (`@tailwindcss/vite`), shadcn base-nova, @base-ui/react, Montserrat Variable (`@fontsource-variable/montserrat`), lucide-react, clsx + tailwind-merge.

## Global Constraints

- Todos os imports de src usam alias `@/` (ex: `@/components/Header`) — alias configurado na Task 1
- Paleta restrita aos 4 verdes oficiais: `#6AB42D`, `#3DAA34`, `#0D8336`, `#065320` — expressos em OKLCH
- Fonte exclusiva: Montserrat Variable — sem Inter, DM Sans, Space Grotesk ou qualquer fonte da lista de rejeição
- Nenhum gradiente em texto, glassmorphism, sombra decorativa, ou eyebrow em toda seção
- Números `01/02/03` apenas no componente `Process` — proibido como scaffolding genérico
- `lang="pt-BR"` em `index.html`
- WCAG 2.2 AA em todos os componentes interativos
- `prefers-reduced-motion` obrigatório em todos os animations
- Código dos commits anteriores não deve ser consultado como referência

---

## Mapa de arquivos

| Arquivo | Status | Responsabilidade |
|---|---|---|
| `index.html` | Modificar | lang, title, meta description |
| `vite.config.ts` | Modificar | alias `@/` → `./src` |
| `tsconfig.app.json` | Modificar | paths `@/*` → `./src/*` |
| `src/index.css` | Substituir | tokens OKLCH, reset, utilitários, motion |
| `src/main.tsx` | Sem alteração | entry point |
| `src/App.tsx` | Substituir | composição das seções |
| `src/lib/utils.ts` | Criar | cn() |
| `src/lib/technical-request.ts` | Criar | tipos, validação, buildWhatsAppUrl |
| `src/data/site.ts` | Criar | todos os dados estáticos |
| `src/components/ui/button.tsx` | Criar | shadcn Button |
| `src/components/ui/input.tsx` | Criar | shadcn Input |
| `src/components/ui/textarea.tsx` | Criar | shadcn Textarea |
| `src/components/ui/select.tsx` | Criar | shadcn Select |
| `src/components/ui/field.tsx` | Criar | Field, FieldLabel, FieldError, FieldGroup, FieldDescription |
| `src/components/ui/alert.tsx` | Criar | shadcn Alert |
| `src/components/ui/alert-dialog.tsx` | Criar | shadcn AlertDialog |
| `src/components/ui/accordion.tsx` | Criar | shadcn Accordion |
| `src/components/ui/sheet.tsx` | Criar | shadcn Sheet |
| `src/components/ui/separator.tsx` | Criar | shadcn Separator |
| `src/components/ui/spinner.tsx` | Criar | Spinner animado |
| `src/components/ImagePlaceholder.tsx` | Criar | placeholder estruturado para imagens |
| `src/components/SectionHeading.tsx` | Criar | heading reutilizável com eyebrow opcional |
| `src/components/TechnicalRequestForm.tsx` | Criar | formulário completo com fluxo WhatsApp |
| `src/components/Header.tsx` | Criar | nav sticky + mobile sheet |
| `src/components/Hero.tsx` | Criar | hero full-bleed com overlay + formulário |
| `src/components/TrustBar.tsx` | Criar | faixa verde claro com 3 evidências |
| `src/components/Solutions.tsx` | Criar | lista sticky com 4 soluções |
| `src/components/Sectors.tsx` | Criar | lista de setores + imagem |
| `src/components/Process.tsx` | Criar | 3 passos em fundo verde escuro |
| `src/components/About.tsx` | Criar | institucional com imagem + capacidades |
| `src/components/FAQ.tsx` | Criar | accordion de dúvidas frequentes |
| `src/components/ContactCta.tsx` | Criar | CTA verde claro com botão |
| `src/components/Footer.tsx` | Criar | rodapé em verde profundo |
| `public/assets/paulim-tanques-logo.png` | Copiar | logo de docs/context/logo.png |

---

## Task 1: Configuração base — alias, tokens, reset

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`
- Modify: `index.html`
- Replace: `src/index.css`
- Copy: `docs/context/logo.png` → `public/assets/paulim-tanques-logo.png`

**Interfaces:**
- Produz: alias `@/` funcional, tokens CSS `--brand-*`, classes `.section-shell`, `.section-anchor`, `.reveal-up`, `@theme inline` com fontes e cores expostas ao Tailwind

- [ ] **Step 1: Configurar alias no vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Configurar paths no tsconfig.app.json**

Adicionar `"baseUrl": "."` e `"paths"` em `compilerOptions`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Atualizar index.html**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Paulim Tanques — Soluções técnicas para operações que não podem parar</title>
    <meta
      name="description"
      content="Peças, equipamentos e suporte especializado para transporte e abastecimento com segurança. Base em Marabá, atendimento no Norte do Brasil."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Substituir src/index.css com o sistema visual completo**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/montserrat";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;

  /* Paleta de marca — quatro verdes oficiais em OKLCH */
  --brand-light: oklch(0.68 0.17 130);
  --brand-mid:   oklch(0.64 0.16 145);
  --brand-dark:  oklch(0.51 0.15 145);
  --brand-deep:  oklch(0.32 0.10 145);

  /* Superfícies */
  --background:        oklch(0.98 0.005 130);
  --foreground:        oklch(0.17 0.03 145);
  --card:              oklch(1 0 0);
  --card-foreground:   oklch(0.17 0.03 145);
  --popover:           oklch(1 0 0);
  --popover-foreground: oklch(0.17 0.03 145);

  /* Interação */
  --primary:            oklch(0.51 0.15 145);
  --primary-foreground: oklch(1 0 0);
  --secondary:          oklch(0.92 0.04 130);
  --secondary-foreground: oklch(0.32 0.10 145);
  --muted:              oklch(0.94 0.01 130);
  --muted-foreground:   oklch(0.45 0.03 145);
  --accent:             oklch(0.90 0.05 130);
  --accent-foreground:  oklch(0.32 0.10 145);
  --destructive:        oklch(0.58 0.22 27);

  /* Bordas e campos */
  --border: oklch(0.88 0.02 130);
  --input:  oklch(0.85 0.02 130);
  --ring:   oklch(0.64 0.16 145);
}

@theme inline {
  --font-sans:    "Montserrat Variable", Arial, sans-serif;
  --font-heading: "Montserrat Variable", Arial, sans-serif;
  --font-display: "Montserrat Variable", Arial, sans-serif;

  --color-brand-light: var(--brand-light);
  --color-brand-mid:   var(--brand-mid);
  --color-brand-dark:  var(--brand-dark);
  --color-brand-deep:  var(--brand-deep);

  --color-background:        var(--background);
  --color-foreground:        var(--foreground);
  --color-card:              var(--card);
  --color-card-foreground:   var(--card-foreground);
  --color-popover:           var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary:          var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:              var(--muted);
  --color-muted-foreground:   var(--muted-foreground);
  --color-accent:             var(--accent);
  --color-accent-foreground:  var(--accent-foreground);
  --color-destructive:        var(--destructive);
  --color-border:             var(--border);
  --color-input:              var(--input);
  --color-ring:               var(--ring);

  --radius-sm:  calc(var(--radius) * 0.6);
  --radius-md:  calc(var(--radius) * 0.8);
  --radius-lg:  var(--radius);
  --radius-xl:  calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply min-w-80 overflow-x-hidden bg-background font-sans text-foreground antialiased;
    margin: 0;
    min-height: 100vh;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  button, a, input, textarea, select {
    -webkit-tap-highlight-color: transparent;
  }

  img {
    @apply block max-w-full;
  }

  ::selection {
    background: oklch(0.68 0.17 130);
    color: oklch(0.32 0.10 145);
  }
}

@layer utilities {
  .section-shell {
    @apply mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12;
  }

  .section-anchor {
    scroll-margin-top: 6rem;
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

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Copiar logo para public/assets/**

```bash
mkdir -p public/assets
cp "docs/context/logo.png" "public/assets/paulim-tanques-logo.png"
```

- [ ] **Step 6: Verificar que o servidor inicia sem erros**

```bash
npm run dev
```

Esperado: servidor rodando em `http://localhost:5173` sem erros no terminal. A página estará em branco (App.tsx ainda é o starter) — isso é normal.

- [ ] **Step 7: Commit**

```bash
git add index.html vite.config.ts tsconfig.app.json src/index.css public/assets/paulim-tanques-logo.png
git commit -m "build: configure alias, brand tokens, and copy logo asset"
```

---

## Task 2: Dados estáticos e utilitários

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/technical-request.ts`
- Create: `src/data/site.ts`

**Interfaces:**
- Produz:
  - `cn(...inputs: ClassValue[]): string` de `@/lib/utils`
  - `WHATSAPP_NUMBER: string`, `segments: readonly Segment[]`, `TechnicalRequest`, `TechnicalRequestErrors`, `emptyTechnicalRequest`, `validateTechnicalRequest(r: TechnicalRequest): TechnicalRequestErrors`, `buildWhatsAppUrl(r: TechnicalRequest): string` de `@/lib/technical-request`
  - `navItems`, `trustItems`, `solutions`, `sectors`, `processSteps`, `faqs`, `contact` de `@/data/site`

- [ ] **Step 1: Criar src/lib/utils.ts**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Criar src/lib/technical-request.ts**

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

export type TechnicalRequest = {
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
    `Telefone: ${request.phone.trim()}`,
    `Segmento: ${request.segment}`,
    `Necessidade: ${request.details.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
```

- [ ] **Step 3: Criar src/data/site.ts**

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
  },
  {
    title: 'Mangueiras e conexões',
    description:
      'Soluções de sucção, descarga, vedação e acoplamento para cada aplicação.',
  },
  {
    title: 'Peças e acessórios',
    description:
      'Itens compatíveis para manutenção, reposição e adequação de caminhões-tanque.',
  },
  {
    title: 'Segurança e sinalização',
    description:
      'EPIs e sinalização que ajudam a organizar operações com cargas sensíveis.',
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

- [ ] **Step 4: Verificar TypeScript sem erros**

```bash
npx tsc --noEmit
```

Esperado: sem erros. Se houver "Cannot find module 'clsx'", instalar: `npm install clsx tailwind-merge`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/lib/technical-request.ts src/data/site.ts
git commit -m "feat: add static data, technical-request domain, and cn utility"
```

---

## Task 3: Componentes UI (shadcn via CLI)

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/field.tsx`
- Create: `src/components/ui/alert.tsx`
- Create: `src/components/ui/alert-dialog.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/sheet.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/spinner.tsx`

**Interfaces:**
- Produz: todos os componentes UI reutilizáveis usados pelas Tasks 4–11
- Consome: `cn` de `@/lib/utils`, `@base-ui/react` (alertdialog, accordion, select, sheet)

- [ ] **Step 1: Adicionar componentes via shadcn CLI**

```bash
npx shadcn@latest add button input textarea select alert alert-dialog accordion sheet separator
```

Quando perguntado sobre sobrescrever arquivos existentes, responder `y`. O CLI usa `components.json` para saber onde colocar os arquivos (`src/components/ui/`).

- [ ] **Step 2: Criar src/components/ui/spinner.tsx manualmente**

```tsx
import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={cn('h-4 w-4 animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
```

- [ ] **Step 3: Criar src/components/ui/field.tsx manualmente**

```tsx
import { cn } from '@/lib/utils'

interface FieldProps {
  className?: string
  children: React.ReactNode
  'data-invalid'?: boolean
}

export function Field({ className, children, ...props }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  )
}

interface FieldLabelProps {
  htmlFor: string
  children: React.ReactNode
  className?: string
}

export function FieldLabel({ htmlFor, children, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-semibold text-foreground', className)}
    >
      {children}
    </label>
  )
}

interface FieldErrorProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function FieldError({ id, children, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn('text-sm font-medium text-destructive', className)}
    >
      {children}
    </p>
  )
}

interface FieldDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function FieldDescription({ children, className }: FieldDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

interface FieldGroupProps {
  children: React.ReactNode
  className?: string
}

export function FieldGroup({ children, className }: FieldGroupProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Verificar que o build compila**

```bash
npx tsc --noEmit
```

Esperado: sem erros de tipo nos arquivos UI.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shadcn UI components and field/spinner primitives"
```

---

## Task 4: ImagePlaceholder e SectionHeading

**Files:**
- Create: `src/components/ImagePlaceholder.tsx`
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Produz:
  - `ImagePlaceholder({ label, className?, aspectRatio? })`
  - `SectionHeading({ eyebrow?, title, description?, inverse? })`
- Consome: `cn` de `@/lib/utils`, `ImageIcon` de `lucide-react`

- [ ] **Step 1: Criar src/components/ImagePlaceholder.tsx**

```tsx
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label: string
  className?: string
  aspectRatio?: string
}

export function ImagePlaceholder({
  label,
  className,
  aspectRatio,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-dark/25 bg-brand-dark/10',
        aspectRatio,
        className,
      )}
    >
      <ImageIcon
        className="size-10 text-brand-dark/35"
        aria-hidden="true"
      />
      <p className="max-w-[20ch] text-center text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Criar src/components/SectionHeading.tsx**

```tsx
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  inverse?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'text-sm font-bold uppercase tracking-[0.16em]',
            inverse ? 'text-primary-foreground/70' : 'text-primary',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'font-display text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em]',
          inverse ? 'text-primary-foreground' : 'text-foreground',
        )}
        style={{ textWrap: 'balance' } as React.CSSProperties}
      >
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

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/ImagePlaceholder.tsx src/components/SectionHeading.tsx
git commit -m "feat: add ImagePlaceholder and SectionHeading primitives"
```

---

## Task 5: TechnicalRequestForm

**Files:**
- Create: `src/components/TechnicalRequestForm.tsx`

**Interfaces:**
- Produz: `TechnicalRequestForm()` — componente sem props
- Consome:
  - `validateTechnicalRequest`, `buildWhatsAppUrl`, `emptyTechnicalRequest`, `segments`, `TechnicalRequest` de `@/lib/technical-request`
  - `Button` de `@/components/ui/button`
  - `Input` de `@/components/ui/input`
  - `Textarea` de `@/components/ui/textarea`
  - `Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue` de `@/components/ui/select`
  - `Field, FieldLabel, FieldError, FieldGroup, FieldDescription` de `@/components/ui/field`
  - `Alert, AlertDescription, AlertTitle` de `@/components/ui/alert`
  - `AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle` de `@/components/ui/alert-dialog`
  - `Spinner` de `@/components/ui/spinner`

- [ ] **Step 1: Criar src/components/TechnicalRequestForm.tsx**

```tsx
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

const fieldOrder: FieldName[] = ['name', 'company', 'phone', 'segment', 'details']

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

  function updateValue<F extends FieldName>(field: F, value: TechnicalRequest[F]) {
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Diagnóstico inicial
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Fale com um especialista técnico
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Conte o contexto da operação. Você revisa os dados antes de abrir a conversa.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Formulário de diagnóstico técnico">
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="technical-name">Nome</FieldLabel>
              <Input
                ref={nameRef}
                id="technical-name"
                name="name"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'technical-name-error' : undefined}
                onChange={(e) => updateValue('name', e.target.value)}
              />
              {errors.name ? (
                <FieldError id="technical-name-error">{errors.name}</FieldError>
              ) : null}
            </Field>

            <Field data-invalid={Boolean(errors.company)}>
              <FieldLabel htmlFor="technical-company">Empresa ou operação</FieldLabel>
              <Input
                ref={companyRef}
                id="technical-company"
                name="company"
                autoComplete="organization"
                value={values.company}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? 'technical-company-error' : undefined}
                onChange={(e) => updateValue('company', e.target.value)}
              />
              {errors.company ? (
                <FieldError id="technical-company-error">{errors.company}</FieldError>
              ) : null}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="technical-phone">Telefone com DDD</FieldLabel>
              <Input
                ref={phoneRef}
                id="technical-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'technical-phone-error' : undefined}
                onChange={(e) => updateValue('phone', e.target.value)}
              />
              <FieldDescription className="text-xs">
                Usado somente para este atendimento.
              </FieldDescription>
              {errors.phone ? (
                <FieldError id="technical-phone-error">{errors.phone}</FieldError>
              ) : null}
            </Field>

            <Field data-invalid={Boolean(errors.segment)}>
              <FieldLabel htmlFor="technical-segment">Segmento</FieldLabel>
              <Select
                value={values.segment}
                onValueChange={(value) =>
                  updateValue('segment', value as TechnicalRequest['segment'])
                }
              >
                <SelectTrigger
                  ref={segmentRef}
                  id="technical-segment"
                  className="w-full"
                  aria-invalid={Boolean(errors.segment)}
                  aria-describedby={errors.segment ? 'technical-segment-error' : undefined}
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
                <FieldError id="technical-segment-error">{errors.segment}</FieldError>
              ) : null}
            </Field>
          </div>

          <Field data-invalid={Boolean(errors.details)}>
            <FieldLabel htmlFor="technical-details">O que sua operação precisa?</FieldLabel>
            <Textarea
              ref={detailsRef}
              id="technical-details"
              name="details"
              rows={4}
              className="min-h-24"
              value={values.details}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={errors.details ? 'technical-details-error' : undefined}
              placeholder="Descreva o equipamento, a aplicação ou a necessidade da operação."
              onChange={(e) => updateValue('details', e.target.value)}
            />
            <FieldDescription className="text-xs">
              Uma breve descrição já ajuda o especialista a iniciar a análise.
            </FieldDescription>
            {errors.details ? (
              <FieldError id="technical-details-error">{errors.details}</FieldError>
            ) : null}
          </Field>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isPreparing}
          >
            {isPreparing ? (
              <>
                <Spinner className="mr-2" />
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
            <span>O navegador bloqueou a abertura automática. Use o link abaixo para continuar.</span>
            <Button asChild variant="outline" className="w-full whitespace-normal">
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
              Revise as informações antes de abrir a conversa com o especialista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <dl className="grid gap-4 rounded-xl bg-muted p-4 text-sm">
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Empresa</dt>
              <dd className="font-semibold text-foreground">{values.company}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Telefone</dt>
              <dd className="font-semibold text-foreground">{values.phone}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-medium text-muted-foreground">Segmento</dt>
              <dd className="font-semibold text-foreground">{values.segment}</dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">Revisar dados</AlertDialogCancel>
            <AlertDialogAction className="min-h-11" onClick={handleOpenWhatsApp}>
              Abrir conversa no WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/TechnicalRequestForm.tsx
git commit -m "feat: add TechnicalRequestForm with WhatsApp flow and validation"
```

---

## Task 6: Header e Hero

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Produz: `Header()`, `Hero()`
- Consome:
  - `navItems` de `@/data/site`
  - `Button` de `@/components/ui/button`
  - `Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger` de `@/components/ui/sheet`
  - `ImagePlaceholder` de `@/components/ImagePlaceholder`
  - `TechnicalRequestForm` de `@/components/TechnicalRequestForm`
  - `Menu, MessageCircle, ArrowDown, CheckCircle2` de `lucide-react`

- [ ] **Step 1: Criar src/components/Header.tsx**

```tsx
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="section-shell flex min-h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          aria-label="Paulim Tanques — início da página"
          className="inline-flex min-h-11 items-center"
        >
          <img
            src="/assets/paulim-tanques-logo.png"
            alt="Paulim Tanques"
            className="h-9 w-auto object-contain"
          />
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <Button asChild key={item.href} variant="ghost" size="sm">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href="#diagnostico">
              <MessageCircle className="mr-2 size-4" aria-hidden="true" />
              Falar com especialista
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-11 lg:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Paulim Tanques</SheetTitle>
              <SheetDescription>
                Navegue pelas soluções ou acesse o diagnóstico técnico.
              </SheetDescription>
            </SheetHeader>
            <nav
              className="flex flex-col gap-2 px-4 pt-4"
              aria-label="Navegação mobile"
            >
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center border-b border-border py-3 font-semibold text-foreground"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-4 min-h-11 w-full">
                  <a href="#diagnostico">
                    <MessageCircle className="mr-2 size-4" aria-hidden="true" />
                    Falar com especialista
                  </a>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Criar src/components/Hero.tsx**

```tsx
import { ArrowDown, CheckCircle2 } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section
      id="inicio"
      className="section-anchor relative min-h-svh overflow-hidden"
    >
      {/* Imagem de fundo */}
      <ImagePlaceholder
        label="Foto: caminhão-tanque em operação de campo"
        className="absolute inset-0 z-0 h-full w-full rounded-none border-0"
      />

      {/* Overlay diagonal brand-deep */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.32 0.10 145 / 0.92) 0%, oklch(0.32 0.10 145 / 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="section-shell relative z-20 flex min-h-svh flex-col gap-10 py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Manchete — col 1-7 */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Especialista desde o início
          </p>

          <h1
            className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground reveal-up"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          <p className="safe-copy max-w-lg text-lg leading-8 text-primary-foreground/80">
            Peças, equipamentos e suporte especializado para transporte e
            abastecimento com segurança.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-2 font-bold text-primary-foreground">
              <CheckCircle2 className="size-5 text-brand-light" aria-hidden="true" />
              15 anos de experiência técnica
            </span>
            <a
              href="#solucoes"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-foreground underline decoration-brand-light decoration-2 underline-offset-8"
            >
              Conhecer soluções
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Formulário — col 8-12 */}
        <div
          id="diagnostico"
          className="section-anchor lg:col-span-5"
        >
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Montar App.tsx provisório para visualizar Header + Hero**

```tsx
// src/App.tsx
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:5173`. Verificar:
- Header com logo e nav visível no desktop
- Hero com overlay verde e formulário visível
- Formulário abre AlertDialog ao submeter com dados válidos
- Mobile: hamburger abre Sheet com nav

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Header and Hero with full-bleed overlay and diagnostic form"
```

---

## Task 7: TrustBar, Solutions e Sectors

**Files:**
- Create: `src/components/TrustBar.tsx`
- Create: `src/components/Solutions.tsx`
- Create: `src/components/Sectors.tsx`

**Interfaces:**
- Produz: `TrustBar()`, `Solutions()`, `Sectors()`
- Consome:
  - `trustItems`, `solutions`, `sectors` de `@/data/site`
  - `SectionHeading` de `@/components/SectionHeading`
  - `ImagePlaceholder` de `@/components/ImagePlaceholder`
  - `Container, Workflow, Wrench, ShieldCheck, ArrowUpRight` de `lucide-react`

- [ ] **Step 1: Criar src/components/TrustBar.tsx**

```tsx
import { trustItems } from '@/data/site'

export function TrustBar() {
  return (
    <section aria-label="Evidências de confiança" className="bg-brand-light text-brand-deep">
      <ul className="section-shell grid gap-px bg-brand-deep/20 py-px md:grid-cols-3">
        {trustItems.map((item) => (
          <li
            key={item.value}
            className="flex flex-col gap-1 bg-brand-light px-5 py-7 md:px-8"
          >
            <strong className="text-xl font-extrabold">{item.value}</strong>
            <span className="text-sm font-semibold opacity-80">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 2: Criar src/components/Solutions.tsx**

```tsx
import { Container, Workflow, Wrench, ShieldCheck, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { solutions } from '@/data/site'

const solutionIcons: readonly LucideIcon[] = [Container, Workflow, Wrench, ShieldCheck]

export function Solutions() {
  return (
    <section
      id="solucoes"
      className="section-anchor bg-background py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Soluções"
            title="Soluções para cada etapa da operação"
            description="A aplicação vem antes da especificação. A Paulim ajuda a identificar o componente, equipamento ou suporte adequado ao contexto."
          />
          <ImagePlaceholder
            label="Mangueiras, válvulas e conexões organizadas para atendimento técnico"
            className="w-full"
            aspectRatio="aspect-[4/3]"
          />
        </div>

        <ol className="border-t border-border">
          {solutions.map((solution, index) => {
            const Icon = solutionIcons[index]
            return (
              <li
                key={solution.title}
                className="grid gap-5 border-b border-border py-8 sm:grid-cols-[auto_1fr] sm:py-10"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.025em] text-foreground">
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

- [ ] **Step 3: Criar src/components/Sectors.tsx**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { sectors } from '@/data/site'

export function Sectors() {
  return (
    <section
      id="setores"
      className="section-anchor bg-card py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Setores atendidos"
            title="Experiência onde a operação exige precisão"
            description="Atendimento técnico para empresas que dependem de disponibilidade, compatibilidade e segurança."
          />
          <ol className="border-t border-border">
            {sectors.map((sector, index) => (
              <li
                key={sector}
                className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-border py-5 reveal-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-bold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-bold text-foreground">{sector}</span>
                <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <ImagePlaceholder
          label="Operação de caminhão-tanque em área logística com contexto regional"
          className="min-h-[28rem] w-full"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Adicionar TrustBar, Solutions, Sectors ao App.tsx**

```tsx
// src/App.tsx
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Solutions } from '@/components/Solutions'
import { Sectors } from '@/components/Sectors'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Solutions />
        <Sectors />
      </main>
    </>
  )
}
```

- [ ] **Step 5: Verificar no browser**

```bash
npm run dev
```

Verificar: TrustBar verde claro com 3 células, Solutions com lista ordenada e ícones, Sectors com lista de setores e animação stagger.

- [ ] **Step 6: Commit**

```bash
git add src/components/TrustBar.tsx src/components/Solutions.tsx src/components/Sectors.tsx src/App.tsx
git commit -m "feat: add TrustBar, Solutions, and Sectors sections"
```

---

## Task 8: Process, About e FAQ

**Files:**
- Create: `src/components/Process.tsx`
- Create: `src/components/About.tsx`
- Create: `src/components/FAQ.tsx`

**Interfaces:**
- Produz: `Process()`, `About()`, `FAQ()`
- Consome:
  - `processSteps`, `faqs` de `@/data/site`
  - `SectionHeading` de `@/components/SectionHeading`
  - `ImagePlaceholder` de `@/components/ImagePlaceholder`
  - `Accordion, AccordionContent, AccordionItem, AccordionTrigger` de `@/components/ui/accordion`
  - `CheckCircle2` de `lucide-react`

- [ ] **Step 1: Criar src/components/Process.tsx**

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
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className="flex min-h-80 flex-col justify-between gap-10 border-b border-primary-foreground/20 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 reveal-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span
                className="font-display font-bold leading-none text-brand-light"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
                aria-hidden="true"
              >
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

- [ ] **Step 2: Criar src/components/About.tsx**

```tsx
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'

const capabilities = [
  'Fabricação e adequação conforme a necessidade',
  'Manutenção e fornecimento de componentes',
  'Orientação técnica antes da decisão',
] as const

export function About() {
  return (
    <section
      id="paulim"
      className="section-anchor bg-background py-20 md:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <ImagePlaceholder
          label="Especialista e gestor avaliando componentes de uma operação com tanque"
          className="min-h-[30rem] w-full"
        />
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="A Paulim"
            title="Engenharia de proximidade"
            description="Conhecimento técnico para operações críticas, com atendimento próximo a quem precisa manter equipamentos, frotas e abastecimento funcionando."
          />
          <p className="leading-8 text-muted-foreground" style={{ textWrap: 'pretty' } as React.CSSProperties}>
            Com base em Marabá e experiência no mercado do Norte, a Paulim reúne
            fabricação, manutenção, peças e orientação para apoiar decisões mais
            seguras e compatíveis com cada aplicação.
          </p>
          <ul className="flex flex-col gap-4" aria-label="Capacidades da Paulim Tanques">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-3 font-semibold text-foreground"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
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

- [ ] **Step 3: Criar src/components/FAQ.tsx**

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
    <section
      id="duvidas"
      className="section-anchor bg-card py-20 md:py-28"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1fr]">
        <SectionHeading
          title="Informação suficiente para começar"
          description="Você não precisa dominar a terminologia técnica para solicitar uma avaliação."
        />
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="min-h-11 text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p
                  className="max-w-2xl leading-7 text-muted-foreground"
                  style={{ textWrap: 'pretty' } as React.CSSProperties}
                >
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

- [ ] **Step 4: Adicionar ao App.tsx**

```tsx
// src/App.tsx
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Solutions } from '@/components/Solutions'
import { Sectors } from '@/components/Sectors'
import { Process } from '@/components/Process'
import { About } from '@/components/About'
import { FAQ } from '@/components/FAQ'

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
      </main>
    </>
  )
}
```

- [ ] **Step 5: Verificar no browser**

```bash
npm run dev
```

Verificar: Process com números grandes em `brand-light` sobre fundo `brand-deep`, About com imagem à esquerda e lista de capacidades, FAQ com accordion funcional.

- [ ] **Step 6: Commit**

```bash
git add src/components/Process.tsx src/components/About.tsx src/components/FAQ.tsx src/App.tsx
git commit -m "feat: add Process, About, and FAQ sections"
```

---

## Task 9: ContactCta, Footer e App.tsx final

**Files:**
- Create: `src/components/ContactCta.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx` (versão final)

**Interfaces:**
- Produz: `ContactCta()`, `Footer()`
- Consome:
  - `navItems`, `contact` de `@/data/site`
  - `Button` de `@/components/ui/button`
  - `Separator` de `@/components/ui/separator`
  - `ArrowRight` de `lucide-react`

- [ ] **Step 1: Criar src/components/ContactCta.tsx**

```tsx
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactCta() {
  return (
    <section className="bg-brand-light py-16 text-brand-deep md:py-20">
      <div className="section-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-70">
            Próximo passo
          </p>
          <h2
            className="font-display font-bold leading-none tracking-[-0.04em] text-brand-deep"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Conte o que sua operação precisa
          </h2>
        </div>
        <Button asChild size="lg" variant="secondary" className="shrink-0">
          <a href="#diagnostico">
            Preencher formulário técnico
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar src/components/Footer.tsx**

```tsx
import { Separator } from '@/components/ui/separator'
import { navItems, contact } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-brand-deep py-14 text-primary-foreground">
      <div className="section-shell flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="flex max-w-sm flex-col gap-5">
            <span className="inline-flex w-fit rounded-lg bg-card p-3">
              <img
                src="/assets/paulim-tanques-logo.png"
                alt="Paulim Tanques"
                className="w-40"
              />
            </span>
            <p className="leading-7 text-primary-foreground/70" style={{ textWrap: 'pretty' } as React.CSSProperties}>
              Soluções técnicas para transporte, abastecimento e operações que
              dependem de segurança e disponibilidade.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <strong className="font-semibold">Navegação</strong>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <strong className="font-semibold">Atendimento</strong>
            <span className="text-primary-foreground/70">{contact.serviceArea}</span>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              WhatsApp: {contact.whatsappLabel}
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

- [ ] **Step 3: Atualizar src/App.tsx para versão final**

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

- [ ] **Step 4: Verificar a página completa no browser**

```bash
npm run dev
```

Verificar em sequência:
- Header sticky ao rolar
- Hero com overlay diagonal e formulário flutuante
- TrustBar verde claro com 3 evidências
- Solutions com sidebar sticky no desktop
- Sectors com lista animada e imagem
- Process com números grandes em brand-light sobre brand-deep
- About com imagem à esquerda e capacidades
- FAQ com accordion funcional
- ContactCta verde claro com botão secundário branco
- Footer verde escuro com logo em card branco
- Mobile: hamburger abre Sheet, formulário empilha abaixo do hero

- [ ] **Step 5: Verificar build de produção sem erros**

```bash
npm run build
```

Esperado: build completo sem erros de TypeScript ou Vite.

- [ ] **Step 6: Commit final**

```bash
git add src/components/ContactCta.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: complete Paulim Tanques landing page — all sections assembled"
```

---

## Self-Review

**Cobertura do spec:**

| Requisito do spec | Task |
|---|---|
| alias `@/` → `./src` | Task 1 |
| tokens OKLCH 4 verdes + superfícies | Task 1 |
| Montserrat Variable | Task 1 |
| `.section-shell`, `.section-anchor`, `.reveal-up` | Task 1 |
| `scroll-behavior: smooth` | Task 1 |
| `prefers-reduced-motion` | Task 1 |
| `lang="pt-BR"`, title, meta description | Task 1 |
| logo copiado para `public/assets/` | Task 1 |
| `cn()` | Task 2 |
| `validateTechnicalRequest`, `buildWhatsAppUrl` | Task 2 |
| todos os dados estáticos | Task 2 |
| todos os componentes UI shadcn | Task 3 |
| `Spinner`, `Field*` | Task 3 |
| `ImagePlaceholder` com `role="img"` e `aria-label` | Task 4 |
| `SectionHeading` com eyebrow opcional e prop `inverse` | Task 4 |
| `TechnicalRequestForm` com fluxo completo WhatsApp | Task 5 |
| `Header` sticky com Sheet mobile | Task 6 |
| `Hero` full-bleed overlay diagonal + formulário flutuante | Task 6 |
| `TrustBar` verde claro 3 células | Task 7 |
| `Solutions` lista ordenada sticky sidebar | Task 7 |
| `Sectors` stagger animation | Task 7 |
| `Process` brand-deep com números brand-light | Task 8 |
| `About` imagem + capacidades | Task 8 |
| `FAQ` accordion | Task 8 |
| `ContactCta` brand-light botão secundário | Task 9 |
| `Footer` brand-deep logo em card | Task 9 |
| `App.tsx` completo | Task 9 |
| build sem erros | Task 9 |

**Placeholder scan:** nenhum TBD, TODO, ou "similar to Task N" encontrado. Todos os steps têm código completo.

**Type consistency:**
- `TechnicalRequest` definido em Task 2, consumido com mesmo nome em Task 5 ✓
- `validateTechnicalRequest` retorna `TechnicalRequestErrors = Partial<Record<keyof TechnicalRequest, string>>` — usado como `ValidationErrors` em Task 5 via `ReturnType<typeof validateTechnicalRequest>` ✓
- `navItems`, `trustItems`, `solutions`, `sectors`, `processSteps`, `faqs`, `contact` definidos em Task 2, consumidos com mesmos nomes em Tasks 7–9 ✓
- `SectionHeading` props: `eyebrow?`, `title`, `description?`, `inverse?`, `className?` — usados consistentemente em Tasks 7–9 ✓
- `ImagePlaceholder` props: `label`, `className?`, `aspectRatio?` — usados consistentemente em Tasks 6–8 ✓
