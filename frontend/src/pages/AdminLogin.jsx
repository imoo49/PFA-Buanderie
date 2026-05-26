import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../api/api'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    setLoading(true)
    setError('')

    try {

      const response = await api.post('/login', {
        email,
        password,
      })

      const { token, user } = response.data

      if (user.role !== 'admin') {
        setError("Accès refusé. Ce compte n'est pas un compte administrateur.")
        setLoading(false)
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      navigate('/admin/dashboard')

    } catch (error) {

      console.log(error)

      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Email ou mot de passe incorrect")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-180px] left-[-150px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>

      {/* HEADER */}

      <header className="flex justify-between items-start px-10 py-6 relative z-10">

        <div className="flex items-start gap-3">

          <img
            src={logoBuanderie}
            alt="Buanderie"
            className="w-28 -mt-5"
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

        <Link
          to="/"
          className="text-red-500 mt-5 font-semibold"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Accueil
        </Link>

        <img
          src={logoEnsias}
          alt="ENSIAS"
          className="w-28"
        />

      </header>

      {/* LOGIN CARD */}

      <div className="flex justify-center items-center mt-20 relative z-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white w-[500px] p-10 rounded-[30px] shadow-lg"
        >

          <h1
            className="text-[42px] text-center text-[#555555] mb-10 font-bold"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Connexion Admin
          </h1>

          {/* ERROR */}

          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )}

          {/* EMAIL */}

          <div className="mb-6">

            <label
              className="block text-[24px] text-[#555555] mb-3"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Email Admin
            </label>

            <input
              type="email"
              placeholder="admin@um5.ac.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />

          </div>

          {/* PASSWORD */}

          <div className="mb-10">

            <label
              className="block text-[24px] text-[#555555] mb-3"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F56B6B] text-white py-4 rounded-[15px] font-bold shadow-md hover:scale-[1.02] duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            {loading ? 'Connexion...' : 'SE CONNECTER'}
          </button>

        </form>

      </div>

    </div>

  )

}

export default AdminLogin
