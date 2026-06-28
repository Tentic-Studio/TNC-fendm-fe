import AuthBanner from '@/components/auth/AuthBanner'
import FormLoginComponent from '@/components/auth/LoginFormComponent'

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
function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      <AuthBanner className="hidden lg:flex w-[38%] min-h-screen" />
      <FormLoginComponent />
    </div>
  )
}


export default LoginPage;
