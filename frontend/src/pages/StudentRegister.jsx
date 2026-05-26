import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

import allowedEmails from '../data/allowedEmails'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function StudentRegister() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [numChambre, setNumChambre] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!name || !prenom || !email || !password || !telephone || !numChambre || !gender) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (!allowedEmails.includes(email.toLowerCase())) {
      setError("Email institutionnel non autorisé")
      return
    }

    setLoading(true)
    setError('')

    try {

      const response = await api.post('/register', {
        name,
        prenom,
        email,
        password,
        telephone,
        numChambre,
        genre: gender,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setSuccess(true)

    } catch (error) {

      console.log(error)

      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0]
        setError(Array.isArray(firstError) ? firstError[0] : firstError)
      } else if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Erreur lors de l'inscription")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-[#F5F5F5] relative overflow-hidden">

      {/* BACKGROUND SHAPES */}

      <div className="absolute top-[-180px] left-[-150px] w-[500px] h-[500px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>

      <div className="absolute bottom-[-250px] right-[-150px] w-[700px] h-[700px] bg-[#FADDDD] rounded-full opacity-60 z-0"></div>

      {/* HEADER */}

      <header className="flex justify-between items-start px-10 py-6 relative z-10">

        {/* LEFT */}

        <div className="flex items-start gap-3">

          <img
            src={logoBuanderie}
            alt="Buanderie"
            className="w-28 -mt-5 relative z-20"
          />

          <div className="relative z-20">

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

        {/* CENTER */}

        <div className="flex items-center gap-10 mt-4 relative z-20">

          <Link
            to="/"
            className="text-red-500 text-sm font-semibold"
          >
            Accueil
          </Link>

          <Link
            to="/student/login"
            className="bg-[#FF5C5C] text-white px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 duration-200"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Se connecter
          </Link>

        </div>

        {/* RIGHT */}

        <img
          src={logoEnsias}
          alt="ENSIAS"
          className="w-28 relative z-20"
        />

      </header>

      {/* CONTENT */}

      <div className="flex justify-between px-16 mt-12 relative z-10">

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="w-[560px]"
        >

          {/* SUCCÈS */}

          {success && (
            <div className="bg-green-100 text-green-700 p-5 rounded-xl mb-5 text-center">
              <p className="font-bold text-lg mb-1">Compte créé avec succès !</p>
              <p>Un email de vérification a été envoyé à <strong>{email}</strong>.</p>
              <p className="mt-2">Veuillez vérifier votre boîte mail avant de vous connecter.</p>
              <a
                href="/student/login"
                className="inline-block mt-4 bg-[#F56B6B] text-white px-6 py-2 rounded-full font-bold hover:scale-105 duration-200"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Aller à la connexion
              </a>
            </div>
          )}

          {/* ERROR GLOBAL */}

          {!success && error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          {/* NOM */}

          <div className="mb-6">

            <label
              className="block text-[24px] text-[#555555] mb-3"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Nom
            </label>

            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />

          </div>

          {/* PRENOM */}

          <div className="mb-6">

            <label
              className="block text-[24px] text-[#555555] mb-3"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Prénom
            </label>

            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
            />

          </div>

          {/* EMAIL + PHONE */}

          <div className="flex gap-5 mb-6">

            <div className="flex-1">

              <label
                className="block text-[24px] text-[#555555] mb-3"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Email
              </label>

              <input
                type="email"
                placeholder="exemple@um5.ac.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
              />

            </div>

            <div className="flex-1">

              <label
                className="block text-[24px] text-[#555555] mb-3"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Numéro de téléphone
              </label>

              <input
                type="text"
                placeholder="+212..."
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
              />

            </div>

          </div>

          {/* ROOM + GENDER */}

          <div className="flex gap-5 mb-10">

            {/* ROOM */}

            <div className="flex-1">

              <label
                className="block text-[24px] text-[#555555] mb-3"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Numéro de chambre
              </label>

              <input
                type="text"
                placeholder="Ex : B-203"
                value={numChambre}
                onChange={(e) => setNumChambre(e.target.value)}
                className="w-full h-[55px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
              />

            </div>

            {/* GENDER */}

            <div className="flex-1">

              <label
                className="block text-[24px] text-[#555555] mb-3"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Genre
              </label>

              <div className="flex gap-8 h-[55px] items-center">

                <label className="flex items-center gap-3 text-[#555555] text-lg">

                  <input
                    type="radio"
                    name="gender"
                    value="Homme"
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 accent-[#F56B6B]"
                  />

                  Homme

                </label>

                <label className="flex items-center gap-3 text-[#555555] text-lg">

                  <input
                    type="radio"
                    name="gender"
                    value="Femme"
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 accent-[#F56B6B]"
                  />

                  Femme

                </label>

              </div>

            </div>

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
            disabled={loading || success}
            className="bg-[#F56B6B] text-white px-10 py-3 rounded-[15px] font-bold shadow-md hover:scale-105 duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            {loading ? 'Création du compte...' : 'SOUMETTRE'}
          </button>

        </form>

        {/* CONTACT */}

        <div className="mt-24 mr-20 relative z-20">

          <h2
            className="text-[48px] font-bold text-red-600 mb-10"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Contacter nous
          </h2>

          <div className="flex items-center gap-5">

            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-lg shadow-md">
              📞
            </div>

            <p
              className="text-[#555555] text-[22px]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              +212 708293615 <br />
              +212 760111165
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default StudentRegister
