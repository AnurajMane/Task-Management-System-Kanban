import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50/50 p-6 text-center md:p-12">
      <div className="w-full max-w-[480px] rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm shadow-zinc-100/50 md:p-12">
        
        {/* Subtle Decorative Badge */}
        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-4">
          Error 404
        </span>

        {/* Hero Typography */}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Page not found
        </h1>
        
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or perhaps the URL has a small typo.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          
          {/* Primary Action: Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <FaArrowLeft className="text-xs" />
            Go back
          </button>

          {/* Secondary Action: Dashboard/Home */}
          <button
            onClick={() => navigate("/")}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <FaHome className="text-sm text-zinc-400" />
            Take me home
          </button>
        </div>

        {/* Optional: Helpful Support Link Footer */}
        <div className="mt-10 border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400">
            Think this is a mistake?{" "}
            <a 
              href="#support" 
              className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default NotFoundPage;