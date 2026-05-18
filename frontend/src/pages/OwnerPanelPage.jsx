import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../components/AuthContext.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

function OwnerPanelContent() {
  const { user, accessToken } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:3000/api/users', {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Failed to load users.')
        }

        const data = await response.json()
        setUsers(Array.isArray(data) ? data : [])
      } catch (err) {
        setUsers([])
        setError(err.message || 'Could not load users.')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [accessToken])

  const manageableUsers = useMemo(
    () => users.filter((u) => u.role !== 'Owner'),
    [users],
  )

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Owner Panel
            </h1>
            <p className="text-sm text-slate-500">
              Felhasználói szerepkörök kezelése (User / Admin).
            </p>
          </div>
          {user && (
            <p className="text-xs font-medium text-slate-500">
              Bejelentkezve mint <span className="font-semibold">{user.name}</span> (
              {user.role})
            </p>
          )}
        </div>
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Szerepkör módosítás backend támogatásra vár.
        </p>
        {loading && (
          <p className="mb-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Loading users...
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            Felhasználók és szerepkörök
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            {manageableUsers.map((u) => (
              <div
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500">
                    {u.contact_email ?? u.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      u.role === 'Admin'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {u.role}
                  </span>
                  <select
                    value={u.role}
                    onChange={() => {}}
                    disabled
                    className="rounded-full border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function OwnerPanelPage() {
  return (
    <ProtectedRoute allowedRoles={['Owner']}>
      <OwnerPanelContent />
    </ProtectedRoute>
  )
}

export default OwnerPanelPage

