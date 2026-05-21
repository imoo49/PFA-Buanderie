import { Routes, Route } from 'react-router-dom'

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
function App() {

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* STUDENT */}

      <Route
        path="/student/register"
        element={<StudentRegister />}
      />

      <Route
        path="/student/login"
        element={<StudentLogin />}
      />

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      {/* MACHINES */}

      <Route
        path="/machines"
        element={<MachinesPage />}
      />

      {/* ADMIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />
     
    
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
   <Route
  path="/calendar"
  element={<CalendarPage />}
/>
 <Route
  path="/slots"
  element={<SlotsPage />}
/>
<Route
  path="/reservation-summary"
  element={<ReservationSummary />}
/>
<Route
  path="/history"
  element={<HistoryPage />}
/>
<Route
  path="/personal-data"
  element={<PersonalDataPage />}
/>
<Route path="/girls-day" element={<GirlsDay />} />
<Route path="/boys-day" element={<BoysDay />} />
    </Routes>
      
  )
}

export default App