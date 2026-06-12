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

  it('aligns the hero content with the shared desktop shell', () => {
    const { container } = render(<App />)
    const heroGrid = container.querySelector('#inicio > div')

    expect(heroGrid).toHaveClass(
      'lg:mx-auto',
      'lg:w-full',
      'lg:max-w-7xl',
      'lg:px-12',
    )
  })

  it('uses a compact but accessible header height', () => {
    const { container } = render(<App />)
    const headerShell = container.querySelector('header > div')
    const logo = container.querySelector('header img')

    expect(headerShell).toHaveClass('min-h-16')
    expect(logo).toHaveClass('h-14', 'w-36', 'object-cover')
  })

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
})
