'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);

  // Reálny čas: Načítavame logy z Firebase Firestore
  useEffect(() => {
    // Vytvoríme query na kolekciu 'system_logs' zoradenú podľa času
    const q = query(collection(db, 'system_logs'), orderBy('time', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(data);
    });

    return () => unsubscribe(); // Clean up pri zatvorení stránky
  }, []);

  // Funkcia na odoslanie testovacieho pingu
  const sendPing = async () => {
    try {
      await addDoc(collection(db, 'system_logs'), {
        action: "MANUAL_PING_TEST",
        status: "OK",
        time: "Just now", // V reálnej appke by si použil serverTimestamp()
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Chyba pri zápise! Skontroloval si Firestore Rules?");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <header className="border border-slate-800 bg-slate-900/50 p-6 rounded-xl flex justify-between items-center shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              CLOUD<span className="text-blue-500 underline decoration-2 underline-offset-4">GEAR</span> OS
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Environment: Dev // Cluster: Local-Mac</p>
          </div>
          <button
            onClick={sendPing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            SEND_PING
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Stats Section */}
          <section className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">Live Events</p>
                <p className="text-3xl font-bold text-white">{logs.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-500 text-xs uppercase mb-1">DB Connection</p>
                <p className="text-3xl font-bold text-green-400 font-mono">LIVE</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800 uppercase">
                Infrastructure Status
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                  <span>Firebase Firestore (DB)</span>
                  <span className="text-blue-400 text-xs font-bold tracking-widest">CONNECTED</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                  <span>Deployment Pipeline</span>
                  <span className="text-blue-400 text-xs font-bold tracking-widest">READY</span>
                </div>
              </div>
            </div>
          </section>

          {/* Real-time Logs Sidebar */}
          <aside className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col shadow-xl overflow-hidden">
            <div className="bg-slate-800/50 px-4 py-2 text-xs font-bold border-b border-slate-800">
              REAL_TIME_LOGS
            </div>
            <div className="p-4 flex-1 space-y-4 text-[10px] max-h-[400px] overflow-y-auto">
              {logs.length === 0 && <p className="text-slate-600">No logs found in Firestore...</p>}
              {logs.map((log) => (
                <div key={log.id} className="border-l-2 border-blue-500 pl-3 py-1 bg-slate-800/20">
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-500 font-bold">[{log.status || 'INFO'}]</span>
                    <span className="text-slate-600 italic text-[9px]">{log.time}</span>
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

        <footer className="text-center text-[10px] text-slate-600 pt-4 uppercase tracking-[0.2em]">
          Cloud-Gear-System // Firebase Sync Active // 2026
        </footer>
      </div>
    </main>
  );
}