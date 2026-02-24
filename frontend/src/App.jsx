import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { PostLoginHandler } from './components/auth/PostLoginHandler';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { FullPageSpinner } from './components/ui/customized-loading-spinner';
import { RefreshProvider } from './contexts/RefreshContext';
import { TravelPlanProvider } from './contexts/TravelPlanContext';
import { TravelDetailsProvider } from './contexts/TravelDetailsContext';
import { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const TripDetailsPage = lazy(() => import('./pages/dashboard/TripDetailsPage'));
const CreatePlanPage = lazy(() => import('./pages/dashboard/CreatePlanPage'));
const Explore = lazy(() => import('./pages/ExplorePage/Explore'));
const BlogDetail = lazy(() => import('./pages/ExplorePage/components/BlogDetail'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFound'));
const AboutPage = lazy(() => import('./pages/LandingPage/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/LandingPage/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/LandingPage/TermsPage'));
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TravelPlanProvider>
          <TravelDetailsProvider>
            <ToastProvider>
              <LoadingProvider>
                <RefreshProvider>
                  <AppContent />
                </RefreshProvider>
              </LoadingProvider>
            </ToastProvider>
          </TravelDetailsProvider>
        </TravelPlanProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

function AppContent() {
  const { loading, message } = useLoading();

  return (
    <>
      <Suspense fallback={<FullPageSpinner isOpen={true} message="Loading Page..." />}>
        <FullPageSpinner isOpen={loading} message={message} />
        <PostLoginHandler />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:slug" element={<BlogDetail />} />
          <Route path="create" element={<CreatePlanPage />} />
          <Route path='/not-found' element={<NotFound />} />

          {/* Dashboard Routes with Layout */}
          <Route path="/dashboard" element={<DashboardLayout children={<Outlet />} />}>
            <Route index element={<DashboardPage />} />
            <Route path="trip/:tripId" element={<TripDetailsPage />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}