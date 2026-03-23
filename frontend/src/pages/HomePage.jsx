import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import CarGrid from '../components/CarGrid.jsx'
import Button from '../components/Button.jsx'
import { cars, advertisements } from '../mock/data.js'

function HomePage() {
  const featuredCars = cars.slice(0, 6)

  return (
    <div className="bg-slate-900">
      <section className="relative overflow-hidden bg-slate-900 pb-12 pt-16 text-white md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,1),_transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center">
          <div className="max-w-xl space-y-5">
            <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700">
              Új · Magánszemélytől magánszemélynek bérlés mód
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Rent unique cars
              <span className="block text-blue-400">
                from people near you.
              </span>
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              CityRide connects you with trusted local owners so you can find
              the perfect car for every trip — from city runs to weekend
              getaways.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/cars">
                <Button>
                  Rent a car
                </Button>
              </Link>
              <Link to="/add-car">
                <Button variant="secondary" className="border-slate-700 bg-slate-900/40 text-blue-600">
                  List your car
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-white">24/7 support</p>
                <p>We are here whenever you need us.</p>
              </div>
              <div>
                <p className="font-semibold text-white">Insurance ready</p>
                <p>Trips covered by leading partners.</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md md:max-w-lg">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                Featured cars in Budapest
              </h2>
              <p className="text-xs text-slate-500 md:text-sm">
                Hand-picked selection of popular rentals for your next trip.
              </p>
            </div>
            <Link
              to="/cars"
              className="text-xs font-semibold text-blue-600 hover:text-blue-500"
            >
              View all cars →
            </Link>
          </div>
          <CarGrid cars={featuredCars} advertisements={advertisements} />
        </div>
      </section>
    </div>
  )
}

export default HomePage

