import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function StudentLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Veuillez remplir tous les champs")
      return
    }

    alert("Connexion réussie")

    navigate('/student/dashboard')
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
            Connexion
          </h1>

          {/* EMAIL */}

          <div className="mb-6">

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
            className="w-full bg-[#F56B6B] text-white py-4 rounded-[15px] font-bold shadow-md hover:scale-[1.02] duration-200"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            SE CONNECTER
          </button>

          {/* REGISTER */}

          <div className="text-center mt-6">

            <Link
              to="/student/register"
              className="text-red-500"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Créer un compte
            </Link>

          </div>

        </form>

      </div>

    </div>
  )
}

export default StudentLogin