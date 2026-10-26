import React, { useState, useEffect } from 'react';
import { X, Flame, CheckCircle, Send, MessageSquare, Phone, User, BookOpen, MapPin } from './Icons';
import { siteData } from '../data/siteData';

export default function RegistrationModal({ isOpen, onClose, initialProgram = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: initialProgram || siteData.programs[0].title,
    workshop: siteData.workshops[0].name,
    experience: 'Belum Ada (Pemula)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const msg = `Halo Tim Matrix Welding School,
Saya ingin mendaftar kursus pelatihan pengelasan:

*Data Calon Peserta:*
• *Nama Lengkap:* ${formData.name || '-'}
• *Nomor WA:* ${formData.phone || '-'}
• *Pilihan Program:* ${formData.program}
• *Lokasi Workshop:* ${formData.workshop}
• *Pengalaman:* ${formData.experience}
• *Catatan / Pertanyaan:* ${formData.notes || '-'}

Mohon informasi jadwal terdekat dan rincian biaya pendaftaran. Terima kasih!`;

    return encodeURIComponent(msg);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const encoded = generateWhatsAppMessage();
    const targetUrl = `${siteData.contacts[0].waUrl}?text=${encoded}`;
    window.open(targetUrl, '_blank');
    setSubmitted(true);
  };

  const handleOnlineSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 rounded-2xl border border-amber-500/40 p-6 sm:p-8 corner-frame shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition-colors"
          aria-label="Tutup form pendaftaran"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase text-white mb-2">
              Pendaftaran Terkirim!
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              Terima kasih <strong className="text-amber-400">{formData.name || 'Anda'}</strong>. Tim CS kami akan segera menghubungi nomor WhatsApp Anda untuk konfirmasi jadwal dan persiapan pelatihan.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`${siteData.contacts[0].waUrl}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buka Chat WA Faizal</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Form Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                  Formulir Pendaftaran
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                Daftar Pelatihan Las
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Isi data diri singkat di bawah untuk reservasi booth dan konsultasi jadwal.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nama Lengkap *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nomor WhatsApp Aktif *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pilihan Program Kursus *</span>
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {siteData.programs.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.code} - {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lokasi Workshop</span>
                  </label>
                  <select
                    name="workshop"
                    value={formData.workshop}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  >
                    {siteData.workshops.map((w) => (
                      <option key={w.id} value={w.name}>
                        {w.name.split('–')[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Pengalaman Las
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Belum Ada (Pemula 100%)">Belum Ada (Pemula)</option>
                    <option value="Dasar / Otodidak">Dasar / Otodidak</option>
                    <option value="Pernah Ikut Kursus">Pernah Ikut Kursus</option>
                    <option value="Pernah Bekerja di Proyek">Pernah Kerja di Proyek</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Catatan / Pertanyaan Tambahan
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Misal: Info penginapan terdekat, cicilan biaya, dll."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading text-base font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  <span>Kirim & Terhubung ke WhatsApp CS</span>
                </button>
                <button
                  type="button"
                  onClick={handleOnlineSubmit}
                  className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Simpan Reservasi Tanpa Buka WhatsApp Langsung
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
