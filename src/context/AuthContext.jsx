import { createContext, useContext, useState, useEffect } from "react"
import * as api from "@/services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")

    if (token && email) {
      setUser({ email })
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.login(email, password)
    setUser(res.data.user)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("email", res.data.user.email)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
