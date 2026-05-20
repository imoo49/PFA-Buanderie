import { Link } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function HistoryPage() {

  const reservations = [
    {
      machine: 'LV-01',
      date: '19 Mai 2026',
      slot: '14:30',
      status: 'Terminée'
    },
    {
      machine: 'SL-02',
      date: '21 Mai 2026',
      slot: '09:00',
      status: 'En attente'
    },
    {
      machine: 'LV-03',
      date: '25 Mai 2026',
      slot: '17:30',
      status: 'Confirmée'
    },
  ]

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* HEADER */}

      <header className="flex justify-between items-start px-10 py-6 relative z-10">

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

      </header>

      {/* TITLE */}

      <div className="text-center mt-8 relative z-10">

        <h1
          className="text-[48px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Historique
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Vos réservations précédentes
        </p>

      </div>

      {/* HISTORY */}

      <div className="w-[900px] mx-auto mt-14 relative z-10">

        <div className="space-y-6">

          {reservations.map((reservation, index) => (

            <div
              key={index}
              className="bg-white rounded-[25px] shadow-lg p-8 flex justify-between items-center"
            >

              <div>

                <h2
                  className="text-[28px] font-bold text-[#555555]"
                  style={{ fontFamily: 'Playpen Sans' }}
                >
                  {reservation.machine}
                </h2>

                <p className="text-gray-500 mt-2">
                  {reservation.date}
                </p>

                <p className="text-gray-500">
                  Créneau : {reservation.slot}
                </p>

              </div>

              <div
                className="bg-[#F56B6B]
                text-white
                px-6
                py-3
                rounded-[15px]
                font-bold"
              >
                {reservation.status}
              </div>

            </div>

          ))}

        </div>

        {/* BUTTON */}

        <div className="flex justify-center mt-14">

          <Link
            to="/student/dashboard"
            className="bg-[#F56B6B]
            text-white
            px-10
            py-4
            rounded-[18px]
            text-[22px]
            font-bold
            hover:scale-[1.03]
            transition"
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