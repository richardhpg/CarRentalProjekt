function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default DashboardCard

