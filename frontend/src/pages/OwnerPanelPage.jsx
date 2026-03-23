import { useMemo } from 'react';
import { users } from '../mock/data.js';
import { useAuth } from '../components/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function OwnerPanelContent() {
  const { user, updateUserRole } = useAuth();

  const manageableUsers = useMemo(
    () => users.filter((u) => u.role !== 'Owner'),
    [],
  );

  const handleRoleChange = (userId, newRole) => {
    if (!['User', 'Admin'].includes(newRole)) return;
    updateUserRole(userId, newRole);
  };

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
                  <p className="text-xs text-slate-500">{u.email}</p>
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
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
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

