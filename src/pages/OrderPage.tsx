export default function OrderPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '50vh', gap: 12,
      color: 'var(--fendm-text-muted)',
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.3}>
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 18h16M16 24h12M16 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fendm-text-dark)' }}>Order</div>
      <div style={{ fontSize: 13 }}>Halaman ini sedang dalam pengembangan.</div>
    </div>
  )
}
