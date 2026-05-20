import { Link } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function ReservationSummary() {

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

      </header>

      {/* CONTENT */}

      <div className="flex justify-center items-center mt-20 relative z-10">

        <div
          className="w-[700px]
          bg-white
          rounded-[40px]
          shadow-2xl
          p-14
          text-center"
        >

          {/* ICON */}

          <div className="flex justify-center">

            <div
              className="w-28 h-28
              rounded-full
              bg-green-100
              flex items-center justify-center"
            >
              <span className="text-[55px]">
                ✅
              </span>
            </div>

          </div>

          {/* TITLE */}

          <h1
            className="mt-8 text-[42px] font-bold text-[#555555]"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Réservation confirmée
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Votre réservation a été enregistrée avec succès
          </p>

          {/* DETAILS */}

          <div className="mt-12 space-y-5 text-left">

            <div className="bg-[#FFF5F5] rounded-[18px] p-5 flex justify-between">

              <span className="font-bold text-[#555555]">
                Machine
              </span>

              <span className="text-[#F56B6B] font-bold">
                LV-01
              </span>

            </div>

            <div className="bg-[#FFF5F5] rounded-[18px] p-5 flex justify-between">

              <span className="font-bold text-[#555555]">
                Date
              </span>

              <span className="text-[#555555] font-bold">
                19 Mai 2026
              </span>

            </div>

            <div className="bg-[#FFF5F5] rounded-[18px] p-5 flex justify-between">

              <span className="font-bold text-[#555555]">
                Créneau
              </span>

              <span className="text-[#555555] font-bold">
                14:30
              </span>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex justify-center gap-6 mt-14">

            <Link
              to="/student/dashboard"
              className="px-8 py-4 rounded-[18px] bg-white border-2 border-[#F56B6B] text-[#F56B6B] font-bold hover:scale-[1.03] transition"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Tableau de bord
            </Link>

            <Link
              to="/machines"
              className="px-8 py-4 rounded-[18px] bg-[#F56B6B] text-white font-bold hover:scale-[1.03] transition"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Nouvelle réservation
            </Link>

          </div>

        </div>

      </div>

    </div>

  )
}

export default ReservationSummary