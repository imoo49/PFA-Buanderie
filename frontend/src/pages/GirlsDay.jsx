import { Link } from 'react-router-dom'

function GirlsDay() {

  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const aujourdhui = jours[new Date().getDay()]

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* CARD */}

      <div className="relative z-10 bg-white rounded-[30px] shadow-xl px-10 py-12 w-full max-w-[360px] mx-4 flex flex-col items-center text-center">

        {/* ICON */}

        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <span className="text-[42px]">🚫</span>
        </div>

        {/* TITLE */}

        <h1
          className="text-[32px] font-bold text-red-500 mb-4"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Accès refusé
        </h1>

        {/* MESSAGE */}

        <p className="text-[#555555] text-lg mb-2">
          Le lundi est réservé aux filles.
        </p>

        <p className="text-[#555555] mb-8">
          Aujourd'hui : <strong>{aujourdhui}</strong>
        </p>

        {/* BUTTONS */}

        <Link
          to="/calendar"
          className="w-full bg-[#F56B6B] text-white py-4 rounded-[15px] font-bold text-center hover:scale-[1.02] transition mb-3"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Retour
        </Link>

        <Link
          to="/student/dashboard"
          className="w-full border-2 border-[#F56B6B] text-[#F56B6B] py-4 rounded-[15px] font-bold text-center hover:scale-[1.02] transition"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Tableau de bord
        </Link>

      </div>

    </div>

  )
}

export default GirlsDay
