# Compact Desktop Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir o hero completo e a faixa de confiança na primeira dobra de uma viewport desktop de 1440 x 900 px.

**Architecture:** Manter o fluxo mobile atual e aplicar compactação apenas em `lg`. O grid do hero passa a reservar 7rem para a faixa de confiança, enquanto conteúdo e formulário reduzem tipografia e espaçamento vertical sem diminuir controles abaixo de 44 px.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Vite.

---

### Task 1: Fixar o contrato responsivo em teste

**Files:**
- Modify: `src/App.test.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing test**

Adicionar um teste que consulte o grid do hero, o título principal, o contêiner
do formulário e a textarea:

```tsx
it('compacts the desktop hero to reveal the trust bar above the fold', () => {
  const { container } = render(<App />)
  const heroGrid = container.querySelector('#inicio > div')
  const heroTitle = screen.getByRole('heading', {
    level: 1,
    name: 'Soluções técnicas para operações que não podem parar.',
  })
  const formTitle = screen.getByRole('heading', {
    name: 'Fale com um especialista técnico',
  })
  const formCard = formTitle.parentElement?.parentElement
  const details = screen.getByLabelText('O que sua operação precisa?')

  expect(heroGrid).toHaveClass('lg:min-h-[calc(100svh-11rem)]')
  expect(heroTitle).toHaveClass('lg:text-[3.5rem]', 'xl:text-[3.75rem]')
  expect(formCard).toHaveClass('lg:p-5')
  expect(details).toHaveClass('lg:min-h-24')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- src/App.test.tsx
```

Expected: FAIL porque o hero ainda usa `100svh - 5rem`, o título chega a
`text-7xl`, o formulário não tem `lg:p-5` e a textarea não tem
`lg:min-h-24`.

### Task 2: Compactar hero e formulário no desktop

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/TechnicalRequestForm.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Implement the desktop hero height and copy density**

Em `Hero.tsx`:

```tsx
<div className="grid min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-11rem)] ...">
```

Remover o mínimo rígido de 38rem no desktop, reduzir o padding e os gaps:

```tsx
<div className="relative isolate flex min-h-[38rem] min-w-0 items-end lg:min-h-0">
  ...
  <div className="relative flex flex-col gap-7 px-5 py-16 ... lg:gap-4 lg:px-0 lg:py-10">
```

Limitar o título a 60 px e compactar a descrição:

```tsx
<h1 className="... lg:text-[3.5rem] xl:text-[3.75rem]">
...
<p className="... lg:text-base lg:leading-7">
```

Reduzir o padding vertical da coluna do formulário:

```tsx
className="... lg:px-0 lg:py-5"
```

- [ ] **Step 2: Implement the desktop form density**

Em `TechnicalRequestForm.tsx`, aplicar:

```tsx
<div className="... p-6 sm:p-8 lg:p-5">
  <div className="mb-8 ... lg:mb-4">
    <p className="mb-3 ... lg:mb-1">
    <h2 className="... sm:text-4xl lg:text-3xl lg:leading-tight">
    <p className="mt-3 ... lg:mt-1 lg:text-sm lg:leading-5">
```

Compactar os grupos sem alterar a altura dos controles:

```tsx
<FieldGroup className="lg:gap-3 [&_[data-slot=field]]:lg:gap-1">
  <div className="grid gap-5 sm:grid-cols-2 lg:gap-3">
```

Aplicar `lg:gap-3` aos dois grids de campos e reduzir somente a textarea:

```tsx
<Textarea className="min-h-28 lg:min-h-24" ... />
```

- [ ] **Step 3: Run the focused test**

Run:

```bash
npm run test:run -- src/App.test.tsx
```

Expected: 3 existing tests and the new compact hero test PASS.

### Task 3: Verificar comportamento e primeira dobra

**Files:**
- Verify: `src/components/Hero.tsx`
- Verify: `src/components/TechnicalRequestForm.tsx`
- Verify: `src/App.test.tsx`

- [ ] **Step 1: Run automated verification**

Run in parallel:

```bash
npm run lint
npm run test:run
npm run build
```

Expected: lint sem erros, 3 arquivos de teste aprovados e build Vite concluído.

- [ ] **Step 2: Run rendered desktop validation**

Abrir `http://127.0.0.1:5173` em 1440 x 900 px e medir:

```js
const trustBar = document.querySelector(
  'section[aria-label="Provas de confiança"]',
)

({
  trustBottom: trustBar?.getBoundingClientRect().bottom,
  viewportHeight: innerHeight,
  hasHorizontalOverflow:
    document.documentElement.scrollWidth >
    document.documentElement.clientWidth,
})
```

Expected: `trustBottom <= viewportHeight`, formulário e botão visíveis, sem
overflow horizontal e sem erros de console.

- [ ] **Step 3: Run rendered mobile regression check**

Abrir em 390 x 844 px. Confirmar que o hero continua em fluxo natural, menu
abre, formulário não é cortado e não há overflow horizontal.

- [ ] **Step 4: Commit implementation**

Stage somente:

```bash
git add src/App.test.tsx src/components/Hero.tsx src/components/TechnicalRequestForm.tsx
git commit -m "fix: fit desktop hero above the fold"
```
