import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !passwordConfirmation) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
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
      setTimeout(() => navigate('/student/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
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

      {/* CARD */}
      <div className="flex justify-center items-center mt-10 sm:mt-20 relative z-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-[500px] p-6 sm:p-10 rounded-[30px] shadow-lg"
        >
          <h1 className="text-[28px] sm:text-[36px] text-center text-[#555555] mb-4 font-bold" style={{ fontFamily: 'Playpen Sans' }}>
            Nouveau mot de passe
          </h1>

          <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
            Choisissez un nouveau mot de passe pour votre compte.
          </p>

          {/* SUCCÈS */}
          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 text-center">
              <p className="font-bold">{message}</p>
              <p className="text-sm mt-1">Redirection vers la connexion...</p>
            </div>
          )}

          {/* ERREUR */}
          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )}

          {!message && (
            <>
              {/* NOUVEAU MOT DE PASSE */}
              <div className="mb-6">
                <label className="block text-[20px] sm:text-[22px] text-[#555555] mb-3" style={{ fontFamily: 'Playpen Sans' }}>
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
                />
              </div>

              {/* CONFIRMER */}
              <div className="mb-8">
                <label className="block text-[20px] sm:text-[22px] text-[#555555] mb-3" style={{ fontFamily: 'Playpen Sans' }}>
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Répétez le mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                {loading ? 'Réinitialisation...' : 'RÉINITIALISER'}
              </button>
            </>
          )}

          {/* RETOUR */}
          <div className="text-center mt-6">
            <Link to="/student/login" className="text-gray-400 text-sm hover:text-gray-600 transition" style={{ fontFamily: 'Playpen Sans' }}>
              ← Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage