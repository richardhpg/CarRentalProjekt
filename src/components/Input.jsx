function Input({ label, helper, error, className = '', ...props }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className}`}>
      {label && <span className="font-medium text-slate-700">{label}</span>}
      <input
        className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
        {...props}
      />
      {helper && !error && (
        <span className="text-xs text-slate-500">{helper}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}

export default Input

