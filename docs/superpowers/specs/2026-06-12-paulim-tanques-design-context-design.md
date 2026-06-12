# Paulim Tanques: Landing Page e Direção Visual

## Escopo

Definir a experiência, a estrutura e os critérios visuais da landing page
institucional B2B da Paulim Tanques antes da implementação do frontend.

Os documentos normativos são:

- `PRODUCT.md` para estratégia, público, propósito e princípios.
- `DESIGN.md` para direção visual, identidade, tipografia e guardrails.
- `docs/referencia1.png` para ritmo comercial e progressão das seções.
- `docs/logo.png` para aplicação da marca.

## Objetivo

Apresentar a Paulim Tanques como especialista regional em fabricação,
manutenção e fornecimento de soluções para transporte e armazenamento de
líquidos. A conversão principal começa por um formulário técnico e continua com
o atendimento de um especialista.

## Público

O público principal reúne proprietários, gestores de frota e profissionais de
manutenção, compras e segurança em pequenas e médias empresas que operam
caminhões-tanque, combustíveis e cargas perigosas.

Postos, distribuidoras, agronegócio, indústrias, transportadoras e aviação são
públicos secundários. Marabá e o Norte do Brasil formam a base regional.

## Direção Aprovada

**Creative North Star:** Engenharia de Proximidade.

**Estrutura:** Especialista desde o início. O hero divide espaço entre uma
promessa técnica objetiva e um formulário de diagnóstico.

**Personalidade:** técnica, confiável e próxima.

**Cor:** estratégia Committed com os verdes oficiais da Paulim Tanques ocupando
áreas relevantes. A identidade usa exclusivamente `#6AB42D`, `#3DAA34`,
`#0D8336` e `#065320`, acompanhados por branco quente, grafite e cinzas
funcionais. Azul e amarelo da referência não fazem parte da direção.

**Tipografia:** Designer Regular para expressão institucional e Montserrat para
textos, navegação, formulários e dados. Enquanto o arquivo web licenciado da
Designer Regular não estiver disponível, Montserrat será o fallback explícito
também nos títulos.

**Movimento:** responsivo, com feedback e transições suaves, poucos destaques ao
rolar e alternativa para movimento reduzido.

**Profundidade:** superfícies planas por padrão; sombras apenas para comunicar
estado ou flutuação necessária.

**Fotografia:** imagens operacionais realistas de caminhões-tanque, reservatórios,
mangueiras, conexões, equipamentos de segurança e atendimento técnico. A
composição deve demonstrar organização e segurança, sem estética de banco de
imagem corporativo ou oficina improvisada.

## Estrutura da Página

### Cabeçalho

Cabeçalho compacto e responsivo com logotipo, navegação para `Soluções`,
`Setores`, `A Paulim` e `Dúvidas`, além do CTA `Falar com especialista`. Em
dispositivos menores, a navegação passa para um painel lateral com alvos de toque
de pelo menos 44 pixels.

### Hero e Diagnóstico

A primeira dobra usa composição assimétrica: fotografia operacional de um
caminhão-tanque, promessa objetiva e formulário técnico em destaque.

- Título: `Soluções técnicas para operações que não podem parar.`
- Apoio: peças, equipamentos e suporte especializado para transporte e
  abastecimento com segurança.
- Evidência: `15 anos de experiência técnica`.
- Formulário: nome, empresa, telefone, segmento e descrição da necessidade.
- CTA: `Enviar dados técnicos`.

Após validação no cliente, o formulário abre
`https://wa.me/5594999999999` com uma mensagem estruturada contendo os dados
informados. O número é provisório e deve permanecer centralizado em uma
constante de configuração.

### Provas de Confiança

Faixa curta com evidências verificáveis e compreensíveis: tempo de experiência,
atendimento técnico e alcance regional. Não serão inventados certificados,
clientes, métricas ou selos.

### Soluções

Apresentação orientada por necessidade, sem aparência de catálogo:

- Equipamentos.
- Mangueiras e conexões.
- Peças e acessórios.
- Segurança e sinalização.

Cada grupo explica primeiro a aplicação e o benefício. Códigos, medidas e
especificações detalhadas não dominam a página.

### Setores

Quatro contextos operacionais ajudam o visitante a se reconhecer:

- Postos e distribuidoras de combustíveis.
- Agronegócio.
- Transporte e aviação.
- Indústrias.

### Processo

O fluxo `Do diagnóstico à solução certa` apresenta três etapas: envio do
contexto técnico, análise por especialista e recomendação ou atendimento.

### Empresa

Bloco `Engenharia de proximidade` combina fotografia de atendimento ou inspeção
técnica com uma explicação curta sobre experiência regional, fabricação,
manutenção e suporte.

### Dúvidas e Conversão Final

FAQ em acordeão responde às objeções mais comuns sem sobrecarregar a leitura. A
faixa final retoma a ação principal com `Conte o que sua operação precisa` e o
botão `Preencher formulário técnico`.

### Rodapé

Rodapé em verde profundo com marca, navegação essencial, região de atendimento,
contato provisório e informação institucional. Nenhum dado legal ou endereço
será inventado.

## Sistema de Interface

A implementação usará Tailwind CSS 4 e componentes shadcn/ui para botões, campos,
rótulos, seleção, área de texto, acordeão e painel de navegação móvel. Os
componentes serão adaptados aos tokens da marca, sem manter a aparência padrão
do registry.

O sistema é plano e usa bordas funcionais, espaçamento, fotografia e alternância
de superfícies para criar hierarquia. Cantos têm raio discreto; gradientes,
glassmorphism, sombras amplas e grades repetitivas de cards não são permitidos.

## Responsividade

- Mobile-first, com uma coluna no hero e formulário integralmente utilizável.
- O conteúdo crítico nunca depende de hover.
- Imagens recebem enquadramento adequado para celular e desktop.
- Campos mantêm fonte mínima de 16 pixels em telas de toque.
- A página permanece legível entre 320 pixels e telas largas, com largura máxima
  de conteúdo para evitar linhas excessivas.
- Animações respeitam `prefers-reduced-motion`.

## Estados do Formulário

- Rótulos persistentes e instruções breves.
- Erros específicos próximos ao campo e resumo acessível quando necessário.
- Botão com estado de processamento durante a preparação da mensagem.
- Confirmação clara antes da abertura do WhatsApp.
- Alternativa legível caso o navegador bloqueie a nova janela.
- Foco visível e ordem de tabulação coerente.

## Referências

1. Site da TMT Tanques: hierarquia comercial e hero com formulário.
2. Manual da marca Paulim Tanques: cores, tipografia e identidade.
3. Catálogo Paulim Tanques: linguagem técnica, aplicações e amplitude da oferta.

A estrutura da TMT é uma referência de organização, não de identidade visual.

## Anti-referência

O site não deve parecer um marketplace industrial genérico: grade extensa de
produtos, códigos dominando a página, especificações sem contexto, imagens
desconectadas e formulário genérico de cotação.

Também deve evitar aparência genérica de catálogo, oficina improvisada, excesso
de informação técnica e comunicação corporativa fria.

## Critérios de Aceitação

- A direção `Especialista desde o início` aparece claramente na primeira dobra.
- O formulário técnico é a conversão primária e encaminha a mensagem ao
  WhatsApp provisório após validação.
- Os quatro verdes oficiais preservam seus valores exatos; não existe um quinto
  verde de marca.
- A referência da TMT influencia somente estrutura e ritmo comercial.
- A página usa o logotipo real do projeto e não redesenha a marca.
- O conteúdo atende proprietários, gestores de frota, manutenção, compras e
  segurança sem exigir conhecimento prévio de nomes técnicos.
- A experiência é responsiva, operável por teclado e compatível com WCAG 2.2 AA.
- Estados de erro, processamento, sucesso e fallback do formulário são
  implementados e testados.
- A implementação passa por lint, testes automatizados, build de produção e
  inspeção visual no navegador em desktop e mobile.

## Dependências Não Bloqueantes

- Substituir o fallback Montserrat pela Designer Regular quando o arquivo
  licenciado em formato web for fornecido.
- Trocar o número provisório do WhatsApp pelo canal oficial.
- Substituir imagens de apoio por fotografias próprias quando estiverem
  disponíveis, preservando enquadramento, proporção e intenção.
- Completar endereço, dados legais e demais contatos somente após confirmação.
