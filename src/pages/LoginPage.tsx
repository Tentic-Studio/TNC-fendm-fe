import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail, ShieldCheck, BarChart2, Leaf } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { ROUTES } from '../constants/routes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import logo from '@/assets/logo_fandm.png'
import { DotPattern, KitchenWatermark } from '@/components/auth/AuthDecorations'

// ─── Validation Schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi').min(6, 'Password minimal 6 karakter'),
})
type LoginFormValues = z.infer<typeof loginSchema>

// ─── Feature list for AuthBanner ─────────────────────────────────────────────
const features = [
  { icon: BarChart2, title: 'Pantau Stok Real-time', desc: 'Data selalu terbaru, keputusan lebih tepat.' },
  { icon: Leaf, title: 'Kurangi Pemborosan', desc: 'Kelola bahan baku dengan lebih efisien.' },
  { icon: ShieldCheck, title: 'Kontrol Penuh', desc: 'Semua inventaris dalam satu sistem.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { accessToken, setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  // If already logged in, redirect to dashboard
  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // NOTE: Bypass API — langsung login dengan dummy user
  // TODO: Ganti dengan API call ke backend saat sudah ready
  const onSubmit = async (_values: LoginFormValues) => {
    setError('')
    await new Promise(r => setTimeout(r, 800)) // simulate loading

    // Dummy auth bypass
    setAuth('dummy-token-fendm', {
      id: '1',
      name: 'Admin FANDM',
      email: _values.email,
      role: 'admin',
      tenant: 'Tentic Studio HQ',
    })
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <>
      {/* ── Global styles for login page ── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .left-panel { display: flex; }
        .mobile-logo { display: none; }
        @media (max-width: 1023px) {
          .left-panel { display: none !important; }
          .mobile-logo { display: flex !important; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

        {/* ── Left Panel: AuthBanner ─────────────────────────────────────────── */}
        <div className="left-panel" style={{
          width: '42%', minHeight: '100vh',
          background: 'linear-gradient(160deg, var(--fendm-primary-light) 0%, var(--fendm-primary) 45%, var(--fendm-primary-dark) 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '50px 60px',
          position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}>
          {/* Decorations */}
          <div style={{ opacity: 0.6 }}><DotPattern /></div>
          <div style={{ position: 'absolute', bottom: '-120px', left: '-120px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

          {/* Logo */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logo} alt="FANDM" style={{ height: '28px', objectFit: 'contain' }} />
            <span style={{ color: 'white', fontWeight: 700, fontSize: '16px', letterSpacing: '0.1em' }}>FANDM</span>
          </div>

          {/* Hero content */}
          <div style={{ position: 'relative', zIndex: 1, marginTop: '20px', textAlign: 'left' }}>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 600, fontFamily: 'var(--serif)', lineHeight: 1.2, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Stok Aman,<br />Hati Tenang.
              <span style={{ fontSize: '28px', verticalAlign: 'super', marginLeft: '4px', fontWeight: 400 }}>°</span>
            </h1>
            <div style={{ width: '40px', height: '3px', background: 'var(--fendm-accent)', borderRadius: '2px', marginBottom: '32px' }} />
            <p style={{ color: 'var(--fendm-border)', fontSize: '15px', lineHeight: 1.6, maxWidth: '320px', marginBottom: '48px' }}>
              Jangan biarkan bahan baku terbuang sia-sia. Pantau inventaris
              secara real-time dan fokuslah pada apa yang kamu cintai: memasak.
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={18} color="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{title}</p>
                    <p style={{ color: 'var(--fendm-border)', fontSize: '12px', opacity: 0.8 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div />
        </div>

        {/* ── Right Panel: LoginForm ─────────────────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--fendm-bg-light)', position: 'relative', overflow: 'hidden', padding: '40px 24px',
        }}>
          {/* Decorations */}
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '380px', height: '460px', pointerEvents: 'none', opacity: 0.8 }}>
            <KitchenWatermark />
          </div>

          {/* Mobile logo */}
          <div className="mobile-logo" style={{ alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <img src={logo} alt="FANDM" style={{ height: '28px' }} />
            <span style={{ color: 'var(--fendm-text-dark)', fontWeight: 700, fontSize: '18px' }}>FANDM</span>
          </div>

          {/* Card */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: '440px',
            background: 'white', borderRadius: '12px',
            padding: '48px 44px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          }}>
            {/* Lock icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'white', border: '1px solid var(--fendm-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Lock size={22} color="var(--fendm-text-dark)" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ color: 'var(--fendm-text-dark)', fontSize: '24px', fontWeight: 600, margin: '0 0 12px', fontFamily: 'var(--serif)' }}>
                Selamat Datang Kembali
              </h2>
              <p style={{ color: 'var(--fendm-text-muted)', fontSize: '13px', lineHeight: 1.6 }}>
                Akses terbatas untuk mitra terdaftar.<br />
                Gunakan akun yang telah diberikan oleh tim kami.
              </p>
              <div style={{ width: '28px', height: '2px', background: 'var(--fendm-accent)', borderRadius: '2px', margin: '16px auto 0' }} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label htmlFor="email" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--fendm-text-dark)' }}>
                  Email
                </Label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--fendm-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }} />
                  <Input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="Masukkan email Anda"
                    style={{ paddingLeft: '36px' }}
                    className={errors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}
                  />
                </div>
                {errors.email && <p style={{ color: '#ef4444', fontSize: '11px' }}>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label htmlFor="password" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--fendm-text-dark)' }}>
                  Password
                </Label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--fendm-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }} />
                  <Input
                    id="password"
                    {...register('password')}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Masukkan password Anda"
                    style={{ paddingLeft: '36px', paddingRight: '40px' }}
                    className={errors.password ? 'border-red-400 focus-visible:ring-red-300' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--fendm-text-muted)', padding: 0, display: 'flex', alignItems: 'center', opacity: 0.7
                    }}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#ef4444', fontSize: '11px' }}>{errors.password.message}</p>}
              </div>

              {/* Error state */}
              {error && (
                <div style={{ background: '#FFEBEE', color: '#C62828', fontSize: 12, padding: '8px 12px', borderRadius: 7 }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '8px', height: '46px',
                  background: isSubmitting ? 'var(--fendm-primary-dark)' : 'var(--fendm-primary)',
                  fontSize: '14px', fontWeight: 600, letterSpacing: '0.3px',
                  transition: 'background-color 0.2s',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg style={{ animation: 'spin 0.8s linear infinite', marginRight: 8 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Memproses...
                  </>
                ) : '→ Masuk'}
              </Button>
            </form>

            {/* Note */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
              <Lock size={12} color="var(--fendm-text-muted)" style={{ flexShrink: 0, opacity: 0.8 }} />
              <p style={{ color: 'var(--fendm-text-muted)', fontSize: '11px', opacity: 0.8 }}>
                Sistem ini hanya dapat diakses oleh pengguna yang diundang.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '32px' }}>
            <p style={{ color: 'var(--fendm-text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 500 }}>
              <ShieldCheck size={14} color="var(--fendm-text-muted)" />
              Secure &nbsp;•&nbsp; Private &nbsp;•&nbsp; Internal Use Only
            </p>
            <p style={{ color: 'var(--fendm-text-muted)', fontSize: '11px', marginTop: '8px', opacity: 0.7 }}>
              © 2026 Tentic Studio. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
