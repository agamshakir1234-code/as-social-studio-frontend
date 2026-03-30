import { createContext, useContext, useState, useCallback } from 'react'
import { login as apiLogin, register as apiRegister } from '@/services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })

  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  const login = useCallback(async (credentials) => {
    const res = await apiLogin(credentials)
    const { token: tok, user: usr } = res
    localStorage.setItem('token', tok)
    localStorage.setItem('user', JSON.stringify(usr))
    setToken(tok)
    setUser(usr)
    return usr
  }, [])

  const signup = useCallback(async (data) => {
    const res = await apiRegister(data)
    const { token: tok, user: usr } = res
    localStorage.setItem('token', tok)
    localStorage.setItem('user', JSON.stringify(usr))
    setToken(tok)
    setUser(usr)
    return usr
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

