import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Encyclopedia from './pages/Encyclopedia';
import SinglePost from './pages/SinglePost'; // <--- این خط اضافه شد
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/fa" replace />
  },
  {
    path: "/:lang",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "blog", element: <Encyclopedia /> },
      { path: "blog/:slug", element: <SinglePost /> }, // <--- مسیر داینامیک برای هر مقاله اضافه شد
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}