import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import StudentRegister from './pages/StudentRegister'
import StudentLogin from './pages/StudentLogin'
import AdminLogin from './pages/AdminLogin'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/student/register" element={<StudentRegister />} />

      <Route path="/student/login" element={<StudentLogin />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
    </Routes>
  )
}

export default App