import { Routes, Route, Navigate } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'   // ← AJOUTÉ

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
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
function StudentRoute({ children }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || user.role === 'admin') {
    return <Navigate to="/student/login" replace />
  }
  return children
}

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
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password"  element={<ResetPasswordPage />} />
      {/* STUDENT — pages protégées (toutes partagent les notifs) */}
      <Route path="/student/dashboard"   element={<StudentRoute><NotificationProvider><StudentDashboard /></NotificationProvider></StudentRoute>} />
      <Route path="/machines"            element={<StudentRoute><NotificationProvider><MachinesPage /></NotificationProvider></StudentRoute>} />
      <Route path="/calendar"            element={<StudentRoute><NotificationProvider><CalendarPage /></NotificationProvider></StudentRoute>} />
      <Route path="/slots"               element={<StudentRoute><NotificationProvider><SlotsPage /></NotificationProvider></StudentRoute>} />
      <Route path="/reservation-summary" element={<StudentRoute><NotificationProvider><ReservationSummary /></NotificationProvider></StudentRoute>} />
      <Route path="/history"             element={<StudentRoute><NotificationProvider><HistoryPage /></NotificationProvider></StudentRoute>} />
      <Route path="/personal-data"       element={<StudentRoute><NotificationProvider><PersonalDataPage /></NotificationProvider></StudentRoute>} />
      <Route path="/girls-day"           element={<StudentRoute><NotificationProvider><GirlsDay /></NotificationProvider></StudentRoute>} />
      <Route path="/boys-day"            element={<StudentRoute><NotificationProvider><BoysDay /></NotificationProvider></StudentRoute>} />

      {/* ADMIN — page publique */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN — page protégée */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App