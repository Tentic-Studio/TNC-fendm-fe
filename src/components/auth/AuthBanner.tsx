import { ShieldCheck, BarChart2, Leaf } from "lucide-react"
import logo from "@/assets/logo_fandm.png"
import { DotPattern } from "./AuthDecorations"

const features = [
  { icon: BarChart2, title: "Pantau Stok Real-time", desc: "Data selalu terbaru, keputusan lebih tepat." },
  { icon: Leaf, title: "Kurangi Pemborosan", desc: "Kelola bahan baku dengan lebih efisien." },
  { icon: ShieldCheck, title: "Kontrol Penuh", desc: "Semua inventaris dalam satu sistem." },
]

export function AuthBanner() {
  return (
    <div className="left-panel" style={{
      width: "42%", minHeight: "100vh",
      background: "var(--fendm-primary-gradient)",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "50px 60px",
      position: "relative", overflow: "hidden", flexShrink: 0,
    }}>
      {/* Dot pattern top-right */}
      <div style={{ opacity: 0.6 }}>
        <DotPattern />
      </div>

      {/* Circle decorations matching the design */}
      <div style={{
        position: "absolute", bottom: "-120px", left: "-120px",
        width: "400px", height: "400px", borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", left: "-60px",
        width: "280px", height: "280px", borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.08)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "-150px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={logo} alt="FANDM" style={{ height: "28px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        <span style={{ color: "white", fontWeight: 700, fontSize: "16px", letterSpacing: "0.1em" }}>FANDM</span>
      </div>

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "20px", textAlign: "left" }}>
        <h1 style={{
          color: "white", fontSize: "48px", fontWeight: 600, fontFamily: "var(--serif)",
          lineHeight: 1.2, marginBottom: "24px", letterSpacing: "-0.5px",
        }}>
          Stok Aman,<br />Hati Tenang.
          <span style={{ fontSize: "28px", verticalAlign: "super", marginLeft: "4px", fontWeight: 400 }}>°</span>
        </h1>
        <div style={{ width: "40px", height: "3px", background: "var(--fendm-accent)", borderRadius: "2px", marginBottom: "32px" }} />
        <p style={{ color: "var(--fendm-border)", fontSize: "15px", lineHeight: 1.6, maxWidth: "320px", marginBottom: "48px" }}>
          Jangan biarkan bahan baku terbuang sia-sia. Pantau inventaris
          secara real-time dan fokuslah pada apa yang kamu cintai: memasak.
        </p>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={18} color="white" strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ color: "white", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{title}</p>
                <p style={{ color: "var(--fendm-border)", fontSize: "12px", opacity: 0.8 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left footer - empty space */}
      <div />
    </div>
  )
}
