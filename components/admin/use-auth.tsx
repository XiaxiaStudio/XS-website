"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"

interface AuthUser {
  username: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "same-origin" })
      if (res.ok) {
        const data = await res.json()
        return data.user as AuthUser | null
      }
      return null
    } catch {
      return null
    }
  }, [])

  const refresh = useCallback(async () => {
    const user = await fetchUser()
    setUser(user)
  }, [fetchUser])

  useEffect(() => {
    let mounted = true
    const init = async () => {
      const user = await fetchUser()
      if (mounted) {
        setUser(user)
        setLoading(false)
      }
    }
    init()
    return () => {
      mounted = false
    }
  }, [fetchUser])

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "same-origin",
      })
      const data = await res.json()
      if (res.ok) {
        await refresh()
        return { success: true }
      }
      return { success: false, message: data.message || "登录失败" }
    } catch {
      return { success: false, message: "网络错误" }
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
