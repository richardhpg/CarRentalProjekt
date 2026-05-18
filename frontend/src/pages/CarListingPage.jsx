import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarGrid from '../components/CarGrid.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import { AuthContext } from '../components/AuthContext.jsx'

function CarListingPage() {
  const { accessToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [allCars, setAllCars] = useState([])
  const [advertisements, setAdvertisements] = useState([])
  const [priceRange, setPriceRange] = useState(120)
  const [fuelType, setFuelType] = useState()
  const [gearbox, setGearbox] = useState()
  const [seats, setSeats] = useState()
  const [location, setLocation] = useState()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const initialLocation = searchParams.get('location')
    if (initialLocation) {
      setLocation(initialLocation)
    }
  }, [searchParams])

  useEffect(() => {
    const loadListingData = async () => {
      setLoading(true)
      setError('')

      try {
        const authHeaders = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}

        const adsResponse = await fetch('http://localhost:3000/api/advertisements', {
          headers: authHeaders,
          credentials: 'include',
        })

        if (!adsResponse.ok) {
          throw new Error('Failed to load advertisements.')
        }

        const adsData = await adsResponse.json()
        const validAds = Array.isArray(adsData)
          ? adsData.filter((ad) => {
              if (!ad?.cars) return false
              if (ad.deleted === true) return false
              if (typeof ad.status === 'string' && ad.status !== 'active') {
                return false
              }
              return true
            })
          : []

        setAdvertisements(validAds)
        setAllCars(validAds.map((ad) => ad.cars))
      } catch (err) {
        setAllCars([])
        setAdvertisements([])
        setError(err.message || 'Could not load car listings.')
      } finally {
        setLoading(false)
      }
    }

    loadListingData()
  }, [accessToken])

  useEffect(() => {
    if (location) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('location', location)
        return next
      })
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.delete('location')
        return next
      })
    }
  }, [location, setSearchParams])

  const filteredAds = advertisements.filter((ad) => {
    const car = ad.cars
    if (!car) return false

    if (car.daily_rate > priceRange) return false
    if (fuelType && car.fuel_type !== fuelType) return false
    if (gearbox && car.gearbox_type !== gearbox) return false
    if (seats && car.seats_number < seats) return false

    if (location && ad.location !== location) return false

    return true
  })
  const filteredCars = filteredAds.map((ad) => ad.cars)

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Browse cars in Budapest
          </h1>
          <p className="text-sm text-slate-500">
            Choose from a curated selection of local cars for every occasion.
          </p>
        </header>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-[260px,minmax(0,1fr)]">
          <FilterSidebar
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            fuelType={fuelType}
            onFuelChange={setFuelType}
            gearbox={gearbox}
            onGearboxChange={setGearbox}
            seats={seats}
            onSeatsChange={setSeats}
            location={location}
            onLocationChange={setLocation}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing{' '}
                <span className="font-semibold text-slate-800">
                  {filteredCars.length}
                </span>{' '}
                of {allCars.length} cars
              </span>
            </div>
            <CarGrid
              cars={filteredCars}
              advertisements={filteredAds}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarListingPage

