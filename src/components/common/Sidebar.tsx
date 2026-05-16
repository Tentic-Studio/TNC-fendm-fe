import { NavLink, useLocation } from 'react-router-dom'
import { useSidebarStore } from '../../store/useSidebarStore'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { useAuthStore } from '../../store/useAuthStore'
import { ROUTES } from '../../constants/routes'
import { LayoutDashboard, ShoppingCart, Package, Archive, Factory, Banknote, Grid, Tags, Users, BookOpen } from 'lucide-react'
import logo from '../../assets/logo_fandm.png'

interface SidebarContentProps {
  collapsed: boolean
  onClose?: () => void
}

const menuGroups = [
  {
    label: 'Main Menu',
    permission: 'all',
    children: [
      { label: 'Dashboard',       path: ROUTES.DASHBOARD,   permission: 'all',   icon: <LayoutDashboard size={16} strokeWidth={1.5} /> },
      { label: 'Order',           path: ROUTES.ORDERS,      permission: 'all',   icon: <ShoppingCart    size={16} strokeWidth={1.5} /> },
      { label: 'Stok Bahan Baku', path: ROUTES.INGREDIENTS, permission: 'all',   icon: <Package         size={16} strokeWidth={1.5} /> },
      { label: 'Produk & Resep',  path: ROUTES.PRODUCTS,    permission: 'all',   icon: <Archive         size={16} strokeWidth={1.5} /> },
      { label: 'Produksi',        path: ROUTES.PRODUCTIONS, permission: 'all',   icon: <Factory         size={16} strokeWidth={1.5} /> },
      { label: 'Keuangan',        path: ROUTES.CASH_FLOW,   permission: 'all',   icon: <Banknote        size={16} strokeWidth={1.5} /> },
    ],
  },
  {
    label: 'Settings',
    permission: 'all',
    children: [
      { label: 'Units',   path: ROUTES.UNITS,       permission: 'all',   icon: <Grid size={16} strokeWidth={1.5} /> },
      { label: 'Kategori',path: ROUTES.CATEGORIES,  permission: 'all',   icon: <Tags size={16} strokeWidth={1.5} /> },
    ],
  },
  {
    label: 'Administrator',
    permission: 'admin',
    children: [
      { label: 'User Management', path: ROUTES.USERS, permission: 'admin', icon: <Users size={16} strokeWidth={1.5} /> },
    ],
  },
  {
    label: 'Guide',
    permission: 'all',
    children: [
      { label: 'Dokumentasi', path: ROUTES.DOCS, permission: 'all', icon: <BookOpen size={16} strokeWidth={1.5} /> },
    ],
  },
]

// ─── Sidebar Content ──────────────────────────────────────────────────────────
const SidebarContent = ({ collapsed, onClose }: SidebarContentProps) => {
  const { user } = useAuthStore()
  const location = useLocation()
  const role = user?.role ?? 'all'

  const filteredMenu = menuGroups
    .filter(g => g.permission === 'all' || g.permission === role)
    .map(g => ({
      ...g,
      children: g.children.filter(i => i.permission === 'all' || i.permission === role),
    }))

  return (
    <>
      {/* ── Logo ───────────────────────────────────────────────────────── */}
      <div style={{
        height: 'var(--topbar-height)',
        display: 'flex', alignItems: 'center',
        padding: collapsed ? '0 12px' : '0 20px',
        gap: 10, flexShrink: 0, overflow: 'hidden',
      }}>
        <img
          src={logo} alt="FANDM"
          style={{ height: 28, objectFit: 'contain', flexShrink: 0 }}
        />
        {!collapsed && (
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--sidebar-text)', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
            FANDM
          </span>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto', overflowX: 'hidden', margin: 0 }}>
        {filteredMenu.map((group, index) => (
          <div key={group.label}>
            {index > 0 && <div style={{ height: 8 }} />}

            {!collapsed && (
              <div style={{
                fontSize: 10, fontWeight: 600, color: 'var(--sidebar-muted)',
                textTransform: 'uppercase', letterSpacing: '0.8px',
                padding: '8px 20px 4px',
              }}>
                {group.label}
              </div>
            )}

            {group.children.map(item => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  style={{
                    display: 'flex', textDecoration: 'none',
                    alignItems: 'center', gap: 10,
                    padding: collapsed ? '10px 0' : '9px 20px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    margin: '2px 8px',
                    borderRadius: 8,
                    color: isActive ? 'var(--fendm-primary)' : 'var(--sidebar-muted)',
                    background: isActive ? 'var(--content-bg)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13, whiteSpace: 'nowrap',
                    transition: 'background 0.18s, color 0.18s',
                  }}
                  onMouseOver={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#5D7D94'
                      e.currentTarget.style.color = '#ffffff'
                    }
                  }}
                  onMouseOut={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--sidebar-muted)'
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </span>

                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', flexShrink: 0 }} />
        {!collapsed && (
          <span style={{ fontSize: 10, color: 'var(--sidebar-muted)', fontWeight: 500, letterSpacing: 0.5 }}>
            FANDM v1.0.0
          </span>
        )}
      </div>
    </>
  )
}

// ─── Sidebar Shell ────────────────────────────────────────────────────────────
export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()
  const { isMobile } = useBreakpoint()

  if (isMobile) {
    return (
      <>
        {!collapsed && (
          <div
            onClick={toggle}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 100 }}
          />
        )}
        <aside style={{
          width: 'var(--sidebar-width)', background: 'var(--sidebar-bg)',
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.22s ease',
          transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
          height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 101,
        }}>
          <SidebarContent collapsed={false} onClose={toggle} />
        </aside>
      </>
    )
  }

  return (
    <aside style={{
      width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
      background: 'var(--sidebar-bg)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.22s ease',
      overflow: 'visible', flexShrink: 0,
      height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 101,
    }}>
      <SidebarContent collapsed={collapsed} />

      {/* Toggle button */}
      <button
        onClick={toggle}
        aria-label="Toggle sidebar"
        style={{
          position: 'absolute', top: 18, right: -14,
          width: 28, height: 28, border: 'none', borderRadius: '50%',
          background: 'var(--fendm-primary)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.8)', zIndex: 102,
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}
      >
        {collapsed ? (
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M3 2l5 3.5L3 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M8 2L3 5.5l5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </aside>
  )
}
