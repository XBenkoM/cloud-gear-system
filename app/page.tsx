import Image from "next/image";

export default function Home() {
  // Simulované dáta pre náš dashboard
  const logs = [
    { id: 1, action: "BUILD_SUCCESS", time: "2 min ago", status: "OK" },
    { id: 2, action: "GIT_PUSH_DEVELOP", time: "5 min ago", status: "INFO" },
    { id: 3, action: "FIREBASE_SYNC", time: "12 min ago", status: "OK" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header - System Banner */}
        <header className="border border-slate-800 bg-slate-900/50 p-6 rounded-xl flex justify-between items-center shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              CLOUD<span className="text-blue-500 underline decoration-2 underline-offset-4">GEAR</span> OS
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Environment: Production // Cluster: Vercel-Edge</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            <span className="text-xs font-bold text-green-500">SYSTEM_UP_24/7</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Monitor - Stats */}
          <section className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">Total Deployments</p>
                <p className="text-3xl font-bold text-white">128</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">Avg. Build Time</p>
                <p className="text-3xl font-bold text-blue-400">42s</p>
              </div>
            </div>

            {/* Feature Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800">
                ACTIVE_SERVICES
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                  <span>Firebase Firestore</span>
                  <span className="text-blue-400 text-xs font-bold">CONNECTED</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                  <span>Vercel Edge Functions</span>
                  <span className="text-blue-400 text-xs font-bold">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar - Build Log */}
          <aside className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col shadow-xl">
            <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800">
              REAL_TIME_LOGS
            </div>
            <div className="p-4 flex-1 space-y-4 text-[10px]">
              {logs.map((log) => (
                <div key={log.id} className="border-l-2 border-slate-700 pl-3 py-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-500 font-bold tracking-tighter">[{log.status}]</span>
                    <span className="text-slate-600 italic">{log.time}</span>
                  </div>
                  <p className="text-slate-300 font-semibold">{log.action}</p>
                </div>
              ))}
              <div className="pt-4 text-slate-600 animate-pulse font-bold">
                _ AWAITING_NEW_EVENT...
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="text-center text-[10px] text-slate-600 pt-4 uppercase tracking-[0.2em]">
          Cloud-Gear-System // Secure Infrastructure Dashboard // 2026
        </footer>
      </div>
    </main>
  );
}