import React, { useState, useEffect } from 'react';
import { pb } from '../../services/pocketbase';
import CertificateDocument from '../certificate/CertificateDocument';
import {
  FileText,
  Search,
  Printer,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Award,
  RefreshCw,
  X
} from '../Icons';

export default function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await pb.getCertificates(search);
      setCertificates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const handleDelete = async (id, code, name) => {
    if (confirm(`Hapus sertifikat ${code} atas nama ${name}?`)) {
      await pb.deleteCertificate(id);
      await loadData();
    }
  };

  const handleCopyLink = (code) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://matrix.loc-2.com';
    const url = `${origin}/?verify=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Daftar Sertifikat Terbit (Koleksi matrix)</span>
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Total {certificates.length} sertifikat tersimpan di database Matrix Welding School.
          </p>
        </div>

        <button
          onClick={loadData}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari kode (MWS-...), nama peserta, atau program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl corner-frame">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 font-heading uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Registrasi</th>
                <th className="py-3 px-4">Nama Peserta</th>
                <th className="py-3 px-4">Program Las</th>
                <th className="py-3 px-4">Tanggal Terbit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-500">
                    {loading ? 'Memuat sertifikat...' : 'Belum ada data sertifikat.'}
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {cert.code}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {cert.participant_name}
                      {cert.participant_id && (
                        <span className="block text-[10px] text-slate-400 font-mono">
                          ID: {cert.participant_id}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs">
                      <span className="font-semibold">{cert.program_name}</span>
                      <span className="block text-[10px] text-slate-500">{cert.standards}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {cert.issue_date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {cert.status || 'Valid'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCert(cert)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                          title="Lihat & Cetak Sertifikat"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyLink(cert.code)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="Salin Link Verifikasi"
                        >
                          {copiedCode === cert.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <a
                          href={`/?verify=${encodeURIComponent(cert.code)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="Buka Halaman Verifikasi"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(cert.id, cert.code, cert.participant_name)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                          title="Hapus Sertifikat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Preview & Print Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="w-full max-w-5xl bg-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  Sertifikat: {selectedCert.code}
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
                  onClick={() => setSelectedCert(null)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px]">
                <CertificateDocument cert={selectedCert} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
