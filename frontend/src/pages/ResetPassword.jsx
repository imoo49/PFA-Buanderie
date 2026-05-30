import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function ResetPassword() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get('token')
  const emailFromUrl = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailFromUrl)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !passwordConfirmation) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      setMessage(response.data.message)

      setTimeout(() => {
        navigate('/student/login')
      }, 2000)

    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      <div className="absolute top-[-180px] left-[-150px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>
      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>

      <header className="flex justify-between items-start px-5 sm:px-10 py-6 relative z-10">
        <div className="flex items-start gap-3">
          <img src={logoBuanderie} alt="Buanderie" className="w-16 sm:w-28 -mt-3 sm:-mt-5" />
          <div>
            <h1 className="text-[26px] sm:text-[42px] leading-none font-bold text-[#555555]" style={{ fontFamily: 'Playpen Sans' }}>
              Buanderie
            </h1>
            <h2 className="text-[26px] sm:text-[42px] leading-none font-bold text-[#555555] mt-2" style={{ fontFamily: 'Playpen Sans' }}>
              ENSIAS
            </h2>
          </div>
        </div>
        <img src={logoEnsias} alt="ENSIAS" className="w-16 sm:w-28" />
      </header>

      <div className="flex justify-center items-center mt-10 sm:mt-20 relative z-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-[500px] p-6 sm:p-10 rounded-[30px] shadow-lg">

          <h1 className="text-[28px] sm:text-[38px] text-center text-[#555555] mb-8 font-bold" style={{ fontFamily: 'Playpen Sans' }}>
            Nouveau mot de passe
          </h1>

          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-600 p-3 rounded-xl mb-5 text-center">
              {message} Redirection en cours...
            </div>
          )}

          <div className="mb-6">
            <label className="block text-[20px] sm:text-[24px] text-[#555555] mb-3" style={{ fontFamily: 'Playpen Sans' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[20px] sm:text-[24px] text-[#555555] mb-3" style={{ fontFamily: 'Playpen Sans' }}>
              Nouveau mot de passe
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[20px] sm:text-[24px] text-[#555555] mb-3" style={{ fontFamily: 'Playpen Sans' }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              placeholder="********"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F56B6B] text-white py-4 rounded-[15px] font-bold shadow-md hover:scale-[1.02] duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            {loading ? 'Réinitialisation...' : 'RÉINITIALISER'}
          </button>

          <div className="text-center mt-6">
            <Link to="/student/login" className="text-red-500" style={{ fontFamily: 'Playpen Sans' }}>
              Retour à la connexion
            </Link>
          </div>

        </form>
      </div>

    </div>
  )
}

export default ResetPassword