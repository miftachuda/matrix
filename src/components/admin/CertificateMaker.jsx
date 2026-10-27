import React, { useState } from 'react';
import CertificateDocument from '../certificate/CertificateDocument';
import { pb } from '../../services/pocketbase';
import { siteData } from '../../data/siteData';
import {
  Flame,
  Award,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Send,
  ExternalLink,
  AlertCircle
} from '../Icons';

export default function CertificateMaker({ onCreated }) {
  const today = new Date().toISOString().split('T')[0];
  const threeYearsLater = new Date();
  threeYearsLater.setFullYear(threeYearsLater.getFullYear() + 3);
  const defaultExpiry = threeYearsLater.toISOString().split('T')[0];

  const generateCode = (progCode = '6G') => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `MWS-${year}-${progCode}-${rand}`;
  };

  const [formData, setFormData] = useState({
    code: generateCode('6G'),
    participant_name: '',
    participant_id: '',
    program_code: '02',
    program_name: '1G Plate – 6G Pipe SMAW',
    issue_date: today,
    expiry_date: defaultExpiry,
    grade: 'Sangat Kompeten (Distinction)',
    instructor_name: 'Faizal, S.T. (Senior Welding Inspector)',
    workshop_location: 'Workshop 1 – Cilacap Tengah',
    standards: 'ASME Section IX & AWS D1.1',
    qualification_range: 'All Positions (1G - 6G Pipe & Plate)',
    notes: 'Lulus uji visual test (VT) dan bending test 180° tanpa defect.',
    status: 'Valid'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleProgramChange = (e) => {
    const progCode = e.target.value;
    const selected = siteData.programs.find((p) => p.code === progCode);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        program_code: selected.code,
        program_name: selected.title,
        code: generateCode(selected.code)
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegenerateCode = () => {
    setFormData((prev) => ({
      ...prev,
      code: generateCode(prev.program_code || '6G')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.participant_name.trim()) {
      alert('Nama peserta wajib diisi!');
      return;
    }

    setLoading(true);
    setSuccessMsg(null);

    try {
      const res = await pb.createCertificate(formData);
      setSuccessMsg({
        text: `Sertifikat ${formData.code} untuk ${formData.participant_name} berhasil dibuat!`,
        savedToPocketBase: res.savedToPocketBase,
        code: formData.code
      });

      if (onCreated) {
        onCreated(res.data);
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan sertifikat: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://matrix.loc-2.com';
    const link = `${origin}/?verify=${encodeURIComponent(formData.code)}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Status */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 corner-frame">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Online Certificate Maker</span>
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide">
              Pembuat Sertifikat Resmi MWS
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Data sertifikat otomatis disimpan ke PocketBase (koleksi: <strong className="text-amber-400">matrix</strong> di <strong className="text-amber-400">base.loc-2.com</strong>) dan dilengkapi barcode & QR code verifikasi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">{successMsg.text}</p>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {successMsg.savedToPocketBase
                  ? '✓ Tersimpan langsung ke PocketBase live collection "matrix".'
                  : '✓ Tersimpan di cache tersinkronisasi (akan otomatis tersinkron saat terhubung ke base.loc-2.com).'}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`/?verify=${encodeURIComponent(successMsg.code)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-300 font-bold hover:underline"
                >
                  <span>Buka Halaman Verifikasi Publik</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 corner-frame">
          <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Formulir Data Sertifikat</span>
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Unique Code */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Kode Sertifikat Unik *
                </label>
                <button
                  type="button"
                  onClick={handleRegenerateCode}
                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Acak Kode Baru</span>
                </button>
              </div>
              <input
                type="text"
                name="code"
                required
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-sm uppercase tracking-wider focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Participant Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Nama Lengkap Peserta *
              </label>
              <input
                type="text"
                name="participant_name"
                required
                placeholder="Contoh: Ahmad Rizki Pratama"
                value={formData.participant_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* NIK / ID */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                NIK / No. Induk KTP
              </label>
              <input
                type="text"
                name="participant_id"
                placeholder="Contoh: 3301011504980003"
                value={formData.participant_id}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Program Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Program Pelatihan Las *
              </label>
              <select
                name="program_code"
                value={formData.program_code}
                onChange={handleProgramChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                {siteData.programs.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.code} - {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Tanggal Terbit
                </label>
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Berlaku Sampai
                </label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Grade & Instructor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Predikat / Nilai
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Sangat Kompeten (Distinction)">Sangat Kompeten (Distinction)</option>
                  <option value="Kompeten (Pass)">Kompeten (Pass)</option>
                  <option value="Memuaskan (Good)">Memuaskan (Good)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Instruktur Verifikator
                </label>
                <select
                  name="instructor_name"
                  value={formData.instructor_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Faizal, S.T. (Senior Welding Inspector)">Faizal, S.T.</option>
                  <option value="Bangun Prasetyo (GTAW Specialist)">Bangun Prasetyo</option>
                  <option value="Tim Instruktur Senior MWS">Tim Instruktur MWS</option>
                </select>
              </div>
            </div>

            {/* Workshop & Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Workshop Lokasi
                </label>
                <select
                  name="workshop_location"
                  value={formData.workshop_location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  {siteData.workshops.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Standar Acuan
                </label>
                <input
                  type="text"
                  name="standards"
                  value={formData.standards}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Qualification range */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Lingkup Kualifikasi / Catatan Uji
              </label>
              <input
                type="text"
                name="qualification_range"
                value={formData.qualification_range}
                onChange={handleChange}
                placeholder="Contoh: All Positions 1G - 6G Pipe / Plate"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading text-base font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>{loading ? 'Menyimpan...' : 'Simpan Sertifikat ke PocketBase'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Certificate Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Pratinjau Langsung (Live Preview)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-xs text-amber-400 font-mono">{formData.code}</span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[640px]">
              <CertificateDocument cert={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
