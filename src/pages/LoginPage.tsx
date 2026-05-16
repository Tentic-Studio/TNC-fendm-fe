import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { AuthBanner } from '@/components/auth/AuthBanner'
import { LoginForm } from '@/components/auth/LoginForm'

// ─── Global styles (layout responsif — dibutuhkan AuthBanner & LoginForm) ─────
const loginPageStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .left-panel { display: flex; }
  .mobile-logo { display: none; }
  @media (max-width: 1023px) {
    .left-panel  { display: none !important; }
    .right-panel { background: var(--fendm-bg-light) !important; }
    .mobile-logo { display: flex !important; }
  }
`

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { accessToken } = useAuthStore()

  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <>
      <style>{loginPageStyles}</style>

      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <AuthBanner />
        <LoginForm />
      </div>
    </>
  )
}
