import { useState } from 'react'
import {
  landingFaqs,
  landingFeatures,
  landingPlans,
  landingSteps,
} from '../data/landingData'
import type { LandingPlan } from '../types/landing'
import type { NavProps } from '../types/navigation'

export default function LandingScreen({
  navigate,
}: NavProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(
    null,
  )

  function scrollToSection(sectionId: string) {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
  style={{
    background: '#ffffff',
    color: '#172033',
    fontFamily: 'Nunito, sans-serif',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    width: '100%',
  }}
    >
      <header
        style={{
          background: 'rgba(255,255,255,0.96)',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            justifyContent: 'space-between',
            margin: '0 auto',
            maxWidth: 1320,
            minHeight: 72,
            padding: '12px clamp(18px, 4vw, 58px)',
            width: '100%',
          }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('inicio')}
            style={{
              alignItems: 'center',
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              display: 'flex',
              fontFamily: 'inherit',
              gap: 10,
              padding: 0,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                background:
                  'linear-gradient(135deg, #7c3aed, #2563eb)',
                borderRadius: 14,
                boxShadow:
                  '0 8px 18px rgba(124,58,237,0.22)',
                color: '#ffffff',
                display: 'flex',
                fontSize: 22,
                height: 43,
                justifyContent: 'center',
                width: 43,
              }}
            >
              R
            </div>

            <div style={{ textAlign: 'left' }}>
              <strong
                style={{
                  color: '#172033',
                  display: 'block',
                  fontSize: 19,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                RedaQuest
              </strong>

              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                Sua jornada rumo aos 1000
              </span>
            </div>
          </button>

          <nav
            style={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <NavigationButton
              label="Recursos"
              onClick={() => scrollToSection('recursos')}
            />

            <NavigationButton
              label="Como funciona"
              onClick={() => scrollToSection('como-funciona')}
            />

            <NavigationButton
              label="Planos"
              onClick={() => scrollToSection('planos')}
            />

            <NavigationButton
              label="Dúvidas"
              onClick={() => scrollToSection('duvidas')}
            />
          </nav>

          <button
            type="button"
            onClick={() => navigate('home')}
            style={{
              background:
                'linear-gradient(90deg, #7c3aed, #3b82f6)',
              border: 0,
              borderRadius: 13,
              boxShadow:
                '0 8px 20px rgba(124,58,237,0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 900,
              minHeight: 43,
              padding: '10px 17px',
            }}
          >
            Entrar no RedaQuest
          </button>
        </div>
      </header>

      <main>
        <section
          id="inicio"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.24), transparent 28%), radial-gradient(circle at 18% 18%, rgba(124,58,237,0.26), transparent 30%), linear-gradient(145deg, #f5f3ff 0%, #eff6ff 48%, #ffffff 100%)',
            overflow: 'hidden',
            padding:
              'clamp(62px, 8vw, 105px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'grid',
              gap: 'clamp(42px, 7vw, 90px)',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              margin: '0 auto',
              maxWidth: 1320,
              width: '100%',
            }}
          >
            <div>
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid #c4b5fd',
                  borderRadius: 999,
                  boxShadow:
                    '0 8px 24px rgba(124,58,237,0.09)',
                  color: '#6d28d9',
                  display: 'inline-flex',
                  fontSize: 11,
                  fontWeight: 900,
                  gap: 7,
                  padding: '8px 13px',
                }}
              >
                ⚔️ Aprenda redação como uma aventura
              </div>

              <h1
                style={{
                  color: '#172033',
                  fontSize: 'clamp(39px, 7vw, 74px)',
                  fontWeight: 900,
                  letterSpacing: -2,
                  lineHeight: 1.02,
                  margin: '20px 0 20px',
                  maxWidth: 760,
                }}
              >
                Transforme a redação do ENEM em uma{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #7c3aed, #2563eb)',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  jornada de evolução
                </span>
              </h1>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  fontWeight: 700,
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                Pratique com missões, colecione repertórios,
                escreva redações e acompanhe seu desempenho nas
                cinco competências do ENEM.
              </p>

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 11,
                  marginTop: 29,
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  style={{
                    background:
                      'linear-gradient(90deg, #7c3aed, #2563eb)',
                    border: 0,
                    borderRadius: 16,
                    boxShadow:
                      '0 12px 26px rgba(124,58,237,0.25)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: 900,
                    minHeight: 54,
                    padding: '13px 23px',
                  }}
                >
                  Começar gratuitamente →
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection('como-funciona')
                  }
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: 16,
                    color: '#475569',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: 900,
                    minHeight: 54,
                    padding: '13px 22px',
                  }}
                >
                  Ver como funciona
                </button>
              </div>

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 18,
                  marginTop: 29,
                }}
              >
                <HeroDetail icon="✓" text="Acesso gratuito" />
                <HeroDetail icon="✓" text="Sem cartão" />
                <HeroDetail icon="✓" text="Funciona no celular" />
              </div>
            </div>

            <HeroPreview />
          </div>
        </section>

        <section
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            borderTop: '1px solid #e2e8f0',
            padding: '25px clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 18,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(150px, 1fr))',
              margin: '0 auto',
              maxWidth: 1100,
              textAlign: 'center',
            }}
          >
            <QuickStat value="5" label="Competências do ENEM" />
            <QuickStat value="6+" label="Temas demonstrativos" />
            <QuickStat value="12" label="Cartas colecionáveis" />
            <QuickStat value="1000" label="Pontos para conquistar" />
          </div>
        </section>

        <section
          id="recursos"
          style={{
            background: '#f8fafc',
            padding:
              'clamp(68px, 8vw, 100px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 1320,
              width: '100%',
            }}
          >
            <SectionIntroduction
              eyebrow="Recursos da plataforma"
              title="Tudo o que você precisa para evoluir"
              description="O RedaQuest reúne prática, acompanhamento e gamificação em uma experiência criada para reduzir o bloqueio diante da redação."
            />

            <div
              style={{
                display: 'grid',
                gap: 18,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                marginTop: 38,
              }}
            >
              {landingFeatures.map((feature) => (
                <article
                  key={feature.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 24,
                    boxShadow:
                      '0 8px 25px rgba(15,23,42,0.05)',
                    padding: 23,
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      background:
                        'linear-gradient(135deg, #ede9fe, #dbeafe)',
                      borderRadius: 17,
                      display: 'flex',
                      fontSize: 30,
                      height: 60,
                      justifyContent: 'center',
                      width: 60,
                    }}
                  >
                    {feature.icon}
                  </div>

                  <h3
                    style={{
                      color: '#172033',
                      fontSize: 19,
                      fontWeight: 900,
                      margin: '18px 0 8px',
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      color: '#64748b',
                      fontSize: 13,
                      fontWeight: 700,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          style={{
            background:
              'linear-gradient(145deg, #172033, #1e1b4b)',
            color: '#ffffff',
            padding:
              'clamp(70px, 8vw, 105px) clamp(18px, 4vw, 58px)',
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
                margin: '0 auto',
                maxWidth: 760,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  color: '#c4b5fd',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Como funciona
              </span>

              <h2
                style={{
                  fontSize: 'clamp(29px, 5vw, 45px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: '8px 0 13px',
                }}
              >
                Da primeira missão à redação completa
              </h2>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Uma sequência simples para transformar estudo em
                prática constante.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 18,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 245px), 1fr))',
                marginTop: 43,
              }}
            >
              {landingSteps.map((step) => (
                <article
                  key={step.id}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border:
                      '1px solid rgba(255,255,255,0.13)',
                    borderRadius: 23,
                    padding: 22,
                  }}
                >
                  <span
                    style={{
                      color: '#a78bfa',
                      display: 'block',
                      fontSize: 28,
                      fontWeight: 900,
                    }}
                  >
                    {step.number}
                  </span>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      margin: '15px 0 8px',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: 13,
                      fontWeight: 700,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </article>
              ))}
            </div>

            <div
              style={{
                marginTop: 34,
                textAlign: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => navigate('home')}
                style={{
                  background: '#ffffff',
                  border: 0,
                  borderRadius: 15,
                  color: '#6d28d9',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: 900,
                  minHeight: 52,
                  padding: '12px 23px',
                }}
              >
                Iniciar minha jornada
              </button>
            </div>
          </div>
        </section>

        <section
          style={{
            background: '#ffffff',
            padding:
              'clamp(68px, 8vw, 100px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'grid',
              gap: 'clamp(35px, 7vw, 80px)',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 390px), 1fr))',
              margin: '0 auto',
              maxWidth: 1220,
            }}
          >
            <div>
              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Aprendizado gamificado
              </span>

              <h2
                style={{
                  color: '#172033',
                  fontSize: 'clamp(29px, 5vw, 45px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: '9px 0 15px',
                }}
              >
                Estudar redação não precisa ser cansativo
              </h2>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Cada atividade concluída rende experiência,
                aumenta seu nível e aproxima você de novas cartas
                e conquistas.
              </p>

              <div
                style={{
                  display: 'grid',
                  gap: 12,
                  marginTop: 24,
                }}
              >
                <BenefitItem text="Missões curtas para estudar sem sobrecarga" />
                <BenefitItem text="Progresso dividido pelas cinco competências" />
                <BenefitItem text="Metas, níveis e conquistas para manter a constância" />
                <BenefitItem text="Rascunhos salvos automaticamente" />
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(145deg, #ede9fe, #dbeafe)',
                border: '1px solid #c4b5fd',
                borderRadius: 30,
                padding: 'clamp(22px, 5vw, 42px)',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 23,
                  boxShadow:
                    '0 18px 45px rgba(76,29,149,0.13)',
                  padding: 22,
                }}
              >
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 13,
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      background:
                        'linear-gradient(135deg, #7c3aed, #3b82f6)',
                      borderRadius: 999,
                      display: 'flex',
                      fontSize: 28,
                      height: 64,
                      justifyContent: 'center',
                      width: 64,
                    }}
                  >
                    🚀
                  </div>

                  <div>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: 18,
                        fontWeight: 900,
                      }}
                    >
                      Nível 12
                    </strong>

                    <span
                      style={{
                        color: '#64748b',
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      Argumentador em evolução
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 21 }}>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        color: '#475569',
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      Próximo nível
                    </span>

                    <span
                      style={{
                        color: '#7c3aed',
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      2.410/3.000 XP
                    </span>
                  </div>

                  <div
                    style={{
                      background: '#e2e8f0',
                      borderRadius: 999,
                      height: 11,
                      marginTop: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background:
                          'linear-gradient(90deg, #7c3aed, #3b82f6)',
                        borderRadius: 999,
                        height: '100%',
                        width: '80%',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gap: 10,
                    gridTemplateColumns:
                      'repeat(3, minmax(0, 1fr))',
                    marginTop: 20,
                  }}
                >
                  <MiniAchievement icon="🔥" value="7 dias" />
                  <MiniAchievement icon="🏆" value="#5" />
                  <MiniAchievement icon="🃏" value="7/12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="planos"
          style={{
            background: '#f8fafc',
            padding:
              'clamp(68px, 8vw, 100px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 1220,
              width: '100%',
            }}
          >
            <SectionIntroduction
              eyebrow="Planos demonstrativos"
              title="Escolha como deseja evoluir"
              description="Os planos abaixo representam uma possibilidade comercial futura e ainda não estão disponíveis para contratação."
            />

            <div
              style={{
                alignItems: 'stretch',
                display: 'grid',
                gap: 19,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
                marginTop: 39,
              }}
            >
              {landingPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={() => navigate('home')}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="duvidas"
          style={{
            background: '#ffffff',
            padding:
              'clamp(68px, 8vw, 100px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 900,
              width: '100%',
            }}
          >
            <SectionIntroduction
              eyebrow="Perguntas frequentes"
              title="Dúvidas sobre o RedaQuest"
              description="Confira as principais informações sobre a versão demonstrativa da plataforma."
            />

            <div
              style={{
                display: 'grid',
                gap: 11,
                marginTop: 36,
              }}
            >
              {landingFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id

                return (
                  <article
                    key={faq.id}
                    style={{
                      background: isOpen
                        ? '#f5f3ff'
                        : '#ffffff',
                      border: isOpen
                        ? '1px solid #c4b5fd'
                        : '1px solid #e2e8f0',
                      borderRadius: 18,
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqId(
                          isOpen ? null : faq.id,
                        )
                      }
                      aria-expanded={isOpen}
                      style={{
                        alignItems: 'center',
                        background: 'transparent',
                        border: 0,
                        color: '#172033',
                        cursor: 'pointer',
                        display: 'flex',
                        fontFamily: 'inherit',
                        fontSize: 14,
                        fontWeight: 900,
                        gap: 14,
                        justifyContent: 'space-between',
                        minHeight: 62,
                        padding: '16px 18px',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      {faq.question}

                      <span
                        style={{
                          alignItems: 'center',
                          background: isOpen
                            ? '#7c3aed'
                            : '#ede9fe',
                          borderRadius: 999,
                          color: isOpen
                            ? '#ffffff'
                            : '#6d28d9',
                          display: 'flex',
                          flexShrink: 0,
                          fontSize: 19,
                          height: 31,
                          justifyContent: 'center',
                          width: 31,
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <p
                        style={{
                          borderTop: '1px solid #ddd6fe',
                          color: '#64748b',
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.65,
                          margin: 0,
                          padding: '17px 18px 19px',
                        }}
                      >
                        {faq.answer}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          style={{
            background:
              'linear-gradient(135deg, #6d28d9, #2563eb)',
            color: '#ffffff',
            padding:
              'clamp(55px, 7vw, 82px) clamp(18px, 4vw, 58px)',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 850,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: 48,
              }}
            >
              🚀
            </span>

            <h2
              style={{
                fontSize: 'clamp(30px, 5vw, 48px)',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '15px 0 13px',
              }}
            >
              Sua próxima redação pode ser melhor que a anterior
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.65,
                margin: '0 auto',
                maxWidth: 660,
              }}
            >
              Entre no RedaQuest, escolha sua primeira missão e
              comece a construir uma rotina de prática.
            </p>

            <button
              type="button"
              onClick={() => navigate('home')}
              style={{
                background: '#ffffff',
                border: 0,
                borderRadius: 16,
                boxShadow:
                  '0 12px 30px rgba(30,41,59,0.22)',
                color: '#6d28d9',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 900,
                marginTop: 26,
                minHeight: 54,
                padding: '13px 24px',
              }}
            >
              Experimentar o RedaQuest →
            </button>
          </div>
        </section>
      </main>

      <footer
        style={{
          background: '#111827',
          color: '#ffffff',
          padding: '42px clamp(18px, 4vw, 58px) 27px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 30,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            margin: '0 auto',
            maxWidth: 1320,
          }}
        >
          <div>
            <strong
              style={{
                display: 'block',
                fontSize: 21,
                fontWeight: 900,
              }}
            >
              ⚔️ RedaQuest
            </strong>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1.65,
                margin: '12px 0 0',
                maxWidth: 330,
              }}
            >
              Uma experiência gamificada para ajudar estudantes a
              praticar redação e acompanhar sua evolução.
            </p>
          </div>

          <FooterColumn
            title="Plataforma"
            items={[
              'Missões',
              'Editor de redação',
              'Biblioteca',
              'Ranking',
            ]}
          />

          <FooterColumn
            title="Informações"
            items={[
              'Como funciona',
              'Planos demonstrativos',
              'Perguntas frequentes',
              'Correção simulada',
            ]}
          />

          <div>
            <strong
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              Projeto demonstrativo
            </strong>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1.6,
                margin: '10px 0 0',
              }}
            >
              Os dados, notas, planos e funcionalidades desta
              versão são simulados.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #334155',
            color: '#64748b',
            fontSize: 10,
            fontWeight: 800,
            margin: '32px auto 0',
            maxWidth: 1320,
            paddingTop: 21,
            textAlign: 'center',
          }}
        >
          © 2026 RedaQuest — Projeto educacional demonstrativo.
        </div>
      </footer>
    </div>
  )
}

interface NavigationButtonProps {
  label: string
  onClick: () => void
}

function NavigationButton({
  label,
  onClick,
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 0,
        color: '#64748b',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 11,
        fontWeight: 900,
        minHeight: 38,
        padding: '8px 10px',
      }}
    >
      {label}
    </button>
  )
}

interface HeroDetailProps {
  icon: string
  text: string
}

function HeroDetail({ icon, text }: HeroDetailProps) {
  return (
    <span
      style={{
        alignItems: 'center',
        color: '#64748b',
        display: 'flex',
        fontSize: 11,
        fontWeight: 900,
        gap: 6,
      }}
    >
      <span
        style={{
          alignItems: 'center',
          background: '#dcfce7',
          borderRadius: 999,
          color: '#15803d',
          display: 'flex',
          height: 22,
          justifyContent: 'center',
          width: 22,
        }}
      >
        {icon}
      </span>

      {text}
    </span>
  )
}

function HeroPreview() {
  return (
    <div
      style={{
        background:
          'linear-gradient(145deg, rgba(124,58,237,0.17), rgba(59,130,246,0.17))',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 34,
        padding: 'clamp(17px, 4vw, 30px)',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 27,
          boxShadow:
            '0 30px 65px rgba(76,29,149,0.16)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background:
              'linear-gradient(90deg, #7c3aed, #2563eb)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            padding: 17,
          }}
        >
          <div>
            <span
              style={{
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                fontSize: 9,
                fontWeight: 900,
                textTransform: 'uppercase',
              }}
            >
              Jornada atual
            </span>

            <strong
              style={{
                display: 'block',
                fontSize: 16,
                fontWeight: 900,
                marginTop: 3,
              }}
            >
              Argumentação
            </strong>
          </div>

          <span
            style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 900,
              padding: '8px 11px',
            }}
          >
            Nível 12
          </span>
        </div>

        <div style={{ padding: 20 }}>
          <div
            style={{
              background:
                'linear-gradient(135deg, #f5f3ff, #eff6ff)',
              border: '1px solid #ddd6fe',
              borderRadius: 19,
              padding: 17,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 13,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: 15,
                  display: 'flex',
                  fontSize: 28,
                  height: 54,
                  justifyContent: 'center',
                  width: 54,
                }}
              >
                ⚔️
              </div>

              <div style={{ flex: 1 }}>
                <span
                  style={{
                    color: '#7c3aed',
                    fontSize: 9,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                  }}
                >
                  Missão recomendada
                </span>

                <strong
                  style={{
                    color: '#172033',
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 900,
                    marginTop: 3,
                  }}
                >
                  Escolha o conectivo
                </strong>
              </div>

              <span
                style={{
                  color: '#a16207',
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                +120 XP
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
              gridTemplateColumns:
                'repeat(2, minmax(0, 1fr))',
              marginTop: 13,
            }}
          >
            <PreviewCard
              icon="🔥"
              value="7 dias"
              label="Sequência"
            />

            <PreviewCard
              icon="🏆"
              value="#5"
              label="Ranking"
            />

            <PreviewCard
              icon="📝"
              value="840"
              label="Última nota"
            />

            <PreviewCard
              icon="🃏"
              value="7/12"
              label="Cartas"
            />
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 17,
              marginTop: 13,
              padding: 15,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <strong
                style={{
                  color: '#172033',
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                Progresso semanal
              </strong>

              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 10,
                  fontWeight: 900,
                }}
              >
                72%
              </span>
            </div>

            <div
              style={{
                background: '#e2e8f0',
                borderRadius: 999,
                height: 9,
                marginTop: 9,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(90deg, #7c3aed, #3b82f6)',
                  borderRadius: 999,
                  height: '100%',
                  width: '72%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PreviewCardProps {
  icon: string
  value: string
  label: string
}

function PreviewCard({
  icon,
  value,
  label,
}: PreviewCardProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 13,
      }}
    >
      <span style={{ fontSize: 19 }}>{icon}</span>

      <strong
        style={{
          color: '#172033',
          display: 'block',
          fontSize: 15,
          fontWeight: 900,
          marginTop: 5,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: '#94a3b8',
          fontSize: 9,
          fontWeight: 800,
        }}
      >
        {label}
      </span>
    </div>
  )
}

interface QuickStatProps {
  value: string
  label: string
}

function QuickStat({ value, label }: QuickStatProps) {
  return (
    <div>
      <strong
        style={{
          color: '#6d28d9',
          display: 'block',
          fontSize: 28,
          fontWeight: 900,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: '#64748b',
          fontSize: 10,
          fontWeight: 900,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

interface SectionIntroductionProps {
  eyebrow: string
  title: string
  description: string
}

function SectionIntroduction({
  eyebrow,
  title,
  description,
}: SectionIntroductionProps) {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 760,
        textAlign: 'center',
      }}
    >
      <span
        style={{
          color: '#7c3aed',
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </span>

      <h2
        style={{
          color: '#172033',
          fontSize: 'clamp(29px, 5vw, 45px)',
          fontWeight: 900,
          lineHeight: 1.15,
          margin: '8px 0 13px',
        }}
      >
        {title}
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
        {description}
      </p>
    </div>
  )
}

interface BenefitItemProps {
  text: string
}

function BenefitItem({ text }: BenefitItemProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 11,
      }}
    >
      <span
        style={{
          alignItems: 'center',
          background: '#dcfce7',
          borderRadius: 999,
          color: '#15803d',
          display: 'flex',
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 900,
          height: 27,
          justifyContent: 'center',
          width: 27,
        }}
      >
        ✓
      </span>

      <span
        style={{
          color: '#475569',
          fontSize: 13,
          fontWeight: 800,
        }}
      >
        {text}
      </span>
    </div>
  )
}

interface MiniAchievementProps {
  icon: string
  value: string
}

function MiniAchievement({
  icon,
  value,
}: MiniAchievementProps) {
  return (
    <div
      style={{
        background: '#f8fafc',
        borderRadius: 14,
        padding: 11,
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: 19 }}>{icon}</span>

      <strong
        style={{
          color: '#475569',
          display: 'block',
          fontSize: 11,
          fontWeight: 900,
          marginTop: 4,
        }}
      >
        {value}
      </strong>
    </div>
  )
}

interface PlanCardProps {
  plan: LandingPlan
  onSelect: () => void
}

function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <article
      style={{
        background: plan.featured
          ? 'linear-gradient(145deg, #ffffff, #f5f3ff)'
          : '#ffffff',
        border: plan.featured
          ? '2px solid #7c3aed'
          : '1px solid #e2e8f0',
        borderRadius: 26,
        boxShadow: plan.featured
          ? '0 20px 45px rgba(124,58,237,0.15)'
          : '0 8px 25px rgba(15,23,42,0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {plan.featured && (
        <div
          style={{
            background:
              'linear-gradient(90deg, #7c3aed, #3b82f6)',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 0.8,
            padding: '8px 12px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Mais escolhido
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: 24,
        }}
      >
        <h3
          style={{
            color: '#172033',
            fontSize: 22,
            fontWeight: 900,
            margin: 0,
          }}
        >
          {plan.name}
        </h3>

        <p
          style={{
            color: '#64748b',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.55,
            margin: '8px 0 20px',
          }}
        >
          {plan.description}
        </p>

        <div
          style={{
            alignItems: 'flex-end',
            display: 'flex',
            gap: 5,
          }}
        >
          <strong
            style={{
              color: plan.featured
                ? '#6d28d9'
                : '#172033',
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            {plan.price}
          </strong>

          {plan.period && (
            <span
              style={{
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              {plan.period}
            </span>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gap: 11,
            margin: '23px 0',
          }}
        >
          {plan.features.map((feature) => (
            <div
              key={feature}
              style={{
                alignItems: 'flex-start',
                color: '#475569',
                display: 'flex',
                fontSize: 12,
                fontWeight: 700,
                gap: 9,
                lineHeight: 1.45,
              }}
            >
              <span
                style={{
                  color: '#16a34a',
                  fontWeight: 900,
                }}
              >
                ✓
              </span>

              {feature}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onSelect}
          style={{
            background: plan.featured
              ? 'linear-gradient(90deg, #7c3aed, #3b82f6)'
              : '#ede9fe',
            border: 0,
            borderRadius: 14,
            color: plan.featured
              ? '#ffffff'
              : '#6d28d9',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 900,
            marginTop: 'auto',
            minHeight: 49,
            width: '100%',
          }}
        >
          {plan.buttonLabel}
        </button>
      </div>
    </article>
  )
}

interface FooterColumnProps {
  title: string
  items: string[]
}

function FooterColumn({
  title,
  items,
}: FooterColumnProps) {
  return (
    <div>
      <strong
        style={{
          display: 'block',
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        {title}
      </strong>

      <div
        style={{
          display: 'grid',
          gap: 8,
          marginTop: 12,
        }}
      >
        {items.map((item) => (
          <span
            key={item}
            style={{
              color: '#94a3b8',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}