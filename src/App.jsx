import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CarListingPage from './pages/CarListingPage.jsx'
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AddCarPage from './pages/AddCarPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cars" element={<CarListingPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-car" element={<AddCarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
