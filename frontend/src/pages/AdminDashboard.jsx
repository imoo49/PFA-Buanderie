import { useState } from 'react'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function AdminDashboard() {

  const [showProfile, setShowProfile] = useState(false)

  const [machines, setMachines] = useState([
    {
      id: 1,
      name: 'LV-01',
      status: 'Libre',
    },
    {
      id: 2,
      name: 'SL-02',
      status: 'Occupée',
    },
    {
      id: 3,
      name: 'LV-03',
      status: 'Hors service',
    },
  ])

  const [reservations] = useState([
    {
      id: 1,
      student: 'Malak Zikri',
      machine: 'LV-01',
      time: '14:00',
      duration: '1h30',
      status: 'Confirmée',
    },
    {
      id: 2,
      student: 'Sara Amrani',
      machine: 'SL-02',
      time: '16:30',
      duration: '1h',
      status: 'En attente',
    },
    {
      id: 3,
      student: 'Yassine Alaoui',
      machine: 'LV-03',
      time: '18:00',
      duration: '2h',
      status: 'Terminée',
    },
  ])

  const addMachine = () => {

    const newMachine = {
      id: machines.length + 1,
      name: `LV-0${machines.length + 1}`,
      status: 'Libre',
    }

    setMachines([...machines, newMachine])
  }

  const deleteMachine = (id) => {
    setMachines(
      machines.filter((machine) => machine.id !== id)
    )
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
          Dashboard Admin
        </h1>

        {/* RIGHT */}

        <div className="flex items-center gap-6 relative">

          <img
            src={logoEnsias}
            alt="ENSIAS"
            className="w-24"
          />

          <div className="relative">

            <button
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="flex flex-col items-center"
            >

              <span className="text-[35px]">
                👤
              </span>

              <span
                className="text-[#555555]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Admin
              </span>

            </button>

            {showProfile && (

              <div className="absolute right-0 mt-4 w-[220px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Paramètres
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition">
                  Déconnexion
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* WELCOME */}

      <div className="mt-12">

        <h2
          className="text-[38px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Bonjour Admin 👋
        </h2>

        <p className="text-gray-500 mt-1">
          Gérez les machines et les réservations
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-8 mt-10">

        <div className="bg-[#F56B6B] text-white rounded-[25px] p-6 shadow-md">

          <h1 className="text-[40px] font-bold">
            24
          </h1>

          <p>
            Réservations
          </p>

        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">

          <h1 className="text-[40px] font-bold text-[#555555]">
            56
          </h1>

          <p className="text-[#555555]">
            Étudiants
          </p>

        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">

          <h1 className="text-[40px] font-bold text-[#555555]">
            {machines.length}
          </h1>

          <p className="text-[#555555]">
            Machines
          </p>

        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">

          <h1 className="text-[40px] font-bold text-[#555555]">
            12
          </h1>

          <p className="text-[#555555]">
            Aujourd’hui
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-2 gap-10 mt-14">

        {/* MACHINES */}

        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <div className="flex justify-between items-center mb-8">

            <h2
              className="text-[30px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Gestion des machines
            </h2>

            <button
              onClick={addMachine}
              className="bg-[#F56B6B] text-white px-5 py-3 rounded-[15px] font-bold hover:scale-[1.03] transition"
            >
              + Ajouter
            </button>

          </div>

          <div className="space-y-5">

            {machines.map((machine) => (

              <div
                key={machine.id}
                className="flex justify-between items-center bg-[#F9F9F9] p-5 rounded-[20px]"
              >

                <div>

                  <h3 className="font-bold text-[#555555] text-lg">
                    {machine.name}
                  </h3>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold
                    ${
                      machine.status === 'Libre'
                        ? 'bg-green-100 text-green-600'
                        : machine.status === 'Occupée'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {machine.status}
                  </span>

                </div>

                <button
                  onClick={() =>
                    deleteMachine(machine.id)
                  }
                  className="bg-red-100 text-red-500 px-4 py-2 rounded-[12px] hover:bg-red-200 transition"
                >
                  Supprimer
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* RESERVATIONS */}

        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <div className="flex justify-between items-center mb-8">

            <h2
              className="text-[30px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Réservations récentes
            </h2>

            <button className="text-[#F56B6B] font-semibold">
              Voir tout →
            </button>

          </div>

          <div className="space-y-5">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="bg-[#F9F9F9] p-5 rounded-[20px] hover:shadow-md transition cursor-pointer"
                onClick={() =>
                  alert(
                    `Étudiant : ${reservation.student}
Machine : ${reservation.machine}
Horaire : ${reservation.time}
Durée : ${reservation.duration}
Statut : ${reservation.status}`
                  )
                }
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-[#555555] text-lg">
                      {reservation.student}
                    </h3>

                    <p className="text-gray-500">
                      {reservation.machine} • {reservation.time}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold
                    ${
                      reservation.status === 'Confirmée'
                        ? 'bg-green-100 text-green-600'
                        : reservation.status === 'En attente'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {reservation.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard