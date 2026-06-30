# Design: Wizard de Orçamento — Paulim Tanques

**Data:** 2026-06-30  
**Status:** Aprovado

---

## Objetivo

Implementar um wizard de orçamento em 4 etapas que abre em um painel lateral (Sheet) a partir de qualquer ponto da landing page. Os dados são enviados para uma planilha Google Sheets via Apps Script antes de abrir o WhatsApp com a mensagem pré-formatada.

---

## Abordagem escolhida

**Sheet (painel lateral direito)** — usa o componente `sheet.tsx` já existente no projeto. Em mobile ocupa tela cheia; em desktop abre como painel lateral. Escolhido por acomodar 4 etapas sem scroll interno forçado e por já estar disponível no projeto.

---

## Fluxo das etapas

```
Etapa 1 — Produto
  ├── Caixa d'Água      → Etapa 2A (modelo + volume)
  ├── Tanque Estacionário → Etapa 2B (volume + líquido + bipartido)
  └── Equipamentos      → Etapa 2C (descrição livre)

Etapa 2 — Configurações (dinâmica conforme produto escolhido)

Etapa 3 — Local de instalação
  ├── Tipo: Fazenda / Empresa / Indústria / Posto / Outro
  ├── Nome da fazenda ou empresa (condicional)
  ├── CNPJ (opcional, se Empresa ou Indústria)
  └── Localização: autocomplete Google Maps OU endereço manual + botão "Usar minha localização"

Etapa 4 — Dados do cliente
  Nome, WhatsApp, e-mail, cidade, estado, observações

Confirmação — Resumo + envio
  POST para Apps Script → salva na planilha → abre WhatsApp com mensagem resumida
```

---

## Modelo de dados

```ts
type QuoteForm = {
  // Etapa 1
  product: 'caixa-dagua' | 'tanque-estacionario' | 'equipamentos'

  // Etapa 2 — Caixa d'Água
  waterTankModel?: 'taca-cheia' | 'taca-vazia' | 'tubular'
  waterTankVolume?: string        // '10000' | '15000' | '20000' | '25000' | '30000' | '50000' | 'outro'
  waterTankVolumeCustom?: string

  // Etapa 2 — Tanque Estacionário
  tankVolume?: string             // '3000' | '4000' | '5000' | '6000' | '7000' | '8000' | '10000' | '15000' | '20000' | '25000' | 'outro'
  tankVolumeCustom?: string
  tankLiquid?: 'diesel' | 'gasolina' | 'etanol' | 'aviacao' | 'outro'
  tankLiquidCustom?: string
  tankBipartido?: boolean

  // Etapa 2 — Equipamentos
  equipmentDescription?: string

  // Etapa 3
  locationType: 'fazenda' | 'empresa' | 'industria' | 'posto' | 'outro'
  locationName?: string           // nome da fazenda ou empresa
  cnpj?: string
  address: string                 // endereço digitado ou revertido do mapa
  lat?: number
  lng?: number

  // Etapa 4
  clientName: string
  clientPhone: string
  clientEmail: string
  clientCity: string
  clientState: string
  notes?: string
}
```

---

## Validação

Cada etapa valida somente seus próprios campos obrigatórios antes de liberar o botão "Próximo". Campos condicionais (ex: `locationName` só aparece se `locationType` for `fazenda` ou `empresa`) só são validados quando visíveis.

---

## Integração Google Maps

- Campo de endereço com **Places Autocomplete** da Google Maps JavaScript API
- Botão "Usar minha localização" → `navigator.geolocation` → reverse geocoding para preencher o campo de endereço
- Captura `lat` e `lng` em ambos os casos
- API key em variável de ambiente: `VITE_GOOGLE_MAPS_API_KEY`

---

## Integração Google Sheets via Apps Script

- **Envio:** `POST` para URL do Apps Script com payload JSON completo do `QuoteForm` + timestamp
- **Apps Script:** adiciona uma linha na planilha com todos os campos do modelo de dados
- **URL:** variável de ambiente `VITE_APPS_SCRIPT_URL`
- **Fluxo de erro:** se o POST falhar, mostra mensagem de erro mas oferece opção de abrir o WhatsApp mesmo assim (dados não perdidos para o cliente)
- **Após sucesso:** abre WhatsApp com mensagem pré-formatada resumindo o pedido

### Colunas salvas na planilha

Timestamp, Nome, WhatsApp, E-mail, Produto, Modelo/Volume, Líquido, Bipartido, Tipo de local, Nome local, CNPJ, Endereço, Latitude, Longitude, Cidade, Estado, Observações

---

## Arquitetura de arquivos

### Novos arquivos

```
src/
  context/
    QuoteContext.tsx          # estado global: open/close, step atual, form data

  components/
    QuoteWizard/
      index.tsx               # Sheet wrapper + roteador de etapas
      StepIndicator.tsx       # barra de progresso "Etapa X de 4"
      Step1Product.tsx        # cards clicáveis de seleção de produto
      Step2WaterTank.tsx      # modelo + volume (Caixa d'Água)
      Step2Tank.tsx           # volume + líquido + bipartido (Tanque Estacionário)
      Step2Equipment.tsx      # descrição livre (Equipamentos)
      Step3Location.tsx       # tipo + nome + mapa/endereço
      Step4Client.tsx         # dados do cliente
      StepConfirm.tsx         # resumo + botão de envio final
      WizardNav.tsx           # botões Voltar / Próximo / Enviar

  lib/
    quote-form.ts             # tipos QuoteForm, validação por etapa, builder da mensagem WhatsApp
    apps-script.ts            # postToSheet(data): Promise<void>
    google-maps.ts            # wrapper Places Autocomplete + geolocation
```

### Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/App.tsx` | Adiciona `<QuoteProvider>` e `<QuoteWizard>` fora do `<main>` |
| `src/components/Header.tsx` | Botão "Solicitar orçamento" chama `useQuote().open()` |
| `src/components/Hero.tsx` | Botão secundário "Solicitar orçamento" abaixo dos proof points |
| `src/components/Solutions.tsx` | Botão em cada card de produto, passa produto pré-selecionado |
| `src/components/ContactCta.tsx` | Botão adicional ao lado do botão do WhatsApp |

---

## Pontos de entrada do wizard

Todos os botões chamam `useQuote().open(product?)`. Quando `product` é passado (ex: do card de Caixas d'Água), o wizard pula direto para a Etapa 2 com o produto pré-selecionado.

---

## Variáveis de ambiente necessárias

```
VITE_GOOGLE_MAPS_API_KEY=...
VITE_APPS_SCRIPT_URL=...
```

Devem ser adicionadas ao `.env.local` (não commitado) e documentadas no `.env.example`.
