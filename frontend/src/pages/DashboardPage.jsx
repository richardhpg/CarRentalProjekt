import { Link } from 'react-router-dom'
import { cars, rentals, advertisements } from '../mock/data.js'
import DashboardCard from '../components/DashboardCard.jsx'
import Button from '../components/Button.jsx'

function DashboardPage() {
  const myUserId = 1

  const myCars = cars.filter((c) => c.user_id === myUserId)
  const myAds = advertisements.filter((a) => a.user_id === myUserId)
  const myLessorRentals = rentals.filter((r) => r.lessor_id === myUserId)
  const myCustomerRentals = rentals.filter((r) => r.customer_id === myUserId)

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Overview of your cars, rentals, and activity.
            </p>
          </div>
          <Link to="/add-car">
            <Button>+ Add new car</Button>
          </Link>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <DashboardCard
            title="My cars"
            value={myCars.length}
            subtitle={`${myAds.length} active listings`}
          />
          <DashboardCard
            title="Trips as host"
            value={myLessorRentals.length}
            subtitle="Completed rentals"
          />
          <DashboardCard
            title="Trips as guest"
            value={myCustomerRentals.length}
            subtitle="Past and upcoming"
          />
          <DashboardCard
            title="Estimated earnings"
            value="€1,720"
            subtitle="Mock data only"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              My cars
            </h2>
            <div className="space-y-2 text-xs text-slate-600">
              {myCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {car.make} {car.model}
                    </p>
                    <p className="text-xs text-slate-500">
                      {car.prod_year} • {car.fuel_type} •{' '}
                      {car.gearbox_type}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">
                    €{car.daily_rate}/day
                  </p>
                </div>
              ))}
              {myCars.length === 0 && (
                <p className="text-xs text-slate-500">
                  You don&apos;t have any listed cars yet.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Upcoming rentals
            </h2>
            <div className="space-y-2 text-xs text-slate-600">
              {myLessorRentals.map((rental) => {
                const car = cars.find((c) => c.id === rental.car_id)
                return (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {car?.make} {car?.model}
                      </p>
                      <p className="text-xs text-slate-500">
                        {rental.from} → {rental.until}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">
                      €{rental.rental_price}
                    </p>
                  </div>
                )
              })}
              {myLessorRentals.length === 0 && (
                <p className="text-xs text-slate-500">
                  You have no upcoming rentals as a host yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

