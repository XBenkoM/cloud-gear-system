'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME NAČÍTAVANIE DÁT
  useEffect(() => {
    const q = query(collection(db, 'system_logs'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(data);
      setLoading(false);
    }, (error) => {
      console.error("Firebase error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. FUNKCIA NA ODOSLANIE EVENTU
  const sendStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'system_logs'), {
        action: message.toUpperCase(),
        status: "OK",
        time: new Date().toLocaleTimeString(),
        timestamp: serverTimestamp()
      });
      setMessage(''); // Vyčistiť input
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Chyba pri zápise do DB. Skontroluj Environment Variables vo Verceli!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header - System Banner */}
        <header className="border border-slate-800 bg-slate-900/50 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              CLOUD<span className="text-blue-500 underline decoration-2 underline-offset-4">GEAR</span> OS
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Environment: Production // Cluster: Vercel-Edge</p>
          </div>

          {/* Form na pridávanie logov */}
          <form onSubmit={sendStatus} className="flex gap-2 w-full md:w-auto">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Zadaj názov udalosti..."
              className="bg-slate-950 border border-slate-700 px-3 py-2 rounded text-xs focus:outline-none focus:border-blue-500 flex-1 md:w-64 text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              LOG_EVENT
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Monitor - Stats */}
          <section className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">Total Events</p>
                <p className="text-3xl font-bold text-white">{logs.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">DB Connection</p>
                <p className="text-3xl font-bold text-green-400">LIVE</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800 uppercase tracking-widest text-slate-400">
                Infrastructure Status
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800 hover:border-blue-500/30 transition-colors">
                  <span className="text-sm">Firebase Firestore</span>
                  <span className="text-blue-400 text-[10px] font-bold border border-blue-400/30 px-2 py-0.5 rounded">CONNECTED</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800 hover:border-blue-500/30 transition-colors">
                  <span className="text-sm">Vercel Edge Functions</span>
                  <span className="text-blue-400 text-[10px] font-bold border border-blue-400/30 px-2 py-0.5 rounded">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar - Real-time Build Log */}
          <aside className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col shadow-xl max-h-[500px] overflow-hidden">
            <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800 flex justify-between">
              <span>REAL_TIME_LOGS</span>
              <span className="animate-pulse text-green-500">●</span>
            </div>
            <div className="p-4 flex-1 space-y-4 text-[10px] overflow-y-auto">
              {loading ? (
                <p className="text-slate-600 animate-pulse italic">Connecting to cloud...</p>
              ) : logs.length === 0 ? (
                <p className="text-slate-600 italic">No events recorded yet.</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="border-l-2 border-blue-500 pl-3 py-1 bg-blue-500/5 rounded-r">
                    <div className="flex justify-between mb-1">
                      <span className="text-blue-500 font-bold tracking-tighter">[{log.status || 'OK'}]</span>
                      <span className="text-slate-600 italic">{log.time}</span>
                    </div>
                    <p className="text-slate-300 font-semibold break-all">{log.action}</p>
                  </div>
                ))
              )}
              <div className="pt-2 text-slate-700 font-bold tracking-widest text-[9px]">
                _ END_OF_STREAM
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