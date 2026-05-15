import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { ROUTES } from '../constants/routes'
import { useBreakpoint } from '../hooks/useBreakpoint'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Order {
  id: string
  customerName: string
  orderNumber: string
  orderDate: string
  status: 'PENDING' | 'PROCESS' | 'DONE' | 'CANCELLED'
  totalAmount: number
}

interface Production {
  id: string
  productName: string
  productionDate: string
  expiryDate: string
  quantity: number
  unit: string
}

interface StockAlert {
  id: string
  name: string
  stockQuantity: number
  minimumStock: number
  unitSymbol: string
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const mainChartData = [
  { day: 'Sen', pemasukan: 320000, pengeluaran: 120000 },
  { day: 'Sel', pemasukan: 450000, pengeluaran: 200000 },
  { day: 'Rab', pemasukan: 280000, pengeluaran: 150000 },
  { day: 'Kam', pemasukan: 590000, pengeluaran: 300000 },
  { day: 'Jum', pemasukan: 420000, pengeluaran: 180000 },
  { day: 'Sab', pemasukan: 680000, pengeluaran: 250000 },
  { day: 'Min', pemasukan: 510000, pengeluaran: 190000 },
]

// Tiny sparkline data per card
const orderSparkData = [
  { v: 5 }, { v: 9 }, { v: 7 }, { v: 12 }, { v: 8 }, { v: 14 }, { v: 12 },
]
const incomeSparkData = [
  { v: 180 }, { v: 290 }, { v: 210 }, { v: 400 }, { v: 350 }, { v: 420 }, { v: 275 },
]
const expenseSparkData = [
  { v: 90 }, { v: 130 }, { v: 100 }, { v: 170 }, { v: 140 }, { v: 160 }, { v: 89 },
]
const stockSparkData = [
  { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 4 }, { v: 6 }, { v: 6 },
]

const recentOrders: Order[] = [
  { id: '1', customerName: 'Budi Santoso', orderNumber: 'ORD-001', orderDate: '2026-05-16', status: 'DONE', totalAmount: 185000 },
  { id: '2', customerName: 'Siti Rahayu', orderNumber: 'ORD-002', orderDate: '2026-05-16', status: 'PROCESS', totalAmount: 95000 },
  { id: '3', customerName: 'Ahmad Fauzi', orderNumber: 'ORD-003', orderDate: '2026-05-15', status: 'PENDING', totalAmount: 240000 },
  { id: '4', customerName: 'Dewi Kusuma', orderNumber: 'ORD-004', orderDate: '2026-05-15', status: 'CANCELLED', totalAmount: 120000 },
  { id: '5', customerName: 'Eko Prasetyo', orderNumber: 'ORD-005', orderDate: '2026-05-14', status: 'DONE', totalAmount: 310000 },
]

const expiringProductions: Production[] = [
  { id: '1', productName: 'Roti Maryam', productionDate: '2026-05-14', expiryDate: '2026-05-17', quantity: 20, unit: 'pcs' },
  { id: '2', productName: 'Croissant', productionDate: '2026-05-15', expiryDate: '2026-05-18', quantity: 15, unit: 'pcs' },
  { id: '3', productName: 'Kue Bolu Coklat', productionDate: '2026-05-13', expiryDate: '2026-05-16', quantity: 8, unit: 'loyang' },
  { id: '4', productName: 'Pain au Chocolat', productionDate: '2026-05-15', expiryDate: '2026-05-19', quantity: 24, unit: 'pcs' },
  { id: '5', productName: 'Donat Glazed', productionDate: '2026-05-14', expiryDate: '2026-05-17', quantity: 30, unit: 'pcs' },
]

const stockAlerts: StockAlert[] = [
  { id: '1', name: 'Tepung Terigu', stockQuantity: 2, minimumStock: 10, unitSymbol: 'kg' },
  { id: '2', name: 'Telur Ayam', stockQuantity: 5, minimumStock: 20, unitSymbol: 'butir' },
  { id: '3', name: 'Mentega', stockQuantity: 1, minimumStock: 5, unitSymbol: 'kg' },
  { id: '4', name: 'Gula Pasir', stockQuantity: 3, minimumStock: 8, unitSymbol: 'kg' },
  { id: '5', name: 'Keju Cheddar', stockQuantity: 0, minimumStock: 4, unitSymbol: 'kg' },
  { id: '6', name: 'Susu UHT', stockQuantity: 2, minimumStock: 12, unitSymbol: 'liter' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const getDaysUntilExpiry = (expiryDate: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const statusConfig: Record<Order['status'], { bg: string; color: string; label: string }> = {
  PENDING: { bg: '#FFF8E1', color: '#E65100', label: 'Pending' },
  PROCESS: { bg: '#E3F2FB', color: '#1565A0', label: 'Proses' },
  DONE:    { bg: '#E8F5E9', color: '#2E7D32', label: 'Selesai' },
  CANCELLED: { bg: '#FFEBEE', color: '#C62828', label: 'Batal' },
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'white', border: '1px solid var(--fendm-border)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--fendm-text-dark)' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {formatRupiah(p.value)}
        </div>
      ))}
    </div>
  )
}

// ─── Tiny Sparkline ───────────────────────────────────────────────────────────
const Sparkline = ({ data, color }: { data: { v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height={44}>
    <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.3} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="v"
        stroke={color}
        strokeWidth={1.8}
        fill={`url(#spark-${color.replace('#', '')})`}
        dot={false}
        isAnimationActive={true}
        animationDuration={1200}
        animationEasing="ease-out"
      />
    </AreaChart>
  </ResponsiveContainer>
)

// ─── Sub-components ───────────────────────────────────────────────────────────
const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: 'white', border: '1px solid var(--fendm-border)', borderRadius: 10, ...style }}>
    {children}
  </div>
)

const SectionHeader = ({ title, link, onLinkClick }: { title: string; link?: string; onLinkClick?: () => void }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fendm-text-dark)' }}>{title}</span>
    {link && (
      <span onClick={onLinkClick} style={{ fontSize: 11, color: 'var(--fendm-primary)', cursor: 'pointer', fontWeight: 500 }}>
        {link}
      </span>
    )}
  </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { isMobile } = useBreakpoint()

  const summaryCards = [
    {
      label: 'Order Hari Ini',
      value: '12',
      tag: 'order masuk',
      color: '#1565A0',
      tagBg: '#E3F2FB',
      sparkData: orderSparkData,
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h9M2 12h6" stroke="#1565A0" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      iconBg: '#E3F2FB',
    },
    {
      label: 'Pemasukan',
      value: formatRupiah(2750000),
      tag: 'hari ini',
      color: '#2E7D32',
      tagBg: '#E8F5E9',
      sparkData: incomeSparkData,
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M4 6l4-4 4 4" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      iconBg: '#E8F5E9',
    },
    {
      label: 'Pengeluaran',
      value: formatRupiah(890000),
      tag: 'hari ini',
      color: '#C62828',
      tagBg: '#FFEBEE',
      sparkData: expenseSparkData,
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 14V2M4 10l4 4 4-4" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      iconBg: '#FFEBEE',
    },
    {
      label: 'Stok Kritis',
      value: String(stockAlerts.length),
      tag: 'perlu restock',
      color: '#E65100',
      tagBg: '#FFF8E1',
      sparkData: stockSparkData,
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#E65100" strokeWidth="1.4" />
          <path d="M8 5v3" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.8" fill="#E65100" />
        </svg>
      ),
      iconBg: '#FFF8E1',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Greeting ────────────────────────────────────────────────────────── */}
      <div>
        <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, color: 'var(--fendm-text-dark)', marginBottom: 4 }}>
          Selamat datang, {user?.name ?? 'Admin'} 👋
        </div>
        <div style={{ fontSize: 13, color: 'var(--fendm-text-muted)' }}>
          Pantau order, stok, dan keuangan usahamu hari ini.
        </div>
      </div>

      {/* ── Row 1: Summary Cards with Sparklines ─────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: 12,
      }}>
        {summaryCards.map((card, i) => (
          <Card key={i} style={{ padding: '14px 16px 8px', overflow: 'hidden' }}>
            {/* Top info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{
                width: 28, height: 28, background: card.iconBg,
                borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {card.icon}
              </div>
              <span style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 4,
                background: card.tagBg, color: card.color, fontWeight: 500,
              }}>
                {card.tag}
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)', marginBottom: 2 }}>{card.label}</div>
            <div style={{
              fontSize: card.value.startsWith('Rp') ? (isMobile ? 13 : 15) : (isMobile ? 20 : 24),
              fontWeight: 700, color: 'var(--fendm-text-dark)',
              lineHeight: 1.2, marginBottom: 4,
            }}>
              {card.value}
            </div>
            {/* Tiny sparkline */}
            <div style={{ margin: '0 -16px -8px', opacity: 0.8 }}>
              <Sparkline data={card.sparkData} color={card.color} />
            </div>
          </Card>
        ))}
      </div>

      {/* ── Row 2: Main Chart + Stock Alert ──────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 280px',
        gap: 16, alignItems: 'start',
      }}>
        {/* Main Area Chart — more prominent */}
        <Card style={{ padding: 16 }}>
          <SectionHeader title="Grafik 7 Hari Terakhir" link="Pemasukan vs Pengeluaran" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mainChartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPemasukan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4b6a78" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4b6a78" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradPengeluaran" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C62828" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#C62828" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7a8a' }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#6b7a8a' }} tickLine={false} axisLine={false}
                tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="pemasukan" name="Pemasukan"
                stroke="#4b6a78" strokeWidth={2.5}
                fill="url(#gradPemasukan)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                animationDuration={1000} animationEasing="ease-out"
              />
              <Area
                type="monotone" dataKey="pengeluaran" name="Pengeluaran"
                stroke="#e11d48" strokeWidth={2}
                fill="url(#gradPengeluaran)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
                animationDuration={1200} animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 8 }}>
            {[{ color: '#4b6a78', label: 'Pemasukan' }, { color: '#C62828', label: 'Pengeluaran' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--fendm-text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </Card>

        {/* Stock Alert — scrollable, same height */}
        <Card style={{ padding: 16, height: isMobile ? 'auto' : '308px', display: 'flex', flexDirection: 'column' }}>
          <SectionHeader title="Stok Kritis" link="Lihat →" onLinkClick={() => navigate(ROUTES.INGREDIENTS)} />
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {stockAlerts.map(alert => (
              <div
                key={alert.id}
                style={{
                  background: '#FFF8F8', border: '1px solid #FFE0E0',
                  borderRadius: 8, padding: '9px 12px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(198,40,40,0.12)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fendm-text-dark)', marginBottom: 2 }}>{alert.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)' }}>Min. {alert.minimumStock} {alert.unitSymbol}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#C62828' }}>{alert.stockQuantity}</div>
                  <div style={{ fontSize: 10, color: 'var(--fendm-text-muted)' }}>{alert.unitSymbol}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 3: Order + Produksi Expired ──────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>

        {/* Order Terbaru */}
        <Card style={{ padding: 16 }}>
          <SectionHeader title="Order Terbaru" link="Lihat semua →" onLinkClick={() => navigate(ROUTES.ORDERS)} />
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              padding: '6px 0', borderBottom: '1px solid var(--fendm-border)',
              fontSize: 10, fontWeight: 600, color: 'var(--fendm-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.5px', gap: 12,
            }}>
              <span>Pelanggan</span><span style={{ textAlign: 'center' }}>Status</span><span style={{ textAlign: 'right' }}>Total</span>
            </div>
            {recentOrders.map(order => (
              <div key={order.id} onClick={() => navigate(ROUTES.ORDERS)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  padding: '10px 0', gap: 12,
                  borderBottom: '1px solid var(--fendm-border)',
                  alignItems: 'center', cursor: 'pointer',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--fendm-bg-light)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fendm-text-dark)' }}>{order.customerName}</div>
                  <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)', marginTop: 1 }}>{order.orderNumber} · {formatDate(order.orderDate)}</div>
                </div>
                <span style={{
                  fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 500, whiteSpace: 'nowrap',
                  background: statusConfig[order.status].bg, color: statusConfig[order.status].color,
                }}>
                  {statusConfig[order.status].label}
                </span>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fendm-text-dark)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {formatRupiah(order.totalAmount)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Produksi Hampir Expired */}
        <Card style={{ padding: 16 }}>
          <SectionHeader title="Produksi Hampir Expired" link="Lihat semua →" onLinkClick={() => navigate(ROUTES.PRODUCTIONS)} />
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              padding: '6px 0', borderBottom: '1px solid var(--fendm-border)',
              fontSize: 10, fontWeight: 600, color: 'var(--fendm-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.5px', gap: 12,
            }}>
              <span>Produk</span><span style={{ textAlign: 'center' }}>Sisa</span><span style={{ textAlign: 'right' }}>Expired</span>
            </div>
            {expiringProductions.map(prod => {
              const days = getDaysUntilExpiry(prod.expiryDate)
              const urgentColor = days <= 1 ? '#C62828' : days <= 3 ? '#E65100' : '#2E7D32'
              const urgentBg    = days <= 1 ? '#FFEBEE' : days <= 3 ? '#FFF8E1' : '#E8F5E9'
              return (
                <div
                  key={prod.id}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    padding: '10px 0', gap: 12,
                    borderBottom: '1px solid var(--fendm-border)',
                    alignItems: 'center', cursor: 'pointer',
                    transition: 'background 0.13s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--fendm-bg-light)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fendm-text-dark)' }}>{prod.productName}</div>
                    <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)', marginTop: 1 }}>{prod.quantity} {prod.unit} · Prod. {formatDate(prod.productionDate)}</div>
                  </div>
                  <span style={{
                    fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 600,
                    background: urgentBg, color: urgentColor, whiteSpace: 'nowrap', textAlign: 'center',
                  }}>
                    {days <= 0 ? 'Expired' : days === 1 ? 'Besok' : `${days} hari`}
                  </span>
                  <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatDate(prod.expiryDate)}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

    </div>
  )
}
