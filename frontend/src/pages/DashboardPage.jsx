import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext.jsx'
import DashboardCard from '../components/DashboardCard.jsx'
import Button from '../components/Button.jsx'

function DashboardPage() {
  const { accessToken, user } = useContext(AuthContext)
  const [currentUserId, setCurrentUserId] = useState(null)

  const [cars, setCars] = useState([])
  const [advertisements, setAdvertisements] = useState([])
  const [rentals, setRentals] = useState([])

  const [myCars, setMyCars] = useState([])
  const [myAds, setMyAds] = useState([])
  const [myLessorRentals, setMyLessorRentals] = useState([])
  const [myCustomerRentals, setMyCustomerRentals] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [createAdError, setCreateAdError] = useState('')
  const [createAdSuccess, setCreateAdSuccess] = useState('')
  const [newAdForm, setNewAdForm] = useState({
    car_id: '',
    location: '',
    status: 'active',
    description: '',
    smoking: false,
    animal: false,
    max_km_per_day: '',
  })

  const selectedCar = myCars.find((car) => String(car.id) === newAdForm.car_id)

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!accessToken || !user) {
        setCurrentUserId(null)
        setCars([])
        setAdvertisements([])
        setRentals([])
        setMyCars([])
        setMyAds([])
        setMyLessorRentals([])
        setMyCustomerRentals([])
        setError('Please sign in to view your dashboard data.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const meResponse = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        })

        if (!meResponse.ok) {
          throw new Error('Failed to load current user.')
        }

        const meData = await meResponse.json()
        const myUserId = meData?.id

        if (!myUserId) {
          throw new Error('Current user id is missing.')
        }

        setCurrentUserId(myUserId)

        const [carsResponse, adsResponse, rentalsResponse] = await Promise.all([
          fetch('http://localhost:3000/api/cars', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          }),
          fetch('http://localhost:3000/api/advertisements', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          }),
          fetch('http://localhost:3000/api/rentals', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          }),
        ])

        if (!carsResponse.ok) {
          throw new Error('Failed to load cars.')
        }
        if (!adsResponse.ok) {
          throw new Error('Failed to load advertisements.')
        }
        if (!rentalsResponse.ok) {
          throw new Error('Failed to load rentals.')
        }

        const [carsData, adsData, rentalsData] = await Promise.all([
          carsResponse.json(),
          adsResponse.json(),
          rentalsResponse.json(),
        ])

        const safeCars = Array.isArray(carsData) ? carsData : []
        const safeAds = Array.isArray(adsData) ? adsData : []
        const safeRentals = Array.isArray(rentalsData) ? rentalsData : []

        setCars(safeCars)
        setAdvertisements(safeAds)
        setRentals(safeRentals)

        setMyCars(safeCars.filter((c) => c.user_id === myUserId))
        setMyAds(safeAds.filter((a) => a.user_id === myUserId))
        setMyLessorRentals(safeRentals.filter((r) => r.lessor_id === myUserId))
        setMyCustomerRentals(
          safeRentals.filter((r) => r.customer_id === myUserId),
        )
      } catch (err) {
        setCurrentUserId(null)
        setCars([])
        setAdvertisements([])
        setRentals([])
        setMyCars([])
        setMyAds([])
        setMyLessorRentals([])
        setMyCustomerRentals([])
        setError(err.message || 'Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [accessToken, user])

  const handleCreateAdInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setNewAdForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const resetCreateAdForm = () => {
    setNewAdForm({
      car_id: '',
      location: '',
      status: 'active',
      description: '',
      smoking: false,
      animal: false,
      max_km_per_day: '',
    })
    setCreateAdError('')
  }

  const handleCreateAdSubmit = async (event) => {
    event.preventDefault()
    setCreateAdError('')
    setCreateAdSuccess('')

    if (!accessToken || !currentUserId) {
      setCreateAdError('Please sign in to create an advertisement.')
      return
    }

    if (!newAdForm.car_id) {
      setCreateAdError('Please select one of your cars.')
      return
    }

    const parsedMaxKmPerDay = Number(newAdForm.max_km_per_day)
    if (Number.isNaN(parsedMaxKmPerDay)) {
      setCreateAdError('Maximum km/day must be a valid number.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        car_id: Number(newAdForm.car_id),
        user_id: currentUserId,
        location: newAdForm.location.trim(),
        status: newAdForm.status.trim(),
        description: newAdForm.description.trim(),
        smoking: Boolean(newAdForm.smoking),
        animal: Boolean(newAdForm.animal),
        max_km_per_day: parsedMaxKmPerDay,
      }

      const response = await fetch('http://localhost:3000/api/advertisements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Could not create advertisement. Please try again.')
      }

      const data = await response.json()
      const createdAd = data?.advertisement ?? data

      if (createdAd?.id) {
        setAdvertisements((prev) => [createdAd, ...prev])
        if (createdAd.user_id === currentUserId) {
          setMyAds((prev) => [createdAd, ...prev])
        }
      }

      setCreateAdSuccess('Advertisement created successfully.')
      setIsCreateAdOpen(false)
      resetCreateAdForm()
    } catch (err) {
      setCreateAdError(err.message || 'Failed to create advertisement.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-slate-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

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
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCreateAdError('')
                setCreateAdSuccess('')
                setIsCreateAdOpen(true)
              }}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              + Create ad
            </button>
            <Link to="/add-car">
              <Button>+ Add new car</Button>
            </Link>
          </div>
        </div>
        {createAdSuccess && (
          <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {createAdSuccess}
          </p>
        )}

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
      {isCreateAdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Create new advertisement
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsCreateAdOpen(false)
                  setCreateAdError('')
                }}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateAdSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Car
                </label>
                <select
                  name="car_id"
                  value={newAdForm.car_id}
                  onChange={handleCreateAdInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  required
                >
                  <option value="">Select one of your cars</option>
                  {myCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.make} {car.model} - {car.licence_plate}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCar && (
                <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  {selectedCar.make} {selectedCar.model} ({selectedCar.prod_year}) -{' '}
                  {selectedCar.fuel_type}, {selectedCar.gearbox_type}
                </p>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  value={newAdForm.location}
                  onChange={handleCreateAdInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={newAdForm.status}
                  onChange={handleCreateAdInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newAdForm.description}
                  onChange={handleCreateAdInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Max km/day
                </label>
                <input
                  name="max_km_per_day"
                  type="number"
                  min="0"
                  value={newAdForm.max_km_per_day}
                  onChange={handleCreateAdInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    name="smoking"
                    type="checkbox"
                    checked={newAdForm.smoking}
                    onChange={handleCreateAdInputChange}
                  />
                  Smoking allowed
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    name="animal"
                    type="checkbox"
                    checked={newAdForm.animal}
                    onChange={handleCreateAdInputChange}
                  />
                  Animals allowed
                </label>
              </div>

              {createAdError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {createAdError}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateAdOpen(false)
                    setCreateAdError('')
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    submitting || !newAdForm.car_id || !accessToken || !currentUserId
                  }
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {submitting ? 'Creating...' : 'Create ad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage

