import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../api/api'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function PersonalDataPage() {

  const [student, setStudent] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const token = localStorage.getItem('token')

        const response = await api.get(
          '/student/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setStudent(response.data)

      } catch (error) {

        console.error(
          'Erreur récupération profil :',
          error
        )

      } finally {

        setLoading(false)

      }

    }

    fetchStudent()

  }, [])

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl">

        Chargement...

      </div>

    )

  }

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
          Données personnelles
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Informations de votre compte
        </p>

      </div>

      {/* CARD */}

      <div className="w-[850px] mx-auto mt-16 relative z-10">

        <div className="bg-white rounded-[35px] shadow-xl p-12">

          <div className="space-y-8">

            {/* NOM */}

            <div>

              <label className="block text-gray-500 mb-2 text-lg">
                Nom complet
              </label>

              <div className="bg-[#FFF5F5] p-5 rounded-[18px] text-[#555555] text-xl font-bold">

                {student?.name || 'Nom indisponible'}

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="block text-gray-500 mb-2 text-lg">
                Email
              </label>

              <div className="bg-[#FFF5F5] p-5 rounded-[18px] text-[#555555] text-xl font-bold">

                {student?.email || 'Email indisponible'}

              </div>

            </div>

            {/* FILIERE */}

            <div>

              <label className="block text-gray-500 mb-2 text-lg">
                Filière
              </label>

              <div className="bg-[#FFF5F5] p-5 rounded-[18px] text-[#555555] text-xl font-bold">

                {student?.filiere || 'Non définie'}

              </div>

            </div>

            {/* ID */}

            <div>

              <label className="block text-gray-500 mb-2 text-lg">
                ID Étudiant
              </label>

              <div className="bg-[#FFF5F5] p-5 rounded-[18px] text-[#555555] text-xl font-bold">

                {student?.student_id || 'ID indisponible'}

              </div>

            </div>

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
              Retour au dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>

  )

}

export default PersonalDataPage