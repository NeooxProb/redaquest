import type { ErrorHuntQuestion } from '../types/errorHunt'

export const errorHuntQuestions: ErrorHuntQuestion[] = [
  {
    id: 1,
    instruction: 'Encontre o erro de concordância.',
    textBefore: 'A falta de investimentos ',
    options: [
      {
        id: 1,
        text: 'prejudicam',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'seriamente',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'a educação',
        isCorrect: false,
      },
    ],
    textAfter: ' pública brasileira.',
    explanation:
      'O núcleo do sujeito é “falta”, que está no singular. Por isso, o verbo também deve ficar no singular.',
    correctedText:
      'A falta de investimentos prejudica seriamente a educação pública brasileira.',
    xp: 25,
  },
  {
    id: 2,
    instruction: 'Encontre o problema de pontuação.',
    textBefore: 'Muitos jovens não praticam atividades físicas ',
    options: [
      {
        id: 1,
        text: 'por isso',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'podem desenvolver',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'problemas de saúde',
        isCorrect: false,
      },
    ],
    textAfter: '.',
    explanation:
      'A expressão “por isso” introduz uma consequência e deve ser separada por pontuação.',
    correctedText:
      'Muitos jovens não praticam atividades físicas; por isso, podem desenvolver problemas de saúde.',
    xp: 25,
  },
  {
    id: 3,
    instruction: 'Encontre o erro de ortografia.',
    textBefore: 'As instituições precisam criar ',
    options: [
      {
        id: 1,
        text: 'progetos',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'educacionais',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'mais eficientes',
        isCorrect: false,
      },
    ],
    textAfter: '.',
    explanation:
      'A palavra “projetos” deve ser escrita com a letra J.',
    correctedText:
      'As instituições precisam criar projetos educacionais mais eficientes.',
    xp: 25,
  },
  {
    id: 4,
    instruction: 'Encontre o erro no uso da crase.',
    textBefore: 'O governo deve oferecer apoio ',
    options: [
      {
        id: 1,
        text: 'à todos',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'os estudantes',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'brasileiros',
        isCorrect: false,
      },
    ],
    textAfter: '.',
    explanation:
      'Não ocorre crase antes de palavras masculinas. O correto é “a todos”.',
    correctedText:
      'O governo deve oferecer apoio a todos os estudantes brasileiros.',
    xp: 25,
  },
  {
    id: 5,
    instruction: 'Encontre o trecho com linguagem inadequada.',
    textBefore: 'A ausência de políticas públicas ',
    options: [
      {
        id: 1,
        text: 'é um negócio muito ruim',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'para o desenvolvimento',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'da sociedade',
        isCorrect: false,
      },
    ],
    textAfter: '.',
    explanation:
      'A expressão é informal e imprecisa para uma redação dissertativo-argumentativa.',
    correctedText:
      'A ausência de políticas públicas prejudica o desenvolvimento da sociedade.',
    xp: 25,
  },
]