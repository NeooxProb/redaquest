import type { EssayTopic } from '../../types/essay'

interface EssayTopicCardProps {
  topic: EssayTopic
  onSelect: (topic: EssayTopic) => void
}

const difficultyStyles = {
  Fácil: {
    background: '#dcfce7',
    color: '#166534',
  },
  Médio: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  Difícil: {
    background: '#fee2e2',
    color: '#b91c1c',
  },
}

export function EssayTopicCard({
  topic,
  onSelect,
}: EssayTopicCardProps) {
  const difficultyStyle =
    difficultyStyles[topic.difficulty]

  return (
    <article
      style={{
        background: '#ffffff',
        border: topic.featured
          ? '2px solid #7c3aed'
          : '1px solid #e2e8f0',
        borderRadius: 24,
        boxShadow: topic.featured
          ? '0 14px 34px rgba(124, 58, 237, 0.16)'
          : '0 8px 24px rgba(15, 23, 42, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 345,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {topic.featured && (
        <div
          style={{
            background:
              'linear-gradient(90deg, #7c3aed, #3b82f6)',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 0.8,
            padding: '7px 12px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          ⭐ Tema da semana
        </div>
      )}

      <div
        style={{
          background:
            'linear-gradient(135deg, #ede9fe, #dbeafe)',
          padding: 20,
        }}
      >
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: 14,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #c4b5fd',
              borderRadius: 18,
              display: 'flex',
              fontSize: 32,
              height: 64,
              justifyContent: 'center',
              width: 64,
            }}
          >
            {topic.icon}
          </div>

          <span
            style={{
              background: difficultyStyle.background,
              borderRadius: 999,
              color: difficultyStyle.color,
              fontSize: 10,
              fontWeight: 900,
              padding: '6px 10px',
              textTransform: 'uppercase',
            }}
          >
            {topic.difficulty}
          </span>
        </div>

        <span
          style={{
            color: '#6d28d9',
            display: 'block',
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 0.5,
            marginTop: 17,
            textTransform: 'uppercase',
          }}
        >
          {topic.category}
        </span>

        <h3
          style={{
            color: '#172033',
            fontSize: 19,
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '6px 0 0',
          }}
        >
          {topic.shortTitle}
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: 20,
        }}
      >
        <p
          style={{
            color: '#64748b',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {topic.description}
        </p>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 17,
          }}
        >
          <span
            style={{
              background: '#f1f5f9',
              borderRadius: 999,
              color: '#475569',
              fontSize: 11,
              fontWeight: 800,
              padding: '6px 10px',
            }}
          >
            ⏱️ {topic.estimatedMinutes} min
          </span>

          <span
            style={{
              background: '#fef3c7',
              borderRadius: 999,
              color: '#a16207',
              fontSize: 11,
              fontWeight: 900,
              padding: '6px 10px',
            }}
          >
            ⚡ +{topic.rewardXp} XP
          </span>

          <span
            style={{
              background: '#ecfdf5',
              borderRadius: 999,
              color: '#15803d',
              fontSize: 11,
              fontWeight: 800,
              padding: '6px 10px',
            }}
          >
            📄 {topic.motivationalTexts.length} textos
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(topic)}
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
            marginTop: 'auto',
            minHeight: 47,
            padding: '12px 16px',
            width: '100%',
          }}
        >
          Escolher este tema
        </button>
      </div>
    </article>
  )
}