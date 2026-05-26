import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../api/api'

import notificationIcon from '../assets/notification-icon.png'
import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import profil from '../assets/profil.png'

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

        // USER CONNECTÉ
        const userResponse = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUser(userResponse.data)

        // MACHINES
        const machinesResponse = await api.get('/machines', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setMachines(machinesResponse.data)

        // RESERVATIONS
        try {

          const reservationsResponse = await api.get('/reservations', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          setReservations(reservationsResponse.data)

        } catch (error) {

          console.log('Pas encore de route reservations')

        }

      } catch (error) {

        console.error(error)

        localStorage.removeItem('token')

        navigate('/student/login')

      }

    }

    fetchDashboard()

  }, [])

  const freeMachines = machines.filter(
    machine => machine.status === 'Libre'
  )

  const activeReservations = reservations.length

  const handleLogout = async () => {

    try {

      const token = localStorage.getItem('token')

      await api.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    } catch (error) {

      console.log(error)

    }

    localStorage.removeItem('token')

    navigate('/student/login')

  }

  return (

    <div className="min-h-screen bg-[#F5F5F5] p-6">

      {/* HEADER */}

      <header className="flex justify-between items-start">

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

        {/* CENTER */}

        <h1
          className="text-[45px] text-[#555555] font-bold mt-2"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Tableau de bord
        </h1>

        {/* RIGHT */}

        <div className="flex items-center gap-6 relative">

          {/* NOTIFICATIONS */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
            >

              <img
                src={notificationIcon}
                alt="Notifications"
                className="w-10 h-10 hover:scale-110 transition"
              />

            </button>

            {showNotifications && (

              <div className="absolute right-0 mt-4 w-[300px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <h3 className="font-bold text-red-500 mb-4 text-lg">
                  Notifications
                </h3>

                <div className="space-y-3">

                  <div className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555]">
                    Maintenance prévue demain à 14h.
                  </div>

                  <div className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555]">
                    Votre réservation est confirmée.
                  </div>

                </div>

              </div>

            )}

          </div>

          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
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

                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">

                  <Link to="/history">
                    Historique
                  </Link>

                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">

                  <Link to="/personal-data">
                    Données personnelles
                  </Link>

                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
                  Se déconnecter
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* ALERT */}

      {studentAlert && (

        <div className="bg-[#FFF3CD] border border-[#FFE69C] text-[#856404] p-5 rounded-[20px] mt-8 shadow-sm">

          <h3
            className="font-bold text-[24px] mb-2"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Alerte Admin ⚠️
          </h3>

          <p className="text-[18px]">
            {studentAlert}
          </p>

        </div>

      )}

      {/* WELCOME */}

      <div className="mt-12">

        <h2
          className="text-[38px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Bonjour,
          <span className="text-[#F56B6B]">
            {' '}
            {user?.name}
          </span>
        </h2>

        <p className="text-gray-500 mt-1">
          Bienvenue sur votre espace étudiant
        </p>

      </div>

      {/* STATS */}

      <div className="flex gap-8 mt-10">

        {/* ACTIVE */}

        <div className="bg-[#F05645] text-white rounded-[25px] p-6 w-[260px] shadow-md">

          <div className="w-10 h-10 rounded-[12px] bg-white/20 mb-6"></div>

          <h1 className="text-[40px] font-bold">
            {activeReservations}
          </h1>

          <p>
            Réservations actives
          </p>

        </div>

        {/* FREE */}

        <div className="bg-white rounded-[25px] p-6 w-[260px] shadow-md">

          <div className="w-10 h-10 rounded-[12px] bg-green-100 mb-6"></div>

          <h1 className="text-[40px] font-bold text-[#555555]">
            {freeMachines.length}
          </h1>

          <p className="text-[#555555]">
            Machines libres
          </p>

        </div>

        {/* BUTTON */}

        <div className="flex items-center ml-auto">

          <Link
            to="/machines"
            className="bg-[#F56B6B] text-white px-8 py-4 rounded-[15px] font-bold shadow-md hover:scale-[1.03] transition"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Réserver
          </Link>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-2 gap-12 mt-14">

        {/* MACHINES */}

        <div>

          <div className="flex justify-between items-center mb-6">

            <h2
              className="text-[28px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              État des machines
            </h2>

          </div>

          <div className="space-y-5">

            {machines.map((machine) => (

              <div
                key={machine.id}
                className="flex justify-between items-center bg-white p-5 rounded-[20px] shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-[12px] bg-[#F9ECEA]"></div>

                  <div>

                    <h3 className="font-bold text-[#555555]">
                      {machine.nom}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {machine.type}
                    </p>

                  </div>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold
                  ${
                    machine.status === 'Libre'
                      ? 'bg-green-100 text-green-600'
                      : machine.status === 'Occupée'
                      ? 'bg-red-100 text-red-500'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {machine.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* RESERVATIONS */}

        <div>

          <div className="flex justify-between items-center mb-6">

            <h2
              className="text-[28px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Réservations récentes
            </h2>

          </div>

          <div className="space-y-5">

            {reservations.length > 0 ? (

              reservations.map((reservation, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-5 rounded-[20px] shadow-sm"
                >

                  <div>

                    <h3 className="font-bold text-[#555555]">
                      {reservation.machine}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Réservation confirmée
                    </p>

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

    </div>

  )

}

export default StudentDashboard