import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import StudentRegister from './pages/StudentRegister'
import StudentLogin from './pages/StudentLogin'
import AdminLogin from './pages/AdminLogin'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import MachinesPage from './pages/MachinesPage'
import CalendarPage from './pages/CalendarPage'
import SlotsPage from './pages/SlotsPage'
import ReservationSummary from './pages/ReservationSummary'
import HistoryPage from './pages/HistoryPage'
import PersonalDataPage from './pages/PersonalDataPage'
import GirlsDay from './pages/GirlsDay'
import BoysDay from './pages/BoysDay'

// Protège les pages étudiants : redirige vers login si pas connecté
function StudentRoute({ children }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || user.role === 'admin') {
    return <Navigate to="/student/login" replace />
  }
  return children
}

// Protège les pages admin : redirige vers login admin si pas connecté en tant qu'admin
function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<LandingPage />} />

      {/* STUDENT — pages publiques */}
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/login"    element={<StudentLogin />} />

      {/* STUDENT — pages protégées */}
      <Route path="/student/dashboard"   element={<StudentRoute><StudentDashboard /></StudentRoute>} />
      <Route path="/machines"            element={<StudentRoute><MachinesPage /></StudentRoute>} />
      <Route path="/calendar"            element={<StudentRoute><CalendarPage /></StudentRoute>} />
      <Route path="/slots"               element={<StudentRoute><SlotsPage /></StudentRoute>} />
      <Route path="/reservation-summary" element={<StudentRoute><ReservationSummary /></StudentRoute>} />
      <Route path="/history"             element={<StudentRoute><HistoryPage /></StudentRoute>} />
      <Route path="/personal-data"       element={<StudentRoute><PersonalDataPage /></StudentRoute>} />
      <Route path="/girls-day"           element={<StudentRoute><GirlsDay /></StudentRoute>} />
      <Route path="/boys-day"            element={<StudentRoute><BoysDay /></StudentRoute>} />

      {/* ADMIN — page publique */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN — page protégée */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      {/* ROUTE INCONNUE → redirige vers l'accueil */}
<Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App