import type {
  LandingFaq,
  LandingFeature,
  LandingPlan,
  LandingStep,
} from '../types/landing'

export const landingFeatures: LandingFeature[] = [
  {
    id: 1,
    icon: '⚔️',
    title: 'Missões rápidas',
    description:
      'Aprenda redação por meio de atividades curtas sobre argumentação, repertório, conectivos e estrutura textual.',
  },
  {
    id: 2,
    icon: '✍️',
    title: 'Editor de redação',
    description:
      'Escolha um tema, leia os textos motivadores e escreva diretamente na plataforma com salvamento automático.',
  },
  {
    id: 3,
    icon: '🤖',
    title: 'Correção detalhada',
    description:
      'Receba uma análise demonstrativa das cinco competências do ENEM e descubra quais pontos precisam ser melhorados.',
  },
  {
    id: 4,
    icon: '🃏',
    title: 'Biblioteca de cartas',
    description:
      'Colecione repertórios, conectivos, estratégias argumentativas e modelos para utilizar em seus textos.',
  },
  {
    id: 5,
    icon: '🏆',
    title: 'Ranking e conquistas',
    description:
      'Ganhe experiência, aumente seu nível, desbloqueie medalhas e acompanhe sua posição entre outros estudantes.',
  },
  {
    id: 6,
    icon: '📊',
    title: 'Evolução visível',
    description:
      'Acompanhe seu desempenho em cada competência e identifique os critérios que merecem mais atenção.',
  },
]

export const landingSteps: LandingStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Escolha seu desafio',
    description:
      'Comece por uma missão rápida ou selecione um tema completo de redação.',
  },
  {
    id: 2,
    number: '02',
    title: 'Aprenda praticando',
    description:
      'Resolva atividades, encontre erros e utilize cartas de conhecimento durante os estudos.',
  },
  {
    id: 3,
    number: '03',
    title: 'Escreva sua redação',
    description:
      'Organize seus argumentos no editor e mantenha o rascunho salvo automaticamente.',
  },
  {
    id: 4,
    number: '04',
    title: 'Analise o resultado',
    description:
      'Confira sua nota estimada, os comentários e as recomendações para produzir uma nova versão.',
  },
]

export const landingPlans: LandingPlan[] = [
  {
    id: 1,
    name: 'Explorador',
    description:
      'Para conhecer o RedaQuest e começar a praticar.',
    price: 'Grátis',
    featured: false,
    buttonLabel: 'Começar gratuitamente',
    features: [
      'Acesso às missões iniciais',
      'Atividades de conectivos',
      'Caça aos erros',
      'Biblioteca básica',
      'Temas demonstrativos',
    ],
  },
  {
    id: 2,
    name: 'Aventureiro',
    description:
      'Para estudantes que desejam uma rotina completa de preparação.',
    price: 'R$ 19,90',
    period: '/mês',
    featured: true,
    buttonLabel: 'Experimentar o plano',
    features: [
      'Todos os recursos gratuitos',
      'Temas de redação completos',
      'Correções demonstrativas ilimitadas',
      'Biblioteca completa de cartas',
      'Histórico de desempenho',
      'Conquistas exclusivas',
    ],
  },
  {
    id: 3,
    name: 'Lenda',
    description:
      'Para quem busca acompanhamento avançado e evolução constante.',
    price: 'R$ 39,90',
    period: '/mês',
    featured: false,
    buttonLabel: 'Conhecer o plano',
    features: [
      'Todos os recursos do Aventureiro',
      'Plano de estudos personalizado',
      'Desafios avançados',
      'Relatórios completos',
      'Novos temas toda semana',
      'Prioridade em futuros recursos',
    ],
  },
]

export const landingFaqs: LandingFaq[] = [
  {
    id: 1,
    question: 'O RedaQuest substitui um professor de redação?',
    answer:
      'Não. A plataforma funciona como uma ferramenta de estudo e prática. As correções desta versão são demonstrativas e não substituem a avaliação de um professor.',
  },
  {
    id: 2,
    question: 'Preciso saber escrever bem para começar?',
    answer:
      'Não. O RedaQuest foi pensado para estudantes em diferentes níveis, inclusive para quem ainda possui dificuldade em começar ou desenvolver uma redação.',
  },
  {
    id: 3,
    question: 'Meu texto fica salvo automaticamente?',
    answer:
      'Sim. Nesta demonstração, o rascunho é salvo no próprio navegador utilizado pelo estudante.',
  },
  {
    id: 4,
    question: 'As notas são oficiais?',
    answer:
      'Não. As pontuações atuais são estimativas produzidas por regras demonstrativas para apresentar o funcionamento da plataforma.',
  },
  {
    id: 5,
    question: 'Posso usar o RedaQuest pelo celular?',
    answer:
      'Sim. As telas são responsivas e foram desenvolvidas para funcionar em computadores, tablets e celulares.',
  },
  {
    id: 6,
    question: 'Os planos já podem ser contratados?',
    answer:
      'Ainda não. Os valores e planos exibidos na demonstração servem apenas para representar como a área comercial poderá funcionar futuramente.',
  },
]