export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-4xl mx-auto border border-zinc-800 p-8 rounded-lg shadow-2xl bg-zinc-950">
        <h1 className="text-3xl font-bold text-blue-500 mb-4 tracking-tighter">
          &gt; CLOUD_GEAR_SYSTEM_v1.0
        </h1>
        <div className="flex gap-4 mb-8">
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/50 text-green-500 text-xs rounded">
            STATUS: ACTIVE
          </div>
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/50 text-blue-500 text-xs rounded">
            ENV: PRODUCTION_READY
          </div>
        </div>
        <p className="text-zinc-400 mb-6">
          Welcome, Engineer. This system is now running on your local machine and Vercel edge network.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-zinc-900 rounded border border-zinc-800">
            <span className="text-zinc-500">Uptime:</span> 99.9%
          </div>
          <div className="p-4 bg-zinc-900 rounded border border-zinc-800">
            <span className="text-zinc-500">Region:</span> Frankfurt (FRA-1)
          </div>
        </div>
      </div>
    </main>
  );
}