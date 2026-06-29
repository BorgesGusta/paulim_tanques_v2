import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export const navItems = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Setores', href: '#setores' },
  { label: 'A Paulim', href: '#sobre' },
  { label: 'Dúvidas', href: '#faq' },
] as const

export const trustItems = [
  { value: '15 anos', label: 'de experiência técnica' },
  { value: 'Atendimento técnico', label: 'orientação antes da compra' },
  { value: 'Norte do Brasil', label: 'base regional em Marabá' },
] as const

export const solutions = [
  {
    title: 'Equipamentos',
    description:
      'Reservatórios e componentes para manter transporte e abastecimento confiáveis.',
  },
  {
    title: 'Mangueiras e conexões',
    description:
      'Soluções de sucção, descarga, vedação e acoplamento para cada aplicação.',
  },
  {
    title: 'Peças e acessórios',
    description:
      'Itens compatíveis para manutenção, reposição e adequação de caminhões-tanque.',
  },
  {
    title: 'Segurança e sinalização',
    description:
      'EPIs e sinalização que ajudam a organizar operações com cargas sensíveis.',
  },
] as const

export const sectors = [
  'Postos e distribuidoras de combustíveis',
  'Agronegócio',
  'Transporte e aviação',
  'Indústrias',
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Envie o contexto',
    description:
      'Informe operação, segmento e necessidade, mesmo sem conhecer o nome técnico da peça.',
  },
  {
    number: '02',
    title: 'Receba uma análise',
    description:
      'Um especialista organiza as informações e identifica os próximos dados necessários.',
  },
  {
    number: '03',
    title: 'Avance com segurança',
    description:
      'A Paulim recomenda a solução, o fornecimento ou o atendimento adequado ao caso.',
  },
] as const

export const faqs = [
  {
    question: 'Preciso saber o nome exato da peça?',
    answer:
      'Não. Descreva a aplicação, o equipamento e o problema percebido. Fotos e medidas podem ser solicitadas pelo especialista na conversa.',
  },
  {
    question: 'A Paulim atende empresas com frota?',
    answer:
      'Sim. O atendimento é direcionado a proprietários, gestores de frota, manutenção, compras e segurança de operações B2B.',
  },
  {
    question: 'Quais segmentos podem solicitar atendimento?',
    answer:
      'Postos e distribuidoras, agronegócio, transporte, aviação, indústrias e outras operações que utilizam tanques ou componentes relacionados.',
  },
  {
    question: 'O formulário já gera um orçamento?',
    answer:
      'Não. Ele reúne o contexto inicial para que um especialista avalie a necessidade antes de recomendar produtos, serviços ou próximos passos.',
  },
] as const

export const contact = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLabel: '(94) 99999-9999',
  serviceArea: 'Marabá e Norte do Brasil',
} as const
