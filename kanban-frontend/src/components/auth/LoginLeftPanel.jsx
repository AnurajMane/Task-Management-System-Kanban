import {
  FaTasks,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

import FeatureCard from "./FeatureCard";

function LoginLeftPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-600 p-12 text-white">

      {/* Decorative Circle */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl"></div>

      <div className="relative flex w-full flex-col justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Kanban Board
          </h1>
        </div>

        {/* Mock Kanban Board */}
        <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/10 p-8 backdrop-blur-md shadow-2xl">

          <div className="grid grid-cols-3 gap-5">

            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="mb-4 font-semibold">
                To Do
              </h3>

              <div className="space-y-3">
                <div className="h-20 rounded-xl bg-white/20"></div>
                <div className="h-20 rounded-xl bg-white/20"></div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="mb-4 font-semibold">
                Progress
              </h3>

              <div className="space-y-3">
                <div className="h-20 rounded-xl bg-white/20"></div>
                <div className="h-20 rounded-xl bg-white/20"></div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="mb-4 font-semibold">
                Done
              </h3>

              <div className="space-y-3">
                <div className="h-20 rounded-xl bg-white/20"></div>
                <div className="h-20 rounded-xl bg-white/20"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Marketing Content */}
        <div>

          <h2 className="max-w-lg text-5xl font-bold leading-tight">
            Manage your work visually and collaborate easily
          </h2>

          <p className="mt-6 max-w-lg text-lg text-white/80">
            Organize tasks, track progress and work with your
            team in one centralized workspace.
          </p>

          <div className="mt-10 flex gap-4">

            <FeatureCard
              icon={<FaUsers />}
              title="Collaboration"
            />

            <FeatureCard
              icon={<FaChartLine />}
              title="Track Progress"
            />

            <FeatureCard
              icon={<FaTasks />}
              title="Stay Organized"
            />

          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginLeftPanel;