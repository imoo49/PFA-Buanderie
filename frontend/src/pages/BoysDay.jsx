import { Link } from 'react-router-dom'

function GirlsDay() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5]">

      <h1 className="text-[40px] font-bold text-red-500 mb-6">
        Accès refusé
      </h1>

      <p className="text-[24px] text-[#555555] mb-10">
        Le mardi est réservé aux garçons.
      </p>

      <Link
        to="/calendar"
        className="bg-[#F56B6B] text-white px-8 py-4 rounded-[15px]"
      >
        Retour
      </Link>

    </div>

  )
}

export default GirlsDay