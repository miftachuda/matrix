import React, { useState } from 'react';
import { Play, CheckCircle2, Target, Eye, MessageSquare, ArrowRight, ShieldCheck } from './Icons';
import { siteData } from '../data/siteData';

export default function About({ onOpenVideo, onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('visi');

  return (
    <section id="tentangkami" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f17] overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              {siteData.about.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-6">
            {siteData.about.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {siteData.about.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Visi Misi & Key Features (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Visi Misi Tabs Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 corner-frame shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  <span>Visi & Misi Lembaga</span>
                </h3>

                {/* Tab Switcher */}
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('visi')}
                    className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                      activeTab === 'visi'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    VISI
                  </button>
                  <button
                    onClick={() => setActiveTab('misi')}
                    className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                      activeTab === 'misi'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MISI
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'visi' ? (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400 mt-1">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold text-amber-400 uppercase tracking-wider mb-2">
                        VISI MATRIX WELDING SCHOOL
                      </h4>
                      <p className="text-slate-200 text-base leading-relaxed">
                        {siteData.about.vision}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-heading text-lg font-bold text-amber-400 uppercase tracking-wider mb-3">
                    MISI KAMI
                  </h4>
                  <ul className="space-y-3">
                    {siteData.about.mission.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-sm sm:text-base leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteData.about.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-all corner-frame"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={siteData.contacts[0].waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading text-base font-bold tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-slate-950" />
                <span>Hubungi Kami</span>
              </a>
              <button
                onClick={() => onOpenRegister()}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-heading text-base font-bold tracking-wider uppercase rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-2"
              >
                <span>Daftar Pelatihan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Video Company Profile Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-2xl corner-frame min-h-[380px]">
              {/* Thumbnail Image */}
              <img
                src="https://matrixweldingschool.com/wp-content/uploads/2025/11/man-welding-2024-10-18-09-13-50-utc-1024x683.jpeg"
                alt="Matrix Welding School Video Profile"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />

              {/* Pulsing Play Button Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <button
                  onClick={() => onOpenVideo()}
                  className="w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 transition-all duration-300 hover:scale-110 btn-pulse group/btn"
                  aria-label="Play Video Company Profile"
                >
                  <Play className="w-8 h-8 fill-current text-slate-950 ml-1 transition-transform group-hover/btn:scale-110" />
                </button>
                <h5 className="font-heading text-2xl font-bold uppercase text-white mt-6 tracking-wider">
                  Video Company Profile
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xs mt-1">
                  Lihat langsung workshop, fasilitas, dan proses latihan para siswa di Matrix Welding School Cilacap.
                </p>
                <span className="inline-block mt-3 text-xs font-semibold text-amber-400 tracking-wider uppercase border border-amber-500/40 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                  Klik untuk Memutar Video (MP4)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
