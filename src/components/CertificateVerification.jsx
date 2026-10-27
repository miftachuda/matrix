import React, { useState, useEffect } from 'react';
import { pb } from '../services/pocketbase';
import CertificateDocument from './certificate/CertificateDocument';
import {
  Search,
  Award,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Flame,
  X
} from './Icons';

export default function CertificateVerification({ initialCode = '' }) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFullDoc, setShowFullDoc] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-search if initialCode or URL parameter ?verify= is present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const verifyParam = urlParams.get('verify') || initialCode;
    if (verifyParam) {
      setCode(verifyParam);
      handleSearch(verifyParam);
    }
  }, [initialCode]);

  const handleSearch = async (searchCode) => {
    const targetCode = (searchCode || code || '').trim();
    if (!targetCode) return;

    setLoading(true);
    setHasSearched(true);
    setResult(null);

    try {
      const cert = await pb.getCertificateByCode(targetCode);
      setResult(cert);
      if (cert) {
        // Update URL query param cleanly without reloading
        const newUrl = `${window.location.pathname}?verify=${encodeURIComponent(cert.code)}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!result) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://matrix.loc-2.com';
    const link = `${origin}/?verify=${encodeURIComponent(result.code)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="verifikasi" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f17] border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              Verifikasi Online Resmi
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Cek Keaslian Sertifikat
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Validasi sertifikat pelatihan dan kompetensi las Matrix Welding School Cilacap secara langsung melalui sistem database terintegrasi.
          </p>
        </div>

        {/* Search Bar Card */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 corner-frame shadow-2xl mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(code);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Masukkan Nomor Seri Sertifikat (contoh: MWS-2026-6G-4819)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono uppercase tracking-wider focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading text-base font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>{loading ? 'Memeriksa...' : 'Cek Sertifikat'}</span>
            </button>
          </form>

          {/* Quick Sample Links */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Contoh Kode Tes:</span>
            <button
              type="button"
              onClick={() => {
                setCode('MWS-2026-6G-4819');
                handleSearch('MWS-2026-6G-4819');
              }}
              className="font-mono text-amber-400 hover:underline px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
            >
              MWS-2026-6G-4819
            </button>
            <button
              type="button"
              onClick={() => {
                setCode('MWS-2026-GTAW-1092');
                handleSearch('MWS-2026-GTAW-1092');
              }}
              className="font-mono text-amber-400 hover:underline px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
            >
              MWS-2026-GTAW-1092
            </button>
            <button
              type="button"
              onClick={() => {
                setCode('MWS-2026-FCAW-7731');
                handleSearch('MWS-2026-FCAW-7731');
              }}
              className="font-mono text-amber-400 hover:underline px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
            >
              MWS-2026-FCAW-7731
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="animate-in fade-in duration-300">
            {result ? (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 corner-frame shadow-2xl">
                {/* Result Header Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          ✓ Asli & Terverifikasi
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: {result.code}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-white mt-1">
                        {result.participant_name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFullDoc(true)}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Printer className="w-4 h-4 text-slate-950" />
                      <span>Buka & Cetak Sertifikat</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                      title="Salin Link Hasil Verifikasi"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                    </button>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Program Pelatihan
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {result.program_name}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Kualifikasi / Predikat
                    </span>
                    <p className="text-sm font-semibold text-emerald-400">
                      {result.grade || 'Sangat Kompeten'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Standar Acuan
                    </span>
                    <p className="text-sm font-semibold text-amber-300">
                      {result.standards || 'ASME Section IX & AWS D1.1'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Tanggal Terbit
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      {result.issue_date}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Instruktur Penguji
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      {result.instructor_name}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Lokasi Pelatihan
                    </span>
                    <p className="text-sm font-semibold text-slate-200 truncate">
                      {result.workshop_location}
                    </p>
                  </div>
                </div>

                {/* Inline Certificate Preview */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-300">
                      Tampilan Dokumen Sertifikat Digital
                    </span>
                    <button
                      onClick={() => setShowFullDoc(true)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Layar Penuh</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto pb-4">
                    <div className="min-w-[640px]">
                      <CertificateDocument cert={result} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-8 corner-frame text-center max-w-xl mx-auto shadow-xl">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white mb-2">
                  Sertifikat Tidak Ditemukan
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Nomor registrasi <strong className="text-amber-400 font-mono">{code}</strong> tidak terdaftar dalam database resmi Matrix Welding School. Pastikan penulisan kode sudah sesuai (contoh: <code className="text-amber-400 font-mono">MWS-2026-6G-4819</code>).
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setCode('');
                      setHasSearched(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Coba Cari Ulang
                  </button>
                  <a
                    href="https://wa.me/6285747117407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Konfirmasi ke CS</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full Document View Modal */}
      {showFullDoc && result && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowFullDoc(false)}
        >
          <div
            className="w-full max-w-5xl bg-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  Sertifikat: {result.code}
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4 text-slate-950" />
                  <span>Cetak / Cetak PDF</span>
                </button>
                <button
                  onClick={() => setShowFullDoc(false)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px]">
                <CertificateDocument cert={result} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
