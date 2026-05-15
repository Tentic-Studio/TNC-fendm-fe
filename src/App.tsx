import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import { ROUTES } from './constants/routes'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import DocsPage from './pages/DocsPage'

// TODO: Tambah import halaman lain di sini saat sudah dibuat
// import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Protected — semua halaman di dalam AppLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ORDERS} element={<OrderPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ProfilePage />} />
        <Route path={ROUTES.DOCS} element={<DocsPage />} />
        {/* Tambah route baru di sini: */}
        {/* <Route path={ROUTES.ORDERS} element={<OrderPage />} /> */}
        {/* <Route path={ROUTES.PRODUCTS} element={<ProductPage />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}
