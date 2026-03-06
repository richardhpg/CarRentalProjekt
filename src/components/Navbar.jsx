import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const navLinkBase =
  'text-sm font-medium transition-colors hover:text-white/80 px-3 py-2 rounded-full'

function Navbar() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    setIsProfileMenuOpen(false)
  }, [location.pathname])

  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? 'U'

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/40 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <span className="text-lg font-semibold">
              <img src="/images/Slogo-removebg.png" alt="Rentify" className="h-20 w-20" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              Rentify
            </span>
            <span className="text-xs text-slate-400">Peer-to-peer rentals</span>
          </div>
        </Link>

        
        <nav className="hidden items-center gap-1 md:flex">
          {!user ? (<></>): (<>
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
          </>)}
          
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              to="/login"
              className="hidden text-sm font-medium text-slate-200 hover:text-white md:inline"
            >
              Log in
            </Link>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="hidden items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/80 px-2 py-1 text-slate-200 transition hover:bg-slate-700/80 md:inline-flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {userInitial}
                </span>
                <span className="max-w-[9rem] truncate pr-1 text-sm font-medium text-white">
                  {user.name}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/95 py-1 shadow-lg shadow-slate-900/40">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-700/70"
                  >
                    Profil kezelése
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false)
                      logout()
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-700/70"
                  >
                    Kijelentkezés
                  </button>
                </div>
              )}
            </div>
          )}
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

