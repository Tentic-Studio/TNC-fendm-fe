import { AuthBanner } from "@/components/auth/AuthBanner"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-input {
          width: 100%; height: 46px;
          padding: 0 12px 0 38px;
          font-size: 14px; color: var(--fendm-text-dark);
          border: 1px solid var(--fendm-border);
          border-radius: 8px; outline: none;
          background: white; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input::placeholder { color: #a0aec0; font-weight: 400; }
        .login-input:focus {
          border-color: var(--fendm-primary);
          box-shadow: 0 0 0 3px rgba(75, 106, 120, 0.1);
        }
        .login-input.error { border-color: #ef4444; }
        .submit-btn {
          width: 100%; height: 46px;
          background: var(--fendm-primary);
          color: white; border: none; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: inherit; letter-spacing: 0.3px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s, transform 0.1s, background-color 0.2s;
        }
        .submit-btn:hover:not(:disabled) { background: var(--fendm-primary-dark); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 1023px) {
          .left-panel  { display: none !important; }
          .right-panel { background: var(--fendm-bg-light) !important; }
          .mobile-logo { display: flex !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
        {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
        <AuthBanner />

        {/* ══ RIGHT PANEL ═════════════════════════════════════════════════════ */}
        <LoginForm />
      </div>
    </>
  )
}