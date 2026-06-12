# Compact Desktop Hero

## Objective

Exibir o hero e toda a faixa de provas de confiança na primeira dobra em
desktops com viewport de 1440 x 900 px, sem exigir rolagem inicial.

## Scope

O ajuste se aplica somente a partir do breakpoint `lg`. Tablet e mobile mantêm
o fluxo vertical atual para preservar leitura, toque e preenchimento do
formulário.

## Layout

- O header permanece com 64 px de altura útil.
- O hero desktop usa `calc(100svh - 11rem)`: 4rem para o header e 7rem para a
  faixa de confiança.
- A faixa com “15 anos”, “Atendimento técnico” e “Norte do Brasil” deve estar
  completamente visível em uma viewport de 900 px de altura.
- A composição continua dividida entre fotografia e formulário, respeitando o
  shell horizontal existente.

## Hero Copy

- Reduzir agressivamente o título somente no desktop, com tamanho máximo de
  60 px e entrelinha compacta.
- Reduzir os espaçamentos entre chamada, título, descrição e ações.
- Diminuir o padding vertical do conteúdo sobre a fotografia.
- Preservar contraste, leitura e a hierarquia “Especialista desde o início”.

## Technical Form

- Reduzir padding interno, margens e gaps verticais no desktop.
- Reduzir o título do formulário e compactar sua introdução.
- Diminuir a altura da textarea e os espaços entre grupos.
- Manter inputs, select e botão com no mínimo 44 px de altura.
- Não remover campos, descrições, validações ou estados de confirmação.

## Responsive Behavior

- Em desktops altos, o conteúdo permanece centralizado verticalmente.
- Em desktops próximos de 900 px de altura, o hero se torna mais denso para
  manter a faixa visível.
- Em alturas insuficientes para acomodar o conteúdo com segurança, o hero pode
  crescer naturalmente; conteúdo não deve ser cortado nem ganhar rolagem
  interna.

## Acceptance Criteria

- Em 1440 x 900 px, header, hero e faixa de confiança aparecem integralmente
  sem rolagem.
- O formulário completo, incluindo o botão, permanece visível no hero.
- Nenhum controle interativo fica menor que 44 x 44 px.
- Não há clipping, sobreposição, overflow horizontal ou erro de console.
- Desktop, tablet e mobile continuam funcionais.
