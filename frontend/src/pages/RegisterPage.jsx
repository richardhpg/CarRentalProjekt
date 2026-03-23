import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (age && Number(age) < 18) {
      newErrors.age = 'You must be at least 18'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      register({
        name: fullName,
        email,
        password,
        phone,
        age,
      })
      navigate('/')
    } catch (error) {
      if (error.message === 'Email already exists') {
        setErrors({
          ...newErrors,
          email: 'An account with this email already exists',
        })
      } else {
        setErrors({
          ...newErrors,
          general: 'Registration failed. Please try again.',
        })
      }
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">
          Create your CityRide account
        </h1>
        <p className="mb-5 text-sm text-slate-500">
          Join the community of trusted local drivers and owners.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.general && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              {errors.general}
            </p>
          )}
          <Input
            label="Full name"
            placeholder="Alex Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
          <Input
            label="Phone"
            placeholder="+36 30 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Age"
            type="number"
            min={18}
            placeholder="28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            error={errors.age}
          />
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

