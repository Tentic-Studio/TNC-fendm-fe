import logo from "@/assets/logo_fandm.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/constants/routes"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/useAuthStore"
import type { LoginResponse } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { z } from "zod"
import BannerBackground from "../common/BannerBackground"
import { KitchenWatermark } from "./AuthDecorations"

// ─── Validation Schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(6, "Password minimal 6 karakter"),
})
type LoginFormValues = z.infer<typeof loginSchema>

// ─── LoginForm Component ──────────────────────────────────────────────────────
function LoginForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="flex flex-col">
      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto mb-4">
        <Lock size={16} className="text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-center text-[15px] font-medium mb-1">
          Selamat Datang Kembali
        </h2>
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Akses terbatas untuk mitra terdaftar.
          <br />
          Gunakan akun yang telah diberikan oleh tim kami.
        </p>
        <div className="w-6 h-0.5 bg-[var(--fandm-accent)] rounded-full mt-3" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Email</label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <Input
              type="email"
              placeholder="email@fandm.id"
              autoComplete="email"
              className="pl-9 text-sm"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Password</label>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="pl-9 pr-9 text-sm"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
            >
              {showPassword ? (
                <EyeOff size={14} strokeWidth={1.5} />
              ) : (
                <Eye size={14} strokeWidth={1.5} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* {errors.root && (
          <p className="text-xs text-destructive text-center">
            {errors.root.message}
          </p>
        )} */}
        {/* Error state */}
        {error && (
          <div style={{ background: "#FFEBEE", color: "#C62828", fontSize: "12px", padding: "8px 12px", borderRadius: "8px" }}>
            {error}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full mt-1">
          {isSubmitting ? "Memproses..." : "→ Masuk"}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-1.5 mt-5 text-[10px] text-muted-foreground">
        <Lock size={10} strokeWidth={1.5} />
        <span>Sistem ini hanya dapat diakses oleh pengguna yang diundang.</span>
      </div>
    </div>
  )
}

export default function FormLoginComponent() {
  const { accessToken } = useAuthStore();
  if (accessToken) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return (
    <>
      {/* ── Desktop ────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-gray-50 relative overflow-hidden gap-4">
        {/* KitchenWatermark */}
        <div className="absolute right-0 bottom-0 w-[420px] h-[480px] pointer-events-none select-none">
          <KitchenWatermark />
        </div>

        {/* Form card */}
        <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl border border-border p-8 shadow-sm">
          <LoginForm />
        </div>

        {/* Footer — di luar card */}
        <div className="relative z-10 text-center">
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheck size={13} className="shrink-0" />
            <span>Secure • Private • Internal Use Only</span>
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-1.5">
            © 2026 Tentic Studio. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Mobile ─────────────────────────────────────────────────── */}
      <BannerBackground
        variant="full"
        showRingTopRight={false}
        className="flex lg:hidden flex-1 flex-col"
      >
        {/* Area atas: logo + hero + KitchenWatermark */}
        <div className="relative flex-1 px-6 pt-10 overflow-hidden">
          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5 mb-5">
            <img src={logo} alt="FANDM" className="h-7 object-contain" />
            <span className="text-white font-semibold text-sm tracking-widest">
              FANDM
            </span>
          </div>
          {/* Hero */}
          <div className="relative z-10 mb-6">
            <h1 className="text-white text-5xl font-semibold font-serif leading-[1.2] tracking-[-0.5px] mb-6">
              Stok Aman,
              <br />
              Hati Tenang.
              <sup className="text-[28px] font-normal ml-1 align-super">°</sup>
            </h1>
            <div className="w-6 h-0.5 bg-[var(--fandm-accent)] rounded-full mt-3" />
          </div>
          <div className="relative z-10">
            <p className="text-[var(--fandm-border)] text-[15px] leading-relaxed max-w-xs mb-12">
              Jangan biarkan bahan baku terbuang sia-sia. Pantau inventaris
              secara real-time dan fokuslah pada apa yang kamu cintai: memasak.
            </p>
          </div>
        </div>

        {/* Form card + footer mobile */}
        <div className="relative z-10 px-4 pt-4 shrink-0">
          <div className="bg-white/[0.97] rounded-2xl p-6 shadow-lg">
            <LoginForm />
          </div>

          {/* Footer — di luar card, di dalam BannerBackground */}
          <div className="text-center py-4">
            <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/50">
              <ShieldCheck size={13} className="shrink-0" />
              <span>Secure • Private • Internal Use Only</span>
            </p>
            <p className="text-[11px] text-white/30 mt-1.5">
              © 2026 Tentic Studio. All rights reserved.
            </p>
          </div>
        </div>
      </BannerBackground>
    </>
  );
}
