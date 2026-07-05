import { FiUsers, FiTrendingUp, FiCheckSquare } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

function LoginLeftPanel() {
  return (
  <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-zinc-300 p-8 xl:p-12 text-zinc-900 border-r border-zinc-200/80 justify-center items-center h-full">
    
    {/* Premium Light Ambient Mesh Glow Effects */}
    <div className="absolute -top-[40%] -right-[20%] h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[128px] pointer-events-none "></div>
    <div className="absolute -bottom-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-violet-400/10 blur-[128px] pointer-events-none"></div>

    {/* Flex container set to justify-between to space components dynamically */}
    <div className="relative flex h-full w-full flex-col justify-between z-10 overflow-hidden">
      
      {/* Upper Brand Section */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md shadow-indigo-500/20 text-sm">
          W
        </div>
        <h1 className="text-sm font-bold tracking-tight text-zinc-800 uppercase">
          Workspace
        </h1>
      </div>

      
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200/80 bg-white/70 p-4 xl:p-6 backdrop-blur-xl shadow-xl shadow-zinc-200/40 my-4 max-h-[40vh] min-h-[220px] overflow-hidden flex flex-col justify-between">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3 xl:mb-5 border-b border-zinc-100 pb-3 flex-shrink-0">
          <span className="text-xs font-semibold text-zinc-500">Sprint Roadmap</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 xl:gap-4 overflow-hidden h-full">
          
          {/* Column: To Do */}
          <div className="rounded-xl bg-zinc-50/50 border border-zinc-200/50 p-2 xl:p-3 flex flex-col justify-between overflow-hidden">
            <div className="mb-2 flex items-center justify-between flex-shrink-0">
              <h3 className="text-xs font-semibold text-zinc-700">To Do</h3>
              <span className="text-[10px] bg-zinc-200/70 text-zinc-600 font-medium px-1.5 py-0.5 rounded-full">2</span>
            </div>
            <div className="space-y-2 overflow-hidden flex flex-col justify-between h-full">
              <div className="h-12 xl:h-16 rounded-lg bg-white border border-zinc-200/60 p-2 flex flex-col justify-between shadow-sm">
                <div className="w-2/3 h-2 bg-zinc-300 rounded"></div>
                <div className="w-1/2 h-1.5 bg-zinc-100 rounded"></div>
              </div>
              <div className="h-12 xl:h-16 rounded-lg bg-white border border-zinc-200/60 p-2 flex flex-col justify-between shadow-sm">
                <div className="w-3/4 h-2 bg-zinc-300 rounded"></div>
                <div className="w-1/3 h-1.5 bg-zinc-100 rounded"></div>
              </div>
            </div>
          </div>

          {/* Column: Progress */}
          <div className="rounded-xl bg-zinc-50/50 border border-zinc-200/50 p-2 xl:p-3 flex flex-col overflow-hidden">
            <div className="mb-2 flex items-center justify-between flex-shrink-0">
              <h3 className="text-xs font-semibold text-zinc-700">Progress</h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded-full font-medium">1</span>
            </div>
            <div className="space-y-2 overflow-hidden">
              <div className="h-12 xl:h-16 rounded-lg bg-white border border-indigo-200 shadow-sm shadow-indigo-100/40 p-2 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500"></div>
                <div className="w-5/6 h-2 bg-zinc-400 rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="w-1/4 h-1.5 bg-zinc-200 rounded"></div>
                  <div className="w-4 h-4 rounded-full bg-zinc-100 border border-zinc-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column: Done */}
          <div className="rounded-xl bg-zinc-50/50 border border-zinc-200/50 p-2 xl:p-3 flex flex-col overflow-hidden">
            <div className="mb-2 flex items-center justify-between flex-shrink-0">
              <h3 className="text-xs font-semibold text-zinc-700">Done</h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-full font-medium">3</span>
            </div>
            <div className="space-y-2 overflow-hidden">
              <div className="h-12 xl:h-16 rounded-lg bg-zinc-100/50 border border-zinc-200/40 opacity-60 p-2 flex flex-col justify-between">
                <div className="w-11/12 h-2 bg-zinc-300 line-through decoration-zinc-400 rounded"></div>
                <div className="w-1/3 h-1.5 bg-zinc-200 rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Value Proposition Messaging */}
      {/* CHANGED: Swapped absolute margins for responsive padding/flex spacing */}
      <div className="flex-shrink-0 pt-2">
        <h2 className="max-w-md text-2xl xl:text-3xl font-bold tracking-tight leading-tight text-zinc-900">
          Manage your work visually, collaborate seamlessly.
        </h2>

        <p className="mt-2 xl:mt-3 max-w-md text-xs xl:text-sm text-zinc-500 leading-relaxed">
          Organize critical tasks, map development updates, and unite your operations within a beautifully crisp terminal workspace.
        </p>

        <div className="mt-4 xl:mt-6 flex flex-wrap gap-2 xl:gap-3">
          <FeatureCard
            icon={<FiUsers className="text-zinc-500" />}
            title="Collaboration"
          />
          <FeatureCard
            icon={<FiTrendingUp className="text-zinc-500" />}
            title="Track Progress"
          />
          <FeatureCard
            icon={<FiCheckSquare className="text-zinc-500" />}
            title="Stay Organized"
          />
        </div>
      </div>
      
    </div>
  </div>
);
}

export default LoginLeftPanel;