import { User, Mail, Phone, Building2, Store } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

export default function ProfileInfo() {
  const { user } = useAuthStore()

  const fields = [
    { icon: User,      label: 'Nama Lengkap', value: user?.name ?? '-' },
    { icon: Mail,      label: 'Email',         value: user?.email ?? '-' },
    { icon: Building2, label: 'Jabatan',        value: user?.role ?? '-' },
    { icon: Phone,     label: 'No. Telepon',    value: '-' },
    { icon: Store,     label: 'Tenant',         value: user?.tenant ?? '-' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Avatar card */}
      <div style={{
        background: 'white', border: '1px solid var(--fendm-border)',
        borderRadius: 12, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        {/* Avatar */}
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'var(--fendm-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, color: 'white', flexShrink: 0,
          letterSpacing: 1,
        }}>
          {user?.name?.charAt(0).toUpperCase() ?? 'A'}
        </div>

        {/* Name + meta */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fendm-text-dark)', marginBottom: 4 }}>
            {user?.name ?? 'Admin'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fendm-text-muted)', marginBottom: 8 }}>
            {user?.email ?? '-'}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, padding: '2px 10px', borderRadius: 4,
              background: '#E3F2FB', color: '#1565A0', fontWeight: 600,
            }}>
              {user?.role ?? 'admin'}
            </span>
            {user?.tenant && (
              <span style={{
                fontSize: 11, padding: '2px 10px', borderRadius: 4,
                background: '#F3E5F5', color: '#6A1B9A', fontWeight: 600,
              }}>
                {user.tenant}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info fields */}
      <div style={{
        background: 'white', border: '1px solid var(--fendm-border)',
        borderRadius: 12, padding: '20px 24px',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fendm-text-dark)', marginBottom: 18, letterSpacing: '0.2px' }}>
          Informasi Akun
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {fields.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0',
                borderBottom: i < fields.length - 1 ? '1px solid var(--fendm-border)' : 'none',
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'var(--fendm-bg-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={14} color="var(--fendm-text-muted)" strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--fendm-text-muted)', marginBottom: 2, fontWeight: 500 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--fendm-text-dark)', fontWeight: 500 }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
