import api from '@/lib/api'
import type { LoginRequest, LoginResponse } from '@/types/auth'

export const authService = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>('/api/v1/auth/login', data).then((res) => res.data),

  logout: () =>
    api.post('/api/v1/auth/logout'),

  refreshToken: () =>
    api.post('/api/v1/auth/refresh'),

  getMe: () =>
    api.get('/api/v1/auth/me'),
}
