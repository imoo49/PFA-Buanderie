import { Link } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import studentIcon from '../assets/student-icon.png'
import adminIcon from '../assets/admin-icon.png'

function LandingPage() {

  const token = localStorage.getItem('token')

  return (

    <div className="min-h-screen bg-[#F5F5F5] px-10 py-6">

      {/* HEADER */}

      <div className="flex justify-between items-start">

        <div className="flex items-start gap-3 -mt-4">

          <img
            src={logoBuanderie}
            alt="Buanderie"
            className="w-28 -mt-3"
          />

          <div>

            <h1
              className="text-[42px] leading-none font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Buanderie
            </h1>

            <h2
              className="text-[42px] leading-none font-bold text-[#555555] mt-2"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              ENSIAS
            </h2>

          </div>

        </div>

        <img
          src={logoEnsias}
          alt="ENSIAS"
          className="w-28"
        />

      </div>

      {/* WELCOME */}

      <div className="text-center mt-10">

        <h1
          className="text-[52px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Bienvenue
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Plateforme intelligente de réservation
          des machines de la buanderie ENSIAS
        </p>

        {token && (

          <div className="mt-6">

            <Link
              to="/student/dashboard"
              className="bg-[#F56B6B] text-white px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 duration-200"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Aller au dashboard
            </Link>

          </div>

        )}

      </div>

      {/* CARDS */}

      <div className="flex justify-center gap-40 mt-20">

        {/* STUDENT */}

        <Link to="/student/register">

          <div className="flex flex-col items-center cursor-pointer group">

            <div
              className="
              w-[220px]
              h-[220px]
              bg-[#EDEDED]
              rounded-[40px]
              flex
              items-center
              justify-center
              shadow-lg
              transition
              duration-300
              group-hover:scale-105
              group-hover:bg-[#FADDDD]
              "
            >

              <img
                src={studentIcon}
                alt="Student"
                className="w-32"
              />

            </div>

            <h2
              className="text-[42px] font-bold text-[#555555] mt-6"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Espace étudiant
            </h2>

            <p className="text-gray-500 mt-2 text-center w-[260px]">
              Réserver une machine,
              consulter vos réservations
              et gérer votre compte
            </p>

          </div>

        </Link>

        {/* ADMIN */}

        <Link to="/admin/login">

          <div className="flex flex-col items-center cursor-pointer group">

            <div
              className="
              w-[220px]
              h-[220px]
              bg-[#EDEDED]
              rounded-[40px]
              flex
              items-center
              justify-center
              shadow-lg
              transition
              duration-300
              group-hover:scale-105
              group-hover:bg-[#FADDDD]
              "
            >

              <img
                src={adminIcon}
                alt="Admin"
                className="w-32"
              />

            </div>

            <h2
              className="text-[42px] font-bold text-[#555555] mt-6"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Espace admin
            </h2>

            <p className="text-gray-500 mt-2 text-center w-[260px]">
              Gérer les machines,
              les réservations
              et les utilisateurs
            </p>

          </div>

        </Link>

      </div>

    </div>

  )

}

export default LandingPage