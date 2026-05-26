import { useState, useEffect } from 'react'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import profil from '../assets/profil.png'
import api from '../api/api'

function AdminDashboard() {
  const [alertMessage, setAlertMessage] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [machines, setMachines] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }

        const [machinesRes, reservationsRes] = await Promise.all([
          api.get('/machines', { headers }),
          api.get('/reservations', { headers }),
        ])

        setMachines(machinesRes.data)
        setReservations(reservationsRes.data)
      } catch (error) {
        console.error('Erreur chargement admin :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const todayReservations = reservations.filter(
    (r) => r.dateReservation === today && r.statut !== 'annulee'
  )

  const getMachineStatus = (machineId) => {
    const occupied = reservations.some(
      (r) =>
        r.machine_id === machineId &&
        r.dateReservation === today &&
        r.statut !== 'annulee'
    )
    return occupied ? 'Occupée' : 'Libre'
  }

  const handleSendAlert = () => {
    if (!alertMessage) {
      alert('Veuillez écrire une alerte')
      return
    }

    localStorage.setItem('studentAlert', alertMessage)

    alert('Alerte envoyée aux étudiants')

    setAlertMessage('')
  }

  const deleteMachine = (id) => {
    setMachines(machines.filter((machine) => machine.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      {/* HEADER */}

      <header className="flex justify-between items-start">
        {/* LEFT */}

        <div className="flex items-start gap-3">
          <img src={logoBuanderie} alt="Buanderie" className="w-24" />

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
          <img src={logoEnsias} alt="ENSIAS" className="w-24" />

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex flex-col items-center"
            >
              <img
                src={profil}
                alt="Admin"
                className="w-12 h-12 rounded-full object-cover"
              />

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

                <button
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/admin/login'
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
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
          Bonjour Admin
        </h2>

        <p className="text-gray-500 mt-1">Gérez les machines et les réservations</p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-8 mt-10">
        <div className="bg-[#F56B6B] text-white rounded-[25px] p-6 shadow-md">
          <h1 className="text-[40px] font-bold">{reservations.length}</h1>

          <p>Réservations</p>
        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">
          <h1 className="text-[40px] font-bold text-[#555555]">
            {[...new Set(reservations.map((r) => r.user_id))].length}
          </h1>

          <p className="text-[#555555]">Étudiants</p>
        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">
          <h1 className="text-[40px] font-bold text-[#555555]">{machines.length}</h1>

          <p className="text-[#555555]">Machines</p>
        </div>

        <div className="bg-white rounded-[25px] p-6 shadow-md">
          <h1 className="text-[40px] font-bold text-[#555555]">
            {todayReservations.length}
          </h1>

          <p className="text-[#555555]">Aujourd'hui</p>
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
          </div>

          <div className="space-y-5">
            {machines.map((machine) => {
              const status = getMachineStatus(machine.id)
              return (
                <div
                  key={machine.id}
                  className="flex justify-between items-center bg-[#F9F9F9] p-5 rounded-[20px]"
                >
                  <div>
                    <h3 className="font-bold text-[#555555] text-lg">
                      {machine.numero}
                    </h3>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold
                      ${
                        status === 'Libre'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteMachine(machine.id)}
                    className="bg-red-100 text-red-500 px-4 py-2 rounded-[12px] hover:bg-red-200 transition"
                  >
                    Supprimer
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* ALERT SECTION */}

        <div className="bg-white p-8 rounded-[30px] shadow-md mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-[30px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Envoyer une alerte
            </h2>
          </div>

          <textarea
            placeholder="Ex: La buanderie sera fermée demain de 14h à 18h."
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
            className="w-full h-[120px] rounded-[20px] border border-[#E5E5E5] p-5 outline-none resize-none"
          />

          <button
            onClick={handleSendAlert}
            className="mt-5 bg-[#F56B6B] text-white px-8 py-4 rounded-[15px] font-bold hover:scale-[1.02] transition"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Envoyer l'alerte
          </button>
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

            <button className="text-[#F56B6B] font-semibold">Voir tout →</button>
          </div>

          <div className="space-y-5">
            {reservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="bg-[#F9F9F9] p-5 rounded-[20px] hover:shadow-md transition cursor-pointer"
                onClick={() =>
                  alert(
                    `Étudiant : ${reservation.user?.name} ${reservation.user?.prenom}
Machine : ${reservation.machine?.numero}
Date : ${reservation.dateReservation}
Créneau : ${reservation.creneau?.heureDebut} - ${reservation.creneau?.heureFin}
Statut : ${reservation.statut}`
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-[#555555] text-lg">
                      {reservation.user?.name} {reservation.user?.prenom}
                    </h3>

                    <p className="text-gray-500">
                      {reservation.machine?.numero} •{' '}
                      {reservation.creneau?.heureDebut}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold
                    ${
                      reservation.statut === 'confirme'
                        ? 'bg-green-100 text-green-600'
                        : reservation.statut === 'en_attente'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {reservation.statut}
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
