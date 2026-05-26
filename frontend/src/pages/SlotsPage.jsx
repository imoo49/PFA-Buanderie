import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../api/api'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import profil from '../assets/profil.png'
import notificationIcon from '../assets/notification-icon.png'

function SlotsPage() {
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [showNotifications, setShowNotifications] = useState(false)

  const [slots, setSlots] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem('token')
        const selectedMachineType = localStorage.getItem('selectedMachine')
        const selectedDate = localStorage.getItem('selectedDate')
        const dateStr = selectedDate
          ? new Date(selectedDate).toISOString().split('T')[0]
          : null

        const [creneauxRes, reservationsRes] = await Promise.all([
          api.get('/creneaux', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/reservations', { headers: { Authorization: `Bearer ${token}` } }),
        ])

        const allCreneaux = creneauxRes.data
        const allReservations = reservationsRes.data

        const filteredCreneaux = allCreneaux.filter(
          (c) => c.machine?.type === selectedMachineType && c.date === dateStr
        )

        const mappedSlots = filteredCreneaux.map((c) => {
          const isOccupied = allReservations.some(
            (r) => r.creneau_id === c.id && r.statut !== 'annulee'
          )

          let status = 'free'
          if (isOccupied) {
            status = 'occupied'
          } else if (c.statut === 'termine') {
            status = 'maintenance'
          }

          return {
            id: c.id,
            machine_id: c.machine_id,
            hour: `${c.heureDebut.substring(0, 5)} - ${c.heureFin.substring(0, 5)}`,
            status,
          }
        })

        setSlots(mappedSlots)
      } catch (error) {
        console.error('Erreur récupération créneaux :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlots()
  }, [])

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot.hour)
    localStorage.setItem('selectedSlot', slot.hour)
    localStorage.setItem('selectedCreneauId', slot.id)
    localStorage.setItem('selectedMachineId', slot.machine_id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Chargement...
      </div>
    )
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

        {/* RIGHT */}

        <div className="flex items-center gap-5">
          {/* NOTIFICATIONS */}

          <button onClick={() => setShowNotifications(!showNotifications)}>
            <img
              src={notificationIcon}
              alt="Notifications"
              className="w-10 h-10 hover:scale-110 transition"
            />
          </button>

          {/* PROFILE */}

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center"
            >
              <img src={profil} alt="Profil" className="w-10 h-10 rounded-full" />

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
                    localStorage.removeItem('user')
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
                  <Link to="/student/login">Se déconnecter</Link>
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
          Créneaux disponibles
        </h1>

        <p className="text-gray-500 mt-2 text-lg">Choisissez un créneau horaire</p>
      </div>

      {/* SLOTS */}

      <div className="flex justify-center mt-16 relative z-10">
        {slots.length === 0 ? (
          <div className="bg-white p-10 rounded-[25px] text-center shadow-lg">
            <h2 className="text-2xl text-gray-500 font-bold">
              Aucun créneau disponible pour cette date
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-8">
            {slots.map((slot, index) => (
              <button
                key={index}
                disabled={slot.status !== 'free'}
                onClick={() => handleSelectSlot(slot)}
                className={`
                  w-[180px]
                  h-[120px]
                  rounded-[25px]
                  shadow-lg
                  font-bold
                  transition
                  flex
                  flex-col
                  items-center
                  justify-center

                  ${
                    slot.status === 'occupied'
                      ? 'bg-red-100 text-red-500 cursor-not-allowed'
                      : slot.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-600 cursor-not-allowed'
                      : selectedSlot === slot.hour
                      ? 'bg-[#F56B6B] text-white scale-[1.03]'
                      : 'bg-white text-[#555555] hover:scale-[1.03]'
                  }
                `}
                style={{ fontFamily: 'Playpen Sans' }}
              >
                <span className="text-[24px]">{slot.hour}</span>

                <span className="text-sm mt-2">
                  {slot.status === 'free'
                    ? 'Disponible'
                    : slot.status === 'occupied'
                    ? 'Occupé'
                    : 'Maintenance'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LEGEND */}

      <div className="flex justify-center gap-10 mt-14 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-white border"></div>

          <span>Disponible</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-200"></div>

          <span>Occupé</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-yellow-200"></div>

          <span>Maintenance</span>
        </div>
      </div>

      {/* BUTTON */}

      <div className="flex justify-center mt-16 relative z-10">
        <Link
          to="/reservation-summary"
          className={`
            px-12
            py-4
            rounded-[18px]
            text-[22px]
            font-bold
            shadow-lg
            transition

            ${
              selectedSlot
                ? 'bg-[#F56B6B] text-white hover:scale-[1.03]'
                : 'bg-gray-300 text-gray-500 pointer-events-none'
            }
          `}
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Confirmer la réservation
        </Link>
      </div>
    </div>
  )
}

export default SlotsPage
