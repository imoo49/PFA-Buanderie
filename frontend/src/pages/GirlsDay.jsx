import { Link } from 'react-router-dom'

function GirlsDay() {

  const today = new Date()

  const dayName = today.toLocaleDateString(
    'fr-FR',
    { weekday: 'long' }
  )

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60"></div>

      {/* CARD */}

      <div className="bg-white shadow-2xl rounded-[35px] p-14 text-center relative z-10 w-[650px]">

        {/* ICON */}

        <div className="flex justify-center mb-8">

          <div
            className="
            w-28
            h-28
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            "
          >

            <span className="text-[55px]">
              🚫
            </span>

          </div>

        </div>

        {/* TITLE */}

        <h1
          className="text-[46px] font-bold text-red-500 mb-6"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Accès refusé
        </h1>

        {/* MESSAGE */}

        <p
          className="text-[26px] text-[#555555] mb-4"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Le lundi est réservé aux filles.
        </p>

        <p className="text-gray-500 text-lg mb-10">

          Aujourd'hui : <span className="font-bold capitalize">
            {dayName}
          </span>

        </p>

        {/* BUTTONS */}

        <div className="flex justify-center gap-6">

          <Link
            to="/calendar"
            className="
            bg-[#F56B6B]
            text-white
            px-8
            py-4
            rounded-[15px]
            font-bold
            hover:scale-[1.03]
            transition
            "
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Retour
          </Link>

          <Link
            to="/student/dashboard"
            className="
            border-2
            border-[#F56B6B]
            text-[#F56B6B]
            px-8
            py-4
            rounded-[15px]
            font-bold
            hover:bg-[#FFF5F5]
            transition
            "
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Dashboard
          </Link>

        </div>

      </div>

    </div>

  )

}

export default GirlsDay