import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CAR_PLACEHOLDER_IMAGE } from '../utils/constants.js'
import { useAuth } from './AuthContext.jsx'

function CarCard({ car, advertisement }) {
  const [imgError, setImgError] = useState(false)
  const image = car.pictures?.[0]
  const src = imgError || !image ? CAR_PLACEHOLDER_IMAGE : image
  const { user } = useAuth()
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg hover:ring-blue-100">
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <img
          src={src}
          alt={`${car.make} ${car.model}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {advertisement?.location && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2 py-1 text-xs font-medium text-white">
            {advertisement.location}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-900 shadow-sm">
          €{car.daily_rate}/day
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {car.make} {car.model}
            </h3>
            <p className="text-xs text-slate-500">
              {car.prod_year} • {car.fuel_type} • {car.gearbox_type}
            </p>
          </div>
        </div>

        <div className="mt-1 grid grid-cols-3 gap-2 text-xs text-slate-600">
          <div className="rounded-xl bg-slate-50 px-2 py-1">
            <div className="font-medium">{car.seats_number}</div>
            <div className="text-[11px] text-slate-500">seats</div>
          </div>
          <div className="rounded-xl bg-slate-50 px-2 py-1">
            <div className="font-medium">{car.trunk_space}</div>
            <div className="text-[11px] text-slate-500">trunk</div>
          </div>
          <div className="rounded-xl bg-slate-50 px-2 py-1">
            <div className="font-medium">
              €{car.deposit}
            </div>
            <div className="text-[11px] text-slate-500">deposit</div>
          </div>
        </div>

        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {advertisement?.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <Link
            to = { !user ? "/login" : `/cars/${car.id}` }
            className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/40 transition group-hover:-translate-y-0.5 group-hover:bg-blue-500"
          >
            View details
          </Link>
          <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
            Save ♥
          </button>
        </div>
      </div>
    </article>
  )
}

export default CarCard

