import { useMemo } from 'react';
import { useState } from 'react';
import { users, cars, advertisements } from '../mock/data.js';
import { useAuth } from '../components/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function OwnerPanelContent() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const selectedUser = users.find((u) => u.id === selectedUserId) || null;
  const selectedUserCars = selectedUser
    ? cars.filter((c) => c.user_id === selectedUser.id)
    : [];
  const selectedUserAds = selectedUser
    ? advertisements.filter((a) => a.user_id === selectedUser.id)
    : [];

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Owner Panel
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
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${selectedUserId === u.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                >
                  <div>
                    <p
                      className={`text-sm font-semibold ${selectedUserId === u.id ? 'text-white' : 'text-slate-900'
                        }`}
                    >
                      {u.name}
                    </p>
                    <p
                      className={`text-xs ${selectedUserId === u.id ? 'text-slate-200' : 'text-slate-500'
                        }`}
                    >
                      {u.email}
                    </p>
                  </div>

                  {/* JOBB OLDAL */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${u.role === 'Admin'
                          ? 'bg-red-100 text-red-700'
                          : u.role === 'Owner'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                      {u.role}
                    </span>

                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="rounded-full border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
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
                      {selectedUser.email}
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
  );
}

function OwnerPanelPage() {
  return (
    <ProtectedRoute allowedRoles={['Owner']}>
      <OwnerPanelContent />
    </ProtectedRoute>
  );
}

export default OwnerPanelPage;

