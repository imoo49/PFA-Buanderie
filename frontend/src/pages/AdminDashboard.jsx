import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        {/* LEFT */}
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

        {/* RIGHT */}
        <img
          src={logoEnsias}
          alt="ENSIAS"
          className="w-28"
        />

      </div>

      {/* TITLE */}
      <div className="mt-10">

        <h1
          className="text-[38px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Tableau de bord Admin
        </h1>

        <p
          className="text-[#777777] mt-2 text-lg"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Gérez les réservations et les étudiants.
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-8 mt-12">

        {/* CARD 1 */}
        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <h2
            className="text-[#555555] text-2xl font-bold"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Réservations
          </h2>

          <p
            className="text-5xl mt-6 font-bold text-[#555555]"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            24
          </p>

        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <h2
            className="text-[#555555] text-2xl font-bold"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Étudiants
          </h2>

          <p
            className="text-5xl mt-6 font-bold text-[#555555]"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            56
          </p>

        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <h2
            className="text-[#555555] text-2xl font-bold"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Machines
          </h2>

          <p
            className="text-5xl mt-6 font-bold text-[#555555]"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            8
          </p>

        </div>

        {/* CARD 4 */}
        <div className="bg-white rounded-[30px] p-8 shadow-sm">

          <h2
            className="text-[#555555] text-2xl font-bold"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            Aujourd’hui
          </h2>

          <p
            className="text-5xl mt-6 font-bold text-[#555555]"
            style={{ fontFamily: 'Playpen Sans' }}
          >
            12
          </p>

        </div>

      </div>

      {/* RESERVATIONS TABLE */}
      <div className="bg-white rounded-[35px] mt-14 p-8 shadow-sm">

        <h2
          className="text-3xl font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Réservations récentes
        </h2>

        <div className="mt-8 space-y-5">

          {/* ROW */}
          <div className="flex justify-between items-center bg-[#F5F5F5] rounded-[20px] px-6 py-4">

            <div>
              <h3
                className="text-xl font-bold text-[#555555]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Malak Zikri
              </h3>

              <p
                className="text-[#777777]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Machine 2 • 14:00
              </p>
            </div>

            <button
              className="bg-[#555555] text-white px-6 py-2 rounded-[15px]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Voir
            </button>

          </div>

          {/* ROW */}
          <div className="flex justify-between items-center bg-[#F5F5F5] rounded-[20px] px-6 py-4">

            <div>
              <h3
                className="text-xl font-bold text-[#555555]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Sara Amrani
              </h3>

              <p
                className="text-[#777777]"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Machine 5 • 16:00
              </p>
            </div>

            <button
              className="bg-[#555555] text-white px-6 py-2 rounded-[15px]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Voir
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard