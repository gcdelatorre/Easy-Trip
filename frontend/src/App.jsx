import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import CreatePlanPage from './pages/dashboard/CreatePlanPage';
import LoginPage from './pages/auth/LoginPage';
import { ToastProvider } from './contexts/ToastContext';
import { PostLoginHandler } from './components/auth/PostLoginHandler';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { FullPageSpinner } from './components/ui/customized-loading-spinner';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <LoadingProvider>
            <AppContent />
          </LoadingProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

function AppContent() {
  const { loading, message } = useLoading();

  return (
    <>
      <FullPageSpinner isOpen={loading} message={message} />
      <PostLoginHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="create" element={<CreatePlanPage />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout children={<Outlet />} />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}