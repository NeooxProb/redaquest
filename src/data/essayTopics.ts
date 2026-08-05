import type { EssayTopic } from '../types/essay'

export const essayTopics: EssayTopic[] = [
  {
    id: 1,
    title:
      'Desafios para combater os impactos das redes sociais na saúde mental dos jovens brasileiros',
    shortTitle: 'Redes sociais e saúde mental',
    description:
      'Discuta como o uso excessivo das redes sociais pode afetar o bem-estar emocional dos jovens e apresente soluções para o problema.',
    icon: '📱',
    category: 'Tecnologia',
    difficulty: 'Médio',
    estimatedMinutes: 60,
    rewardXp: 300,
    featured: true,
    motivationalTexts: [
      {
        id: 1,
        title: 'Conexão permanente',
        content:
          'As redes sociais aproximam pessoas, facilitam o acesso à informação e permitem novas formas de expressão. Entretanto, o uso excessivo dessas plataformas pode aumentar a comparação social, a ansiedade e a sensação de isolamento.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'O papel da educação digital',
        content:
          'A educação digital não deve ensinar apenas como utilizar ferramentas tecnológicas, mas também como reconhecer riscos, estabelecer limites e desenvolver uma relação mais saudável com o ambiente virtual.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
  {
    id: 2,
    title:
      'Caminhos para estimular o hábito de leitura entre os jovens no Brasil',
    shortTitle: 'Leitura entre os jovens',
    description:
      'Analise os obstáculos que afastam os jovens dos livros e proponha ações para incentivar a leitura.',
    icon: '📚',
    category: 'Educação',
    difficulty: 'Fácil',
    estimatedMinutes: 55,
    rewardXp: 250,
    featured: false,
    motivationalTexts: [
      {
        id: 1,
        title: 'Leitura e formação crítica',
        content:
          'A leitura contribui para a ampliação do vocabulário, para o desenvolvimento da criatividade e para a construção do pensamento crítico. Apesar disso, muitos jovens encontram dificuldades para criar uma rotina de leitura.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'Novas formas de acesso',
        content:
          'Bibliotecas, clubes de leitura, livros digitais e projetos escolares podem aproximar os estudantes de diferentes gêneros textuais e transformar a leitura em uma atividade mais acessível e interessante.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
  {
    id: 3,
    title:
      'Desafios para enfrentar o sedentarismo entre os jovens brasileiros',
    shortTitle: 'Sedentarismo entre jovens',
    description:
      'Discuta as causas do sedentarismo na juventude e apresente medidas capazes de incentivar uma rotina mais ativa.',
    icon: '🏃',
    category: 'Saúde',
    difficulty: 'Fácil',
    estimatedMinutes: 55,
    rewardXp: 250,
    featured: false,
    motivationalTexts: [
      {
        id: 1,
        title: 'Mudanças na rotina',
        content:
          'O aumento do tempo diante de celulares, computadores e televisores modificou a rotina de muitos jovens. Em vários casos, atividades físicas foram substituídas por longos períodos de permanência em frente às telas.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'Espaços e oportunidades',
        content:
          'A ausência de espaços públicos seguros, projetos esportivos e orientação adequada também pode dificultar a prática regular de atividades físicas.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
  {
    id: 4,
    title:
      'Medidas para reduzir o desperdício de alimentos na sociedade brasileira',
    shortTitle: 'Desperdício de alimentos',
    description:
      'Analise as causas do desperdício de alimentos e apresente propostas para promover um consumo mais consciente.',
    icon: '🍽️',
    category: 'Sociedade',
    difficulty: 'Médio',
    estimatedMinutes: 60,
    rewardXp: 300,
    featured: false,
    motivationalTexts: [
      {
        id: 1,
        title: 'Do campo à mesa',
        content:
          'O desperdício pode ocorrer durante a produção, o transporte, a comercialização e o consumo. Alimentos próprios para consumo são descartados por problemas de armazenamento, aparência ou planejamento inadequado.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'Consumo consciente',
        content:
          'Planejar compras, armazenar corretamente os produtos e reaproveitar alimentos são atitudes que podem diminuir o desperdício dentro das residências.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
  {
    id: 5,
    title:
      'Desafios da valorização da cultura brasileira na contemporaneidade',
    shortTitle: 'Valorização da cultura brasileira',
    description:
      'Discuta os obstáculos para preservar e valorizar as diferentes manifestações culturais existentes no país.',
    icon: '🎭',
    category: 'Cultura',
    difficulty: 'Difícil',
    estimatedMinutes: 65,
    rewardXp: 350,
    featured: false,
    motivationalTexts: [
      {
        id: 1,
        title: 'Diversidade cultural',
        content:
          'A cultura brasileira é formada por diferentes tradições, povos, expressões artísticas e modos de vida. Essa diversidade constitui uma parte importante da identidade nacional.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'Preservação e acesso',
        content:
          'A falta de investimentos, a desigualdade no acesso aos espaços culturais e a desvalorização de manifestações regionais dificultam a preservação da memória e da diversidade cultural.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
  {
    id: 6,
    title:
      'Caminhos para ampliar a conscientização ambiental nas cidades brasileiras',
    shortTitle: 'Conscientização ambiental',
    description:
      'Analise comportamentos que prejudicam o meio ambiente urbano e apresente medidas para estimular práticas sustentáveis.',
    icon: '🌱',
    category: 'Meio ambiente',
    difficulty: 'Médio',
    estimatedMinutes: 60,
    rewardXp: 300,
    featured: false,
    motivationalTexts: [
      {
        id: 1,
        title: 'Responsabilidade coletiva',
        content:
          'Problemas como descarte irregular de resíduos, desperdício de água e poluição dependem tanto de políticas públicas quanto da participação da população.',
        source: 'Texto elaborado para demonstração',
      },
      {
        id: 2,
        title: 'Educação ambiental',
        content:
          'Campanhas educativas, projetos escolares e melhorias na coleta seletiva podem estimular hábitos mais sustentáveis e fortalecer a responsabilidade ambiental.',
        source: 'Texto elaborado para demonstração',
      },
    ],
  },
]