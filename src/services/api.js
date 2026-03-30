import axios from 'axios'

// כתובת ה‑API של ה‑backend שלך
const BASE_URL = 'https://as-social.netlify.app/.netlify/functions'

// יצירת אינסטנס של axios
const http = axios.create({ baseURL: BASE_URL })

// — Request interceptor — הוספת JWT לכל בקשה —
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// — Response interceptor — טיפול ב‑401 —
http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

// פונקציה שמחזירה רק את ה‑data
const unwrap = (res) => res.data

// ——— AUTH ———
export const login = (data) => http.post('/login', data).then(unwrap)
export const register = (data) => http.post('/register', data).then(unwrap)
