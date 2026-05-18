import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext.jsx'

function LocationFilter({ value, onChange }) {
  const { accessToken } = useContext(AuthContext)
  const [query, setQuery] = useState(value || '')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [advertisements, setAdvertisements] = useState([])

  useEffect(() => {
    const loadAdvertisements = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:3000/api/advertisements', {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Failed to load locations.')
        }

        const data = await response.json()
        setAdvertisements(Array.isArray(data) ? data : [])
      } catch (err) {
        setAdvertisements([])
        setError(err.message || 'Could not load locations.')
      } finally {
        setLoading(false)
      }
    }

    loadAdvertisements()
  }, [accessToken])

  const locations = useMemo(() => {
    const unique = [
      ...new Set(
        advertisements
          .map((ad) =>
            typeof ad.location === 'string' ? ad.location.trim() : '',
          )
          .filter((loc) => typeof loc === 'string' && loc.trim().length > 0),
      ),
    ]
    return unique.sort((a, b) => a.localeCompare(b))
  }, [advertisements])

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return locations
    const lower = query.toLowerCase()
    return locations.filter((loc) => loc.toLowerCase().includes(lower))
  }, [locations, query])

  useEffect(() => {
    setQuery(value || '')
  }, [value])

  const handleSelect = (loc) => {
    onChange(loc)
    setQuery(loc)
    setOpen(false)
  }

  const handleInputChange = (e) => {
    const next = e.target.value
    setQuery(next)
    if (!next.trim()) {
      onChange(undefined)
    }
    if (!open) setOpen(true)
  }

  return (
    <div className="relative">
      <p className="mb-2 text-xs font-medium text-slate-700">Location</p>
      <input
        value={query}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        placeholder="Search location"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {open && filteredLocations.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white text-xs text-slate-800 shadow-lg">
          {filteredLocations.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelect(loc)}
              className="block w-full px-3 py-2 text-left hover:bg-slate-100"
            >
              {loc}
            </button>
          ))}
        </div>
      )}
      {loading && (
        <p className="mt-1 text-[11px] text-slate-400">Loading locations...</p>
      )}
      {error && !loading && (
        <p className="mt-1 text-[11px] text-red-600">{error}</p>
      )}
    </div>
  )
}

export default LocationFilter