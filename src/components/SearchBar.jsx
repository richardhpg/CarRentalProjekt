function SearchBar() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-lg shadow-slate-900/10 ring-1 ring-slate-100 backdrop-blur md:flex-row md:items-center md:gap-4">
      <div className="flex-1">
        <label className="text-xs font-medium text-slate-500">Location</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Search city or district"
        />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-500">From</label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500">Until</label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <button className="mt-1 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/40 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg md:mt-5">
        Search cars
      </button>
    </div>
  )
}

export default SearchBar

