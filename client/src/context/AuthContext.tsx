import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type UserRole = "User" | "Viewer" | "Leadership" | "Administrator"

export interface DemoUser {
  name: string
  email: string
  role: UserRole
}

interface AuthContextValue {
  user: DemoUser | null
  login: (email: string, remember: boolean) => void
  loginWithMyUmbc: () => void
  createAccount: (user: DemoUser, remember: boolean) => void
  logout: () => void
}

const SESSION_KEY = "division-impact-demo-user"
const ACCOUNT_KEY = "division-impact-demo-accounts"

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser() {
  try {
    const value = localStorage.getItem(SESSION_KEY)
    return value ? JSON.parse(value) as DemoUser : null
  } catch {
    return null
  }
}

function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0] || "Demo User"
  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function findDemoAccount(email: string) {
  try {
    const accounts = JSON.parse(
      localStorage.getItem(ACCOUNT_KEY) || "[]",
    ) as DemoUser[]
    return accounts.find(
      (account) => account.email.toLowerCase() === email.toLowerCase(),
    )
  } catch {
    return undefined
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(readStoredUser)

  const saveSession = (nextUser: DemoUser, remember: boolean) => {
    setUser(nextUser)
    if (remember) localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
    else localStorage.removeItem(SESSION_KEY)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, remember) => {
        const account = findDemoAccount(email)
        saveSession(
          account || {
            name: displayNameFromEmail(email),
            email,
            role: "User",
          },
          remember,
        )
      },
      loginWithMyUmbc: () =>
        saveSession(
          {
            name: "myUMBC User",
            email: "user@umbc.edu",
            role: "User",
          },
          false,
        ),
      createAccount: (nextUser, remember) => {
        try {
          const accounts = JSON.parse(
            localStorage.getItem(ACCOUNT_KEY) || "[]",
          ) as DemoUser[]
          const filtered = accounts.filter(
            (account) =>
              account.email.toLowerCase() !== nextUser.email.toLowerCase(),
          )
          localStorage.setItem(
            ACCOUNT_KEY,
            JSON.stringify([...filtered, nextUser]),
          )
        } catch {
          // Account persistence is best-effort in this frontend-only demo.
        }
        saveSession(nextUser, remember)
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
