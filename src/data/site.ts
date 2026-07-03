import { WHATSAPP_NUMBER } from '@/lib/technical-request'

export const navItems = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Setores', href: '#setores' },
  { label: 'A Paulim', href: '#sobre' },
  { label: 'Dúvidas', href: '#faq' },
] as const

export const trustItems = [
  { value: '15 anos', label: 'de experiência técnica no setor' },
  { value: '400+ projetos', label: 'entregues no Norte do Brasil' },
  { value: 'Entrega direta', label: 'até o cliente em toda a região' },
] as const

export const productCategories = [
  {
    title: "Caixas d'Água",
    description:
      "Taça Cheia, Taça Vazia e Tubular. Volumes de 10.000 L a 50.000 L, com fabricação sob medida para instalações rurais, industriais e comerciais.",
    models: ['Taça Cheia', 'Taça Vazia', 'Tubular'],
    imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    imageAlt: "Reservatório de caixa d'água",
  },
  {
    title: 'Tanques Estacionários',
    description:
      'Para armazenamento de diesel, gasolina, etanol, combustíveis e outros líquidos. O modelo bipartido permite dois produtos no mesmo tanque.',
    models: ['Tanque simples', 'Tanque bipartido'],
    imageSrc: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600',
    imageAlt: 'Tanque estacionário industrial',
  },
] as const

export const equipmentItems = [
  {
    title: 'Bombas e Bicos',
    description: 'Bombas completas e bicos calibrados para abastecimento preciso e seguro.',
  },
  {
    title: 'Mangueiras e Conexões',
    description: 'Soluções de sucção, descarga, vedação e acoplamento para cada aplicação.',
  },
  {
    title: 'Peças e Acessórios',
    description: 'Itens compatíveis para manutenção, reposição e adequação de caminhões-tanque.',
  },
] as const

export const sectors = [
  {
    label: 'Fazendas',
    description: 'Armazenamento de insumos, defensivos e combustíveis para operações rurais de grande escala.',
    imageSrc: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
    imageAlt: 'Tanque de combustível instalado em fazenda do agronegócio',
  },
  {
    label: 'Postos e Distribuidoras',
    description: 'Tanques e equipamentos para abastecimento seguro e confiável de frotas e consumidores.',
    imageSrc: 'https://images.unsplash.com/photo-1545262810-77515befe149?w=800',
    imageAlt: 'Posto de combustível com tanques instalados',
  },
  {
    label: 'Indústrias',
    description: 'Reservatórios e acessórios para processos industriais que exigem precisão e durabilidade.',
    imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    imageAlt: 'Instalação industrial com tanque estacionário',
  },
  {
    label: 'Transporte e Aviação',
    description: 'Tanques e equipamentos para frotas de caminhões-tanque e operações aeroportuárias.',
    imageSrc: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800',
    imageAlt: 'Abastecimento de aeronave com equipamento especializado',
  },
  {
    label: 'Empresas em Geral',
    description: 'Atendimento a qualquer operação que necessite de armazenamento ou transporte de líquidos.',
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    imageAlt: 'Frota de caminhões-tanque em operação empresarial',
  },
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Envie o contexto',
    description:
      'Informe operação, segmento e necessidade, mesmo sem conhecer o nome técnico da peça ou o volume exato.',
  },
  {
    number: '02',
    title: 'Receba uma análise',
    description:
      'Um especialista organiza as informações e identifica o equipamento, volume e configuração adequados.',
  },
  {
    number: '03',
    title: 'Avance com segurança',
    description:
      'A Paulim recomenda a solução, elabora o orçamento e cuida da entrega até o local de instalação.',
  },
] as const

export const faqs = [
  {
    question: 'Preciso saber o nome exato da peça ou o volume do tanque?',
    answer:
      'Não. Descreva a aplicação, o equipamento e o problema percebido. Um especialista identifica o que você precisa e solicita as medidas ou fotos necessárias na conversa.',
  },
  {
    question: 'A Paulim fabrica tanques sob medida?',
    answer:
      "Sim. Tanques estacionários e caixas d'água são fabricados nos volumes e configurações que a sua operação exige, incluindo modelos bipartidos para dois produtos diferentes.",
  },
  {
    question: 'A Paulim entrega fora de Marabá?',
    answer:
      'Sim. Atendemos toda a região Norte e demais estados conforme demanda. A entrega é feita diretamente até o cliente, incluindo fazendas e áreas rurais.',
  },
  {
    question: 'Quais segmentos podem solicitar atendimento?',
    answer:
      'Fazendas, postos e distribuidoras, indústrias, transporte, aviação e empresas em geral que operam com armazenamento ou transporte de líquidos.',
  },
] as const

// TODO: Substituir pelas logos reais dos clientes — adicione os arquivos em
// /public/assets/logos/ e preencha logoSrc (ex.: '/assets/logos/cliente-1.png')
export const clientLogos: { name: string; logoSrc: string | null }[] = [
  { name: 'Cliente 1', logoSrc: null },
  { name: 'Cliente 2', logoSrc: null },
  { name: 'Cliente 3', logoSrc: null },
  { name: 'Cliente 4', logoSrc: null },
  { name: 'Cliente 5', logoSrc: null },
  { name: 'Cliente 6', logoSrc: null },
]

// TODO: Substituir pelos depoimentos reais dos clientes
export const testimonials = [
  {
    name: 'João Ferreira',
    role: 'Gerente de Fazenda — Pará',
    quote: '[Depoimento do cliente aqui]',
  },
  {
    name: 'Carlos Mota',
    role: 'Proprietário de Posto — Marabá',
    quote: '[Depoimento do cliente aqui]',
  },
] as const

export const differentials = [
  'Mais de 15 anos de experiência técnica no setor',
  'Mais de 400 projetos entregues na região Norte',
  "Fabricação sob medida, tanques simples e bipartidos",
  'Entrega direta até o cliente, incluindo área rural',
  'Consultoria técnica antes da venda e acompanhamento após a entrega',
] as const

export const contact = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLabel: '(94) 99156-2929',
  serviceArea: 'Marabá, Pará',
} as const
