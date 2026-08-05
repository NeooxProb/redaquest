import {
  useEffect,
  useState,
  type FormEvent,
} from 'react'
import { useAuth } from '../contexts/AuthContext'
import type { NavProps } from '../types/navigation'

type AuthMode = 'sign-in' | 'sign-up'

export default function AuthScreen({
  navigate,
}: NavProps) {
  const {
    user,
    loading,
    signIn,
    signUp,
  } = useAuth()

  const [mode, setMode] =
    useState<AuthMode>('sign-in')

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] =
    useState('')

  useEffect(() => {
    if (!loading && user) {
      navigate('home')
    }
  }, [loading, user, navigate])

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setErrorMessage('')
    setSuccessMessage('')
    setPassword('')
    setConfirmPassword('')
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    if (!email.trim()) {
      setErrorMessage('Informe seu e-mail.')
      return
    }

    if (!password) {
      setErrorMessage('Informe sua senha.')
      return
    }

    if (mode === 'sign-up') {
      if (!name.trim()) {
        setErrorMessage('Informe seu nome.')
        return
      }

      if (!username.trim()) {
        setErrorMessage('Escolha um nome de usuário.')
        return
      }

      if (username.trim().length < 3) {
        setErrorMessage(
          'O nome de usuário precisa ter pelo menos 3 caracteres.',
        )
        return
      }

      if (password.length < 6) {
        setErrorMessage(
          'A senha precisa ter pelo menos 6 caracteres.',
        )
        return
      }

      if (password !== confirmPassword) {
        setErrorMessage('As senhas não são iguais.')
        return
      }
    }

    setSubmitting(true)

    try {
      if (mode === 'sign-in') {
        const result = await signIn(email, password)

        if (result.error) {
          setErrorMessage(
            translateAuthError(result.error),
          )
          return
        }

        navigate('home')
        return
      }

      const result = await signUp(
        name,
        normalizeUsername(username),
        email,
        password,
      )

      if (result.error) {
        setErrorMessage(
          translateAuthError(result.error),
        )
        return
      }

      if (result.needsEmailConfirmation) {
        setSuccessMessage(
          'Cadastro realizado! Abra seu e-mail e confirme a conta antes de entrar.',
        )

        setPassword('')
        setConfirmPassword('')
        return
      }

      navigate('home')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(145deg, #ede9fe, #eff6ff)',
          display: 'flex',
          fontFamily: 'Nunito, sans-serif',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#6d28d9',
            fontSize: 15,
            fontWeight: 900,
          }}
        >
          Carregando RedaQuest...
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background:
          'radial-gradient(circle at 15% 15%, rgba(124,58,237,0.25), transparent 27%), radial-gradient(circle at 85% 20%, rgba(59,130,246,0.22), transparent 30%), linear-gradient(145deg, #f5f3ff, #eff6ff)',
        fontFamily: 'Nunito, sans-serif',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 'clamp(18px, 4vw, 42px)',
        width: '100%',
      }}
    >
      <main
        style={{
          display: 'grid',
          gap: 'clamp(25px, 5vw, 65px)',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 390px), 1fr))',
          margin: '0 auto',
          maxWidth: 1180,
          minHeight: 'calc(100vh - 84px)',
          width: '100%',
        }}
      >
        <section
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(10px, 4vw, 38px) 0',
          }}
        >
          <button
            type="button"
            onClick={() => navigate('landing')}
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
                borderRadius: 15,
                boxShadow:
                  '0 10px 24px rgba(124,58,237,0.22)',
                color: '#ffffff',
                display: 'flex',
                fontSize: 23,
                fontWeight: 900,
                height: 48,
                justifyContent: 'center',
                width: 48,
              }}
            >
              R
            </div>

            <div style={{ textAlign: 'left' }}>
              <strong
                style={{
                  color: '#172033',
                  display: 'block',
                  fontSize: 21,
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
                  letterSpacing: 0.7,
                  textTransform: 'uppercase',
                }}
              >
                Sua jornada rumo aos 1000
              </span>
            </div>
          </button>

          <div style={{ marginTop: 45 }}>
            <span
              style={{
                background: '#ffffff',
                border: '1px solid #c4b5fd',
                borderRadius: 999,
                color: '#6d28d9',
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 900,
                padding: '8px 13px',
              }}
            >
              ⚔️ Aprenda praticando
            </span>

            <h1
              style={{
                color: '#172033',
                fontSize: 'clamp(37px, 6vw, 62px)',
                fontWeight: 900,
                letterSpacing: -1.5,
                lineHeight: 1.04,
                margin: '19px 0 16px',
                maxWidth: 600,
              }}
            >
              Sua evolução na redação começa{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #7c3aed, #2563eb)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                agora
              </span>
            </h1>

            <p
              style={{
                color: '#64748b',
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Entre para continuar suas missões, escrever
              redações e acompanhar seu progresso nas cinco
              competências do ENEM.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 12,
              marginTop: 29,
              width: '100%',
            }}
          >
            <AuthBenefit
              icon="⚡"
              title="Progresso salvo"
              description="Seu XP, nível e atividades ficam vinculados à sua conta."
            />

            <AuthBenefit
              icon="✍️"
              title="Rascunhos protegidos"
              description="Continue suas redações em diferentes momentos."
            />

            <AuthBenefit
              icon="🏆"
              title="Jornada personalizada"
              description="Acompanhe conquistas, desempenho e evolução."
            />
          </div>
        </section>

        <section
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(10px, 3vw, 28px) 0',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 30,
              boxShadow:
                '0 28px 70px rgba(76,29,149,0.15)',
              maxWidth: 500,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(135deg, #6d28d9, #2563eb)',
                color: '#ffffff',
                padding: '27px clamp(22px, 5vw, 35px)',
              }}
            >
              <span
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 0.9,
                  textTransform: 'uppercase',
                }}
              >
                {mode === 'sign-in'
                  ? 'Bem-vindo de volta'
                  : 'Comece sua jornada'}
              </span>

              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  margin: '6px 0 5px',
                }}
              >
                {mode === 'sign-in'
                  ? 'Entre na sua conta'
                  : 'Crie sua conta'}
              </h2>

              <p
                style={{
                  color: 'rgba(255,255,255,0.76)',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {mode === 'sign-in'
                  ? 'Continue exatamente de onde parou.'
                  : 'Cadastre-se gratuitamente para salvar seu progresso.'}
              </p>
            </div>

            <div
              style={{
                padding: '24px clamp(21px, 5vw, 34px) 30px',
              }}
            >
              <div
                style={{
                  background: '#f1f5f9',
                  borderRadius: 15,
                  display: 'grid',
                  gap: 5,
                  gridTemplateColumns:
                    'repeat(2, minmax(0, 1fr))',
                  padding: 5,
                }}
              >
                <ModeButton
                  active={mode === 'sign-in'}
                  label="Entrar"
                  onClick={() => changeMode('sign-in')}
                />

                <ModeButton
                  active={mode === 'sign-up'}
                  label="Criar conta"
                  onClick={() => changeMode('sign-up')}
                />
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'grid',
                  gap: 15,
                  marginTop: 23,
                }}
              >
                {mode === 'sign-up' && (
                  <>
                    <FormField
                      id="name"
                      label="Nome"
                      type="text"
                      value={name}
                      placeholder="Como podemos chamar você?"
                      autoComplete="name"
                      onChange={setName}
                    />

                    <FormField
                      id="username"
                      label="Nome de usuário"
                      type="text"
                      value={username}
                      placeholder="exemplo: estudante1000"
                      autoComplete="username"
                      onChange={setUsername}
                    />
                  </>
                )}

                <FormField
                  id="email"
                  label="E-mail"
                  type="email"
                  value={email}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  onChange={setEmail}
                />

                <FormField
                  id="password"
                  label="Senha"
                  type="password"
                  value={password}
                  placeholder={
                    mode === 'sign-up'
                      ? 'Mínimo de 6 caracteres'
                      : 'Digite sua senha'
                  }
                  autoComplete={
                    mode === 'sign-up'
                      ? 'new-password'
                      : 'current-password'
                  }
                  onChange={setPassword}
                />

                {mode === 'sign-up' && (
                  <FormField
                    id="confirm-password"
                    label="Confirme sua senha"
                    type="password"
                    value={confirmPassword}
                    placeholder="Digite a senha novamente"
                    autoComplete="new-password"
                    onChange={setConfirmPassword}
                  />
                )}

                {errorMessage && (
                  <div
                    role="alert"
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fca5a5',
                      borderRadius: 14,
                      color: '#991b1b',
                      fontSize: 12,
                      fontWeight: 800,
                      lineHeight: 1.5,
                      padding: 13,
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div
                    role="status"
                    style={{
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                      borderRadius: 14,
                      color: '#166534',
                      fontSize: 12,
                      fontWeight: 800,
                      lineHeight: 1.5,
                      padding: 13,
                    }}
                  >
                    ✅ {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting
                      ? '#94a3b8'
                      : 'linear-gradient(90deg, #7c3aed, #2563eb)',
                    border: 0,
                    borderRadius: 15,
                    boxShadow: submitting
                      ? 'none'
                      : '0 10px 24px rgba(124,58,237,0.21)',
                    color: '#ffffff',
                    cursor: submitting
                      ? 'not-allowed'
                      : 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: 900,
                    minHeight: 52,
                    padding: '12px 18px',
                    width: '100%',
                  }}
                >
                  {submitting
                    ? 'Aguarde...'
                    : mode === 'sign-in'
                      ? 'Entrar no RedaQuest →'
                      : 'Criar minha conta →'}
                </button>
              </form>

              <p
                style={{
                  color: '#94a3b8',
                  fontSize: 10,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  margin: '18px 0 0',
                  textAlign: 'center',
                }}
              >
                Ao criar uma conta, você concorda em utilizar
                esta versão demonstrativa do RedaQuest.
              </p>

              <button
                type="button"
                onClick={() => navigate('landing')}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: '#64748b',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 11,
                  fontWeight: 900,
                  marginTop: 17,
                  padding: 5,
                  width: '100%',
                }}
              >
                ← Voltar para a página inicial
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

interface AuthBenefitProps {
  icon: string
  title: string
  description: string
}

function AuthBenefit({
  icon,
  title,
  description,
}: AuthBenefitProps) {
  return (
    <article
      style={{
        alignItems: 'center',
        background: 'rgba(255,255,255,0.68)',
        border: '1px solid rgba(196,181,253,0.58)',
        borderRadius: 18,
        display: 'flex',
        gap: 13,
        maxWidth: 530,
        padding: 14,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(135deg, #ede9fe, #dbeafe)',
          borderRadius: 14,
          display: 'flex',
          flexShrink: 0,
          fontSize: 23,
          height: 47,
          justifyContent: 'center',
          width: 47,
        }}
      >
        {icon}
      </div>

      <div>
        <strong
          style={{
            color: '#172033',
            display: 'block',
            fontSize: 13,
            fontWeight: 900,
          }}
        >
          {title}
        </strong>

        <span
          style={{
            color: '#64748b',
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1.45,
          }}
        >
          {description}
        </span>
      </div>
    </article>
  )
}

interface ModeButtonProps {
  active: boolean
  label: string
  onClick: () => void
}

function ModeButton({
  active,
  label,
  onClick,
}: ModeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active
          ? '#ffffff'
          : 'transparent',
        border: 0,
        borderRadius: 11,
        boxShadow: active
          ? '0 4px 12px rgba(15,23,42,0.08)'
          : 'none',
        color: active ? '#6d28d9' : '#64748b',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 12,
        fontWeight: 900,
        minHeight: 40,
      }}
    >
      {label}
    </button>
  )
}

interface FormFieldProps {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  value: string
  placeholder: string
  autoComplete: string
  onChange: (value: string) => void
}

function FormField({
  id,
  label,
  type,
  value,
  placeholder,
  autoComplete,
  onChange,
}: FormFieldProps) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'grid',
        gap: 7,
      }}
    >
      <span
        style={{
          color: '#334155',
          fontSize: 11,
          fontWeight: 900,
        }}
      >
        {label}
      </span>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) =>
          onChange(event.target.value)
        }
        style={{
          background: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: 14,
          color: '#172033',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 700,
          minHeight: 49,
          outline: 'none',
          padding: '11px 14px',
          width: '100%',
        }}
      />
    </label>
  )
}

function normalizeUsername(username: string) {
  return username
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^@+/, '')
}

function translateAuthError(message: string) {
  const normalizedMessage = message.toLowerCase()

  if (
    normalizedMessage.includes(
      'invalid login credentials',
    )
  ) {
    return 'E-mail ou senha incorretos.'
  }

  if (normalizedMessage.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.'
  }

  if (
    normalizedMessage.includes(
      'user already registered',
    )
  ) {
    return 'Já existe uma conta cadastrada com esse e-mail.'
  }

  if (
    normalizedMessage.includes('invalid email') ||
    normalizedMessage.includes(
      'unable to validate email',
    )
  ) {
    return 'Digite um endereço de e-mail válido.'
  }

  if (
    normalizedMessage.includes(
      'password should be at least',
    )
  ) {
    return 'A senha precisa ter pelo menos 6 caracteres.'
  }

  if (
    normalizedMessage.includes('rate limit') ||
    normalizedMessage.includes(
      'email rate limit exceeded',
    )
  ) {
    return 'Muitas tentativas foram realizadas. Aguarde alguns minutos.'
  }

  return message
}