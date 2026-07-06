import { useState } from "react";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import toast from "react-hot-toast";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");

  const registerMutation = useRegister();
  const navigate = useNavigate();

  const isLoading = registerMutation.isLoading; // Check if hook exposes a loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordA !== passwordB) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name,
        email,
        password: passwordA,
      });

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="flex h-full w-full lg:w-1/2 items-center justify-center bg-white p-6 sm:p-10 overflow-y-auto">
      <div className="w-full max-w-md my-auto py-4">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Get started with your workspace today. No credit card required.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Full Name
            </label>
            <div className="relative flex items-center rounded-lg border border-zinc-200 bg-zinc-50/30 transition-all duration-200 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10">
              <FaUser className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Email Address
            </label>
            <div className="relative flex items-center rounded-lg border border-zinc-200 bg-zinc-50/30 transition-all duration-200 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10">
              <FaEnvelope className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Password
            </label>
            <div className="relative flex items-center rounded-lg border border-zinc-200 bg-zinc-50/30 transition-all duration-200 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10">
              <FaLock className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                value={passwordA}
                onChange={(e) => setPasswordA(e.target.value)}
              />
              <button
                type="button"
                tabIndex="-1"
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Confirm Password
            </label>
            <div className="relative flex items-center rounded-lg border border-zinc-200 bg-zinc-50/30 transition-all duration-200 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10">
              <FaLock className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                value={passwordB}
                onChange={(e) => setPasswordB(e.target.value)}
              />
              <button
                type="button"
                tabIndex="-1"
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-lg bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="border-t border-slate-200"></div>

            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-slate-500">
              OR
            </span>
          </div>

          <button
                      onClick={() => navigate("*")} //temp navigate to 404
                      type="button"
                      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 py-4 font-medium transition hover:bg-slate-50"
                    >
                      <FaGoogle />
                      Continue with Google
                    </button>

          {/* Login Link */}
          <p className="text-center text-zinc-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;