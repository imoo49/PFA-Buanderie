import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function CalendarPage() {

  const [date, setDate] = useState(new Date())

  const navigate = useNavigate()

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
          Choisissez une date
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Sélectionnez la date de réservation
        </p>

      </div>

      {/* CALENDAR */}

      <div className="flex flex-col items-center mt-16 relative z-10">

        <div className="bg-white p-8 rounded-[35px] shadow-2xl">

          <Calendar
            onChange={setDate}
            value={date}
          />

        </div>

        <button
          onClick={() => navigate('/slots')}
          className="mt-10 bg-[#F56B6B] text-white px-10 py-4 rounded-[15px] font-bold hover:scale-[1.03] transition"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Confirmer la date
        </button>

      </div>

    </div>

  )
}

export default CalendarPage