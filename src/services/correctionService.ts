import type {
  CompetencyCorrection,
  EssayCorrection,
  SubmittedEssay,
  TextHighlight,
} from '../types/correction'

const connectives = [
  'além disso',
  'entretanto',
  'contudo',
  'portanto',
  'nesse sentido',
  'por conseguinte',
  'todavia',
  'embora',
  'porque',
  'assim',
  'desse modo',
  'dessa forma',
  'em primeiro lugar',
  'em segundo lugar',
]

const repertoireTerms = [
  'constituição',
  'ibge',
  'onu',
  'direitos humanos',
  'paulo freire',
  'bauman',
  'foucault',
  'hannah arendt',
  'declaração universal',
  'agenda 2030',
]

const interventionTerms = [
  'governo',
  'estado',
  'ministério',
  'escola',
  'sociedade',
  'mídia',
  'família',
  'deve',
  'precisa',
  'por meio de',
  'com o objetivo de',
  'a fim de',
  'campanha',
  'projeto',
  'fiscalização',
  'conscientização',
]

function normalizeText(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function countOccurrences(text: string, terms: string[]) {
  const normalizedText = normalizeText(text)

  return terms.filter((term) =>
    normalizedText.includes(normalizeText(term)),
  ).length
}

function countParagraphs(text: string) {
  const paragraphs = text
    .split(/\n\s*\n|\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return Math.max(paragraphs.length, 1)
}

function countSentences(text: string) {
  const sentences = text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  return sentences.length
}

function getFirstExcerpt(text: string, maximumLength = 150) {
  const cleanedText = text.replace(/\s+/g, ' ').trim()

  if (cleanedText.length <= maximumLength) {
    return cleanedText
  }

  return `${cleanedText.slice(0, maximumLength).trim()}...`
}

function getLastExcerpt(text: string, maximumLength = 150) {
  const cleanedText = text.replace(/\s+/g, ' ').trim()

  if (cleanedText.length <= maximumLength) {
    return cleanedText
  }

  return `...${cleanedText
    .slice(cleanedText.length - maximumLength)
    .trim()}`
}

function calculateC1Score(wordCount: number, sentenceCount: number) {
  if (wordCount >= 180 && sentenceCount >= 8) {
    return 200
  }

  if (wordCount >= 120 && sentenceCount >= 5) {
    return 160
  }

  if (wordCount >= 70) {
    return 120
  }

  return 80
}

function calculateC2Score(
  wordCount: number,
  repertoireCount: number,
) {
  if (wordCount >= 180 && repertoireCount >= 2) {
    return 200
  }

  if (wordCount >= 120 && repertoireCount >= 1) {
    return 160
  }

  if (wordCount >= 70) {
    return 120
  }

  return 80
}

function calculateC3Score(
  paragraphCount: number,
  sentenceCount: number,
) {
  if (paragraphCount >= 4 && sentenceCount >= 9) {
    return 200
  }

  if (paragraphCount >= 3 && sentenceCount >= 6) {
    return 160
  }

  if (paragraphCount >= 2) {
    return 120
  }

  return 80
}

function calculateC4Score(connectiveCount: number) {
  if (connectiveCount >= 6) {
    return 200
  }

  if (connectiveCount >= 4) {
    return 160
  }

  if (connectiveCount >= 2) {
    return 120
  }

  return 80
}

function calculateC5Score(
  interventionCount: number,
  wordCount: number,
) {
  if (interventionCount >= 6 && wordCount >= 150) {
    return 200
  }

  if (interventionCount >= 4) {
    return 160
  }

  if (interventionCount >= 2) {
    return 120
  }

  return 80
}

function createCompetencies(
  essay: SubmittedEssay,
): CompetencyCorrection[] {
  const paragraphCount = countParagraphs(essay.content)
  const sentenceCount = countSentences(essay.content)
  const connectiveCount = countOccurrences(
    essay.content,
    connectives,
  )
  const repertoireCount = countOccurrences(
    essay.content,
    repertoireTerms,
  )
  const interventionCount = countOccurrences(
    essay.content,
    interventionTerms,
  )

  const c1Score = calculateC1Score(
    essay.wordCount,
    sentenceCount,
  )

  const c2Score = calculateC2Score(
    essay.wordCount,
    repertoireCount,
  )

  const c3Score = calculateC3Score(
    paragraphCount,
    sentenceCount,
  )

  const c4Score = calculateC4Score(connectiveCount)

  const c5Score = calculateC5Score(
    interventionCount,
    essay.wordCount,
  )

  return [
    {
      id: 1,
      code: 'C1',
      title: 'Domínio da norma padrão',
      score: c1Score,
      maximumScore: 200,
      feedback:
        c1Score >= 160
          ? 'O texto apresenta boa extensão e organização das frases.'
          : 'O texto ainda pode ser desenvolvido e revisado com mais atenção.',
      strengths:
        c1Score >= 160
          ? [
              'Boa construção geral das frases.',
              'Extensão suficiente para desenvolver as ideias.',
            ]
          : ['O texto apresenta uma ideia central identificável.'],
      improvements:
        c1Score >= 160
          ? ['Faça uma última revisão de pontuação e concordância.']
          : [
              'Revise ortografia, pontuação e concordância.',
              'Desenvolva frases mais completas.',
            ],
    },
    {
      id: 2,
      code: 'C2',
      title: 'Compreensão do tema',
      score: c2Score,
      maximumScore: 200,
      feedback:
        repertoireCount > 0
          ? 'O texto utiliza repertório para fortalecer a discussão.'
          : 'O tema foi abordado, mas pode receber um repertório sociocultural.',
      strengths:
        repertoireCount > 0
          ? [
              'Presença de repertório sociocultural.',
              'Relação entre o tema e a argumentação.',
            ]
          : ['O texto permanece relacionado ao tema proposto.'],
      improvements:
        repertoireCount > 0
          ? ['Explique com mais profundidade a relação do repertório com a tese.']
          : [
              'Inclua uma referência histórica, filosófica, legal ou estatística.',
            ],
    },
    {
      id: 3,
      code: 'C3',
      title: 'Organização dos argumentos',
      score: c3Score,
      maximumScore: 200,
      feedback:
        paragraphCount >= 4
          ? 'O texto apresenta uma estrutura próxima ao modelo esperado no ENEM.'
          : 'A organização em parágrafos ainda pode ser aprimorada.',
      strengths:
        paragraphCount >= 3
          ? [
              'Separação das ideias em diferentes parágrafos.',
              'Progressão entre as partes do texto.',
            ]
          : ['Existe uma linha de raciocínio inicial.'],
      improvements:
        paragraphCount >= 4
          ? ['Aprofunde as causas e consequências apresentadas.']
          : [
              'Organize o texto em introdução, dois desenvolvimentos e conclusão.',
              'Apresente um argumento principal em cada parágrafo.',
            ],
    },
    {
      id: 4,
      code: 'C4',
      title: 'Coesão textual',
      score: c4Score,
      maximumScore: 200,
      feedback:
        connectiveCount >= 4
          ? 'O texto utiliza diferentes conectivos para relacionar as ideias.'
          : 'A ligação entre as ideias pode ser fortalecida com mais conectivos.',
      strengths:
        connectiveCount >= 2
          ? [
              `${connectiveCount} tipos de conectivos foram identificados.`,
              'Há tentativa de relacionar argumentos e conclusões.',
            ]
          : ['As ideias apresentam uma sequência compreensível.'],
      improvements:
        connectiveCount >= 4
          ? ['Evite repetir o mesmo conectivo muitas vezes.']
          : [
              'Utilize conectivos de oposição, adição, causa e conclusão.',
              'Varie as expressões usadas no início dos parágrafos.',
            ],
    },
    {
      id: 5,
      code: 'C5',
      title: 'Proposta de intervenção',
      score: c5Score,
      maximumScore: 200,
      feedback:
        interventionCount >= 4
          ? 'A conclusão apresenta elementos de uma proposta de intervenção.'
          : 'A proposta precisa apresentar mais detalhes sobre a solução.',
      strengths:
        interventionCount >= 3
          ? [
              'Há indicação de um agente responsável.',
              'O texto apresenta uma ação para enfrentar o problema.',
            ]
          : ['Existe espaço para construir uma solução relacionada ao tema.'],
      improvements:
        interventionCount >= 4
          ? [
              'Explique melhor como a ação será realizada e qual resultado pretende alcançar.',
            ]
          : [
              'Indique quem realizará a ação.',
              'Explique o que será feito, por qual meio e com qual objetivo.',
            ],
    },
  ]
}

function createHighlights(
  essay: SubmittedEssay,
  connectiveCount: number,
  interventionCount: number,
): TextHighlight[] {
  const highlights: TextHighlight[] = [
    {
      id: 1,
      excerpt: getFirstExcerpt(essay.content),
      type: 'positive',
      message:
        'O início apresenta o assunto da redação e permite identificar a discussão proposta.',
    },
  ]

  if (connectiveCount >= 2) {
    highlights.push({
      id: 2,
      excerpt: getFirstExcerpt(essay.content, 120),
      type: 'positive',
      message:
        'Foram identificados conectivos que ajudam a relacionar as ideias.',
    })
  } else {
    highlights.push({
      id: 2,
      excerpt: getFirstExcerpt(essay.content, 120),
      type: 'warning',
      message:
        'Tente utilizar mais conectivos para tornar a progressão do texto mais clara.',
    })
  }

  highlights.push({
    id: 3,
    excerpt: getLastExcerpt(essay.content),
    type: interventionCount >= 4 ? 'positive' : 'critical',
    message:
      interventionCount >= 4
        ? 'O encerramento apresenta elementos de uma proposta de intervenção.'
        : 'A conclusão precisa indicar agente, ação, meio, finalidade e detalhamento.',
  })

  return highlights
}

export function generateSimulatedCorrection(
  essay: SubmittedEssay,
): EssayCorrection {
  const competencies = createCompetencies(essay)

  const totalScore = competencies.reduce(
    (total, competency) => total + competency.score,
    0,
  )

  const connectiveCount = countOccurrences(
    essay.content,
    connectives,
  )

  const interventionCount = countOccurrences(
    essay.content,
    interventionTerms,
  )

  const strengths = competencies
    .flatMap((competency) => competency.strengths)
    .slice(0, 4)

  const improvements = competencies
    .flatMap((competency) => competency.improvements)
    .slice(0, 5)

  const summary =
    totalScore >= 900
      ? 'A redação apresenta excelente estrutura, argumentação consistente e boa proposta de intervenção.'
      : totalScore >= 700
        ? 'A redação possui uma base sólida, mas alguns pontos ainda podem ser aprofundados para alcançar uma nota maior.'
        : totalScore >= 500
          ? 'O texto aborda o tema, porém precisa de maior desenvolvimento dos argumentos e da proposta de intervenção.'
          : 'A redação está em fase inicial e precisa ser ampliada, organizada e revisada.'

  return {
    totalScore,
    maximumScore: 1000,
    summary,
    competencies,
    highlights: createHighlights(
      essay,
      connectiveCount,
      interventionCount,
    ),
    strengths,
    improvements,
    correctedAt: new Date().toISOString(),
  }
}