import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import { useNotifications } from '../context/NotificationContext'

import logoBuanderie from '../assets/logo-buanderie.png'
import washingMachine from '../assets/washing-machine.png'
import dryerMachine from '../assets/dryer.png'
import profil from '../assets/profil.png'
import notificationIcon from '../assets/notification-icon.png'

function MachinesPage() {

  const [machines, setMachines] = useState([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const { dbNotifications, markAsRead } = useNotifications()

  const fetchMachines = async () => {
    try {
      const response = await api.get('/machines')
      setMachines(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMachines()
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      <div className="absolute top-[-200px] left-[-120px] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>
      <div className="absolute bottom-[-250px] right-[-150px] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* HEADER */}
      <header className="flex justify-between items-start px-5 sm:px-10 py-5 sm:py-6 relative z-10">

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

        <div className="flex items-center gap-3 sm:gap-5 relative">

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
              <img src={notificationIcon} alt="Notifications" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition" />
              {dbNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {dbNotifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-[260px] sm:w-[300px] bg-white rounded-[20px] shadow-lg p-4 z-50">
                <h3 className="font-bold text-red-500 mb-4 text-lg">Notifications</h3>
                <div className="space-y-3">
                  {dbNotifications.length > 0 ? (
                    dbNotifications.map((n) => (
                      <div key={n.id} onClick={() => markAsRead(n.id)} className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555] cursor-pointer hover:bg-red-50 transition">
                        {n.data?.message}
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555]">Aucune notification</div>
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
                <Link to="/history" className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Historique
                </Link>
                <Link to="/personal-data" className="block w-full px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Données personnelles
                </Link>
                <Link to="/student/login" onClick={() => localStorage.removeItem('token')} className="block w-full px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition">
                  Se déconnecter
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* TITLE */}
      <div className="text-center mt-4 sm:mt-6 relative z-10 px-4">
        <h1 className="text-2xl sm:text-[48px] text-[#555555] font-bold" style={{ fontFamily: 'Playpen Sans' }}>
          Choisissez une machine
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-lg">
          Sélectionnez le type de machine à utiliser
        </p>
      </div>

      {/* MACHINE CARDS */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mt-12 sm:mt-24 px-5 relative z-10 pb-10">

        {/* FIX : onClick sur Link directement, pas sur le div enfant */}
        <Link
          to="/calendar"
          className="w-full sm:w-auto"
          onClick={() => localStorage.setItem('selectedMachine', 'lave-linge')}
        >
          <div className="
            w-full sm:w-[300px] lg:w-[350px]
            h-[200px] sm:h-[360px] lg:h-[420px]
            bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
            rounded-[25px] sm:rounded-[40px]
            shadow-xl
            flex flex-row sm:flex-col items-center justify-center
            cursor-pointer transition duration-300
            hover:scale-[1.03] hover:shadow-2xl
            gap-6 sm:gap-0 px-6 sm:px-0"
          >
            <img src={washingMachine} className="w-28 h-28 sm:w-[180px] lg:w-[230px] sm:h-[180px] lg:h-[230px]" alt="Lave-linge" />
            <h2 className="text-lg sm:text-2xl lg:text-[28px] font-bold text-[#555555] sm:mt-6 text-center">
              MACHINE À LAVER
            </h2>
          </div>
        </Link>

        {/* FIX : idem pour sèche-linge */}
        <Link
          to="/calendar"
          className="w-full sm:w-auto"
          onClick={() => localStorage.setItem('selectedMachine', 'seche-linge')}
        >
          <div className="
            w-full sm:w-[300px] lg:w-[350px]
            h-[200px] sm:h-[360px] lg:h-[420px]
            bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
            rounded-[25px] sm:rounded-[40px]
            shadow-xl
            flex flex-row sm:flex-col items-center justify-center
            cursor-pointer transition duration-300
            hover:scale-[1.03] hover:shadow-2xl
            gap-6 sm:gap-0 px-6 sm:px-0"
          >
            <img src={dryerMachine} className="w-28 h-28 sm:w-[180px] lg:w-[230px] sm:h-[180px] lg:h-[230px]" alt="Sèche-linge" />
            <h2 className="text-lg sm:text-2xl lg:text-[28px] font-bold text-[#555555] sm:mt-6 text-center">
              SÈCHE LINGE
            </h2>
          </div>
        </Link>

      </div>

    </div>
  )
}

export default MachinesPage