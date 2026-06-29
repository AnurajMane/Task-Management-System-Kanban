import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-10">

      <div className="w-full max-w-md">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-3 text-slate-500">
            Create your workspace and start managing tasks.
          </p>
        </div>

        <form className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <FaUser className="mr-3 text-slate-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <FaEnvelope className="mr-3 text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <FaLock className="mr-3 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 py-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <FaLock className="mr-3 text-slate-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-slate-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default RegisterForm;