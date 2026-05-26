import { useEffect, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import api from '../api/api'

import profil from '../assets/profil.png'
import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import notificationIcon from '../assets/notification-icon.png'

function CalendarPage() {

  const [date, setDate] = useState(new Date())

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [showNotifications, setShowNotifications] = useState(false)

  const [student, setStudent] = useState(null)

  const [notifications, setNotifications] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const fetchStudentData = async () => {

      try {

        const token = localStorage.getItem('token')

        const response = await api.get(
          '/student/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setStudent(response.data)

      } catch (error) {

        console.error(
          'Erreur récupération étudiant :',
          error
        )

      }

    }

    const fetchNotifications = async () => {

      try {

        const token = localStorage.getItem('token')

        const response = await api.get(
          '/student/notifications',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setNotifications(response.data)

      } catch (error) {

        console.error(
          'Erreur notifications :',
          error
        )

      }

    }

    fetchStudentData()
    fetchNotifications()

  }, [])

  const handleConfirmDate = () => {

    const day = date.getDay()

    /*
      1 = lundi
      2 = mardi
    */

    if (
      student?.gender === 'Femme'
      && day === 2
    ) {

      alert('Ce jour est réservé aux garçons')

      return

    }

    if (
      student?.gender === 'Homme'
      && day === 1
    ) {

      alert('Ce jour est réservé aux filles')

      return

    }

    localStorage.setItem(
      'selectedDate',
      date.toISOString()
    )

    navigate('/slots')

  }

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* HEADER */}

      <header className="flex justify-between items-start px-10 py-6 relative z-10">

        {/* LEFT */}

        <div className="flex items-start gap-3">

          <img
            src={logoBuanderie}
            alt="Buanderie"
            className="w-24"
          />

          <div>

            <h1
              className="text-[38px] leading-none font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Buanderie
            </h1>

            <h2
              className="text-[38px] leading-none font-bold text-[#555555] mt-2"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              ENSIAS
            </h2>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* NOTIFICATIONS */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >

              <img
                src={notificationIcon}
                alt="Notifications"
                className="w-10 h-10 hover:scale-110 transition"
              />

            </button>

            {showNotifications && (

              <div className="absolute right-0 mt-4 w-[320px] bg-white rounded-[20px] shadow-lg p-5 z-50">

                <h2 className="text-[22px] font-bold text-[#555555] mb-4">

                  Notifications

                </h2>

                <div className="space-y-4">

                  {notifications.length > 0 ? (

                    notifications.map(
                      (notification, index) => (

                        <div
                          key={index}
                          className="bg-[#F9F9F9] p-4 rounded-[15px]"
                        >

                          <p className="text-[#555555]">

                            {notification.message}

                          </p>

                        </div>

                      )
                    )

                  ) : (

                    <div className="bg-[#F9F9F9] p-4 rounded-[15px]">

                      <p className="text-[#555555]">

                        Aucune notification disponible

                      </p>

                    </div>

                  )}

                </div>

              </div>

            )}

          </div>

          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfileMenu(
                  !showProfileMenu
                )
              }
              className="flex flex-col items-center"
            >

              <img
                src={profil}
                alt="Profil"
                className="w-10 h-10 rounded-full"
              />

              <span
                className="text-[#555555]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Profil
              </span>

            </button>

            {showProfileMenu && (

              <div className="absolute right-0 mt-4 w-[250px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <Link
                  to="/history"
                  className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition"
                >
                  Historique
                </Link>

                <Link
                  to="/personal-data"
                  className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition"
                >
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

      <div className="text-center mt-8 relative z-10">

        <h1
          className="text-[48px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Choisissez une date
        </h1>

        <p className="text-gray-500 mt-2 text-lg">

          Sélectionnez la date de réservation

        </p>

      </div>

      {/* CALENDAR */}

      <div className="flex flex-col items-center mt-16 relative z-10">

        <div className="bg-white p-8 rounded-[35px] shadow-2xl">

          <Calendar
            onChange={setDate}
            value={date}
          />

        </div>

        <button
          onClick={handleConfirmDate}
          className="mt-10 bg-[#F56B6B] text-white px-10 py-4 rounded-[15px] font-bold hover:scale-[1.03] transition"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Confirmer la date
        </button>

      </div>

    </div>

  )

}

export default CalendarPage