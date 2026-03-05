import { Link } from 'react-router-dom'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">
          Create your CityRide account
        </h1>
        <p className="mb-5 text-sm text-slate-500">
          Join the community of trusted local drivers and owners.
        </p>
        <form className="space-y-4">
          <Input label="Full name" placeholder="Alex Smith" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Phone" placeholder="+36 30 123 4567" />
          <Input label="Age" type="number" min={18} placeholder="28" />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage

