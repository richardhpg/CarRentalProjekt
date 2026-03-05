import { Link, NavLink, useLocation } from 'react-router-dom'

const navLinkBase =
  'text-sm font-medium transition-colors hover:text-white/80 px-3 py-2 rounded-full'

function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/40 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <span className="text-lg font-semibold">CR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              CityRide
            </span>
            <span className="text-xs text-slate-400">Peer-to-peer rentals</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive ? 'bg-slate-800 text-white' : 'text-slate-300'
              }`
            }
          >
            Browse cars
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive ? 'bg-slate-800 text-white' : 'text-slate-300'
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-slate-200 hover:text-white md:inline"
          >
            Log in
          </Link>
          <Link
            to={location.pathname === '/add-car' ? '/cars' : '/add-car'}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/40 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
          >
            {location.pathname === '/add-car' ? 'Browse cars' : 'List your car'}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

