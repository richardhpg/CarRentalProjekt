function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

  const variants = {
    primary:
      'bg-blue-600 text-white shadow-md shadow-blue-500/40 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg',
    secondary:
      'bg-white text-slate-900 border border-slate-200 hover:border-blue-500 hover:text-blue-700 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  }

  const styles = `${base} ${variants[variant]} ${className}`

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}

export default Button

