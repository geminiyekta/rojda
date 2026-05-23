import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// بارگذاری تنبل صفحات (Lazy Loading)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Encyclopedia = lazy(() => import('./pages/Encyclopedia'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const NotFound = lazy(() => import('./pages/NotFound'));

// کامپوننت لودینگ برای زمان‌های انتظار بین تغییر صفحات
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center text-[#f37021] bg-[#05060A]">
    در حال بارگذاری...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/fa" replace />
  },
  {
    path: "/:lang",
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "services", element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: "about", element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: "blog", element: <Suspense fallback={<PageLoader />}><Encyclopedia /></Suspense> },
      { path: "blog/:slug", element: <Suspense fallback={<PageLoader />}><SinglePost /></Suspense> },
      { path: "contact", element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: "*", element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}