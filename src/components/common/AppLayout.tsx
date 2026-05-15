import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useSidebarStore } from '../../store/useSidebarStore'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const breadcrumbMap: Record<string, string[]> = {
  '/': ['Main Menu', 'Dashboard'],
  '/orders': ['Main Menu', 'Order'],
  '/products': ['Main Menu', 'Produk & Resep'],
  '/ingredients': ['Main Menu', 'Stok Bahan Baku'],
  '/productions': ['Main Menu', 'Produksi'],
  '/cash-flow': ['Main Menu', 'Keuangan'],
  '/settings/units': ['Settings', 'Units'],
  '/settings/categories': ['Settings', 'Kategori'],
  '/admin/users': ['Administrator', 'User Management'],
  '/profile': ['Akun', 'Profile'],
  '/profile/change-password': ['Akun', 'Profile', 'Ganti Password'],
  '/docs': ['Guide', 'Dokumentasi'],
}

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
}

const pageTransition = {
  duration: 0.2,
  ease: 'easeOut',
}

export default function AppLayout() {
  const { collapsed } = useSidebarStore()
  const { isMobile } = useBreakpoint()
  const location = useLocation()

  const breadcrumb = breadcrumbMap[location.pathname] ?? ['Main Menu']

  const marginLeft = isMobile
    ? 0
    : collapsed
      ? 'var(--sidebar-collapsed)'
      : 'var(--sidebar-width)'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--content-bg)', textAlign: 'left' }}>
      <Sidebar />

      <div style={{
        flex: 1, marginLeft,
        transition: 'margin-left 0.22s ease',
        display: 'flex', flexDirection: 'column',
        height: '100vh', overflow: 'hidden',
      }}>
        <Topbar breadcrumb={breadcrumb} />

        <main style={{
          flex: 1,
          marginTop: 'var(--topbar-height)',
          background: 'var(--content-bg)',
          overflowY: 'auto',
          position: 'relative',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{
                padding: isMobile ? '16px' : '24px',
                minHeight: '100%',
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
