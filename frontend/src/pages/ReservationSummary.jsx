import { useEffect, useState, useRef } from 'react'   // ← ajouter useRef
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import logoBuanderie from '../assets/logo-buanderie.png'

function ReservationSummary() {
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const hasRun = useRef(false)   // ← AJOUT : garde anti-double exécution

  const selectedDate = localStorage.getItem('selectedDate')
  const dateReservation = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-CA')
    : null

  useEffect(() => {
    // FIX StrictMode : n'exécute qu'une seule fois même en dev
    if (hasRun.current) return
    hasRun.current = true

    const createReservation = async () => {
      const token = localStorage.getItem('token')
      const machineId = localStorage.getItem('selectedMachineId')
      const creneauId = localStorage.getItem('selectedCreneauId')

      if (!machineId || !creneauId || !dateReservation) {
        navigate('/machines')
        return
      }

      try {
        const response = await api.post(
          '/reservations',
          {
            machine_id: parseInt(machineId),
            creneau_id: parseInt(creneauId),
            dateReservation: dateReservation,
            dureeCycle: 60,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setReservation(response.data.reservation)

        localStorage.removeItem('selectedCreneauId')
        localStorage.removeItem('selectedMachineId')
        localStorage.removeItem('selectedSlot')
        localStorage.removeItem('selectedDate')
        localStorage.removeItem('selectedMachine')
      } catch (err) {
        const message =
          err.response?.data?.message || 'Erreur lors de la réservation'
        setError(message)
        console.error('Erreur réservation :', err)
      } finally {
        setLoading(false)
      }
    }

    createReservation()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>
      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <header className="flex justify-between items-start px-5 sm:px-10 py-6 relative z-10">
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
      </header>

      <div className="flex justify-center items-start mt-10 sm:mt-20 relative z-10 px-4 pb-8">
        <div className="w-full max-w-[700px] bg-white rounded-[40px] shadow-2xl p-8 sm:p-14 text-center">

          {error ? (
            <>
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-[40px] sm:text-[55px]">❌</span>
                </div>
              </div>
              <h1 className="mt-6 sm:mt-8 text-[28px] sm:text-[42px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
                Réservation échouée
              </h1>
              <p className="text-red-500 mt-3 text-lg">{error}</p>
              <div className="flex justify-center gap-6 mt-10 sm:mt-14">
                <Link to="/machines" className="px-6 sm:px-8 py-4 rounded-[18px] bg-[#F56B6B] text-white font-bold hover:scale-[1.03] transition" style={{ fontFamily: 'Playpen Sans' }}>
                  Réessayer
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-[40px] sm:text-[55px]">✅</span>
                </div>
              </div>
              <h1 className="mt-6 sm:mt-8 text-[28px] sm:text-[42px] font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
                Réservation confirmée
              </h1>
              <p className="text-gray-500 mt-3 text-lg">
                Votre réservation a été enregistrée avec succès
              </p>

              <div className="mt-8 sm:mt-12 space-y-5 text-left">
                <div className="bg-[#FFF5F5] rounded-[18px] p-4 sm:p-5 flex justify-between">
                  <span className="font-bold text-[#555555]">Machine</span>
                  <span className="text-[#F56B6B] font-bold">
                    {reservation?.machine?.type} — {reservation?.machine?.numero}
                  </span>
                </div>
                <div className="bg-[#FFF5F5] rounded-[18px] p-4 sm:p-5 flex justify-between">
                  <span className="font-bold text-[#555555]">Date</span>
                  <span className="text-[#555555] font-bold">
                    {reservation?.dateReservation}
                  </span>
                </div>
                <div className="bg-[#FFF5F5] rounded-[18px] p-4 sm:p-5 flex justify-between">
                  <span className="font-bold text-[#555555]">Créneau</span>
                  <span className="text-[#555555] font-bold">
                    {reservation?.creneau?.heureDebut?.substring(0, 5)} -{' '}
                    {reservation?.creneau?.heureFin?.substring(0, 5)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10 sm:mt-14">
                <Link to="/student/dashboard" className="px-6 sm:px-8 py-4 rounded-[18px] bg-white border-2 border-[#F56B6B] text-[#F56B6B] font-bold hover:scale-[1.03] transition" style={{ fontFamily: 'Playpen Sans' }}>
                  Tableau de bord
                </Link>
                <Link to="/machines" className="px-6 sm:px-8 py-4 rounded-[18px] bg-[#F56B6B] text-white font-bold hover:scale-[1.03] transition" style={{ fontFamily: 'Playpen Sans' }}>
                  Nouvelle réservation
                </Link>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}

export default ReservationSummary