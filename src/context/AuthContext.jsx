const login = async (email, password) => {
  const res = await api.login(email, password)
  setUser(res.data.user)
  localStorage.setItem("token", res.data.token)
  return true
}

