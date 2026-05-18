import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact_email: email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      login(data);
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">
          Welcome back
        </h1>
        <p className="mb-5 text-sm text-slate-500">
          Log in to manage your trips and cars.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.general && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              {errors.general}
            </p>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="email címed@példa.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
