import React, { useState, useEffect } from 'react';
import { pb } from '../../services/pocketbase';
import { Settings, RefreshCw, Check, AlertCircle, ExternalLink, ShieldCheck } from '../Icons';

export default function PocketBaseSettings() {
  const [pbUrl, setPbUrl] = useState(pb.getBaseUrl());
  const [healthStatus, setHealthStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [saved, setSaved] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    const result = await pb.checkHealth();
    setHealthStatus(result);
    setChecking(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleSaveUrl = (e) => {
    e.preventDefault();
    pb.setBaseUrl(pbUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    checkConnection();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" />
          <span>Pengaturan & Status PocketBase</span>
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Konfigurasi koneksi backend PocketBase untuk koleksi <strong className="text-amber-400">matrix</strong> dan autentikasi user.
        </p>
      </div>

      {/* Connection Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 corner-frame space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-base font-bold uppercase text-white tracking-wider">
            Status Server Backend
          </h4>
          <button
            onClick={checkConnection}
            disabled={checking}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Memeriksa...' : 'Uji Koneksi'}</span>
          </button>
        </div>

        {healthStatus && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              healthStatus.online
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}
          >
            {healthStatus.online ? (
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm">
              <p className="font-bold">
                {healthStatus.online
                  ? 'Terhubung ke PocketBase: ' + healthStatus.url
                  : 'Mode Sinkronisasi Aktif (PocketBase: ' + healthStatus.url + ')'}
              </p>
              <p className="text-xs opacity-80 mt-0.5">
                {healthStatus.message}
              </p>
            </div>
          </div>
        )}

        {/* Change URL form */}
        <form onSubmit={handleSaveUrl} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              PocketBase Endpoint URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={pbUrl}
                onChange={(e) => setPbUrl(e.target.value)}
                placeholder="https://base.loc-2.com"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                {saved ? 'Tersimpan!' : 'Simpan'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Default: <code className="text-amber-400 font-mono">https://base.loc-2.com</code>
            </p>
          </div>
        </form>
      </div>

      {/* Schema Information */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 corner-frame space-y-4">
        <h4 className="font-heading text-base font-bold uppercase text-white tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Skema Koleksi PocketBase "matrix"</span>
        </h4>
        <p className="text-xs text-slate-300">
          Field skema yang digunakan untuk menyimpan sertifikat di tabel <strong className="text-amber-400 font-mono">matrix</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">code</span>: Plain Text (Unique Certificate Code)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">participant_name</span>: Plain Text (Full Name)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">participant_id</span>: Plain Text (NIK/ID)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">program_name</span>: Plain Text (Welding Course)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">issue_date</span>: Date / Plain Text (YYYY-MM-DD)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">expiry_date</span>: Date / Plain Text
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">grade</span>: Plain Text (Qualification Grade)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">instructor_name</span>: Plain Text (Inspector)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">standards</span>: Plain Text (ASME / AWS)
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400">status</span>: Plain Text (Valid / Pending)
          </div>
        </div>

        <div className="pt-2">
          <a
            href="https://base.loc-2.com/_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:underline"
          >
            <span>Buka PocketBase Admin UI (base.loc-2.com/_/)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
