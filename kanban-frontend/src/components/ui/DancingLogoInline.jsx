import React from 'react';

function DancingLogoInline() {

const fontMonoStack = "font-['Geist_Mono','SF_Mono',Cascadia_Code,Consolas,monospace]";

  return (
    <div className={`flex items-center gap-1.5 select-none cursor-pointer py-2 ${fontMonoStack}`}>
      
      <style>{`
        /* 1. "m" stays grounded but shakes from the impact force */
        @keyframes anchorM {
          0%, 18% { transform: translateX(0); }
          25% { transform: translateX(-1px); } /* Slight recoil backward */
          28% { transform: translateX(1px); }  /* Impact shudder */
          32%, 100% { transform: translateX(0); }
        }

        /* 2. THE KICKER: "v" pulls back away from "m" (widening the gap), then slams forward */
        @keyframes kickerV {
          0%, 15% { transform: translateX(0); }
          22% { transform: translateX(6px); }  /* Wind-up: Pulling back toward the semicolon */
          27% { transform: translateX(-4px); } /* THE KICK: Slams forward past its starting point into ";" */
          35%, 65% { transform: translateX(0); } /* Reset to normal rest position */
          75% { transform: translateX(1px); }   /* Catching the return of the semicolon */
          85%, 100% { transform: translateX(0); }
        }

        /* 3. THE PAYLOAD: Semicolon waiting, getting punched, and flying away */
        @keyframes punchedSemi {
          0%, 22% { transform: translateX(0) scale(1); opacity: 1; }
          26% { transform: translateX(4px) scale(1.1); opacity: 1; }  /* Micro-second of impact compression */
          32%, 65% { transform: translateX(28px) scale(0.8); opacity: 0; } /* Launched across the gap */
          85%, 100% { transform: translateX(0) scale(1); opacity: 1; }     /* Returns home */
        }

        /* 4. Semicolon landing smoothly at the destination text */
        @keyframes arriveAtDone {
          0%, 28% { transform: translateX(-15px); opacity: 0; }
          38%, 55% { transform: translateX(0); opacity: 1; }
          68%, 100% { transform: translateX(15px); opacity: 0; }
        }

        /* 5. Checkmark confirmation */
        @keyframes revealCheckmark {
          0%, 55% { transform: scale(0.5); opacity: 0; }
          68%, 85% { transform: scale(1); opacity: 1; }
          95%, 100% { transform: scale(0.5); opacity: 0; }
        }
        
        .animate-letter-m { animation: anchorM 4s ease-in-out infinite; }
        .animate-letter-v { animation: kickerV 4s cubic-bezier(0.25, 1, 0.5, 1) infinite; }
        .animate-mv-semi  { animation: punchedSemi 4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
        .animate-done-semi { animation: arriveAtDone 4s ease-in-out infinite; }
        .animate-checkmark { animation: revealCheckmark 4s ease-in-out infinite; }
      `}</style>

      {/* 1. The Dynamic Gradient Badge Container */}
      <div className="relative flex h-7 w-[44px] items-center justify-start pl-2 rounded-md bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-md pointer-events-none" />

        {/* Separated letters acting as mechanical components */}
        <div className="flex items-center gap-[2px]">
          <span className="text-[10px] font-bold uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] animate-letter-m">
            m
          </span>
          <span className="text-[10px] font-bold uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] animate-letter-v">
            v
          </span>
        </div>
        
        {/* Semicolon waiting inside the launch pad */}
        <span className="absolute right-1.5 text-xs font-black text-fuchsia-100 drop-shadow-sm animate-mv-semi">
          ;
        </span>
      </div>
      
      {/* 2. Right Destination Container ("done" text) */}
      <h1 className="text-sm font-semibold tracking-tight text-back lowercase flex items-center relative pl-1">
        <span className="text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text">
          done
        </span>

        {/* Target bay for transitions */}
        <div className="relative w-4 h-4 flex items-center justify-start ml-1">
          
          {/* Semicolon catching the velocity */}
          <span className="absolute left-0 text-xs font-bold text-fuchsia-400 animate-done-semi">
            ;
          </span>

          {/* Verification checkmark icon */}
          <svg 
            className="absolute left-0.5 w-3.5 h-3.5 text-emerald-400 stroke-[3.5] filter drop-shadow-[0_0_6px_rgba(52,211,153,0.4)] animate-checkmark" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

        </div>
      </h1>
    </div>
  );
}
export default DancingLogoInline;