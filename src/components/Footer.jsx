function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 py-8 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} CityRide. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-white">
            Trust & safety
          </button>
          <button className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-white">
            Help center
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

