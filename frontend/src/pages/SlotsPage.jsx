import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import { useNotifications } from '../context/NotificationContext'

import logoBuanderie from '../assets/logo-buanderie.png'
import profil from '../assets/profil.png'
import notificationIcon from '../assets/notification-icon.png'

const DUREES = [
  { label: '30 min', value: 30 },
  { label: '1 heure', value: 60 },
  { label: '1h30', value: 90 },
  { label: '2 heures', value: 120 },
]

function SlotsPage() {

  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [duree, setDuree] = useState(60)

  const { dbNotifications, markAsRead } = useNotifications()

  const intervalRef = useRef(null)

  const fetchSlots = async (dureeValue, dateOverride = null) => {
    try {
      const token = localStorage.getItem('token')
      const selectedMachineType = localStorage.getItem('selectedMachine')
      const rawDate = dateOverride ?? localStorage.getItem('selectedDate')

      // FIX : slice(0,10) évite le décalage UTC
      const dateStr = rawDate ? rawDate.slice(0, 10) : null

      if (!dateStr || !selectedMachineType) {
        setSlots([])
        setLoading(false)
        return
      }

      const response = await api.get('/creneaux/generer', {
        params: {
          date: dateStr,
          machine_type: selectedMachineType,
          duree: dureeValue,
        },
        headers: { Authorization: `Bearer ${token}` },
      })

      setSlots(response.data)

    } catch (error) {
      console.error('Erreur récupération créneaux :', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // FIX : relit la date depuis localStorage à chaque montage ou changement de durée
    const freshDate = localStorage.getItem('selectedDate') || ''

    setLoading(true)
    setSelectedSlot(null)
    fetchSlots(duree, freshDate)

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => fetchSlots(duree, freshDate), 30000)

    return () => clearInterval(intervalRef.current)
  }, [duree])

  const handleSelectSlot = (slot) => {
    if (slot.status !== 'free') return

    setSelectedSlot(slot.label)

    localStorage.setItem('selectedSlot', slot.label)
    localStorage.setItem('selectedCreneauId', slot.creneau_id)
    localStorage.setItem('selectedMachineId', slot.machine_id)
    localStorage.setItem('selectedDuree', duree)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Chargement...
      </div>
    )
  }

  // FIX : toLocaleDateString('en-CA') donne YYYY-MM-DD en heure locale (pas UTC)
  const today = new Date().toLocaleDateString('en-CA')

  const rawSelected = localStorage.getItem('selectedDate')
  const dateStr = rawSelected ? rawSelected.slice(0, 10) : null

  const slotsAffiches = dateStr === today
    ? slots.filter((slot) => {
        const [h, m] = slot.label.split(' - ')[0].split(':')
        const heureDebut = new Date()
        heureDebut.setHours(parseInt(h), parseInt(m), 0, 0)
        return heureDebut > new Date()
      })
    : slots

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>
      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* HEADER */}
      <header className="flex justify-between items-start px-5 sm:px-10 py-6 relative z-10">

        <div className="flex items-start gap-3">
          <img src={logoBuanderie} alt="Buanderie" className="w-14 sm:w-24" />

          <div>
            <h1
              className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Buanderie
            </h1>

            <h2
              className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555] mt-2"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              ENSIAS
            </h2>
          </div>
        </div>

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

              <div className="absolute right-0 mt-4 w-[260px] sm:w-[300px] bg-white rounded-[20px] shadow-lg p-4 z-50">

                <h3 className="font-bold text-red-500 mb-4 text-lg">
                  Notifications
                </h3>

                <div className="space-y-3">

                  {dbNotifications.length > 0 ? (

                    dbNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className="bg-[#F5F5F5] p-3 rounded-xl text-sm text-[#555555] cursor-pointer hover:bg-red-50 transition"
                      >
                        {n.data?.message}
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

            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center"
            >
              <img
                src={profil}
                alt="Profil"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />

              <span
                className="text-[#555555] text-sm"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Profil
              </span>
            </button>

            {showProfileMenu && (

              <div className="absolute right-0 mt-4 w-[200px] sm:w-[250px] bg-white rounded-[20px] shadow-lg p-4 z-50">

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
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
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
      <div className="text-center mt-4 sm:mt-8 relative z-10 px-4">

        <h1
          className="text-[30px] sm:text-[48px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Créneaux disponibles
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Choisissez un créneau horaire
        </p>

      </div>

      {/* SÉLECTEUR DE DURÉE */}
      <div className="flex justify-center mt-6 sm:mt-8 relative z-10 px-4">

        <div className="flex flex-wrap justify-center gap-3">

          {DUREES.map((d) => (

            <button
              key={d.value}
              onClick={() => setDuree(d.value)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition hover:scale-105 ${
                duree === d.value
                  ? 'bg-[#F56B6B] text-white shadow-md'
                  : 'bg-white text-[#555555] border border-[#ddd] shadow-sm'
              }`}
              style={{ fontFamily: 'Playpen Sans' }}
            >
              {d.label}
            </button>

          ))}

        </div>

      </div>

      {/* SLOTS */}
      <div className="flex justify-center mt-8 sm:mt-12 relative z-10 px-4">

        {slotsAffiches.length === 0 ? (

          <div className="bg-white p-10 rounded-[25px] text-center shadow-lg">

            <h2 className="text-2xl text-gray-500 font-bold">
              Aucun créneau disponible pour cette date
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">

            {slotsAffiches.map((slot, index) => (

              <button
                key={index}
                disabled={slot.status !== 'free'}
                onClick={() => handleSelectSlot(slot)}
                className={`
                  w-[140px] h-[100px]
                  sm:w-[180px] sm:h-[120px]
                  rounded-[25px]
                  shadow-lg
                  font-bold
                  transition
                  flex flex-col items-center justify-center
                  ${slot.status === 'occupied'
                    ? 'bg-red-100 text-red-500 cursor-not-allowed'
                    : selectedSlot === slot.label
                    ? 'bg-[#F56B6B] text-white scale-[1.03]'
                    : 'bg-white text-[#555555] hover:scale-[1.03]'
                  }
                `}
                style={{ fontFamily: 'Playpen Sans' }}
              >

                <span className="text-[16px] sm:text-[20px]">
                  {slot.label}
                </span>

                <span className="text-xs mt-2">
                  {slot.status === 'free'
                    ? 'Disponible'
                    : 'Occupé'}
                </span>

              </button>

            ))}

          </div>

        )}

      </div>

      {/* LÉGENDE */}
      <div className="flex justify-center gap-6 sm:gap-10 mt-10 sm:mt-14 relative z-10 flex-wrap px-4">

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-white border"></div>
          <span>Disponible</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-200"></div>
          <span>Occupé</span>
        </div>

      </div>

      {/* BOUTON CONFIRMER */}
      <div className="flex justify-center mt-10 sm:mt-16 relative z-10 pb-8 px-4">

        <Link
          to="/reservation-summary"
          className={`
            px-8 sm:px-12 py-4
            rounded-[18px]
            text-[18px] sm:text-[22px]
            font-bold shadow-lg transition
            w-full sm:w-auto text-center
            ${selectedSlot
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