import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { PostLoginHandler } from './components/auth/PostLoginHandler';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { FullPageSpinner } from './components/ui/customized-loading-spinner';
import { RefreshProvider } from './contexts/RefreshContext';
import { TravelPlanProvider } from './contexts/TravelPlanContext';
import { TravelDetailsProvider } from './contexts/TravelDetailsContext';
import { Suspense } from 'react';
import { routes } from './routes';

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

  const renderRoutes = (routeList) => {
    return routeList.map((route, idx) => (
      <Route
        key={idx}
        path={route.path}
        index={route.index}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <>
      <Suspense fallback={<FullPageSpinner isOpen={true} message="Loading Page..." />}>
        <FullPageSpinner isOpen={loading} message={message} />
        <PostLoginHandler />
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </Suspense>
    </>
  )
}
