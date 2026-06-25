import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"
import logo from "@/assets/logo_fandm.png"
import { useAuthStore } from "@/store/useAuthStore"
import { ROUTES } from "@/constants/routes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { KitchenWatermark } from "./AuthDecorations"
import { authService } from "@/services/auth.service"
import type { ApiErrorResponse, LoginResponse } from "@/types/auth"

// ─── Validation Schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(6, "Password minimal 6 karakter"),
})
type LoginFormValues = z.infer<typeof loginSchema>

// ─── LoginForm Component ──────────────────────────────────────────────────────
export function LoginForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // NOTE: Bypass API — langsung login dengan dummy user
  // TODO: Ganti dengan API call ke backend saat sudah ready
  const onSubmit = async (_values: LoginFormValues) => {
    setError("")
    try {
      const response: LoginResponse = await authService.login(_values);
      // Simpan data user dan token
      setAuth(response.data.accessToken, response.data.user, response.data.mustChangePassword, response.data.tenant);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else if (error.message) {
        setError(error.message)
      }
    }
  }

  return (
    <div className="right-panel" style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "var(--fendm-bg-light)",
      position: "relative", overflow: "hidden",
      padding: "40px 24px",
    }}>

      {/* ── Decorations ── */}
      <div style={{ position: "absolute", right: 0, bottom: 0, width: "380px", height: "460px", pointerEvents: "none", opacity: 0.8 }}>
        <KitchenWatermark />
      </div>
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Mobile logo ── */}
      <div className="mobile-logo" style={{ display: "none", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <img src={logo} alt="FANDM" style={{ height: "28px" }} />
        <span style={{ color: "var(--fendm-text-dark)", fontWeight: 700, fontSize: "18px", letterSpacing: "0.1em" }}>FANDM</span>
      </div>

      {/* ── Card ── */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "520px",
        background: "white", borderRadius: "12px",
        padding: "48px 44px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
      }}>

        {/* Lock icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            background: "white", border: "1px solid var(--fendm-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Lock size={20} color="var(--fendm-text-dark)" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{
            color: "var(--fendm-text-dark)", fontSize: "22px", fontWeight: 700,
            margin: "0 0 10px", fontFamily: "var(--serif)",
          }}>
            Selamat Datang Kembali
          </h2>
          <p style={{ color: "var(--fendm-text-muted)", fontSize: "13px", lineHeight: 1.6 }}>
            Akses terbatas untuk mitra terdaftar.<br />
            Gunakan akun yang telah diberikan oleh tim kami.
          </p>
          <div style={{ width: "28px", height: "2px", background: "var(--fendm-accent)", borderRadius: "2px", margin: "14px auto 0" }} />
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Label htmlFor="email" style={{ fontSize: "13px", fontWeight: 700, color: "var(--fendm-text-dark)" }}>
              Email
            </Label>
            <div style={{ position: "relative" }}>
              <Mail
                size={14}
                style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                  color: "var(--fendm-text-muted)", opacity: 0.6,
                }}
              />
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Masukkan email Anda"
                aria-invalid={!!errors.email}
                style={{
                  paddingLeft: "40px", height: "46px",
                  fontSize: "14px", fontFamily: "inherit",
                  color: "var(--fendm-text-dark)",
                }}
              />
            </div>
            {errors.email && (
              <p style={{ fontSize: "11px", color: "#ef4444", margin: 0 }}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Label htmlFor="password" style={{ fontSize: "13px", fontWeight: 700, color: "var(--fendm-text-dark)" }}>
              Password
            </Label>
            <div style={{ position: "relative" }}>
              <Lock
                size={14}
                style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                  color: "var(--fendm-text-muted)", opacity: 0.6,
                }}
              />
              <Input
                id="password"
                {...register("password")}
                type={showPw ? "text" : "password"}
                placeholder="Masukkan password Anda"
                aria-invalid={!!errors.password}
                style={{
                  paddingLeft: "40px", paddingRight: "42px", height: "46px",
                  fontSize: "14px", fontFamily: "inherit",
                  color: "var(--fendm-text-dark)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--fendm-text-muted)", padding: 0,
                  display: "flex", alignItems: "center", opacity: 0.6,
                }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ fontSize: "11px", color: "#ef4444", margin: 0 }}>{errors.password.message}</p>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div style={{ background: "#FFEBEE", color: "#C62828", fontSize: "12px", padding: "8px 12px", borderRadius: "8px" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{
              height: "46px", width: "100%",
              background: isSubmitting ? "var(--fendm-primary-dark)" : "var(--fendm-primary)",
              fontSize: "14px", fontWeight: 600, letterSpacing: "0.3px",
              marginTop: "4px", transition: "background-color 0.2s",
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin" style={{ marginRight: "8px" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Memproses...
              </>
            ) : "→ Masuk"}
          </Button>
        </form>

        {/* Note below button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
          <Lock size={11} style={{ color: "var(--fendm-text-muted)", opacity: 0.6, flexShrink: 0 }} />
          <p style={{ fontSize: "12px", color: "var(--fendm-text-muted)", opacity: 0.7, margin: 0 }}>
            Sistem ini hanya dapat diakses oleh pengguna yang diundang.
          </p>
        </div>
      </div>

      {/* ── Footer (outside card) ── */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginTop: "28px" }}>
        <p style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          fontSize: "12px", fontWeight: 500, color: "var(--fendm-text-muted)", margin: 0,
        }}>
          <ShieldCheck size={13} style={{ color: "var(--fendm-text-muted)", flexShrink: 0 }} />
          <span>Secure &nbsp;•&nbsp; Private &nbsp;•&nbsp; Internal Use Only</span>
        </p>
        <p style={{ fontSize: "11px", color: "var(--fendm-text-muted)", opacity: 0.6, marginTop: "6px" }}>
          © 2026 Tentic Studio. All rights reserved.
        </p>
      </div>
    </div>
  )
}
