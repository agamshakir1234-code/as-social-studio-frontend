import axios from 'axios'

const BASE_URL = 'https://as-social.netlify.app/.netlify/functions'

const http = axios.create({ baseURL: BASE_URL })

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

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

const unwrap = (res) => res.data

export const login = (data) => http.post('/login', data).then(unwrap)
export const register = (data) => http.post('/register', data).then(unwrap)

