import { useState, useEffect } from 'react'

import logoBuanderie from '../assets/logo-buanderie.png'
import logoEnsias from '../assets/logo-ensias.png'
import profil from '../assets/profil.png'
import api from '../api/api'

function AdminDashboard() {
  const [currentAlert, setCurrentAlert] = useState(localStorage.getItem('studentAlert') || '')
  const [alertMessage, setAlertMessage] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [machines, setMachines] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAddModal, setShowAddModal] = useState(false)
  const [newNumero, setNewNumero] = useState('')
  const [newType, setNewType] = useState('lave-linge')
  const [newCapacite, setNewCapacite] = useState('')
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState('')

  const fetchData = async () => {
    try {
      const [machinesRes, reservationsRes] = await Promise.all([
        api.get('/machines'),
        api.get('/reservations').catch(() => ({ data: [] })),
      ])

      setMachines(machinesRes.data)
      setReservations(reservationsRes.data)
    } catch (error) {
      console.error('Erreur chargement admin :', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const todayReservations = reservations.filter(
    (r) => r.dateReservation === today && r.statut !== 'annulee'
  )

  const getMachineStatus = (machineId) => {
    const occupied = reservations.some(
      (r) =>
        r.machine_id === machineId &&
        r.dateReservation === today &&
        r.statut !== 'annulee'
    )
    return occupied ? 'Occupée' : 'Libre'
  }

const handleSendAlert = () => {
  if (!alertMessage) {
    alert('Veuillez écrire une alerte')
    return
  }
  localStorage.setItem('studentAlert', alertMessage)
  setCurrentAlert(alertMessage)
  alert('Alerte envoyée aux étudiants')
  setAlertMessage('')
}

const handleDeleteAlert = () => {
  if (!window.confirm('Voulez-vous vraiment supprimer cette alerte ?')) return
  localStorage.removeItem('studentAlert')
  setCurrentAlert('')
}

  const deleteMachine = async (id) => {
    if (!window.confirm('Supprimer cette machine ?')) return
    try {
      await api.delete(`/machines/${id}`)
      setMachines(machines.filter((machine) => machine.id !== id))
    } catch (error) {
      alert('Erreur lors de la suppression')
      console.error(error)
    }
  }

  const togglePanne = async (machine) => {
    try {
      const response = await api.patch(`/machines/${machine.id}/panne`)
      setMachines(machines.map((m) => (m.id === machine.id ? response.data : m)))
    } catch (error) {
      alert('Erreur lors du changement de statut')
      console.error(error)
    }
  }

  const handleAddMachine = async (e) => {
    e.preventDefault()
    if (!newNumero || !newCapacite) {
      setAddError('Veuillez remplir tous les champs')
      return
    }
    setAddLoading(true)
    setAddError('')
    try {
      const response = await api.post('/machines', {
        numero: newNumero,
        type: newType,
        capacite: parseInt(newCapacite),
      })
      setMachines([...machines, response.data])
      setShowAddModal(false)
      setNewNumero('')
      setNewType('lave-linge')
      setNewCapacite('')
    } catch (error) {
      setAddError(error.response?.data?.message || 'Erreur lors de l\'ajout')
    } finally {
      setAddLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 sm:p-6">

      {/* ADD MACHINE MODAL */}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-[30px] shadow-2xl p-8 w-full max-w-[480px]">
            <h2
              className="text-[26px] font-bold text-[#555555] mb-6"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Ajouter une machine
            </h2>

            {addError && (
              <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5 text-sm">
                {addError}
              </div>
            )}

            <form onSubmit={handleAddMachine}>

              <div className="mb-5">
                <label className="block text-[18px] text-[#555555] mb-2" style={{ fontFamily: 'Playpen Sans' }}>
                  Numéro
                </label>
                <input
                  type="text"
                  placeholder="Ex : M-05"
                  value={newNumero}
                  onChange={(e) => setNewNumero(e.target.value)}
                  className="w-full h-[50px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
                />
              </div>

              <div className="mb-5">
                <label className="block text-[18px] text-[#555555] mb-2" style={{ fontFamily: 'Playpen Sans' }}>
                  Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full h-[50px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
                >
                  <option value="lave-linge">Lave-linge</option>
                  <option value="seche-linge">Sèche-linge</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-[18px] text-[#555555] mb-2" style={{ fontFamily: 'Playpen Sans' }}>
                  Capacité (kg)
                </label>
                <input
                  type="number"
                  placeholder="Ex : 7"
                  value={newCapacite}
                  onChange={(e) => setNewCapacite(e.target.value)}
                  min="1"
                  className="w-full h-[50px] rounded-[12px] px-4 bg-white border border-[#D9D9D9] outline-none shadow-sm"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setAddError('') }}
                  className="flex-1 py-3 rounded-[15px] border-2 border-[#D9D9D9] text-[#555555] font-bold hover:bg-gray-50 transition"
                  style={{ fontFamily: 'Playpen Sans' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 py-3 rounded-[15px] bg-[#F56B6B] text-white font-bold hover:scale-[1.02] transition disabled:opacity-60"
                  style={{ fontFamily: 'Playpen Sans' }}
                >
                  {addLoading ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}

      <header className="flex justify-between items-start">
        {/* LEFT */}

        <div className="flex items-start gap-3">
          <img src={logoBuanderie} alt="Buanderie" className="w-14 sm:w-24" />

          <div>
            <h1
              className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Buanderie
            </h1>

            <h2
              className="text-[22px] sm:text-[38px] leading-none font-bold text-[#555555] mt-2"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              ENSIAS
            </h2>
          </div>
        </div>

        {/* CENTER — caché sur mobile */}

        <h1
          className="hidden md:block text-[28px] lg:text-[45px] text-[#555555] font-bold mt-2"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Dashboard Admin
        </h1>

        {/* RIGHT */}

        <div className="flex items-center gap-3 sm:gap-6 relative">
          <img src={logoEnsias} alt="ENSIAS" className="w-14 sm:w-24 hidden sm:block" />

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex flex-col items-center"
            >
              <img
                src={profil}
                alt="Admin"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover"
              />

              <span
                className="text-[#555555] text-sm"
                style={{ fontFamily: 'Playpen Sans' }}
              >
                Admin
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-4 w-[180px] sm:w-[220px] bg-white rounded-[20px] shadow-lg p-4 z-50">
                <button className="w-full text-left px-4 py-3 hover:bg-[#F5F5F5] rounded-xl transition">
                  Paramètres
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/admin/login'
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 rounded-xl transition"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TITRE visible uniquement sur mobile */}
      <h1
        className="block md:hidden text-[20px] font-bold text-[#555555] mt-4 text-center"
        style={{ fontFamily: 'Playpen Sans' }}
      >
        Dashboard Admin
      </h1>

      {/* WELCOME */}

      <div className="mt-8 sm:mt-12">
        <h2
          className="text-[24px] sm:text-[38px] font-bold text-[#555555]"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Bonjour Admin
        </h2>

        <p className="text-gray-500 mt-1">Gérez les machines et les réservations</p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-10">
        <div className="bg-[#F56B6B] text-white rounded-[25px] p-4 sm:p-6 shadow-md">
          <h1 className="text-[32px] sm:text-[40px] font-bold">{reservations.length}</h1>

          <p>Réservations</p>
        </div>

        <div className="bg-white rounded-[25px] p-4 sm:p-6 shadow-md">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#555555]">
            {[...new Set(reservations.map((r) => r.user_id))].length}
          </h1>

          <p className="text-[#555555]">Étudiants</p>
        </div>

        <div className="bg-white rounded-[25px] p-4 sm:p-6 shadow-md">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#555555]">{machines.length}</h1>

          <p className="text-[#555555]">Machines</p>
        </div>

        <div className="bg-white rounded-[25px] p-4 sm:p-6 shadow-md">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#555555]">
            {todayReservations.length}
          </h1>

          <p className="text-[#555555]">Aujourd'hui</p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-10 sm:mt-14">
        {/* MACHINES */}

        <div className="bg-white rounded-[30px] p-5 sm:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2
              className="text-[22px] sm:text-[30px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Gestion des machines
            </h2>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#F56B6B] text-white px-4 py-2 rounded-[12px] hover:scale-[1.02] transition text-sm font-bold"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              + Ajouter
            </button>
          </div>

          <div className="space-y-5">
            {machines.map((machine) => {
              const status = getMachineStatus(machine.id)
              const isPanne = machine.statut === 'en_panne'

              return (
                <div
                  key={machine.id}
                  className="bg-[#F9F9F9] p-4 sm:p-5 rounded-[20px]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-[#555555] text-base sm:text-lg">
                        {machine.numero}
                      </h3>

                      <p className="text-gray-400 text-sm">{machine.type} · {machine.capacite} kg</p>

                      <span
                        className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold
                        ${
                          isPanne
                            ? 'bg-orange-100 text-orange-600'
                            : status === 'Libre'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {isPanne ? 'En panne' : status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() => togglePanne(machine)}
                        className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition
                          ${isPanne
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          }`}
                      >
                        {isPanne ? 'Remettre en service' : 'Signaler panne'}
                      </button>

                      <button
                        onClick={() => deleteMachine(machine.id)}
                        className="bg-red-100 text-red-500 px-3 py-1.5 rounded-[10px] hover:bg-red-200 transition text-xs font-bold"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

{/* ALERT SECTION */}

<div className="bg-white p-5 sm:p-8 rounded-[30px] shadow-md mt-0 sm:mt-10">

  <div className="flex justify-between items-center mb-6">
    <h2
      className="text-[22px] sm:text-[30px] font-bold text-[#555555]"
      style={{ fontFamily: 'Playpen Sans' }}
    >
      Envoyer une alerte
    </h2>
  </div>

  {/* ALERTE ACTIVE */}

  {currentAlert && (
    <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-[20px] p-5 mb-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-bold text-[#856404] mb-1">⚠️ Alerte active :</p>
          <p className="text-[#856404] text-sm">{currentAlert}</p>
        </div>
        <button
          onClick={handleDeleteAlert}
          className="shrink-0 bg-red-100 text-red-500 px-3 py-1.5 rounded-[10px] text-xs font-bold hover:bg-red-200 transition"
          style={{ fontFamily: 'Playpen Sans' }}
        >
          Supprimer
        </button>
      </div>
    </div>
  )}

  <textarea
    placeholder="Ex: La buanderie sera fermée demain de 14h à 18h."
    value={alertMessage}
    onChange={(e) => setAlertMessage(e.target.value)}
    className="w-full h-[120px] rounded-[20px] border border-[#E5E5E5] p-5 outline-none resize-none"
  />

  <button
    onClick={handleSendAlert}
    className="mt-5 bg-[#F56B6B] text-white px-6 sm:px-8 py-4 rounded-[15px] font-bold hover:scale-[1.02] transition"
    style={{ fontFamily: 'Playpen Sans' }}
  >
    Envoyer l'alerte
  </button>

</div>

        {/* RESERVATIONS */}

        <div className="bg-white rounded-[30px] p-5 sm:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2
              className="text-[22px] sm:text-[30px] font-bold text-[#555555]"
              style={{ fontFamily: 'Playpen Sans' }}
            >
              Réservations récentes
            </h2>

            <button className="text-[#F56B6B] font-semibold">Voir tout →</button>
          </div>

          <div className="space-y-5">
            {reservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="bg-[#F9F9F9] p-4 sm:p-5 rounded-[20px] hover:shadow-md transition cursor-pointer"
                onClick={() =>
                  alert(
                    `Étudiant : ${reservation.user?.name} ${reservation.user?.prenom}
Machine : ${reservation.machine?.numero}
Date : ${reservation.dateReservation}
Créneau : ${reservation.creneau?.heureDebut} - ${reservation.creneau?.heureFin}
Statut : ${reservation.statut}`
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-[#555555] text-base sm:text-lg">
                      {reservation.user?.name} {reservation.user?.prenom}
                    </h3>

                    <p className="text-gray-500">
                      {reservation.machine?.numero} •{' '}
                      {reservation.creneau?.heureDebut}
                    </p>
                  </div>

                  <span
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-bold
                    ${
                      reservation.statut === 'confirme'
                        ? 'bg-green-100 text-green-600'
                        : reservation.statut === 'en_attente'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {reservation.statut}
                  </span>
                </div>
              </div>
            ))}

            {reservations.length === 0 && (
              <p className="text-gray-400 text-center py-4">Aucune réservation</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
