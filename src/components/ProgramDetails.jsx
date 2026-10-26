import React from 'react';
import { Flame, Clock, CheckCircle2, ArrowRight, ShieldCheck, Wrench } from './Icons';
import { siteData } from '../data/siteData';

export default function ProgramDetails({ onOpenRegister }) {
  const getWaUrlForProgram = (programTitle) => {
    const text = encodeURIComponent(
      `Halo Matrix Welding School, saya ingin mendaftar / konsultasi mengenai program pelatihan: *${programTitle}*. Mohon info biaya dan jadwal terdekat.`
    );
    return `${siteData.contacts[0].waUrl}?text=${text}`;
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117] border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              Services
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Rincian Program Kami
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Pelajari setiap spesifikasi teknik pengelasan, durasi, kualifikasi posisi, dan prospek karir di industri manufaktur & migas.
          </p>
        </div>

        {/* Detailed Program Cards with Exact Anchor IDs 01, 02, 03, 04, 05 */}
        <div className="space-y-12">
          {siteData.programs.map((prog) => (
            <div
              key={prog.id}
              id={prog.id}
              className="scroll-mt-28 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all p-6 sm:p-10 corner-frame shadow-2xl group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Image & Preview (5 cols) */}
                <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 h-64 sm:h-80 group/img">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Number & Process Tag */}
                  <div className="absolute top-4 left-4 font-heading text-5xl font-bold text-amber-400/90 drop-shadow-md">
                    {prog.code}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-1">
                      {prog.process}
                    </span>
                    <p className="text-xs text-slate-300 font-medium">
                      Level: {prog.level}
                    </p>
                  </div>
                </div>

                {/* Details (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Tags row */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {prog.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{prog.duration}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wide mb-4 group-hover:text-amber-400 transition-colors">
                      {prog.title}
                    </h3>

                    {/* Detailed Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {prog.fullDesc}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Booth & Mesin Las Individu</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Bimbingan Privat Sampai Bisa</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Sertifikat Kelulusan Resmi</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Bahan & Elektroda Disediakan</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => onOpenRegister(prog.title)}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-2"
                    >
                      <Flame className="w-4 h-4 text-slate-950" />
                      <span>Daftar Program Ini</span>
                    </button>
                    <a
                      href={getWaUrlForProgram(prog.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                    >
                      <span>Tanya Jadwal via WA</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
