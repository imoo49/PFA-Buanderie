import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import api from '../api/api'
import { useNotifications } from '../context/NotificationContext'

import profil from '../assets/profil.png'
import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import notificationIcon from '../assets/notification-icon.png'

function CalendarPage() {

  const [date, setDate] = useState(new Date())
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [student, setStudent] = useState(null)

  const { dbNotifications, markAsRead } = useNotifications()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStudent(response.data)
      } catch (error) {
        console.error('Erreur récupération étudiant :', error)
      }
    }

    fetchStudentData()
  }, [])

  const handleConfirmDate = () => {
    const day = date.getDay()

    if (student?.genre === 'Femme' && day === 2) {
      navigate('/boys-day')
      return
    }

    if (student?.genre === 'Homme' && day === 1) {
      navigate('/girls-day')
      return
    }

    localStorage.setItem('selectedDate', date.toLocaleDateString('en-CA'))


    navigate('/slots')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* HEADER */}

      <header className="flex justify-between items-start px-5 sm:px-10 py-6 relative z-10">

        {/* LEFT */}

        <div className="flex items-start gap-3">
          <img src={logoBuanderie} alt="Buanderie" className="w-14 sm:w-24" />
          <div>
            <h1 className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
              Buanderie
            </h1>
            <h2 className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555] mt-2" style={{ fontFamily: 'Playpen Sans' }}>
              ENSIAS
            </h2>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* NOTIFICATIONS */}

          <div className="relative">

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <img
                src={notificationIcon}
                alt="Notifications"
                className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition"
              />
              {dbNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {dbNotifications.length}
                </span>
              )}
            </button>

            {showNotifications && (

              <div className="absolute right-0 mt-4 w-[260px] sm:w-[320px] bg-white rounded-[20px] shadow-lg p-5 z-50">

                <h2 className="text-[18px] sm:text-[22px] font-bold text-[#555555] mb-4">
                  Notifications
                </h2>

                <div className="space-y-4">
                  {dbNotifications.length > 0 ? (
                    dbNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className="bg-[#F9F9F9] p-4 rounded-[15px] cursor-pointer hover:bg-red-50 transition"
                      >
                        <p className="text-[#555555]">{n.data?.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#F9F9F9] p-4 rounded-[15px]">
                      <p className="text-[#555555]">Aucune notification disponible</p>
                    </div>
                  )}
                </div>

              </div>

            )}

          </div>

          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center"
            >
              <img src={profil} alt="Profil" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
              <span className="text-[#555555] text-sm" style={{ fontFamily: 'Playpen Sans' }}>
                Profil
              </span>
            </button>

            {showProfileMenu && (

              <div className="absolute right-0 mt-4 w-[200px] sm:w-[250px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <Link to="/history" className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Historique
                </Link>

                <Link to="/personal-data" className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Données personnelles
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/student/login')
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
                  Se déconnecter
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* TITLE */}

      <div className="text-center mt-4 sm:mt-8 relative z-10 px-4">
        <h1 className="text-[30px] sm:text-[48px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
          Choisissez une date
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Sélectionnez la date de réservation</p>
      </div>

      {/* CALENDAR */}

      <div className="flex flex-col items-center mt-8 sm:mt-16 relative z-10 px-4">

        <div className="bg-white p-4 sm:p-8 rounded-[35px] shadow-2xl w-full max-w-[420px]">
          <Calendar
            onChange={setDate}
            value={date}
            minDate={new Date()}
          />
        </div>

        <button
          onClick={handleConfirmDate}
          className="mt-8 sm:mt-10 bg-[#F56B6B] text-white px-10 py-4 rounded-[15px] font-bold hover:scale-[1.03] transition"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Confirmer la date
        </button>

      </div>

    </div>
  )
}

export default CalendarPage