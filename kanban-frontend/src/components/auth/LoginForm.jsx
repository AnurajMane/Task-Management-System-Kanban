import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const loginMutation = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginMutation.mutateAsync({
        email,
        password,
      });

      login(data.token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Invalid credentials"
      );
    }
  };

  return (
    <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-10">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">

              <FaEnvelope className="mr-3 text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">

              <FaLock className="mr-3 text-slate-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                className="w-full outline-none"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>

            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loginMutation.isPending
              ? "Logging In..."
              : "Login"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="border-t border-slate-200"></div>

            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-slate-500">
              OR
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 py-4 font-medium transition hover:bg-slate-50"
          >
            <FaGoogle />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create One
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;