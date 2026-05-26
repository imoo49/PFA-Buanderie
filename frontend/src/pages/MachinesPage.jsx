import  {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

import washingMachine from '../assets/washing-machine.png'
import dryerMachine from '../assets/dryer.png'
import profil from '../assets/profil.png'
import notificationIcon from '../assets/notification-icon.png'
function MachinesPage() {
  const [machines, setMachines] = useState([])
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
const laveLinge = machines.filter(
  machine => machine.type === 'lave-linge'
)

const secheLinge = machines.filter(
  machine => machine.type === 'seche-linge'
)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

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

        <div className="flex items-center gap-5 relative">

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

                <button className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition">

                  <Link to="/student/login">
                    Se déconnecter
                  </Link>

                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* TITLE */}

      <div className="text-center mt-6 relative z-10">

        <h1
          className="text-[48px] text-[#555555] font-bold"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Choisissez une machine
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Sélectionnez le type de machine à utiliser
        </p>

      </div>

      <div className="flex justify-center gap-28 mt-24 relative z-10">

  {/* MACHINE A LAVER */}
  <Link to="/calendar">
    <div
      onClick={() => localStorage.setItem('selectedMachine', 'lave-linge')}
      className="w-[350px] h-[420px]
      bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
      rounded-[40px]
      shadow-xl
      flex flex-col items-center justify-center
      cursor-pointer
      transition duration-300
      hover:scale-[1.04]
      hover:shadow-2xl"
    >
      <img src={washingMachine} className="w-[230px] h-[230px]" />

      <h2 className="mt-10 text-[36px] font-bold text-[#555555]">
        MACHINE À LAVER ({laveLinge.length})
      </h2>
    </div>
  </Link>

  {/* SECHE LINGE */}
  <Link to="/calendar">
    <div
      onClick={() => localStorage.setItem('selectedMachine', 'seche-linge')}
      className="w-[350px] h-[420px]
      bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
      rounded-[40px]
      shadow-xl
      flex flex-col items-center justify-center
      cursor-pointer
      transition duration-300
      hover:scale-[1.04]
      hover:shadow-2xl"
    >
      <img src={dryerMachine} className="w-[230px] h-[230px]" />

      <h2 className="mt-10 text-[36px] font-bold text-[#555555]">
        SÈCHE LINGE ({secheLinge.length})
      </h2>
    </div>
  </Link>

 </div>

    </div>
  )
}

export default MachinesPage