import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileInfo from '../components/profile/ProfileInfo'
import ChangePasswordForm from '../components/profile/ChangePasswordForm'

type Tab = 'profile' | 'change-password'

const tabs: { id: Tab; label: string }[] = [
  { id: 'profile',         label: 'Profile'         },
  { id: 'change-password', label: 'Ganti Password'  },
]

export default function ProfilePage() {
  const location = useLocation()

  const [activeTab, setActiveTab] = useState<Tab>(
    location.pathname.includes('change-password') ? 'change-password' : 'profile'
  )

  useEffect(() => {
    setActiveTab(location.pathname.includes('change-password') ? 'change-password' : 'profile')
  }, [location.pathname])

  return (
    <div style={{ maxWidth: 640 }}>

      {/* Page title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fendm-text-dark)', marginBottom: 4 }}>
          Profile
        </div>
        <div style={{ fontSize: 13, color: 'var(--fendm-text-muted)' }}>
          Kelola informasi akun dan keamanan Anda.
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{
        display: 'flex', gap: 4,
        background: 'var(--fendm-bg-light)',
        border: '1px solid var(--fendm-border)',
        borderRadius: 10, padding: 4,
        marginBottom: 20, width: 'fit-content',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '7px 20px', borderRadius: 7,
              border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 500,
              background: activeTab === tab.id ? 'white' : 'transparent',
              color:      activeTab === tab.id ? 'var(--fendm-text-dark)' : 'var(--fendm-text-muted)',
              boxShadow:  activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'profile'         && <ProfileInfo />}
      {activeTab === 'change-password' && <ChangePasswordForm />}

    </div>
  )
}
