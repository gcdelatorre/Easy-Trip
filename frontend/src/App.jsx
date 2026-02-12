import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import CreatePlanPage from './pages/dashboard/CreatePlanPage';
import LoginPage from './pages/auth/LoginPage';
import { ToastProvider } from './contexts/ToastContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />

            {/* Dashboard Routes with Layout */}
            <Route path="/dashboard" element={<DashboardLayout children={<Outlet />} />}>
              <Route index element={<DashboardPage />} />
              <Route path="create" element={<CreatePlanPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}