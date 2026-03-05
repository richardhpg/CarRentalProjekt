import { useEffect, useState } from 'react'
import CarGrid from '../components/CarGrid.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import { cars as allCars, advertisements } from '../mock/data.js'

function CarListingPage() {
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState(120)
  const [fuelType, setFuelType] = useState()
  const [gearbox, setGearbox] = useState()
  const [seats, setSeats] = useState()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const filteredCars = allCars.filter((car) => {
    if (car.daily_rate > priceRange) return false
    if (fuelType && car.fuel_type !== fuelType) return false
    if (gearbox && car.gearbox_type !== gearbox) return false
    if (seats && car.seats_number < seats) return false
    return true
  })

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
              advertisements={advertisements}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarListingPage

