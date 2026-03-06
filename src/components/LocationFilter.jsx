import { useEffect, useMemo, useState } from 'react'
import { advertisements } from '../mock/data.js'

function LocationFilter({ value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [open, setOpen] = useState(false)

  const locations = useMemo(() => {
    // TODO: Replace with API call to fetch available locations
    const unique = [
      ...new Set(
        advertisements
          .map((ad) => ad.location)
          .filter((loc) => typeof loc === 'string' && loc.trim().length > 0),
      ),
    ]
    return unique.sort((a, b) => a.localeCompare(b))
  }, [])

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
    </div>
  )
}

export default LocationFilter

