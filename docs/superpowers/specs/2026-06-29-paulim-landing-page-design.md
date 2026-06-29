# Spec: Paulim Tanques — Landing Page (redesign do zero)

**Data:** 2026-06-29
**Registro:** brand
**Stack:** React 19 + Vite 8 + Tailwind v4 + shadcn + @base-ui/react + Montserrat Variable

---

## Objetivo

Reconstruir a landing page da Paulim Tanques do zero, sem referência ao código anterior. Fonte única de verdade: `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/context/logo.png` e `docs/context/lp-referencia.png` (hierarquia comercial, não identidade visual).

O objetivo da página é iniciar uma conversa técnica qualificada. A ação principal é o preenchimento do formulário de diagnóstico técnico, que gera uma mensagem WhatsApp pré-formatada para um especialista.

---

## Arquitetura de arquivos

```
src/
  App.tsx                          — composição das seções em ordem
  index.css                        — tokens, reset, utilitários, motion
  main.tsx                         — entry point (sem alteração)
  data/
    site.ts                        — navItems, trustItems, solutions, sectors, processSteps, faqs, contact
  lib/
    technical-request.ts           — TechnicalRequest type, validação, buildWhatsAppUrl, WHATSAPP_NUMBER
    utils.ts                       — cn()
  components/
    Header.tsx
    Hero.tsx
    TrustBar.tsx
    Solutions.tsx
    Sectors.tsx
    Process.tsx
    About.tsx
    FAQ.tsx
    ContactCta.tsx
    Footer.tsx
    SectionHeading.tsx
    ImagePlaceholder.tsx
    TechnicalRequestForm.tsx
    ui/
      button.tsx
      input.tsx
      textarea.tsx
      select.tsx
      field.tsx
      alert.tsx
      alert-dialog.tsx
      accordion.tsx
      sheet.tsx
      separator.tsx
      spinner.tsx
```

---

## Sistema visual

### Paleta (OKLCH)

```css
--brand-light: oklch(0.68 0.17 130);   /* #6AB42D — acento, TrustBar, CTA bg, números do processo */
--brand-mid:   oklch(0.64 0.16 145);   /* #3DAA34 — ícones, indicadores */
--brand-dark:  oklch(0.51 0.15 145);   /* #0D8336 — primary, botões, links ativos */
--brand-deep:  oklch(0.32 0.10 145);   /* #065320 — hero overlay, Process bg, Footer bg */
--background:  oklch(0.98 0.005 130);  /* mineral levemente verde — fundo padrão */
--foreground:  oklch(0.17 0.03 145);   /* grafite escuro */
--card:        oklch(1 0 0);           /* branco puro — formulário, cards */
--muted:       oklch(0.94 0.01 130);   /* secundário claro */
--muted-foreground: oklch(0.45 0.03 145);
--border:      oklch(0.88 0.02 130);
--destructive: oklch(0.58 0.22 27);
```

Tokens de marca expostos em `@theme inline` para uso como classes Tailwind:
`bg-brand-light`, `bg-brand-dark`, `bg-brand-deep`, `text-brand-light`, `text-brand-deep`, etc.

### Tipografia

- **Família:** Montserrat Variable (`@fontsource-variable/montserrat`)
- **--font-sans / --font-heading / --font-display:** todos Montserrat Variable com fallback Arial, sans-serif
- **Display (h1 hero):** 800, `clamp(2.5rem, 5vw, 5rem)`, `leading-[0.95]`, `tracking-[-0.04em]`, `text-balance`
- **Headline (h2 seções):** 700, `clamp(2rem, 4vw, 3rem)`, `leading-[1.02]`, `tracking-[-0.035em]`, `text-balance`
- **Title (h3 itens):** 700, `text-2xl`, `tracking-[-0.025em]`
- **Body:** 400/500, `text-base leading-7`, `max-w-[65ch]`
- **Label/eyebrow:** 700, `text-sm uppercase tracking-[0.16em]` — usado com parcimônia, apenas em labels curtos e deliberados
- `text-wrap: balance` em h1–h2; `text-wrap: pretty` em parágrafos longos

### Elevação

Flat por padrão. Sombra apenas no card do formulário hero (`shadow-2xl`) e em hover de elementos interativos (`hover:shadow-md`). Sem glassmorphism, sem gradiente em texto.

### Motion

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal-up {
  animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

`IntersectionObserver` em `Hero h1`, cards do `Process`, e itens da lista de `Sectors`. Classe `.reveal-up` adicionada via `data-reveal` + observer em `App.tsx` ou inline em cada componente.

### Utilitários CSS

```css
.section-shell   { mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 }
.section-anchor  { scroll-margin-top: 6rem }
.safe-copy       { overflow-wrap: anywhere }
```

---

## Componentes

### `index.html`
- `lang="pt-BR"`
- `<title>Paulim Tanques — Soluções técnicas para operações que não podem parar</title>`
- `<meta name="description">` com copy da proposta de valor

### `ImagePlaceholder`

```tsx
interface ImagePlaceholderProps {
  label: string        // descrição do que vai ali
  className?: string
  aspectRatio?: string // ex: "aspect-[4/3]", "aspect-video"
}
```

Renderiza `div` com:
- `bg-brand-dark/15 border border-brand-dark/25 rounded-xl`
- Ícone `ImageIcon` (Lucide) centralizado em `text-brand-dark/40`
- Label em `text-sm text-muted-foreground text-center`
- Aceita `className` para tamanho (ex: `min-h-[30rem] w-full`)

### `SectionHeading`

```tsx
interface SectionHeadingProps {
  eyebrow?: string     // opcional — só onde faz sentido narrativo
  title: string
  description?: string
  inverse?: boolean    // texto branco para seções escuras
}
```

- `eyebrow`: `text-sm font-bold uppercase tracking-[0.16em]` em `text-primary` ou `text-primary-foreground/70`
- `h2`: font-display, escala headline, `text-balance`
- Sem eyebrow em seções onde o contexto visual já é claro (ex: FAQ, CTA)

### `Header`

- Sticky `top-0 z-40`
- Fundo: `bg-background/95 backdrop-blur-sm border-b`
- Altura: `min-h-16`
- Logo: `<img src="/assets/paulim-tanques-logo.png" className="h-9 w-auto object-contain" />`
  - **Nota:** copiar `docs/context/logo.png` para `public/assets/paulim-tanques-logo.png`
- Nav desktop: links ghost — Soluções, Setores, A Paulim, Dúvidas
- CTA desktop: `Button` primário → `href="#diagnostico"`, texto "Falar com especialista", ícone `MessageCircle`
- Mobile: `Sheet` com hamburger — mesmo nav + CTA dentro

### `Hero`

Primeira dobra. `min-h-svh`. `id="inicio"`.

**Estrutura:**

```
<section> — position: relative, overflow-hidden, min-h-svh
  <ImagePlaceholder>          — position absolute, inset-0, z-0
  <div overlay>               — position absolute, inset-0, z-10
                                gradiente diagonal:
                                brand-deep/90 (canto inferior-esquerdo)
                                → brand-deep/40 (canto superior-direito)
  <div content-shell>         — position relative, z-20, section-shell
                                grid 12 colunas desktop
    <div manchete>            — col-span-7, alinhado ao bottom do hero
      <p eyebrow>             — "Especialista desde o início"
      <h1>                    — "Soluções técnicas para operações que não podem parar."
      <p subtítulo>           — "Peças, equipamentos e suporte especializado..."
      <div proofs>            — ✓ 15 anos · link âncora "Conhecer soluções ↓"
    <div formulário>          — col-span-5, card branco, shadow-2xl, rounded-2xl
      id="diagnostico"        — section-anchor
      <TechnicalRequestForm />
```

**Mobile:** coluna única. Manchete ocupa viewport inicial. Formulário desce como bloco separado abaixo, ainda com `id="diagnostico"`.

**Overlay:** `background: linear-gradient(135deg, oklch(0.32 0.10 145 / 0.90) 0%, oklch(0.32 0.10 145 / 0.40) 100%)`

### `TrustBar`

- Fundo `bg-brand-light`, texto `text-brand-deep`
- Grid 3 colunas, `gap-px bg-brand-deep/20 py-px` (divisores entre células)
- Cada célula: `bg-brand-light px-5 py-7` (ou `md:px-8`)
- Valor: `text-xl font-extrabold`
- Label: `text-sm font-semibold opacity-80`
- Dados: `trustItems` de `data/site.ts`

### `Solutions`

- Fundo `bg-background` (mineral)
- `id="solucoes"`, `section-anchor`
- Grid `lg:grid-cols-[0.9fr_1.1fr]` com `items-start`
- **Esquerda (sticky `lg:top-28`):** `SectionHeading` + `ImagePlaceholder` `aspect-[4/3]`
- **Direita:** `<ol>` com 4 itens, `border-t`
- Cada item: `grid sm:grid-cols-[auto_1fr]`, `border-b py-8 sm:py-10`
  - Ícone `48×48` em `bg-secondary text-primary rounded-lg`
  - Número `01–04` em `text-xs font-bold tracking-[0.16em] text-muted-foreground`
  - `h3` title
  - `p` description em `text-muted-foreground leading-7`
- Ícones: `Container`, `Workflow`, `Wrench`, `ShieldCheck` (Lucide)

### `Sectors`

- Fundo `bg-card` (branco)
- `id="setores"`, `section-anchor`
- Grid `lg:grid-cols-2` com `items-center`
- **Esquerda:** `SectionHeading` + `<ol>` de 4 setores
- **Direita:** `ImagePlaceholder` `min-h-[28rem]`
- Cada setor: grid `grid-cols-[3rem_1fr_auto]`, `border-b py-5`
  - Número `font-bold text-primary`
  - Nome `font-bold`
  - `ArrowUpRight` em `text-muted-foreground`
- Motion: `.reveal-up` com stagger 100ms por item via `IntersectionObserver`

### `Process`

- Fundo `bg-brand-deep`, `text-primary-foreground`
- `SectionHeading inverse`
- Grid `lg:grid-cols-3`, `border-y border-primary-foreground/20`
- Cada passo: `min-h-80`, `border-b lg:border-r border-primary-foreground/20`, `py-8 lg:px-8`
  - Número `text-7xl font-bold text-brand-light leading-none` (topo)
  - `h3 text-2xl font-bold` + `p leading-7 text-primary-foreground/70` (bottom)
  - `justify-between` vertical — número no topo, texto no bottom
- Motion: `.reveal-up` por coluna com stagger 150ms

### `About`

- Fundo `bg-background` (mineral)
- `id="paulim"`, `section-anchor`
- Grid `lg:grid-cols-[1.05fr_0.95fr]` `items-center`
- **Esquerda:** `ImagePlaceholder` `min-h-[30rem]`
- **Direita:** `SectionHeading` + parágrafo regional + lista de 3 capacidades
  - Cada capacidade: `flex items-start gap-3`, `CheckCircle2` em `text-primary`, texto `font-semibold`

### `FAQ`

- Fundo `bg-card`
- `id="duvidas"`, `section-anchor`
- Grid `lg:grid-cols-[0.72fr_1fr]` `gap-12`
- **Esquerda:** `SectionHeading` sem eyebrow (contexto visual é claro)
- **Direita:** `Accordion type="single" collapsible`
  - 4 itens, `AccordionTrigger min-h-11`, `AccordionContent` com `p leading-7 text-muted-foreground`

### `ContactCta`

- Fundo `bg-brand-light`, `text-brand-deep`
- Flex `items-start lg:items-center justify-between`, `gap-8`
- Texto: eyebrow "PRÓXIMO PASSO" + `h2` "Conte o que sua operação precisa"
  - `h2`: `clamp(2rem, 4vw, 3rem)`, `font-bold`, `tracking-[-0.04em]`, `leading-none`, `text-balance`
- Botão: `variant="secondary"` (fundo branco, texto verde escuro), `size="lg"`, ícone `ArrowRight`

### `Footer`

- Fundo `bg-brand-deep`, `text-primary-foreground`
- Grid `md:grid-cols-[1.3fr_0.7fr_0.7fr]`
- **Coluna 1:** logo em `span` com `bg-card rounded-lg p-3` + parágrafo descritivo em `text-primary-foreground/70`
- **Coluna 2:** "Navegação" + links `navItems` em `text-primary-foreground/70 hover:text-primary-foreground`
- **Coluna 3:** "Atendimento" + área de serviço + link WhatsApp
- `Separator` em `bg-primary-foreground/20`
- Rodapé: `© {year} Paulim Tanques.` + nota de número provisório

### `TechnicalRequestForm`

Estado local React. Campos: `name`, `company`, `phone`, `segment`, `details`.

**Fluxo:**
1. `handleSubmit` → `validateTechnicalRequest` → foca primeiro campo inválido
2. 150ms de `isPreparing` → `AlertDialog` de confirmação com resumo (empresa, telefone, segmento)
3. Confirmação → `buildWhatsAppUrl` → `window.open` → estado `wasOpened` ou `fallbackUrl`

**UI do card:**
- `rounded-2xl border bg-card p-6 sm:p-8`
- Header: eyebrow "Diagnóstico inicial" + `h2` "Fale com um especialista técnico" + subtítulo
- Grid 2 colunas para campos curtos (nome/empresa, telefone/segmento)
- `Textarea` para detalhes (`min-h-28`)
- `Button` full-width mobile, auto-width desktop
- `Alert` de sucesso pós-envio
- `Alert variant="destructive"` + link manual se popup bloqueado
- Acessibilidade: `aria-invalid`, `aria-describedby`, `FieldError` vinculado por id

---

## Dados (`data/site.ts`)

```ts
navItems:     Soluções · Setores · A Paulim · Dúvidas
trustItems:   15 anos · Atendimento técnico · Norte do Brasil
solutions:    Equipamentos · Mangueiras e conexões · Peças e acessórios · Segurança e sinalização
sectors:      Postos e distribuidoras · Agronegócio · Transporte e aviação · Indústrias
processSteps: 01 Envie o contexto · 02 Receba uma análise · 03 Avance com segurança
faqs:         4 perguntas frequentes
contact:      whatsappNumber, whatsappLabel, serviceArea
```

---

## Acessibilidade

- WCAG 2.2 AA: contraste mínimo 4.5:1 para body, 3:1 para texto grande
- Foco visível em todos os elementos interativos (`ring` verde)
- `aria-label` em nav, formulário, imagens
- Formulário operável inteiramente por teclado
- `lang="pt-BR"` no `<html>`
- `prefers-reduced-motion` para todos os animations
- Placeholders de imagem com `role="img"` e `aria-label` descritivo

---

## Assets necessários

| Arquivo | Origem | Ação |
|---|---|---|
| `public/assets/paulim-tanques-logo.png` | `docs/context/logo.png` | Copiar |
| `public/assets/hero-operacao.jpg` | Foto real (placeholder por ora) | Substituir depois |
| `public/assets/equipamentos-tecnicos.jpg` | Foto real (placeholder por ora) | Substituir depois |
| `public/assets/operacao-setores.jpg` | Foto real (placeholder por ora) | Substituir depois |
| `public/assets/especialista-cliente.jpg` | Foto real (placeholder por ora) | Substituir depois |

---

## O que NÃO fazer

- Não usar código dos commits anteriores como referência
- Não introduzir um quinto verde além dos quatro oficiais
- Não usar eyebrow em toda seção — apenas onde há valor narrativo real
- Não usar números `01/02/03` como scaffolding genérico — apenas no `Process` onde a sequência é informação
- Não usar glassmorphism, gradiente em texto, ou sombras decorativas
- Não usar cards idênticos em grid para soluções — usar lista ordenada com bordas
- Não usar `Inter`, `DM Sans`, `Space Grotesk` ou qualquer fonte da lista de rejeição
- Não deixar `lang="en"` no `index.html`
