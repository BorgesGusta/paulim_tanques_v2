export type IconName =
  | 'award'
  | 'check'
  | 'clipboard'
  | 'clock'
  | 'factory'
  | 'flame'
  | 'gauge'
  | 'handshake'
  | 'phone'
  | 'shield'
  | 'snowflake'
  | 'sparkles'
  | 'truck'
  | 'wrench';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface DifferentialItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: IconName;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  whatsappLabel: string;
  whatsappHref: string;
  phoneLabel: string;
  phoneRaw: string;
  serviceArea: string;
}

export const contact: ContactInfo = {
  whatsappLabel: '(00) 00000-0000',
  whatsappHref:
    'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20em%20tanques.',
  phoneLabel: '(00) 00000-0000',
  phoneRaw: '+5500000000000',
  serviceArea: 'Atendimento para empresas, frotas e operações industriais.',
};

export const navItems: NavItem[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Processo', href: '#processo' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'FAQ', href: '#faq' },
];

export const heroStats = [
  {
    label: 'Tanques inflamáveis',
    value: 'Serviço técnico para operações críticas',
    icon: 'flame' as IconName,
  },
  {
    label: 'Vapor a frio',
    value: 'Procedimento com foco em controle e segurança',
    icon: 'snowflake' as IconName,
  },
  {
    label: 'Manutenção especializada',
    value: 'Caminhões-tanque, válvulas e sistemas',
    icon: 'wrench' as IconName,
  },
];

export const services: ServiceItem[] = [
  {
    title: 'Fabricação e manutenção de tanques',
    description:
      'Soluções para tanques e caminhões-tanque com atenção a estrutura, vedação, componentes e acabamento.',
    icon: 'truck',
  },
  {
    title: 'Tanques inflamáveis',
    description:
      'Serviços para operações que transportam ou armazenam produtos inflamáveis, com foco em segurança operacional.',
    icon: 'flame',
  },
  {
    title: 'Vapor a frio',
    description:
      'Atendimento técnico para processos de vapor a frio e preparação de tanques com equipamentos adequados.',
    icon: 'snowflake',
  },
  {
    title: 'Reparos e substituições',
    description:
      'Correções em válvulas, conexões, tubulações, suportes e pontos de desgaste que afetam a rotina da frota.',
    icon: 'wrench',
  },
  {
    title: 'Inspeção e diagnóstico',
    description:
      'Avaliação inicial para identificar riscos, prioridades e a melhor sequência de intervenção.',
    icon: 'clipboard',
  },
  {
    title: 'Adequações técnicas',
    description:
      'Apoio para melhorar confiabilidade, organização dos sistemas e disponibilidade dos equipamentos.',
    icon: 'shield',
  },
];

export const serviceFeatures: string[] = [
  'Fabricação completa de tanques sob medida',
  'Manutenção preventiva e corretiva para frotas',
  'Sistemas de válvulas e conexões industriais',
];

export const serviceGallery = [
  {
    image: '/assets/hero-tanker-workshop.png',
    label: 'Fabricação de tanques',
  },
  {
    image: '/assets/maintenance-valves.png',
    label: 'Manutenção técnica',
  },
  {
    image: '/assets/cold-vapor-service.png',
    label: 'Vapor a frio',
  },
];

export const differentials: DifferentialItem[] = [
  {
    title: 'Confiança em serviço crítico',
    description:
      'Atendimento pensado para reduzir risco, evitar improviso e manter a operação em ordem.',
    icon: 'handshake',
  },
  {
    title: 'Qualidade no detalhe',
    description:
      'Olhar técnico para acabamento, vedação, componentes e pontos que impactam a durabilidade.',
    icon: 'award',
  },
  {
    title: 'Profissionalismo em campo',
    description:
      'Comunicação objetiva, avaliação clara e execução organizada para empresas e frotas.',
    icon: 'check',
  },
  {
    title: 'Segurança como critério',
    description:
      'Serviços conduzidos com postura preventiva em tanques, conexões e sistemas sensíveis.',
    icon: 'shield',
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Diagnóstico',
    description: 'Entendimento do tanque, histórico, tipo de carga e urgência da operação.',
    icon: 'clipboard',
  },
  {
    title: 'Orçamento',
    description: 'Definição do escopo técnico, prioridade e recursos necessários para execução.',
    icon: 'phone',
  },
  {
    title: 'Execução',
    description: 'Serviço realizado com equipe, ferramentas e controle adequados ao tipo de tanque.',
    icon: 'wrench',
  },
  {
    title: 'Conferência',
    description: 'Checagens finais para liberar o equipamento com mais previsibilidade e confiança.',
    icon: 'gauge',
  },
];

export const about = {
  title: 'Uma marca construída para unir tradição, tecnologia e segurança.',
  description:
    'A Paulim Tanques atua com soluções para fabricação e manutenção de caminhões-tanque, tanques e sistemas relacionados. A identidade da marca nasce do próprio caminhão-tanque formando a letra P, símbolo de uma operação técnica, direta e comprometida com o cliente.',
  values: ['Confiança', 'Qualidade', 'Profissionalismo', 'Inovação'],
};

export const faqs: FAQItem[] = [
  {
    question: 'Como solicito um orçamento?',
    answer:
      'O caminho principal é pelo WhatsApp. Envie o tipo de tanque, cidade, urgência e fotos iniciais para uma avaliação mais rápida.',
  },
  {
    question: 'A Paulim Tanques atende empresas com frota?',
    answer:
      'Sim. A landing foi estruturada para atendimento B2B, incluindo transportadoras, indústrias, postos e operações com caminhões-tanque.',
  },
  {
    question: 'Quais serviços podem entrar na avaliação?',
    answer:
      'Manutenção, reparos, inspeção, adequações, serviços em tanques inflamáveis e demandas relacionadas a vapor a frio.',
  },
  {
    question: 'O atendimento considera segurança operacional?',
    answer:
      'Sim. O fluxo proposto prioriza diagnóstico, execução controlada e conferência técnica antes da liberação do equipamento.',
  },
];
