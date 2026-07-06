import React from 'react';

function LoadingSpinner() {
  const fontMonoStack = "font-['Geist_Mono','SF_Mono',Cascadia_Code,Consolas,monospace]";

  return (
    <div className="flex flex-col items-center justify-center py-14 select-none">
      {/* 🛠️ Local Central-Breathing & Orbit Physics Engine */}
      <style>{`
        /* 1. Global continuous orbital ring rotation */
        @keyframes orbitalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* 2. THE RESPIRATION LOOP: Pulls nodes toward the center while expanding stroke thickness */
        @keyframes tailBreathingSwell {
          0%, 100% { 
            stroke-width: 80;
            transform: scale(1.0); /* At maximum diameter layout */
          }
          50% { 
            stroke-width: 13.5;
            transform: scale(0.65); /* Pulsing/collapsing inward toward absolute center */
          }
        }

        /* 3. Ball synchronization matching the exact scale collapse and brightness surge */
        @keyframes nodeBreathingSwell {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0));
            transform: var(--base-transform) translate(0, 0); /* Outer resting boundary */
          }
          50% { 
            filter: brightness(1.35) drop-shadow(0 0 14px var(--glow-color));
            transform: var(--base-transform) translate(var(--move-x), var(--move-y)); /* Pulled toward center */
          }
        }
        
        .animate-orbit-ring {
          animation: orbitalSpin 2s linear infinite;
        }

        .animate-tail-breath {
          animation: tailBreathingSwell 1.8s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-node-breath {
          animation: nodeBreathingSwell 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* The Central Comet Engine Wrapper */}
      <div className="relative w-16 h-16 animate-orbit-ring">
        
        {/* SVG Container holding the 4 separate breathing comet paths */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 animate-tail-breath" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="indigo-tail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="60%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="violet-tail" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fuchsia-tail" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="1" />
              <stop offset="60%" stopColor="#d946ef" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="emerald-tail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d="M 50 10 A 40 40 0 0 1 78 22" fill="none" stroke="url(#indigo-tail)" strokeLinecap="round" />
          <path d="M 90 50 A 40 40 0 0 1 78 78" fill="none" stroke="url(#violet-tail)" strokeLinecap="round" />
          <path d="M 50 90 A 40 40 0 0 1 22 78" fill="none" stroke="url(#fuchsia-tail)" strokeLinecap="round" />
          <path d="M 10 50 A 40 40 0 0 1 22 22" fill="none" stroke="url(#emerald-tail)" strokeLinecap="round" />
        </svg>

        
        
        {/* Node 1: Indigo (Pulls DOWN toward center) */}
        <div 
          style={{ 
            '--glow-color': 'rgba(99, 102, 241, 0.75)',
            '--base-transform': 'translate(-50%, -50%)',
            '--move-x': '0px',
            '--move-y': '11px'
          }}
          className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border border-indigo-300/10 animate-node-breath"
        />
        
        {/* Node 2: Violet (Pulls LEFT toward center) */}
        <div 
          style={{ 
            '--glow-color': 'rgba(139, 92, 246, 0.75)',
            '--base-transform': 'translate(50%, -50%)',
            '--move-x': '-11px',
            '--move-y': '0px'
          }}
          className="absolute right-0 top-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border border-violet-300/10 animate-node-breath"
        />
        
        {/* Node 3: Fuchsia (Pulls UP toward center) */}
        <div 
          style={{ 
            '--glow-color': 'rgba(217, 70, 239, 0.75)',
            '--base-transform': 'translate(-50%, 50%)',
            '--move-x': '0px',
            '--move-y': '-11px'
          }}
          className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 border border-fuchsia-300/10 animate-node-breath"
        />
        
        {/* Node 4: Emerald (Pulls RIGHT toward center) */}
        <div 
          style={{ 
            '--glow-color': 'rgba(16, 185, 129, 0.75)',
            '--base-transform': 'translate(-50%, -50%)',
            '--move-x': '11px',
            '--move-y': '0px'
          }}
          className="absolute left-0 top-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-300/10 animate-node-breath"
        />
        
      </div>

      {/* Synchronized Terminal Subtext */}
      <div className={`mt-8 flex flex-col items-center gap-1 ${fontMonoStack}`}>
        <style>{`
          @keyframes dotDance {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); } /* Sways up slightly */
          }

          .animate-dot-1 { animation: dotDance 0.8s ease-in-out infinite; animation-delay: 0s; }
          .animate-dot-2 { animation: dotDance 0.8s ease-in-out infinite; animation-delay: 0.15s; }
          .animate-dot-3 { animation: dotDance 0.8s ease-in-out infinite; animation-delay: 0.3s; }
        `}</style>

        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-400 animate-pulse">
          Loading Workspace
        </span>
        
        {/* The Text Container with isolated dancing dots */}
        <span className="text-[9px] tracking-wider text-zinc-600 lowercase font-medium flex items-center">
          assembling pipeline nodes
          <span className="inline-block animate-dot-1 ml-[1px]">.</span>
          <span className="inline-block animate-dot-2 ml-[1px]">.</span>
          <span className="inline-block animate-dot-3 ml-[1px]">.</span>
        </span>
      </div>
    </div>
  );
}

export default LoadingSpinner;