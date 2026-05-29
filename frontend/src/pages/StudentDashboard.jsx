import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../api/api'

import notificationIcon from '../assets/notification-icon.png'
import logoBuanderie from '../assets/logo-buanderie.png'
import profil from '../assets/profil.png'
import ChatbotUI from "../components/ChatbotUI"

function StudentDashboard() {

  const navigate = useNavigate()

  const [studentAlert, setStudentAlert] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [user, setUser] = useState(null)
  const [machines, setMachines] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/student/login')
          return
        }

        const alert = localStorage.getItem('studentAlert')
        if (alert) setStudentAlert(alert)

        const [userRes, machinesRes, reservationsRes] = await Promise.all([
          api.get('/user', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/machines', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/reservations', { headers: { Authorization: `Bearer ${token}` } }),
        ])

        setUser(userRes.data)
        setMachines(machinesRes.data)
        setReservations(reservationsRes.data)

      } catch (error) {
        console.error(error)
        localStorage.removeItem('token')
        navigate('/student/login')
      }

    }

    fetchDashboard()

  }, [])

  const today = new Date().toISOString().split('T')[0]

  const getMachineStatus = (machine) => {

    if (machine.statut === 'en_panne') return 'En panne'

    const occupied = reservations.some(
      (r) =>
        r.machine_id === machine.id &&
        r.dateReservation === today &&
        r.statut !== 'annulee'
    )

    return occupied ? 'Occupée' : 'Libre'

  }

  const freeMachines = machines.filter(
    (machine) => getMachineStatus(machine) === 'Libre'
  )

  const activeReservations = reservations.filter(
    (r) => r.statut !== 'annulee'
  ).length

  const pendingNotifications = reservations
    .filter((r) => r.statut === 'en_attente')
    .map((r) => ({
      message: `Réservation en attente — ${r.machine?.numero} le ${r.dateReservation}`,
    }))

  const handleLogout = async () => {

    try {
      const token = localStorage.getItem('token')
      await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
      console.log(error)
    }

    localStorage.removeItem('token')
    navigate('/student/login')

  }

  return (

    <div className="min-h-screen bg-[#F5F5F5] p-4 sm:p-6">

      {/* HEADER */}

      <header className="flex justify-between items-start">

        {/* LEFT */}

        <div className="flex items-start gap-2 sm:gap-3">

          <img src={logoBuanderie} alt="Buanderie" className="w-14 sm:w-24" />

          <div>
            <h1 className="text-xl sm:text-[38px] leading-none font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
              Buanderie
            </h1>
            <h2 className="text-xl sm:text-[38px] leading-none font-bold text-[#555555] mt-1 sm:mt-2" style={{ fontFamily: 'Playpen Sans' }}>
              ENSIAS
            </h2>
          </div>

        </div>

        {/* CENTER */}

        <h1 className="hidden md:block text-[30px] lg:text-[45px] text-[#555555] font-bold mt-2" style={{ fontFamily: 'Playpen Sans' }}>
          Tableau de bord
        </h1>

        {/* RIGHT */}

        <div className="flex items-center gap-3 sm:gap-6 relative">

          {/* NOTIFICATIONS */}

          <div className="relative">

            <button onClick={() => setShowNotifications(!showNotifications)}>
              <img src={notificationIcon} alt="Notifications" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition" />
            </button>

            {showNotifications && (

              <div className="absolute right-0 mt-4 w-[260px] sm:w-[300px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <h3 className="font-bold text-red-500 mb-4 text-lg">Notifications</h3>

                <div className="space-y-3">
                  {pendingNotifications.length > 0 ? (
                    pendingNotifications.map((n, i) => (
                      <div key={i} className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555]">
                        {n.message}
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555]">
                      Aucune notification
                    </div>
                  )}
                </div>

              </div>

            )}

          </div>

          {/* PROFILE */}

          <div className="relative">

            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex flex-col items-center">
              <img src={profil} alt="Profil" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
              <span className="text-[#555555] text-xs sm:text-sm" style={{ fontFamily: 'Playpen Sans' }}>Profil</span>
            </button>

            {showProfileMenu && (

              <div className="absolute right-0 mt-4 w-[200px] sm:w-[250px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  <Link to="/history">Historique</Link>
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  <Link to="/personal-data">Données personnelles</Link>
                </button>

                <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition">
                  Se déconnecter
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* TITLE MOBILE */}

      <h1 className="block md:hidden text-xl font-bold text-[#555555] mt-3 text-center" style={{ fontFamily: 'Playpen Sans' }}>
        Tableau de bord
      </h1>

      {/* ALERT */}

      {studentAlert && (

        <div className="bg-[#FFF3CD] border border-[#FFE69C] text-[#856404] p-4 sm:p-5 rounded-[20px] mt-6 sm:mt-8 shadow-sm">
          <h3 className="font-bold text-lg sm:text-[24px] mb-2" style={{ fontFamily: 'Playpen Sans' }}>
            Alerte Admin ⚠️
          </h3>
          <p className="text-sm sm:text-[18px]">{studentAlert}</p>
        </div>

      )}

      {/* WELCOME */}

      <div className="mt-6 sm:mt-12">
        <h2 className="text-2xl sm:text-[38px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
          Bonjour,
          <span className="text-[#F56B6B]"> {user?.name} {user?.prenom}</span>
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Bienvenue sur votre espace étudiant</p>
      </div>

      {/* STATS */}

      <div className="flex flex-wrap gap-4 sm:gap-8 mt-6 sm:mt-10">

        <div className="bg-[#F05645] text-white rounded-[20px] sm:rounded-[25px] p-5 sm:p-6 w-[140px] sm:w-[260px] shadow-md">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-white/20 mb-4 sm:mb-6"></div>
          <h1 className="text-3xl sm:text-[40px] font-bold">{activeReservations}</h1>
          <p className="text-sm sm:text-base">Réservations actives</p>
        </div>

        <div className="bg-white rounded-[20px] sm:rounded-[25px] p-5 sm:p-6 w-[140px] sm:w-[260px] shadow-md">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-green-100 mb-4 sm:mb-6"></div>
          <h1 className="text-3xl sm:text-[40px] font-bold text-[#555555]">{freeMachines.length}</h1>
          <p className="text-sm sm:text-base text-[#555555]">Machines libres</p>
        </div>

        <div className="flex items-center ml-auto">
          <Link to="/machines" className="bg-[#F56B6B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-[12px] sm:rounded-[15px] font-bold shadow-md hover:scale-[1.03] transition text-sm sm:text-base" style={{ fontFamily: 'Playpen Sans' }}>
            Réserver
          </Link>
        </div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-10 sm:mt-14">

        {/* MACHINES */}

        <div>

          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-[28px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
              État des machines
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-5">

            {machines.map((machine) => {

              const status = getMachineStatus(machine)

              return (

                <div key={machine.id} className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] shadow-sm">

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[12px] bg-[#F9ECEA] flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-[#555555] text-sm sm:text-base">{machine.numero}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{machine.type}</p>
                    </div>
                  </div>

                  <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                    status === 'Libre'
                      ? 'bg-green-100 text-green-600'
                      : status === 'En panne'
                      ? 'bg-orange-100 text-orange-500'
                      : 'bg-red-100 text-red-500'
                  }`}>
                    {status}
                  </span>

                </div>

              )

            })}

          </div>

        </div>

        {/* RESERVATIONS */}

        <div>

          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-[28px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
              Réservations récentes
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-5">

            {reservations.length > 0 ? (

              reservations.slice(0, 5).map((reservation, index) => (

                <div key={index} className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] shadow-sm">

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[12px] bg-[#EAF7EF] flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-[#555555] text-sm sm:text-base">
                        {reservation.machine?.numero} — {reservation.machine?.type}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">Réservation confirmée</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h3 className="font-bold text-[#555555] text-xs sm:text-sm">
                      {reservation.creneau?.heureDebut?.substring(0, 5)}
                    </h3>
                    <p className="text-gray-500 text-xs">{reservation.dateReservation}</p>
                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white p-5 rounded-[20px] shadow-sm text-gray-500">
                Aucune réservation
              </div>

            )}

          </div>

        </div>

      </div>

      <ChatbotUI />

    </div>

  )

}

export default StudentDashboard