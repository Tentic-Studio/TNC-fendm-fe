import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach Bearer token
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('fendm-auth')
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      const token = parsed?.state?.accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // corrupt storage, ignore
    }
  }
  return config
})

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fendm-auth')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
