import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import CreatePlanPage from './pages/dashboard/CreatePlanPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout children={<Outlet />} />}>
          <Route index element={<DashboardPage />} />
          <Route path="create" element={<CreatePlanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}