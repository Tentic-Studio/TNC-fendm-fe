import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import { ROUTES } from './constants/routes'

import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import DocsPage from './pages/DocsPage'
import LoginPage from './pages/LoginPage'
import OrderPage from './pages/OrderPage'
import ProfilePage from './pages/ProfilePage'
import { authService } from './services/auth.service'
import { useActiveTenantStore } from './store/useActiveTenantStore'
import { useAuthStore } from './store/useAuthStore'

// TODO: Tambah import halaman lain di sini saat sudah dibuat
// import ProductPage from './pages/ProductPage'

export default function App() {
  const { accessToken, setAuth, clearAuth, user, tenant, mustChangePassword } = useAuthStore();
  const { setActiveTenantId } = useActiveTenantStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (!accessToken) {
        setChecking(false);
        return;
      }
      try {
        const res = await authService.getMe();
        const result = res.data;

        setAuth(accessToken, user ?? result, mustChangePassword, tenant);
      } catch {
        clearAuth();
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (user && user.role !== "superadmin" && tenant?.id) {
      setActiveTenantId(tenant.id);
    }
  }, [user, setActiveTenantId]);

  if (checking)
    return (
      <div className="app-loading-wrapper">
        <i className="pi pi-spin pi-spinner app-loading-spinner" />
      </div>
    );
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
