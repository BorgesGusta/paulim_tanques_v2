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
})
