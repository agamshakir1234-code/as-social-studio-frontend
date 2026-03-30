// DEMO API — אין backend אמיתי

export const login = async (email, password) => {
  return {
    data: {
      token: "demo-token",
      user: {
        email,
        role: "admin"
      }
    }
  }
}

export const register = async (email, password) => {
  return {
    data: {
      token: "demo-token",
      user: {
        email,
        role: "admin"
      }
    }
  }
}
