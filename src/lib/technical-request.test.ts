import {
  buildWhatsAppUrl,
  emptyTechnicalRequest,
  validateTechnicalRequest,
} from '@/lib/technical-request'

describe('validateTechnicalRequest', () => {
  it('requires every field', () => {
    expect(validateTechnicalRequest(emptyTechnicalRequest)).toEqual({
      name: 'Informe seu nome.',
      company: 'Informe a empresa ou operação.',
      phone: 'Informe um telefone com DDD.',
      segment: 'Selecione o segmento da operação.',
      details: 'Descreva brevemente o que sua operação precisa.',
    })
  })

  it('rejects a telephone without a Brazilian DDD', () => {
    expect(
      validateTechnicalRequest({
        name: 'Ana Souza',
        company: 'Frota Norte',
        phone: '9999-9999',
        segment: 'Transporte e aviação',
        details: 'Precisamos avaliar mangueiras de descarga.',
      }).phone,
    ).toBe('Informe um telefone com DDD.')
  })

  it('accepts a complete request', () => {
    expect(
      validateTechnicalRequest({
        name: 'Ana Souza',
        company: 'Frota Norte',
        phone: '(94) 99999-9999',
        segment: 'Transporte e aviação',
        details: 'Precisamos avaliar mangueiras de descarga.',
      }),
    ).toEqual({})
  })

  it('enforces phone and detail boundaries', () => {
    const request = {
      name: 'Ana Souza',
      company: 'Frota Norte',
      phone: '55 94 99999-99999',
      segment: 'Transporte e aviação' as const,
      details: '12345678901',
    }

    expect(validateTechnicalRequest(request)).toMatchObject({
      phone: 'Informe um telefone com DDD.',
      details: 'Descreva brevemente o que sua operação precisa.',
    })

    expect(
      validateTechnicalRequest({
        ...request,
        phone: '(94) 99999-9999',
        details: '123456789012',
      }),
    ).toEqual({})
  })
})

describe('buildWhatsAppUrl', () => {
  it('encodes a structured technical message', () => {
    const url = buildWhatsAppUrl({
      name: 'Ana Souza',
      company: 'Frota Norte',
      phone: '(94) 99999-9999',
      segment: 'Transporte e aviação',
      details: 'Precisamos avaliar mangueiras de descarga.',
    })

    expect(url).toContain('https://wa.me/5594999999999?text=')
    expect(decodeURIComponent(url)).toContain('Solicitação técnica - Paulim Tanques')
    expect(decodeURIComponent(url)).toContain('Nome: Ana Souza')
    expect(decodeURIComponent(url)).toContain('Segmento: Transporte e aviação')
  })

  it('trims user-provided text in the message', () => {
    const decodedUrl = decodeURIComponent(
      buildWhatsAppUrl({
        name: '  Ana Souza  ',
        company: '  Frota Norte  ',
        phone: '  (94) 99999-9999  ',
        segment: 'Agronegócio',
        details: '  Avaliar um tanque de abastecimento.  ',
      }),
    )

    expect(decodedUrl).toContain('Nome: Ana Souza\n')
    expect(decodedUrl).toContain('Empresa/operação: Frota Norte\n')
    expect(decodedUrl).toContain('Necessidade: Avaliar um tanque de abastecimento.')
  })
})
