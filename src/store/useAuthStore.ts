import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, Tenant } from '@/types/auth'
import { authService } from '@/services/auth.service'

interface User {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  tenantRole: string
}

interface AuthState {
  accessToken: string | null
  user: User | null
  mustChangePassword: boolean
  tenant: Tenant | null
  setAuth: (token: string, user: AuthUser, mustChangePassword: boolean, tenant: Tenant) => void
  clearAuth: () => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      mustChangePassword: false,
      tenant: null,
      setAuth: (token, authUser, mustChangePassword, tenant) =>
        set({
          accessToken: token,
          user: {
            id: authUser.id,
            name: authUser.name,
            email: authUser.email,
            role: authUser.role,
            active: authUser.active,
            tenantRole: authUser.tenantRole,
          },
          mustChangePassword,
          tenant,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          mustChangePassword: false,
          tenant: null,
        }),
      logout: async () => {
        try {
          await authService.logout()
        } catch {
          // logout API failure is non-fatal; clear locally anyway
        }
        set({
          accessToken: null,
          user: null,
          mustChangePassword: false,
          tenant: null,
        })
      },
    }),
    { name: 'fendm-auth' }
  )
)
