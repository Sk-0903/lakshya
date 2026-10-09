import React from 'react';
import { Sparkles, Terminal, Code2, Rocket } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans selection:bg-cyan-500/20">
      {/* Background ambient gradient glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <header className="flex items-center justify-between z-10 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-slate-100">Lakshya '26</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Fresh React Canvas
        </div>
      </header>

      {/* Hero / Blank Slate Hub */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 my-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 mb-8 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>src/App.tsx &bull; Clean Slate Ready</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Ready to build <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            from scratch.
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          The old monolithic website has been completely cleared. You now have a clean React 19 + Tailwind CSS canvas ready for whatever structure, components, and animations you want to build.
        </p>

        {/* Quick action / starter modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg text-left">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center gap-2.5 text-cyan-400 font-medium text-sm mb-1">
              <Code2 className="w-4 h-4" />
              <span>Tailwind &amp; React</span>
            </div>
            <p className="text-xs text-slate-400">
              Full modern utility classes, Lucide icons, and Motion ready to import.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center gap-2.5 text-sky-400 font-medium text-sm mb-1">
              <Rocket className="w-4 h-4" />
              <span>Safety Backup</span>
            </div>
            <p className="text-xs text-slate-400">
              The previous site state is safely saved in the <code className="text-slate-300">backup/previous-design</code> branch.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 text-center text-xs text-slate-400 font-mono">
        Edit <code className="text-cyan-400 font-semibold">src/App.tsx</code> to begin crafting your new layout.
      </footer>
    </div>
  );
}
