export interface LoginRequest {
  email: string
  password: string
}

export interface Tenant {
  id: string
  businessName: string
  email: string
  address: string
  phone: string
  invoiceFooter: string | null
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  tenantRole: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    mustChangePassword: boolean
    tenant: Tenant
    user: AuthUser
  }
}

export interface ApiErrorResponse {
  success: boolean
  message: string
  data: null
}
