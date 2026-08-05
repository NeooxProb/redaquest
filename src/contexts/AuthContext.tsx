import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  Session,
  User,
} from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthResult {
  error: string | null
  needsEmailConfirmation?: boolean
}

interface AuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  signUp: (
    name: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<AuthResult>
  signIn: (
    email: string,
    password: string,
  ) => Promise<AuthResult>
  signOut: () => Promise<AuthResult>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined)

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [session, setSession] =
    useState<Session | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadSession() {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession()

      if (!active) {
        return
      }

      if (error) {
        console.error(
          'Erro ao carregar sessão:',
          error.message,
        )
      }

      setSession(currentSession)
      setLoading(false)
    }

    void loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) {
          return
        }

        setSession(nextSession)
        setLoading(false)
      },
    )

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function signUp(
    name: string,
    username: string,
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          name: name.trim(),
          username: username.trim(),
        },
      },
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return {
      error: null,
      needsEmailConfirmation: data.session === null,
    }
  }

  async function signIn(
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

    return {
      error: error?.message ?? null,
    }
  }

  async function signOut(): Promise<AuthResult> {
    const { error } = await supabase.auth.signOut()

    return {
      error: error?.message ?? null,
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signUp,
      signIn,
      signOut,
    }),
    [session, loading],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth precisa ser utilizado dentro do AuthProvider.',
    )
  }

  return context
}