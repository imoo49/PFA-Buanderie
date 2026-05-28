import { Link } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import studentIcon from '../assets/student-icon.png'
import adminIcon from '../assets/admin-icon.png'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] px-5 sm:px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div className="flex items-start gap-3 -mt-2 sm:-mt-4">
          <img
            src={logoBuanderie}
            alt="Buanderie"
            className="w-16 sm:w-28 -mt-1 sm:-mt-3"
          />

          <div>
            <h1
              className="text-[24px] sm:text-[42px] leading-none font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Buanderie
            </h1>

            <h2
              className="text-[24px] sm:text-[42px] leading-none font-bold text-[#555555] mt-2"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              ENSIAS
            </h2>
          </div>
        </div>

        <img
          src={logoEnsias}
          alt="ENSIAS"
          className="w-16 sm:w-28"
        />
      </div>

      {/* CARDS */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-40 mt-12 sm:mt-20">

        {/* STUDENT */}
        <Link to="/student/register">

          <div className="flex flex-col items-center cursor-pointer">

            <div className="w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] bg-[#EDEDED] rounded-[40px] flex items-center justify-center">

              <img
                src={studentIcon}
                alt="Student"
                className="w-24 sm:w-32"
              />

            </div>

            <h2
              className="text-[26px] sm:text-[42px] font-bold text-[#555555] mt-4 sm:mt-6"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Espace étudiant
            </h2>

          </div>

        </Link>

        {/* ADMIN */}
        <Link to="/admin/login">

          <div className="flex flex-col items-center cursor-pointer">

            <div className="w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] bg-[#EDEDED] rounded-[40px] flex items-center justify-center">

              <img
                src={adminIcon}
                alt="Admin"
                className="w-24 sm:w-32"
              />

            </div>

            <h2
              className="text-[26px] sm:text-[42px] font-bold text-[#555555] mt-4 sm:mt-6"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Espace admin
            </h2>

          </div>

        </Link>

      </div>

    </div>
  )
}

export default LandingPage
