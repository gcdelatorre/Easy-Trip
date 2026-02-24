import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const CreatePlanPage = lazy(() => import('./pages/dashboard/CreatePlanPage'));
const TripDetailsPage = lazy(() => import('./pages/dashboard/TripDetailsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const Explore = lazy(() => import('./pages/ExplorePage/Explore'));
const BlogDetail = lazy(() => import('./pages/ExplorePage/components/BlogDetail'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFound'));
const AboutPage = lazy(() => import('./pages/LandingPage/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/LandingPage/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/LandingPage/TermsPage'));

export const routes = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <LoginPage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    },
    {
        path: "/privacy",
        element: <PrivacyPage />,
    },
    {
        path: "/terms",
        element: <TermsPage />,
    },
    {
        path: "/explore",
        element: <Explore />,
    },
    {
        path: "/explore/:slug",
        element: <BlogDetail />,
    },
    {
        path: "/create",
        element: <CreatePlanPage />,
    },
    {
        path: "/not-found",
        element: <NotFound />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout children={<Outlet />} />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "trip/:tripId",
                element: <TripDetailsPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/not-found" replace />,
    },
];
