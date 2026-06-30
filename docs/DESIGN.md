<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Paulim Tanques
description: Engenharia de proximidade para operações críticas.
colors:
  green-light: "#6AB42D"
  green-mid: "#3DAA34"
  green-dark: "#0D8336"
  green-deep: "#065320"
---

# Design System: Paulim Tanques

## Overview

**Creative North Star: "Engenharia de Proximidade"**

O sistema visual combina capacidade industrial com atendimento humano. A marca
deve parecer preparada para fabricar, manter e orientar operações críticas, mas
sem criar distância entre o especialista e o cliente. A estrutura transmite
segurança por meio de hierarquia clara, imagens reais de trabalho, linguagem
objetiva e evidências concretas.

A landing page segue a direção "Especialista desde o início": promessa técnica
e formulário de diagnóstico dividem a primeira dobra. Depois, experiência,
soluções, aplicações e processo constroem confiança em uma narrativa progressiva.
A amplitude do catálogo aparece organizada por necessidade, nunca como uma
parede de códigos e especificações.

A primeira implementação deve cobrir navegação responsiva, hero com formulário
técnico, provas de confiança, soluções organizadas por necessidade, aplicações,
setores atendidos, processo do diagnóstico ao suporte e uma chamada final para
conversa com especialista. Esses padrões serão documentados como componentes
somente depois de existirem em código.

O sistema rejeita a aparência de marketplace industrial genérico, a estética de
oficina improvisada, a densidade excessiva de catálogo e o visual corporativo
frio. A referência da TMT orienta a hierarquia comercial, não a identidade. A
identidade visual deve permanecer inequivocamente Paulim Tanques.

**Key Characteristics:**

- Industrial, organizada e humana.
- Verde de marca usado com convicção em áreas relevantes.
- Hierarquia comercial direta, com diagnóstico técnico como ação principal.
- Fotografia e conteúdo ligados a operações, fabricação e aplicações reais.
- Movimento responsivo, discreto e funcional.
- Composição clara, com ritmo variado e sem repetição de cards genéricos.

## Colors

A estratégia é **Committed**: os verdes oficiais da Paulim Tanques carregam de
30% a 60% das superfícies principais. Os quatro tons formam a paleta oficial e
devem preservar seus valores exatos em toda implementação.

### Primary

- **Verde Estrutural Profundo** (`green-deep`): fundo de hero, rodapé, grandes
  blocos institucionais e superfícies que precisam transmitir estabilidade.
- **Verde Operacional Escuro** (`green-dark`): botões principais, navegação
  ativa, títulos sobre superfícies claras e estados de interação com contraste.

### Secondary

- **Verde Técnico Médio** (`green-mid`): áreas de apoio, ícones funcionais,
  indicadores de progresso e elementos gráficos.
- **Verde Energia** (`green-light`): acentos pontuais que indicam
  disponibilidade, avanço ou benefício.

### Neutral

- **Branco Técnico** ([valor a ser resolvido na implementação]): campos,
  conteúdo de leitura e áreas que pedem máxima clareza.
- **Fundo Mineral** ([valor a ser resolvido na implementação]): alternância
  sutil entre seções sem cair em creme, areia ou bege.
- **Tinta Industrial** ([valor a ser resolvido na implementação]): textos sobre
  fundos claros, títulos técnicos e dados.
- **Linha Funcional** ([valor a ser resolvido na implementação]): divisores,
  bordas de campos e separações estritamente funcionais.

**The Green Carries the Brand Rule.** O verde oficial ocupa áreas decisivas da
página. Ele não pode ser reduzido a pequenos botões sobre um site neutro.

**The Four Greens Rule.** A identidade cromática usa `green-light`,
`green-mid`, `green-dark` e `green-deep`. Não criar um quinto verde nem trocar
os valores oficiais por aproximações.

**The No Generic Industrial Blue Rule.** Azul corporativo não substitui a paleta
da Paulim Tanques, mesmo quando uma referência estrutural o utiliza.

## Typography

**Display Font:** Designer Regular (com fallback temporário apenas durante o
desenvolvimento)

**Body Font:** Montserrat (com fallback para Arial e sans-serif)

**Character:** Designer Regular preserva a expressão institucional definida no
manual da marca. Montserrat sustenta textos, navegação, formulários e
especificações com leitura clara e familiar. A combinação deve parecer robusta e
direta, não editorial ou luxuosa.

O arquivo licenciado da Designer Regular precisa ser fornecido em formato web
antes da implementação final. Não substituir silenciosamente por outra fonte nem
usar a imagem do logotipo como texto de título.

### Hierarchy

- **Display** (Designer Regular, escala fluida a ser resolvida na implementação,
  line-height compacto): títulos do hero e uma pequena quantidade de mensagens
  institucionais de alto impacto.
- **Headline** (Designer Regular, escala a ser resolvida na implementação,
  line-height equilibrado): títulos principais de seção.
- **Title** (Montserrat, peso 700): categorias de solução, etapas e benefícios.
- **Body** (Montserrat, pesos 400 e 500): explicações, aplicações e respostas;
  largura máxima entre 65 e 75 caracteres.
- **Label** (Montserrat, pesos 600 e 700): rótulos de formulário, navegação,
  dados curtos e botões. Caixa alta apenas em rótulos breves e deliberados.

**The Official Type Rule.** Designer Regular e Montserrat são a voz tipográfica
da marca. Não introduzir serifas decorativas, monoespaçadas técnicas ou uma
terceira família sem necessidade funcional comprovada.

**The Comprehension Before Specification Rule.** Títulos e textos explicam a
aplicação antes de apresentar códigos, medidas ou nomes técnicos.

## Elevation

O sistema é plano por padrão. Profundidade vem da alternância entre verdes,
superfícies claras, fotografia, espaçamento e sobreposição estrutural do
formulário no hero. Sombras aparecem somente para comunicar estado interativo ou
separar um elemento flutuante necessário.

**The Flat at Rest Rule.** Cards e seções permanecem sem sombras decorativas.
Elevação surge em hover, foco, menus, diálogos e elementos fixos.

**The One Depth Signal Rule.** Um componente usa borda ou sombra como sinal de
separação, nunca a combinação de borda fina com sombra ampla.

## Do's and Don'ts

### Do:

- **Do** usar os verdes oficiais da Paulim Tanques em áreas relevantes e manter
  o logotipo com suas proporções e aplicações aprovadas.
- **Do** preservar exatamente os quatro valores da paleta: `green-light`,
  `green-mid`, `green-dark` e `green-deep`.
- **Do** abrir a página com promessa objetiva e formulário técnico lado a lado.
- **Do** usar Designer Regular para expressão institucional e Montserrat para
  leitura, interação e dados.
- **Do** explicar aplicações e benefícios antes de códigos e especificações.
- **Do** demonstrar confiança com experiência, atuação regional, fabricação
  própria, conformidade, suporte e projetos sob medida.
- **Do** usar imagens reais, nítidas e contextualizadas da operação.
- **Do** aplicar movimento responsivo em feedback, transições e poucos destaques
  ao rolar, sempre com alternativa para movimento reduzido.
- **Do** manter contraste compatível com WCAG 2.2 AA, foco visível e formulários
  totalmente operáveis por teclado.

### Don't:

- **Don't** criar uma **aparência genérica de catálogo**, com produtos
  apresentados sem orientação ou contexto de aplicação.
- **Don't** adotar estética de **oficina improvisada**, desorganizada ou pouco
  segura.
- **Don't** impor **excesso de informação técnica** antes de o visitante
  compreender qual solução atende sua necessidade.
- **Don't** produzir um **visual corporativo frio e distante** que torne o
  atendimento especializado impessoal.
- **Don't** copiar literalmente a referência visual da TMT; preserve apenas sua
  lógica de hierarquia comercial.
- **Don't** transformar a página em um **marketplace industrial genérico** com
  grade extensa de produtos, códigos dominantes e formulário genérico de
  cotação.
- **Don't** usar azul corporativo como cor dominante, gradiente em texto,
  glassmorphism, faixas laterais coloridas ou sombras decorativas amplas.
- **Don't** repetir ícone, título e texto em grades de cards idênticos ao longo
  de toda a página.
- **Don't** usar Designer Regular antes de obter o arquivo de fonte adequado e
  confirmar sua licença para uso web.
