import CarCard from './CarCard.jsx'

function CarGrid({ cars, advertisements, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl bg-slate-200/70"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => {
        const ad = advertisements.find((a) => a.car_id === car.id)
        return <CarCard key={car.id} car={car} advertisement={ad} />
      })}
    </div>
  )
}

export default CarGrid

