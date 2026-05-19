import { Link } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

import washingMachine from '../assets/washing-machine.png'
import dryerMachine from '../assets/dryer.png'

function MachinesPage() {
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

      <div className="text-center mt-6 relative z-10">

        <h1
          className="text-[48px] text-[#555555] font-bold"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Choisissez une machine
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Sélectionnez le type de machine à utiliser
        </p>

      </div>

      {/* MACHINES */}

      <div className="flex justify-center gap-28 mt-24 relative z-10">

        {/* MACHINE A LAVER */}

        <Link to="/calendar">

          <div
            className="w-[350px] h-[420px]
            bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
            rounded-[40px]
            shadow-xl
            flex flex-col items-center justify-center
            cursor-pointer
            transition duration-300
            hover:scale-[1.04]
            hover:shadow-2xl"
          >

            <img
              src={washingMachine}
              alt="Machine à laver"
              className="w-[230px] h-[230px] object-contain"
            />

            <h2
              className="mt-10 text-[36px] font-bold text-[#555555] text-center"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              MACHINE À LAVER
            </h2>

          </div>

        </Link>

        {/* SECHE LINGE */}

        <Link to="/calendar">

          <div
            className="w-[350px] h-[420px]
            bg-gradient-to-b from-[#FFF5F5] to-[#FADDDD]
            rounded-[40px]
            shadow-xl
            flex flex-col items-center justify-center
            cursor-pointer
            transition duration-300
            hover:scale-[1.04]
            hover:shadow-2xl"
          >

            <img
              src={dryerMachine}
              alt="Sèche linge"
              className="w-[230px] h-[230px] object-contain"
            />

            <h2
              className="mt-10 text-[36px] font-bold text-[#555555] text-center"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              SÈCHE LINGE
            </h2>

          </div>

        </Link>

      </div>

    </div>
  )
}

export default MachinesPage