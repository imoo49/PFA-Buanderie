import { useState } from 'react'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function SlotsPage() {

  const [selectedSlot, setSelectedSlot] = useState(null)

  const slots = [
    { hour: '07:00', status: 'free' },
    { hour: '08:30', status: 'occupied' },
    { hour: '10:00', status: 'free' },
    { hour: '11:30', status: 'maintenance' },
    { hour: '13:00', status: 'free' },
    { hour: '14:30', status: 'free' },
    { hour: '16:00', status: 'occupied' },
    { hour: '17:30', status: 'free' },
  ]

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

        <div className="flex items-center gap-5">

          <button className="text-[30px]">
            🔔
          </button>

          <div className="flex flex-col items-center">

            <button className="text-[35px]">
              👤
            </button>

            <span
              className="text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Profil
            </span>

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

        <p className="text-gray-500 mt-2 text-lg">
          Choisissez un créneau horaire
        </p>

      </div>

      {/* SLOTS */}

      <div className="flex justify-center mt-16 relative z-10">

        <div className="grid grid-cols-4 gap-8">

          {slots.map((slot, index) => (

            <button
              key={index}
              disabled={slot.status !== 'free'}
              onClick={() => setSelectedSlot(slot.hour)}
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

              <span className="text-[30px]">
                {slot.hour}
              </span>

              <span className="text-sm mt-2">

                {
                  slot.status === 'free'
                    ? 'Disponible'
                    : slot.status === 'occupied'
                    ? 'Occupé'
                    : 'Maintenance'
                }

              </span>

            </button>

          ))}

        </div>

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

        <button
          disabled={!selectedSlot}
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
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Confirmer la réservation
        </button>

      </div>

    </div>

  )
}

export default SlotsPage