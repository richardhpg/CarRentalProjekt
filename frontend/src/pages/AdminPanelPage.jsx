import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

function AdminPanelContent() {
  const { user, accessToken } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [cars, setCars] = useState([])
  const [advertisements, setAdvertisements] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true)
      setError('')

      try {
        const authHeaders = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}
        const [usersResponse, carsResponse, adsResponse] = await Promise.all([
          fetch('http://localhost:3000/api/users', {
            headers: authHeaders,
            credentials: 'include',
          }),
          fetch('http://localhost:3000/api/cars', {
            headers: authHeaders,
            credentials: 'include',
          }),
          fetch('http://localhost:3000/api/advertisements', {
            headers: authHeaders,
            credentials: 'include',
          }),
        ])

        if (!usersResponse.ok) {
          throw new Error('Failed to load users.')
        }
        if (!carsResponse.ok) {
          throw new Error('Failed to load cars.')
        }
        if (!adsResponse.ok) {
          throw new Error('Failed to load advertisements.')
        }

        const [usersData, carsData, adsData] = await Promise.all([
          usersResponse.json(),
          carsResponse.json(),
          adsResponse.json(),
        ])

        const safeUsers = Array.isArray(usersData) ? usersData : []
        setUsers(safeUsers)
        setCars(Array.isArray(carsData) ? carsData : [])
        setAdvertisements(Array.isArray(adsData) ? adsData : [])
      } catch (err) {
        setUsers([])
        setCars([])
        setAdvertisements([])
        setError(err.message || 'Could not load admin data.')
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [accessToken])

  const selectedUser = users.find((u) => u.id === selectedUserId) || null
  const selectedUserCars = selectedUser
    ? cars.filter((c) => c.user_id === selectedUser.id)
    : []
  const selectedUserAds = selectedUser
    ? advertisements.filter((a) => a.user_id === selectedUser.id)
    : []

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-500">
              Felhasználók és hirdetések megtekintése (read-only).
            </p>
          </div>
          {user && (
            <p className="text-xs font-medium text-slate-500">
              Bejelentkezve mint <span className="font-semibold">{user.name}</span> (
              {user.role})
            </p>
          )}
        </div>
        {loading && (
          <p className="mb-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Loading admin data...
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Felhasználók
            </h2>
            <div className="space-y-2 text-xs text-slate-600">
              {users.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedUserId(u.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                    selectedUserId === u.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        selectedUserId === u.id ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {u.name}
                    </p>
                    <p
                      className={`text-xs ${
                        selectedUserId === u.id ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {u.contact_email ?? u.email}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      u.role === 'Admin'
                        ? 'bg-red-100 text-red-700'
                        : u.role === 'Owner'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Részletes nézet
            </h2>
            {!selectedUser && (
              <p className="text-xs text-slate-500">
                Válassz ki egy felhasználót a bal oldali listából a részletek
                megtekintéséhez.
              </p>
            )}

            {selectedUser && (
              <div className="space-y-4 text-xs text-slate-700">
                <div className="rounded-xl bg-slate-50 p-3">
                  <h3 className="mb-2 text-xs font-semibold text-slate-900">
                    Alapadatok
                  </h3>
                  <div className="grid gap-1 md:grid-cols-2">
                    <p>
                      <span className="font-semibold">Név:</span> {selectedUser.name}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{' '}
                      {selectedUser.contact_email ?? selectedUser.email}
                    </p>
                    <p>
                      <span className="font-semibold">Telefonszám:</span>{' '}
                      {selectedUser.contact_phoneNumber || '-'}
                    </p>
                    <p>
                      <span className="font-semibold">Kor:</span>{' '}
                      {selectedUser.age ?? '-'}
                    </p>
                    <p>
                      <span className="font-semibold">Szerepkör:</span>{' '}
                      {selectedUser.role}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <h3 className="mb-2 text-xs font-semibold text-slate-900">
                    Autók
                  </h3>
                  {selectedUserCars.length === 0 && (
                    <p className="text-xs text-slate-500">
                      Ennek a felhasználónak még nincsenek autói.
                    </p>
                  )}
                  <div className="space-y-2">
                    {selectedUserCars.map((car) => (
                      <div
                        key={car.id}
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-100"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {car.make} {car.model}
                          </p>
                          <p className="text-xs text-slate-500">
                            {car.prod_year} • {car.fuel_type} • {car.gearbox_type}
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-slate-900">
                          €{car.daily_rate}/nap
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <h3 className="mb-2 text-xs font-semibold text-slate-900">
                    Hirdetések
                  </h3>
                  {selectedUserAds.length === 0 && (
                    <p className="text-xs text-slate-500">
                      Ennek a felhasználónak még nincsenek hirdetései.
                    </p>
                  )}
                  <div className="space-y-2">
                    {selectedUserAds.map((ad) => (
                      <div
                        key={ad.id}
                        className="rounded-lg bg-white p-3 ring-1 ring-slate-100"
                      >
                        <p className="text-xs font-semibold text-slate-900">
                          {ad.location}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {ad.description}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Állapot: {ad.status} • Max {ad.max_km_per_day} km/nap
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function AdminPanelPage() {
  return (
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminPanelContent />
    </ProtectedRoute>
  )
}

export default AdminPanelPage

