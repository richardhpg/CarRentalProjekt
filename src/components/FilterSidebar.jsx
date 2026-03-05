function FilterSidebar({
  priceRange,
  onPriceChange,
  fuelType,
  onFuelChange,
  gearbox,
  onGearboxChange,
  seats,
  onSeatsChange,
}) {
  return (
    <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Filters</h3>
      <div className="space-y-4 text-xs text-slate-600">
        <div>
          <p className="mb-2 font-medium text-slate-700">Price per day</p>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="30"
              max="120"
              value={priceRange}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <span className="w-14 text-right font-semibold text-slate-800">
              €{priceRange}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-slate-700">Fuel type</p>
          <div className="flex flex-wrap gap-2">
            {['Any', 'Petrol', 'Diesel', 'Hybrid', 'Electric'].map((type) => (
              <button
                key={type}
                onClick={() =>
                  onFuelChange(type === 'Any' ? undefined : type)
                }
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  fuelType === type || (!fuelType && type === 'Any')
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-slate-700">Gearbox</p>
          <div className="flex flex-wrap gap-2">
            {['Any', 'Automatic', 'Manual'].map((type) => (
              <button
                key={type}
                onClick={() =>
                  onGearboxChange(type === 'Any' ? undefined : type)
                }
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  gearbox === type || (!gearbox && type === 'Any')
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-slate-700">Seats</p>
          <div className="flex flex-wrap gap-2">
            {[4, 5, 7].map((n) => (
              <button
                key={n}
                onClick={() => onSeatsChange(seats === n ? undefined : n)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  seats === n
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {n}+ seats
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar

