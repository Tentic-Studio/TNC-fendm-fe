import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"
import logo from "@/assets/logo_fandm.png"
import { KitchenWatermark } from "./AuthDecorations"

const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(6, "Password minimal 6 karakter"),
})
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      console.log(values)
      await new Promise(r => setTimeout(r, 1500)) // TODO: ganti API call
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="right-panel" style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "var(--fendm-bg-light)", position: "relative", overflow: "hidden", padding: "40px 24px",
    }}>
      {/* Kitchen watermark */}
      <div style={{
        position: "absolute", right: 0, bottom: 0,
        width: "380px", height: "460px", pointerEvents: "none",
        opacity: 0.8
      }}>
        <KitchenWatermark />
      </div>

      {/* Subtle circle top-right */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none",
      }} />

      {/* Mobile logo */}
      <div className="mobile-logo" style={{
        display: "none", alignItems: "center", gap: "10px", marginBottom: "28px",
      }}>
        <img src={logo} alt="FANDM" style={{ height: "28px" }} />
        <span style={{ color: "var(--fendm-text-dark)", fontWeight: 700, fontSize: "18px", letterSpacing: "0.1em" }}>FENDM</span>
      </div>

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "440px",
        background: "white", borderRadius: "12px",
        padding: "48px 44px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
      }}>
        {/* Lock icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "white", border: "1px solid var(--fendm-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Lock size={22} color="var(--fendm-text-dark)" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{
            color: "var(--fendm-text-dark)", fontSize: "24px", fontWeight: 600,
            margin: "0 0 12px", fontFamily: "var(--serif)",
          }}>
            Selamat Datang Kembali
          </h2>
          <p style={{ color: "var(--fendm-text-muted)", fontSize: "13px", lineHeight: 1.6 }}>
            Akses terbatas untuk mitra terdaftar.<br />
            Gunakan akun yang telah diberikan oleh tim kami.
          </p>
          <div style={{
            width: "28px", height: "2px",
            background: "var(--fendm-accent)", borderRadius: "2px", margin: "16px auto 0",
          }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>

          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--fendm-text-dark)", marginBottom: "8px" }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="var(--fendm-text-muted)" style={{
                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none", opacity: 0.7
              }} />
              <input
                {...register("email")}
                type="email"
                placeholder="Masukkan email Anda"
                className={`login-input${errors.email ? " error" : ""}`}
              />
            </div>
            {errors.email && (
              <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "6px" }}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--fendm-text-dark)", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="var(--fendm-text-muted)" style={{
                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none", opacity: 0.7
              }} />
              <input
                {...register("password")}
                type={showPw ? "text" : "password"}
                placeholder="Masukkan password Anda"
                className={`login-input${errors.password ? " error" : ""}`}
                style={{ paddingRight: "42px" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--fendm-text-muted)", padding: 0,
                  display: "flex", alignItems: "center", opacity: 0.7
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "6px" }}>{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="submit-btn" style={{ marginTop: "8px", background: "var(--fendm-primary)" }}>
            {loading ? (
              <>
                <svg style={{ animation: "spin 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Memproses...
              </>
            ) : "→ Masuk"}
          </button>
        </form>

        {/* Note */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "24px",
        }}>
          <Lock size={12} color="var(--fendm-text-muted)" style={{ flexShrink: 0, opacity: 0.8 }} />
          <p style={{ color: "var(--fendm-text-muted)", fontSize: "11px", opacity: 0.8 }}>
            Sistem ini hanya dapat diakses oleh pengguna yang diundang.
          </p>
        </div>
      </div>

      {/* Bottom footer */}
      <div style={{
        position: "relative", zIndex: 1, textAlign: "center",
        marginTop: "32px",
      }}>
        <p style={{ color: "var(--fendm-text-muted)", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 500 }}>
          <ShieldCheck size={14} color="var(--fendm-text-muted)" />
          Secure &nbsp;•&nbsp; Private &nbsp;•&nbsp; Internal Use Only
        </p>
        <p style={{ color: "var(--fendm-text-muted)", fontSize: "11px", marginTop: "8px", opacity: 0.7 }}>
          © 2026 Tentic Studio. All rights reserved.
        </p>
      </div>
    </div>
  )
}
