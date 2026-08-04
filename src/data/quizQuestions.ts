import type { QuizQuestion } from '../types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'A situação econômica do país melhorou significativamente; {{blank}}, a desigualdade social ainda é alarmante.',
    blank: '__________',
    options: ['portanto', 'entretanto', 'além disso', 'visto que'],
    correct: 1,
    explanation:
      '“Entretanto” apresenta uma oposição entre a melhora econômica e a permanência da desigualdade.',
    rule: 'Conectivos adversativos indicam contraste ou oposição.',
    xp: 20,
  },
  {
    id: 2,
    text: 'Muitos jovens passam horas nas redes sociais; {{blank}}, reduzem o tempo dedicado à leitura.',
    blank: '__________',
    options: ['por conseguinte', 'contudo', 'por exemplo', 'embora'],
    correct: 0,
    explanation:
      '“Por conseguinte” apresenta uma consequência do uso excessivo das redes sociais.',
    rule: 'Conectivos conclusivos podem indicar consequência ou resultado.',
    xp: 20,
  },
  {
    id: 3,
    text: 'A escola criou campanhas de conscientização; {{blank}}, promoveu rodas de conversa com os alunos.',
    blank: '__________',
    options: ['além disso', 'entretanto', 'porque', 'portanto'],
    correct: 0,
    explanation:
      '“Além disso” acrescenta uma nova ação realizada pela escola.',
    rule: 'Conectivos aditivos acrescentam informações ou argumentos.',
    xp: 20,
  },
  {
    id: 4,
    text: 'O problema continua presente {{blank}} ainda faltam políticas públicas eficazes.',
    blank: '__________',
    options: ['porque', 'contudo', 'portanto', 'além disso'],
    correct: 0,
    explanation:
      '“Porque” apresenta a causa da permanência do problema.',
    rule: 'Conectivos causais apresentam o motivo de uma situação.',
    xp: 20,
  },
  {
    id: 5,
    text: '{{blank}} o acesso à informação tenha aumentado, muitas pessoas ainda compartilham notícias falsas.',
    blank: '__________',
    options: ['Embora', 'Portanto', 'Além disso', 'Porque'],
    correct: 0,
    explanation:
      '“Embora” introduz uma ideia de concessão: algo acontece apesar de outra situação.',
    rule: 'Conectivos concessivos apresentam uma ideia contrária que não impede o fato principal.',
    xp: 20,
  },
]