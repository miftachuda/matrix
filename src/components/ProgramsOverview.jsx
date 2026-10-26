import React from 'react';
import { ArrowRight, Flame, CheckCircle, Clock } from './Icons';
import { siteData } from '../data/siteData';

export default function ProgramsOverview({ onOpenRegister }) {
  const handleScrollToDetail = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="program" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117] border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
                Service
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              Program Kami
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Pilihan program pengelasan lengkap dirancang khusus sesuai standar sertifikasi industri nasional & internasional.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={siteData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>{siteData.instagram}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5 Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteData.programs.map((prog) => (
            <div
              key={prog.id}
              className="relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between group corner-frame shadow-xl"
            >
              <div>
                {/* Header with Number Code */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-4xl font-bold text-amber-400/80 group-hover:text-amber-400 transition-colors">
                    {prog.code}
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {prog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program Title */}
                <h4 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-3 group-hover:text-amber-400 transition-colors">
                  {prog.title}
                </h4>

                {/* Program Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {prog.shortDesc}
                </p>

                {/* Duration Badge */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Durasi: <strong className="text-slate-200">{prog.duration}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => handleScrollToDetail(prog.id)}
                  className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Rincian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenRegister(prog.title)}
                  className="py-2.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-md shadow-amber-500/20"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Daftar</span>
                </button>
              </div>
            </div>
          ))}

          {/* Quick Consultation Promo Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 p-6 flex flex-col justify-between corner-frame shadow-xl">
            <div>
              <span className="font-heading text-xs font-bold tracking-widest uppercase text-amber-400 block mb-2">
                Bingung Memilih Program?
              </span>
              <h4 className="font-heading text-2xl font-bold uppercase text-white mb-3">
                Konsultasi Gratis dengan Mentor
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Diskusikan latar belakang dan target karir Anda. Tim instruktur kami siap merekomendasikan program kursus las yang paling tepat dan cepat mengantar Anda siap kerja!
              </p>
            </div>
            <a
              href={siteData.contacts[0].waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center text-sm font-heading font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Chat WhatsApp Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
