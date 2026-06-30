# Paulim Tanques — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Paulim Tanques landing page to match the commercial spec: updated copy, real stock images replacing all ImagePlaceholders, asymmetric Solutions layout, 5 sectors (adding Fazendas), updated differentials, and a stronger visual identity — production-ready, no placeholders.

**Architecture:** All data lives in `src/data/site.ts`; components consume it. Images live in `public/assets/` and are referenced via `/assets/<name>`. The existing design system (Tailwind + OKLCH tokens in `src/index.css`) is preserved — no new tokens needed. No new dependencies required.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Vite, shadcn/ui (Radix primitives), Lucide icons, `@fontsource-variable/montserrat`

## Global Constraints

- Preserve all four brand green tokens exactly: `--brand-light`, `--brand-mid`, `--brand-dark`, `--brand-deep`
- All text on `brand-deep` backgrounds must pass WCAG AA (≥4.5:1 for body, ≥3:1 for large/bold)
- No gradient text, no side-stripe borders, no glassmorphism, no identical card grids
- Eyebrows (small uppercase tracked labels) are removed from sections where they repeat as scaffolding — kept only where they carry deliberate voice
- Numbered markers (01/02/03) replaced with styled circles in Process — it is a genuine sequence, numbers earn their place
- `prefers-reduced-motion` alternatives required for all animations
- All images must have descriptive `alt` text in Portuguese
- `ImagePlaceholder` component is kept as fallback — do not delete it
- Form logic (`TechnicalRequestForm`) is untouched — only visual/layout tweaks allowed
- WhatsApp number stays as-is in `src/lib/technical-request.ts`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/site.ts` | Modify | Update trustItems, productCategories, equipmentItems, sectors (5), processSteps, faqs, differentials |
| `src/lib/technical-request.ts` | Modify | Add Fazendas to segments, align with 5 sectors |
| `src/components/Hero.tsx` | Modify | Real stock image, evidence line replaces eyebrow, updated subtitle |
| `src/components/TrustBar.tsx` | Modify | Updated values, semantic `<dl>`, better icons |
| `src/components/Solutions.tsx` | Rewrite | Two-tier: 2 large product cards (brand-deep) + 3 compact equipment items |
| `src/components/Sectors.tsx` | Rewrite | 5 sectors with real images, asymmetric featured layout |
| `src/components/About.tsx` | Modify | Updated differentials copy, real stock image, no SectionHeading eyebrow |
| `src/components/Process.tsx` | Modify | Numbered circles replace text markers, remove eyebrow |
| `src/index.css` | Modify | Add scroll-reveal keyframes + `.reveal` / `.reveal.is-visible` utility |
| `src/main.tsx` | Modify | Add IntersectionObserver bootstrap for `.reveal` elements |
| `public/assets/` | Add | 7 stock images: hero-bg, about-team, sector-farm, sector-fuel-station, sector-industry, sector-aviation, sector-business |

---

## Task 1: Update site data

**Files:**
- Modify: `src/data/site.ts`

**Interfaces:**
- Produces: `trustItems` (3), `productCategories` (2 with models/volumes), `equipmentItems` (3), `sectors` (5 with imageSrc/imageAlt), `processSteps` (3), `faqs` (4), `differentials` (5)

- [ ] **Step 1: Replace src/data/site.ts**

Open `src/data/site.ts` and replace the entire file with:

```typescript
import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export const navItems = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Setores', href: '#setores' },
  { label: 'A Paulim', href: '#sobre' },
  { label: 'Dúvidas', href: '#faq' },
] as const

export const trustItems = [
  { value: '15 anos', label: 'de experiência técnica' },
  { value: '400+ projetos', label: 'entregues no Norte do Brasil' },
  { value: 'Entrega direta', label: 'até o cliente em toda a região' },
] as const

export const productCategories = [
  {
    title: "Caixas d'Água",
    description:
      "Taça Cheia, Taça Vazia e Tubular. Volumes de 10.000 L a 50.000 L, com fabricação sob medida para instalações rurais, industriais e comerciais.",
    models: ['Taça Cheia', 'Taça Vazia', 'Tubular'],
  },
  {
    title: 'Tanques Estacionários',
    description:
      'Para armazenamento de diesel, gasolina, etanol, combustível de aviação e outros líquidos. Disponíveis bipartidos para dois produtos no mesmo tanque.',
    models: ['Tanque simples', 'Tanque bipartido'],
  },
] as const

export const equipmentItems = [
  {
    title: 'Bombas e Bicos',
    description: 'Bombas completas e bicos calibrados para abastecimento preciso e seguro.',
  },
  {
    title: 'Mangueiras e Conexões',
    description: 'Soluções de sucção, descarga, vedação e acoplamento para cada aplicação.',
  },
  {
    title: 'Peças e Acessórios',
    description: 'Itens compatíveis para manutenção, reposição e adequação de caminhões-tanque.',
  },
] as const

export const sectors = [
  {
    label: 'Fazendas',
    description: 'Armazenamento de insumos, defensivos e combustíveis para operações rurais de grande escala.',
    imageSrc: '/assets/sector-farm.jpg',
    imageAlt: 'Tanque de combustível instalado em fazenda do agronegócio',
  },
  {
    label: 'Postos e Distribuidoras',
    description: 'Tanques e equipamentos para abastecimento seguro e confiável de frotas e consumidores.',
    imageSrc: '/assets/sector-fuel-station.jpg',
    imageAlt: 'Posto de combustível com tanques instalados',
  },
  {
    label: 'Indústrias',
    description: 'Reservatórios e acessórios para processos industriais que exigem precisão e durabilidade.',
    imageSrc: '/assets/sector-industry.jpg',
    imageAlt: 'Instalação industrial com tanque estacionário',
  },
  {
    label: 'Transporte e Aviação',
    description: 'Soluções de alta performance para frotas de caminhões-tanque e operações aeroportuárias.',
    imageSrc: '/assets/sector-aviation.jpg',
    imageAlt: 'Abastecimento de aeronave com equipamento especializado',
  },
  {
    label: 'Empresas em Geral',
    description: 'Atendimento a qualquer operação que necessite de armazenamento ou transporte de líquidos.',
    imageSrc: '/assets/sector-business.jpg',
    imageAlt: 'Frota de caminhões-tanque em operação empresarial',
  },
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Envie o contexto',
    description:
      'Informe operação, segmento e necessidade, mesmo sem conhecer o nome técnico da peça ou o volume exato.',
  },
  {
    number: '02',
    title: 'Receba uma análise',
    description:
      'Um especialista organiza as informações e identifica o equipamento, volume e configuração adequados.',
  },
  {
    number: '03',
    title: 'Avance com segurança',
    description:
      'A Paulim recomenda a solução, elabora o orçamento e cuida da entrega até o local de instalação.',
  },
] as const

export const faqs = [
  {
    question: 'Preciso saber o nome exato da peça ou o volume do tanque?',
    answer:
      'Não. Descreva a aplicação, o equipamento e o problema percebido. Um especialista identifica o que você precisa e solicita as medidas ou fotos necessárias na conversa.',
  },
  {
    question: 'A Paulim fabrica tanques sob medida?',
    answer:
      "Sim. Tanques estacionários e caixas d'água são fabricados nos volumes e configurações que a sua operação exige, incluindo modelos bipartidos para dois produtos diferentes.",
  },
  {
    question: 'A Paulim entrega fora de Marabá?',
    answer:
      'Sim. Atendemos toda a região Norte e demais estados conforme demanda. A entrega é feita diretamente até o cliente, incluindo fazendas e áreas rurais.',
  },
  {
    question: 'Quais segmentos podem solicitar atendimento?',
    answer:
      'Fazendas, postos e distribuidoras, indústrias, transporte, aviação e empresas em geral que operam com armazenamento ou transporte de líquidos.',
  },
] as const

export const differentials = [
  'Mais de 15 anos de experiência técnica no setor',
  'Mais de 400 projetos entregues na região Norte',
  "Fabricação sob medida: tanques simples e bipartidos",
  'Entrega direta até o cliente, incluindo área rural',
  'Consultoria técnica antes da venda e suporte pós-entrega',
] as const

export const contact = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLabel: '(94) 99999-9999',
  serviceArea: 'Marabá, Pará — Norte do Brasil',
} as const
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors. If components still import old exports like `solutions` or `sectors` without the new shape, those will be fixed in later tasks.

- [ ] **Step 3: Commit**

```powershell
git add src/data/site.ts
git commit -m "feat(data): update site content — 5 sectors, product categories, equipment, differentials"
```

---

## Task 2: Update segments in technical-request

**Files:**
- Modify: `src/lib/technical-request.ts`

**Interfaces:**
- Produces: `segments` array with 6 values — Fazendas added, order matches sectors

- [ ] **Step 1: Replace segments array**

Open `src/lib/technical-request.ts`. Find and replace just the `segments` constant:

```typescript
export const segments = [
  'Fazendas',
  'Postos e distribuidoras',
  'Indústrias',
  'Transporte e aviação',
  'Empresas em geral',
  'Outro',
] as const
```

Leave everything else in the file unchanged.

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors. `Segment` type derives from the array automatically.

- [ ] **Step 3: Commit**

```powershell
git add src/lib/technical-request.ts
git commit -m "feat(form): add Fazendas segment, align with 5 sectors"
```

---

## Task 3: Download stock images

**Files:**
- Add: `public/assets/hero-bg.jpg`
- Add: `public/assets/about-team.jpg`
- Add: `public/assets/sector-farm.jpg`
- Add: `public/assets/sector-fuel-station.jpg`
- Add: `public/assets/sector-industry.jpg`
- Add: `public/assets/sector-aviation.jpg`
- Add: `public/assets/sector-business.jpg`

**Interfaces:**
- Produces: 7 image files in `public/assets/` referenced by Hero, About, Sectors

- [ ] **Step 1: Download all images**

Run each command. If a URL returns an error or produces a file smaller than 30KB, use the alternate listed below.

```powershell
# Hero — industrial tank truck operation
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80" -OutFile "public/assets/hero-bg.jpg"

# About — technical team with equipment
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" -OutFile "public/assets/about-team.jpg"

# Sector: Fazendas — farm with fuel tank
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80" -OutFile "public/assets/sector-farm.jpg"

# Sector: Postos — fuel station
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80" -OutFile "public/assets/sector-fuel-station.jpg"

# Sector: Industrias — industrial facility
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" -OutFile "public/assets/sector-industry.jpg"

# Sector: Aviacao — airport/aircraft
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" -OutFile "public/assets/sector-aviation.jpg"

# Sector: Empresas — truck fleet
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" -OutFile "public/assets/sector-business.jpg"
```

- [ ] **Step 2: Verify all files exist and are non-trivial**

```powershell
Get-ChildItem public/assets/ | Select-Object Name, @{N='SizeKB';E={[int]($_.Length/1KB)}} | Sort-Object Name
```

Expected: 7 new files each ≥ 30KB. If any file is < 30KB it likely 404'd — re-download with an alternate URL from the fallback list below.

**Fallback URLs (use if primary fails):**
- hero-bg: `https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80`
- about-team: `https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80`
- sector-farm: `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80`
- sector-fuel-station: `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80`
- sector-industry: `https://images.unsplash.com/photo-1565793379740-2c8a1de90b5a?auto=format&fit=crop&w=800&q=80`
- sector-aviation: `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80`
- sector-business: `https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80`

- [ ] **Step 3: Commit**

```powershell
git add public/assets/hero-bg.jpg public/assets/about-team.jpg public/assets/sector-farm.jpg public/assets/sector-fuel-station.jpg public/assets/sector-industry.jpg public/assets/sector-aviation.jpg public/assets/sector-business.jpg
git commit -m "feat(assets): add stock images for hero, about, and 5 sectors"
```

---

## Task 4: Update Hero section

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `public/assets/hero-bg.jpg` (Task 3)
- Produces: Hero with real background image, evidence line instead of eyebrow, updated subtitle

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire file with:

```tsx
import { CheckCircle2, ArrowDown } from 'lucide-react'
import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

export function Hero() {
  return (
    <section
      id="inicio"
      className="section-anchor relative min-h-svh overflow-hidden"
    >
      {/* Background image */}
      <img
        src="/assets/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Overlay — heavy on left (text), lighter on right (form) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(115deg, oklch(0.32 0.10 145 / 0.96) 0%, oklch(0.32 0.10 145 / 0.88) 48%, oklch(0.32 0.10 145 / 0.60) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 section-shell flex min-h-svh flex-col gap-10 py-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
        {/* Headline column */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Evidence line — concrete data, not a generic label */}
          <p className="text-sm font-semibold text-primary-foreground/70">
            Mais de 400 projetos entregues · 15 anos no Norte do Brasil
          </p>

          {/* H1 */}
          <h1
            className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Soluções técnicas para operações que não podem parar.
          </h1>

          {/* Subtitle */}
          <p className="max-w-[52ch] text-lg leading-8 text-primary-foreground/80">
            Fabricação, manutenção e fornecimento de tanques, caixas d'água e
            equipamentos para transporte e abastecimento em toda a região Norte.
          </p>

          {/* Proof points */}
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
        </div>

        {/* Form column */}
        <div id="diagnostico" className="section-anchor lg:col-span-5">
          <TechnicalRequestForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Hero.tsx
git commit -m "feat(hero): real background image, evidence line, updated subtitle"
```

---

## Task 5: Update TrustBar

**Files:**
- Modify: `src/components/TrustBar.tsx`

**Interfaces:**
- Consumes: `trustItems` (3 items: 15 anos, 400+ projetos, Entrega direta) from Task 1
- Produces: TrustBar with semantic `<dl>`, updated icons, correct values

- [ ] **Step 1: Rewrite TrustBar.tsx**

Replace the entire file with:

```tsx
import { Clock, PackageCheck, Truck } from 'lucide-react'
import { trustItems } from '@/data/site'

const icons = [Clock, PackageCheck, Truck]

export function TrustBar() {
  return (
    <section aria-label="Credenciais da Paulim Tanques" className="bg-brand-deep py-10">
      <div className="section-shell">
        <dl className="flex flex-wrap items-start justify-center gap-10 sm:gap-16">
          {trustItems.map((item, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-5 text-brand-light" aria-hidden="true" />
                <dt className="text-2xl font-extrabold text-primary-foreground leading-none">
                  {item.value}
                </dt>
                <dd className="text-xs text-primary-foreground/60 max-w-[18ch] leading-snug">
                  {item.label}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/TrustBar.tsx
git commit -m "feat(trustbar): 400+ projects, delivery credential, semantic dl, updated icons"
```

---

## Task 6: Rewrite Solutions section

**Files:**
- Modify: `src/components/Solutions.tsx`

**Interfaces:**
- Consumes: `productCategories` (2 items with title, description, models) from Task 1
- Consumes: `equipmentItems` (3 items with title, description) from Task 1
- Produces: Two-tier layout — 2 large brand-deep product cards + 3 compact equipment items below a divider

- [ ] **Step 1: Rewrite Solutions.tsx**

Replace the entire file with:

```tsx
import { Cylinder, Droplets, Gauge, Cable, Wrench } from 'lucide-react'
import { productCategories, equipmentItems } from '@/data/site'

const productIcons = [Cylinder, Droplets]
const equipmentIcons = [Gauge, Cable, Wrench]

export function Solutions() {
  return (
    <section id="solucoes" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        {/* Header — no eyebrow */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Do tanque à entrega: soluções para toda a cadeia de abastecimento.
          </h2>
          <p className="text-base leading-7 text-muted-foreground max-w-[60ch]">
            Fabricamos, fornecemos e mantemos. Cada produto é dimensionado para a
            sua operação — com orientação técnica antes da compra.
          </p>
        </div>

        {/* Tier 1 — 2 main product categories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {productCategories.map((cat, index) => {
            const Icon = productIcons[index]
            return (
              <div
                key={cat.title}
                className="rounded-2xl bg-brand-deep p-8 flex flex-col gap-5"
              >
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-brand-dark/40 p-3 shrink-0">
                    <Icon className="size-6 text-brand-light" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-primary-foreground leading-tight mt-1.5">
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
              </div>
            )
          })}
        </div>

        {/* Tier 2 — Equipment items, compact, below divider */}
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
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors. (The old `solutions` export is no longer used.)

- [ ] **Step 3: Commit**

```powershell
git add src/components/Solutions.tsx
git commit -m "feat(solutions): two-tier layout — product categories on brand-deep + compact equipment items"
```

---

## Task 7: Rewrite Sectors section

**Files:**
- Modify: `src/components/Sectors.tsx`

**Interfaces:**
- Consumes: `sectors` (5 items: label, description, imageSrc, imageAlt) from Task 1
- Consumes: stock images in `public/assets/sector-*.jpg` from Task 3
- Produces: Asymmetric layout — first sector large (featured), remaining 4 in 2×2 grid

- [ ] **Step 1: Rewrite Sectors.tsx**

Replace the entire file with:

```tsx
import { sectors } from '@/data/site'

export function Sectors() {
  return (
    <section id="setores" className="section-anchor bg-brand-deep py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-primary-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Especialistas nos setores que mais dependem de confiabilidade.
          </h2>
          <p className="text-base leading-7 text-primary-foreground/70 max-w-[58ch]">
            Atendemos do posto ao aeroporto, da fazenda à indústria — sempre com
            orientação técnica e entrega direta.
          </p>
        </div>

        {/* Layout: featured (left) + 2×2 grid (right) on desktop */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Featured — first sector (Fazendas) */}
          <div className="relative overflow-hidden rounded-2xl min-h-[320px] lg:min-h-[420px]">
            <SectorImg src={sectors[0].imageSrc} alt={sectors[0].imageAlt} />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-lg font-bold text-primary-foreground">{sectors[0].label}</h3>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/75 max-w-[38ch]">
                {sectors[0].description}
              </p>
            </div>
          </div>

          {/* 2×2 grid — remaining 4 sectors */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sectors.slice(1).map((sector) => (
              <div key={sector.label} className="relative overflow-hidden rounded-2xl min-h-[190px]">
                <SectorImg src={sector.imageSrc} alt={sector.imageAlt} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/88 via-brand-deep/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold text-primary-foreground">{sector.label}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-primary-foreground/70">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectorImg({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {/* Fallback color — always visible behind the image */}
      <div className="absolute inset-0 bg-brand-dark/40" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Sectors.tsx
git commit -m "feat(sectors): 5 sectors with real images, featured Fazendas + 2x2 grid"
```

---

## Task 8: Update About section

**Files:**
- Modify: `src/components/About.tsx`

**Interfaces:**
- Consumes: `differentials` (5 strings) from Task 1
- Consumes: `public/assets/about-team.jpg` from Task 3
- Produces: Updated About with stock image and no SectionHeading component (inline h2 for consistency)

- [ ] **Step 1: Rewrite About.tsx**

Replace the entire file with:

```tsx
import { CheckCircle2 } from 'lucide-react'
import { differentials } from '@/data/site'

export function About() {
  return (
    <section id="sobre" className="section-anchor bg-secondary py-20 lg:py-28">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2
              className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
            >
              Engenharia de proximidade desde 2009.
            </h2>
            <p className="text-base leading-7 text-muted-foreground max-w-[58ch]">
              Há mais de 15 anos a Paulim Tanques fabrica, fornece e mantém
              soluções para quem opera com tanques e equipamentos de abastecimento
              no Norte do Brasil. Mais de 400 projetos entregues — do posto à
              fazenda, da indústria ao aeroporto.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {differentials.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-brand-dark shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image column */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-dark/10">
          <img
            src="/assets/about-team.jpg"
            alt="Equipe técnica Paulim Tanques trabalhando com equipamentos industriais"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
            }}
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/About.tsx
git commit -m "feat(about): real team image, 5 updated differentials, inline h2"
```

---

## Task 9: Update Process section

**Files:**
- Modify: `src/components/Process.tsx`

**Interfaces:**
- Consumes: `processSteps` (3 items: number, title, description) from Task 1
- Produces: Process without eyebrow, numbered circles instead of large text numbers, connecting line on desktop

- [ ] **Step 1: Rewrite Process.tsx**

Replace the entire file with:

```tsx
import { processSteps } from '@/data/site'

export function Process() {
  return (
    <section id="processo" className="section-anchor py-20 lg:py-28">
      <div className="section-shell flex flex-col gap-14">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Do diagnóstico à entrega: um processo pensado para não travar sua operação.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {processSteps.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Circle + connector */}
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-deep text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <div
                    className="hidden sm:block h-px flex-1 bg-brand-dark/25"
                    aria-hidden="true"
                  />
                )}
              </div>
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Process.tsx
git commit -m "feat(process): numbered circles with connector line, remove eyebrow, updated copy"
```

---

## Task 10: Add scroll-reveal animation

**Files:**
- Modify: `src/index.css`
- Modify: `src/main.tsx`
- Modify: `src/components/Solutions.tsx` (add `reveal` class to h2)
- Modify: `src/components/Sectors.tsx` (add `reveal` class to h2)
- Modify: `src/components/About.tsx` (add `reveal` class to h2)
- Modify: `src/components/Process.tsx` (add `reveal` class to h2)
- Modify: `src/components/TrustBar.tsx` (add `reveal` class to `<dl>`)

**Interfaces:**
- Produces: `.reveal` class + `IntersectionObserver` that adds `.is-visible` when elements enter viewport; respects `prefers-reduced-motion`

- [ ] **Step 1: Add reveal CSS to index.css**

Open `src/index.css`. Append the following before the end of the file (after the `@media (prefers-reduced-motion: reduce)` block):

```css
/* Scroll reveal */
@keyframes reveal-fade-up {
  from {
    opacity: 0;
    translate: 0 1.25rem;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

.reveal {
  opacity: 0;
}

.reveal.is-visible {
  animation: reveal-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.is-visible {
    opacity: 1 !important;
    animation: none !important;
  }
}
```

- [ ] **Step 2: Add IntersectionObserver to main.tsx**

Open `src/main.tsx`. After the import lines and before the `ReactDOM.createRoot(...)` call, insert:

```typescript
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal)
} else {
  initReveal()
}
```

- [ ] **Step 3: Add `reveal` class to section h2 elements**

In each of these files, add `reveal` to the `className` of the `<h2>` element:

**src/components/Solutions.tsx** — the h2 becomes:
```tsx
<h2
  className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
>
```

**src/components/Sectors.tsx** — the h2 becomes:
```tsx
<h2
  className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-primary-foreground"
  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
>
```

**src/components/About.tsx** — the h2 becomes:
```tsx
<h2
  className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
>
```

**src/components/Process.tsx** — the h2 becomes:
```tsx
<h2
  className="reveal font-display font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance' } as React.CSSProperties}
>
```

**src/components/TrustBar.tsx** — the `<dl>` becomes:
```tsx
<dl className="reveal flex flex-wrap items-start justify-center gap-10 sm:gap-16">
```

- [ ] **Step 4: Verify TypeScript**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```powershell
git add src/index.css src/main.tsx src/components/Solutions.tsx src/components/Sectors.tsx src/components/About.tsx src/components/Process.tsx src/components/TrustBar.tsx
git commit -m "feat(animation): scroll reveal on section headings, prefers-reduced-motion safe"
```

---

## Task 11: Final QA pass

**Files:** No changes — verification only.

- [ ] **Step 1: Start dev server**

```powershell
npm run dev
```

Open `http://localhost:5173`.

- [ ] **Step 2: Desktop QA (1280px+)**

- [ ] Hero: background image visible, overlay legible, h1 large and readable, form visible, no horizontal overflow
- [ ] TrustBar: 3 items (15 anos, 400+ projetos, Entrega direta) with icons
- [ ] Solutions: 2 large green cards on brand-deep (Caixas d'Água, Tanques Estacionários) + 3 equipment items below divider
- [ ] Sectors: Fazendas featured on left, 4 sectors in 2×2 grid on right, images load
- [ ] About: team image right, 5 checkmark differentials on left
- [ ] Process: 3 numbered circles with connecting lines, no eyebrow label
- [ ] FAQ: 4 updated questions in accordion
- [ ] ContactCta: brand-deep background, centered CTA
- [ ] Footer: logo, nav (4 links), contact info

- [ ] **Step 3: Mobile QA (375px)**

- [ ] Hero: h1 readable (clamp ensures ≥2.6rem), no word overflow, form stacks below headline
- [ ] TrustBar: items wrap cleanly
- [ ] Solutions: 2 product cards stacked full-width; 3 equipment items stacked
- [ ] Sectors: all 5 sectors in single column, images fill width
- [ ] Process: 3 steps single column, connecting line hidden
- [ ] No horizontal scroll at any point

- [ ] **Step 4: Form smoke test**

Fill: Nome="Teste", Empresa="Empresa Teste", Telefone="(94) 99999-9999", Segmento="Fazendas", Descrição="Preciso de um tanque de 10.000L para diesel." → Submit → confirm dialog shows "Fazendas" → click "Abrir WhatsApp" → WhatsApp URL opens with pre-filled message.

- [ ] **Step 5: Scroll-reveal smoke test**

Scroll slowly from top to bottom. Section h2 elements should fade+slide up as they enter viewport. If prefers-reduced-motion is enabled in OS settings, all sections should be visible immediately with no animation.

- [ ] **Step 6: Stop dev server and commit QA note**

```powershell
# Stop: Ctrl+C
git commit --allow-empty -m "chore: QA pass complete — landing page ready for review"
```

---

## Self-Review

**Spec coverage:**
- ✅ Layout limpo e moderno — rewritten Solutions, Sectors, Process, About with no generic card grids
- ✅ Navegação organizada — header unchanged (already clean)
- ✅ Imagens profissionais — 7 stock images (Task 3); Hero, About, Sectors all use real images
- ✅ Responsivo — all grids collapse on mobile, Process hides connector line, form stacks
- ✅ Mais de 15 anos de mercado — TrustBar, About paragraph
- ✅ Mais de 400 projetos entregues — TrustBar value, About paragraph
- ✅ Fabricação sob medida — differentials, productCategories, Hero subtitle
- ✅ Entrega até o cliente — TrustBar, differentials, processSteps[2]
- ✅ Caixas d'água (Taça Cheia, Vazia, Tubular) — productCategories[0]
- ✅ Tanques estacionários — productCategories[1]
- ✅ Tanque bipartido — productCategories[1].description, differentials
- ✅ Fazendas como setor — sectors[0], segments in form
- ✅ 5 segmentos corretos — sectors array, technical-request.ts segments

**Deferred (out of scope for this plan):**
- Wizard de orçamento em etapas (Etapas 1–4 do spec)
- Google Maps para localização
- Google Sheets / N8N integration
- Catálogo com gating de dados
- Google Analytics 4 / Tag Manager
- Galeria de projetos entregues
