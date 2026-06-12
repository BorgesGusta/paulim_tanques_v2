import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { TechnicalRequestForm } from '@/components/TechnicalRequestForm'

async function fillValidForm(
  user: ReturnType<typeof userEvent.setup>,
  segment: string,
  details: string,
) {
  await user.type(screen.getByRole('textbox', { name: 'Nome' }), 'Ana Souza')
  await user.type(
    screen.getByRole('textbox', { name: 'Empresa ou operação' }),
    'Frota Norte',
  )
  await user.type(
    screen.getByRole('textbox', { name: 'Telefone com DDD' }),
    '(94) 99999-9999',
  )
  await user.click(screen.getByRole('combobox', { name: 'Segmento' }))
  await user.click(screen.getByRole('option', { name: segment }))
  await user.type(
    screen.getByRole('textbox', { name: 'O que sua operação precisa?' }),
    details,
  )
}

describe('TechnicalRequestForm', () => {
  it('valida os campos obrigatórios e foca o primeiro campo inválido', async () => {
    const user = userEvent.setup()

    render(<TechnicalRequestForm />)

    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(
      screen.getByText('Informe um telefone com DDD.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Selecione o segmento da operação.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
  })

  it('confirma os dados antes de abrir a conversa no WhatsApp', async () => {
    const user = userEvent.setup()
    const openSpy = vi
      .spyOn(window, 'open')
      .mockReturnValue({} as Window)

    render(<TechnicalRequestForm />)

    await fillValidForm(
      user,
      'Transporte e aviação',
      'Precisamos avaliar mangueiras de descarga.',
    )
    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )

    expect(
      await screen.findByRole('heading', { name: 'Confirmar dados técnicos' }),
    ).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()

    await user.click(
      screen.getByRole('button', { name: 'Abrir conversa no WhatsApp' }),
    )

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/5594999999999?text='),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('oferece um link manual quando a nova janela é bloqueada', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'open').mockReturnValue(null)

    render(<TechnicalRequestForm />)

    await fillValidForm(
      user,
      'Indústrias',
      'Precisamos avaliar um reservatório metálico.',
    )
    await user.click(
      screen.getByRole('button', { name: 'Enviar dados técnicos' }),
    )
    await user.click(
      await screen.findByRole('button', {
        name: 'Abrir conversa no WhatsApp',
      }),
    )

    expect(
      screen.getByRole('link', { name: 'Abrir WhatsApp manualmente' }),
    ).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5594999999999?text='),
    )
  })
})
