import { createRoot } from 'react-dom/client'
import { AuthProvider } from './components/AuthContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CarListingPage from './pages/CarListingPage.jsx'
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AddCarPage from './pages/AddCarPage.jsx'
import AdminPanelPage from './pages/AdminPanelPage.jsx'
import OwnerPanelPage from './pages/OwnerPanelPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/cars',
        element: <CarListingPage />,
      },
      {
        path: '/cars/:id',
        element: <CarDetailsPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/add-car',
        element: <AddCarPage />,
      },
      {
        path: '/admin',
        element: <AdminPanelPage />,
      },
      {
        path: '/owner',
        element: <OwnerPanelPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
