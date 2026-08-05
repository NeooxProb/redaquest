import { useEffect, useMemo, useState } from 'react'
import { EssayTopicCard } from '../components/cards/EssayTopicCard'
import { essayTopics } from '../data/essayTopics'
import type {
  EssayCategory,
  EssayDraft,
  EssayTopic,
} from '../types/essay'
import type { NavProps } from '../types/navigation'

type WriteStep = 'topics' | 'editor'
type CategoryFilter = 'Todos' | EssayCategory

const categories: CategoryFilter[] = [
  'Todos',
  'Educação',
  'Tecnologia',
  'Saúde',
  'Sociedade',
  'Meio ambiente',
  'Cultura',
]

const minimumWords = 30

function countWords(text: string) {
  const normalizedText = text.trim()

  if (!normalizedText) {
    return 0
  }

  return normalizedText.split(/\s+/).length
}

function getDraftKey(topicId: number) {
  return `redaquest:essay-draft:${topicId}`
}

export default function WriteScreen({ navigate }: NavProps) {
  const [step, setStep] = useState<WriteStep>('topics')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Todos')
  const [selectedTopic, setSelectedTopic] =
    useState<EssayTopic | null>(null)
  const [content, setContent] = useState('')
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [validationMessage, setValidationMessage] =
    useState('')

  const wordCount = countWords(content)
  const characterCount = content.length

  const filteredTopics = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return essayTopics
    }

    return essayTopics.filter(
      (topic) => topic.category === selectedCategory,
    )
  }, [selectedCategory])

  useEffect(() => {
    if (!selectedTopic || step !== 'editor') {
      return
    }

    const timeout = window.setTimeout(() => {
      const draft: EssayDraft = {
        topicId: selectedTopic.id,
        content,
        wordCount,
        updatedAt: new Date().toISOString(),
      }

      window.localStorage.setItem(
        getDraftKey(selectedTopic.id),
        JSON.stringify(draft),
      )

      setSavedAt(new Date())
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [content, selectedTopic, step, wordCount])

  function selectTopic(topic: EssayTopic) {
    let savedContent = ''

    const storedDraft = window.localStorage.getItem(
      getDraftKey(topic.id),
    )

    if (storedDraft) {
      try {
        const parsedDraft = JSON.parse(
          storedDraft,
        ) as EssayDraft

        savedContent = parsedDraft.content
      } catch {
        window.localStorage.removeItem(
          getDraftKey(topic.id),
        )
      }
    }

    setSelectedTopic(topic)
    setContent(savedContent)
    setValidationMessage('')
    setSavedAt(null)
    setStep('editor')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function selectRandomTopic() {
    const randomIndex = Math.floor(
      Math.random() * essayTopics.length,
    )

    selectTopic(essayTopics[randomIndex])
  }

  function returnToTopics() {
    setStep('topics')
    setSelectedTopic(null)
    setValidationMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function clearDraft() {
    if (!selectedTopic) {
      return
    }

    const confirmed = window.confirm(
      'Deseja realmente apagar toda a redação? Esta ação não poderá ser desfeita.',
    )

    if (!confirmed) {
      return
    }

    window.localStorage.removeItem(
      getDraftKey(selectedTopic.id),
    )

    setContent('')
    setSavedAt(null)
    setValidationMessage('')
  }

  function submitEssay() {
    if (!selectedTopic) {
      return
    }

    if (wordCount < minimumWords) {
      setValidationMessage(
        `Escreva pelo menos ${minimumWords} palavras antes de enviar para correção.`,
      )
      return
    }

    const submittedEssay = {
      topic: selectedTopic,
      content,
      wordCount,
      submittedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(
      'redaquest:submitted-essay',
      JSON.stringify(submittedEssay),
    )

    setValidationMessage('')
    navigate('correction')
  }

  if (step === 'editor' && selectedTopic) {
    return (
      <div
        style={{
          background: '#f0f4ff',
          fontFamily: 'Nunito, sans-serif',
          minHeight: '100%',
          width: '100%',
        }}
      >
        <header
          style={{
            background:
              'linear-gradient(135deg, #6d28d9 0%, #7c3aed 48%, #2563eb 100%)',
            color: '#ffffff',
            padding: '22px clamp(18px, 4vw, 52px) 28px',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 1320,
              width: '100%',
            }}
          >
            <div
              style={{
                alignItems: 'flex-start',
                display: 'flex',
                gap: 15,
              }}
            >
              <button
                type="button"
                onClick={returnToTopics}
                aria-label="Voltar para escolha de tema"
                style={{
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.17)',
                  border:
                    '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 13,
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexShrink: 0,
                  fontFamily: 'inherit',
                  fontSize: 22,
                  fontWeight: 900,
                  height: 44,
                  justifyContent: 'center',
                  width: 44,
                }}
              >
                ←
              </button>

              <div style={{ flex: 1 }}>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                  }}
                >
                  Tema selecionado
                </span>

                <h1
                  style={{
                    fontSize: 'clamp(21px, 4vw, 31px)',
                    fontWeight: 900,
                    lineHeight: 1.2,
                    margin: '5px 0 6px',
                  }}
                >
                  {selectedTopic.icon}{' '}
                  {selectedTopic.shortTitle}
                </h1>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: 12,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {selectedTopic.category} ·{' '}
                  {selectedTopic.difficulty} ·{' '}
                  {selectedTopic.estimatedMinutes} minutos
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  border:
                    '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 15,
                  flexShrink: 0,
                  padding: '10px 13px',
                  textAlign: 'center',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontSize: 15,
                    fontWeight: 900,
                  }}
                >
                  +{selectedTopic.rewardXp} XP
                </strong>

                <span
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 9,
                    fontWeight: 800,
                  }}
                >
                  Recompensa
                </span>
              </div>
            </div>
          </div>
        </header>

        <main
          style={{
            margin: '0 auto',
            maxWidth: 1320,
            padding: '25px clamp(17px, 4vw, 52px) 50px',
            width: '100%',
          }}
        >
          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              boxShadow:
                '0 10px 30px rgba(15,23,42,0.06)',
              padding: 'clamp(20px, 4vw, 30px)',
            }}
          >
            <span
              style={{
                color: '#7c3aed',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Proposta de redação
            </span>

            <h2
              style={{
                color: '#172033',
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: 900,
                lineHeight: 1.35,
                margin: '7px 0 12px',
              }}
            >
              {selectedTopic.title}
            </h2>

            <p
              style={{
                color: '#64748b',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {selectedTopic.description}
            </p>
          </section>

          <section style={{ marginTop: 22 }}>
            <div style={{ marginBottom: 14 }}>
              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                Material de apoio
              </span>

              <h2
                style={{
                  color: '#172033',
                  fontSize: 21,
                  fontWeight: 900,
                  margin: '5px 0 0',
                }}
              >
                Textos motivadores
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 15,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
              }}
            >
              {selectedTopic.motivationalTexts.map(
                (text, index) => (
                  <article
                    key={text.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #dbeafe',
                      borderRadius: 21,
                      boxShadow:
                        '0 7px 22px rgba(15,23,42,0.05)',
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: 11,
                      }}
                    >
                      <div
                        style={{
                          alignItems: 'center',
                          background: '#dbeafe',
                          borderRadius: 13,
                          color: '#1d4ed8',
                          display: 'flex',
                          flexShrink: 0,
                          fontSize: 13,
                          fontWeight: 900,
                          height: 40,
                          justifyContent: 'center',
                          width: 40,
                        }}
                      >
                        {index + 1}
                      </div>

                      <h3
                        style={{
                          color: '#172033',
                          fontSize: 16,
                          fontWeight: 900,
                          margin: 0,
                        }}
                      >
                        {text.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        color: '#475569',
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1.65,
                        margin: '15px 0 13px',
                      }}
                    >
                      {text.content}
                    </p>

                    <span
                      style={{
                        color: '#94a3b8',
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      Fonte: {text.source}
                    </span>
                  </article>
                ),
              )}
            </div>
          </section>

          <section
            style={{
              background: '#ffffff',
              border: '1px solid #c4b5fd',
              borderRadius: 25,
              boxShadow:
                '0 14px 36px rgba(124,58,237,0.08)',
              marginTop: 24,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                background:
                  'linear-gradient(90deg, #f5f3ff, #eff6ff)',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'space-between',
                padding: '15px 19px',
              }}
            >
              <div>
                <h2
                  style={{
                    color: '#172033',
                    fontSize: 18,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  ✍️ Sua redação
                </h2>

                <p
                  style={{
                    color: '#64748b',
                    fontSize: 11,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  O texto é salvo automaticamente neste navegador.
                </p>
              </div>

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 999,
                    color: '#475569',
                    fontSize: 11,
                    fontWeight: 900,
                    padding: '7px 10px',
                  }}
                >
                  {wordCount} palavras
                </span>

                <span
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 999,
                    color: '#475569',
                    fontSize: 11,
                    fontWeight: 900,
                    padding: '7px 10px',
                  }}
                >
                  {characterCount} caracteres
                </span>

                <span
                  style={{
                    background: '#dcfce7',
                    borderRadius: 999,
                    color: '#15803d',
                    fontSize: 10,
                    fontWeight: 900,
                    padding: '7px 10px',
                  }}
                >
                  {savedAt
                    ? `✓ Salvo às ${savedAt.toLocaleTimeString(
                        'pt-BR',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}`
                    : 'Salvamento automático'}
                </span>
              </div>
            </div>

            <div style={{ padding: 19 }}>
              <textarea
                value={content}
                onChange={(event) => {
                  setContent(event.target.value)
                  setValidationMessage('')
                }}
                placeholder="Comece sua redação aqui...

Você pode organizar o texto em:

Introdução
Desenvolvimento 1
Desenvolvimento 2
Conclusão"
                spellCheck
                style={{
                  background: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: 17,
                  color: '#263248',
                  fontFamily: 'Georgia, serif',
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 1.85,
                  minHeight: 520,
                  outline: 'none',
                  padding: '22px clamp(17px, 4vw, 28px)',
                  resize: 'vertical',
                  width: '100%',
                }}
              />

              {validationMessage && (
                <div
                  role="alert"
                  style={{
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    borderRadius: 14,
                    color: '#991b1b',
                    fontSize: 12,
                    fontWeight: 800,
                    marginTop: 12,
                    padding: 13,
                  }}
                >
                  ⚠️ {validationMessage}
                </div>
              )}

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  justifyContent: 'space-between',
                  marginTop: 16,
                }}
              >
                <button
                  type="button"
                  onClick={clearDraft}
                  disabled={!content}
                  style={{
                    background: '#f1f5f9',
                    border: 0,
                    borderRadius: 14,
                    color: content
                      ? '#dc2626'
                      : '#94a3b8',
                    cursor: content
                      ? 'pointer'
                      : 'not-allowed',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: 900,
                    minHeight: 47,
                    padding: '11px 17px',
                  }}
                >
                  🗑️ Apagar redação
                </button>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 9,
                  }}
                >
                  <button
                    type="button"
                    onClick={returnToTopics}
                    style={{
                      background: '#ede9fe',
                      border: 0,
                      borderRadius: 14,
                      color: '#6d28d9',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 12,
                      fontWeight: 900,
                      minHeight: 47,
                      padding: '11px 17px',
                    }}
                  >
                    Trocar tema
                  </button>

                  <button
                    type="button"
                    onClick={submitEssay}
                    style={{
                      background:
                        'linear-gradient(90deg, #7c3aed, #3b82f6)',
                      border: 0,
                      borderRadius: 14,
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 900,
                      minHeight: 47,
                      padding: '11px 20px',
                    }}
                  >
                    Enviar para correção →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#f0f4ff',
        fontFamily: 'Nunito, sans-serif',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <header
        style={{
          background:
            'linear-gradient(135deg, #6d28d9 0%, #7c3aed 48%, #2563eb 100%)',
          color: '#ffffff',
          padding: '32px clamp(20px, 4vw, 58px) 39px',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1320,
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Oficina de redação
              </span>

              <h1
                style={{
                  fontSize: 'clamp(29px, 4vw, 43px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: '7px 0 9px',
                }}
              >
                ✍️ Escolha um tema
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: 620,
                }}
              >
                Selecione uma proposta, leia os textos
                motivadores e escreva sua redação no próprio
                RedaQuest.
              </p>
            </div>

            <button
              type="button"
              onClick={selectRandomTopic}
              style={{
                background: '#ffffff',
                border: 0,
                borderRadius: 15,
                color: '#6d28d9',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                minHeight: 49,
                padding: '12px 18px',
              }}
            >
              🎲 Escolher tema aleatório
            </button>
          </div>
        </div>
      </header>

      <main
        style={{
          margin: '0 auto',
          maxWidth: 1320,
          padding: '25px clamp(18px, 4vw, 58px) 50px',
          width: '100%',
        }}
      >
        <section
          style={{
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 22,
            boxShadow:
              '0 9px 26px rgba(15,23,42,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            padding: 15,
          }}
        >
          {categories.map((category) => {
            const selected =
              selectedCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                style={{
                  background: selected
                    ? 'linear-gradient(90deg, #7c3aed, #3b82f6)'
                    : '#f1f5f9',
                  border: 0,
                  borderRadius: 999,
                  color: selected
                    ? '#ffffff'
                    : '#64748b',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 11,
                  fontWeight: 900,
                  minHeight: 39,
                  padding: '9px 14px',
                }}
              >
                {getCategoryIcon(category)} {category}
              </button>
            )
          })}
        </section>

        <div
          style={{
            alignItems: 'flex-end',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '23px 0 16px',
          }}
        >
          <div>
            <span
              style={{
                color: '#7c3aed',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Propostas disponíveis
            </span>

            <h2
              style={{
                color: '#172033',
                fontSize: 22,
                fontWeight: 900,
                margin: '5px 0 0',
              }}
            >
              {selectedCategory === 'Todos'
                ? 'Todos os temas'
                : selectedCategory}
            </h2>
          </div>

          <span
            style={{
              color: '#94a3b8',
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            {filteredTopics.length}{' '}
            {filteredTopics.length === 1
              ? 'tema'
              : 'temas'}
          </span>
        </div>

        <section
          style={{
            display: 'grid',
            gap: 18,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          }}
        >
          {filteredTopics.map((topic) => (
            <EssayTopicCard
              key={topic.id}
              topic={topic}
              onSelect={selectTopic}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

function getCategoryIcon(category: CategoryFilter) {
  const icons: Record<CategoryFilter, string> = {
    Todos: '📝',
    Educação: '📚',
    Tecnologia: '📱',
    Saúde: '❤️',
    Sociedade: '👥',
    'Meio ambiente': '🌱',
    Cultura: '🎭',
  }

  return icons[category]
}