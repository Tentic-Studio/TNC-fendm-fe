import { useNavigate } from 'react-router-dom'
import { useSidebarStore } from '../../store/useSidebarStore'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { useAuthStore } from '../../store/useAuthStore'
import { ROUTES } from '../../constants/routes'
import { useState, useRef, useEffect } from 'react'
import { User, KeyRound, LogOut, ChevronDown } from 'lucide-react'

interface TopbarProps {
  breadcrumb: string[]
}

export default function Topbar({ breadcrumb }: TopbarProps) {
  const { collapsed, toggle } = useSidebarStore()
  const { isMobile } = useBreakpoint()
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    clearAuth()
    navigate(ROUTES.LOGIN)
  }

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--topbar-bg)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 12,
      position: 'fixed', top: 0, right: 0,
      left: isMobile ? 0 : (collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)'),
      zIndex: 99,
      transition: 'left 0.22s ease',
      boxShadow: '0 1px 0 var(--fendm-border)',
    }}>

      {/* Mobile — hamburger */}
      {isMobile && (
        <button
          onClick={toggle}
          style={{
            width: 30, height: 30,
            border: '1px solid var(--fendm-border)',
            borderRadius: 7, background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fendm-text-muted)', flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Breadcrumb */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        gap: 6, fontSize: 12, color: 'var(--fendm-text-muted)', overflow: 'hidden',
      }}>
        {breadcrumb.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            {i > 0 && <span style={{ color: 'var(--fendm-border)', fontSize: 14 }}>›</span>}
            <span style={i === breadcrumb.length - 1
              ? { color: 'var(--fendm-text-dark)', fontWeight: 500, fontSize: 13 }
              : {}
            }>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* Date — hide on mobile */}
        {!isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 10px',
            border: '1px solid var(--fendm-border)', borderRadius: 7,
            background: 'white',
            fontSize: 12, color: 'var(--fendm-text-dark)', fontWeight: 500, cursor: 'pointer',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1.5" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
              <path d="M3.5 1v1.5M8.5 1v1.5M1 5h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Hari ini
            <svg width="8" height="8" viewBox="0 0 8 5" fill="none">
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* Notification */}
        <button style={{
          width: 30, height: 30,
          border: '1px solid var(--fendm-border)', borderRadius: 7,
          background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1a4.5 4.5 0 0 1 4.5 4.5V9l1.5 2H1L2.5 9V5.5A4.5 4.5 0 0 1 7 1z" stroke="var(--fendm-text-muted)" strokeWidth="1.2" />
            <path d="M5.5 12a1.5 1.5 0 0 0 3 0" stroke="var(--fendm-text-muted)" strokeWidth="1.2" />
          </svg>
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 6, height: 6, background: '#E24B4A',
            borderRadius: '50%', border: '1.5px solid white',
          }} />
        </button>

        {/* Avatar + Dropdown */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setShowUserMenu(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', padding: '4px 8px',
              borderRadius: 8, border: '1px solid var(--fendm-border)',
              background: 'white',
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0,
            }}>
              {user?.name?.charAt(0).toUpperCase() ?? 'A'}
            </div>
            {!isMobile && (
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--fendm-text-dark)', whiteSpace: 'nowrap' }}>
                {user?.name ?? 'Admin FANDM'}
              </span>
            )}
            <ChevronDown size={12} color="var(--fendm-text-muted)" />
          </div>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div style={{
              position: 'absolute', top: '110%', right: 0,
              background: 'white',
              border: '1px solid var(--fendm-border)',
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              minWidth: 200, zIndex: 200, overflow: 'hidden',
            }}>
              {/* User info header */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--fendm-border)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fendm-text-dark)' }}>{user?.name ?? 'Admin'}</div>
                <div style={{ fontSize: 11, color: 'var(--fendm-text-muted)', marginTop: 2 }}>{user?.email ?? ''}</div>
                <span style={{
                  display: 'inline-block', marginTop: 6,
                  fontSize: 10, padding: '2px 8px', borderRadius: 4,
                  background: '#E3F2FB', color: '#1565A0', fontWeight: 500,
                }}>
                  {user?.role ?? 'admin'}
                </span>
              </div>

              {/* Profile section */}
              <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--fendm-border)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--fendm-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '4px 8px 2px' }}>
                  Akun
                </div>
                <button
                  onClick={() => { navigate(ROUTES.PROFILE); setShowUserMenu(false) }}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '8px 10px', border: 'none', background: 'none',
                    fontSize: 12, color: 'var(--fendm-text-dark)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6,
                    transition: 'background 0.1s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--fendm-bg-light)'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <User size={13} color="var(--fendm-text-muted)" />
                  Profile
                </button>
                <button
                  onClick={() => { navigate(ROUTES.CHANGE_PASSWORD); setShowUserMenu(false) }}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '8px 10px', border: 'none', background: 'none',
                    fontSize: 12, color: 'var(--fendm-text-dark)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6,
                    transition: 'background 0.1s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--fendm-bg-light)'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <KeyRound size={13} color="var(--fendm-text-muted)" />
                  Ganti Password
                </button>
              </div>

              {/* Logout */}
              <div style={{ padding: '6px 8px' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '8px 10px', border: 'none', background: 'none',
                    fontSize: 12, color: '#ef4444', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6,
                    transition: 'background 0.1s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#FFF5F5'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
