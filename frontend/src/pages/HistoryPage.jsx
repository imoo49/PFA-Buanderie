import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import api from '../api/api'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function HistoryPage() {
  const [reservations, setReservations] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setReservations(response.data)
      } catch (error) {
        console.error('Erreur récupération historique :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const getStatusLabel = (statut) => {
    if (statut === 'confirme') return 'Confirmée'
    if (statut === 'en_attente') return 'En attente'
    if (statut === 'annulee') return 'Annulée'
    if (statut === 'termine') return 'Terminée'
    return statut
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
      </header>

      {/* TITLE */}

      <div className="text-center mt-4 sm:mt-8 relative z-10 px-4">
        <h1
          className="text-[30px] sm:text-[48px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Historique
        </h1>

        <p className="text-gray-500 mt-2 text-lg">Vos réservations précédentes</p>
      </div>

      {/* HISTORY */}

      <div className="w-full max-w-[900px] mx-auto mt-8 sm:mt-14 relative z-10 px-4">
        <div className="space-y-6">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div
                key={index}
                className="bg-white rounded-[25px] shadow-lg p-5 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h2
                    className="text-[20px] sm:text-[28px] font-bold text-[#555555]"
                    style={{ fontFamily: 'Playpen Sans' }}
                  >
                    {reservation.machine?.type} — {reservation.machine?.numero}
                  </h2>

                  <p className="text-gray-500 mt-2">{reservation.dateReservation}</p>

                  <p className="text-gray-500">
                    Créneau : {reservation.creneau?.heureDebut?.substring(0, 5)} -{' '}
                    {reservation.creneau?.heureFin?.substring(0, 5)}
                  </p>
                </div>

                <div
                  className={`
                    px-4 sm:px-6
                    py-2 sm:py-3
                    rounded-[15px]
                    font-bold
                    text-white
                    shrink-0

                    ${
                      reservation.statut === 'termine'
                        ? 'bg-green-500'
                        : reservation.statut === 'en_attente'
                        ? 'bg-yellow-500'
                        : reservation.statut === 'annulee'
                        ? 'bg-gray-400'
                        : 'bg-[#F56B6B]'
                    }
                  `}
                >
                  {getStatusLabel(reservation.statut)}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-10 rounded-[25px] text-center shadow-lg">
              <h2 className="text-2xl text-gray-500 font-bold">
                Aucune réservation trouvée
              </h2>
            </div>
          )}
        </div>

        {/* BUTTON */}

        <div className="flex justify-center mt-10 sm:mt-14 pb-8">
          <Link
            to="/student/dashboard"
            className="
            bg-[#F56B6B]
            text-white
            px-10
            py-4
            rounded-[18px]
            text-[18px] sm:text-[22px]
            font-bold
            hover:scale-[1.03]
            transition
            "
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Retour au profil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
