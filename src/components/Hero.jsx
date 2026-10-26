import React from 'react';
import { Flame, Play, ArrowRight, ShieldCheck, Award, Users } from './Icons';
import { siteData } from '../data/siteData';

export default function Hero({ onOpenVideo, onOpenRegister }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0b0f17]">
      {/* Background Gradients & Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle Industrial Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 158, 11, 0.25) 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-[#0b0f17]/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-8 animate-in fade-in duration-500">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-300">
            Pusat Pelatihan & Sertifikasi Las Industri Cilacap
          </span>
        </div>

        {/* Hero Title - Exact Brand Headings in Oswald */}
        <div className="mb-6">
          <h1 className="font-heading uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] text-white">
            <span className="block text-slate-100 drop-shadow-md">Matrix</span>
            <span className="block text-amber-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.45)]">
              Welding
            </span>
            <span className="block text-slate-100">School</span>
            <span className="block text-slate-400 text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
              Cilacap
            </span>
          </h1>
        </div>

        {/* Tagline / Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10">
          Mencetak tenaga welder profesional, berstandar industri, dan siap kerja nasional maupun internasional. 
          Pelatihan intensif bersama instruktur berpengalaman industri hingga benar-benar <strong className="text-amber-400 font-semibold">"Sampai Bisa"</strong>.
        </p>

        {/* Interactive Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onOpenRegister()}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading text-lg font-bold tracking-wider uppercase rounded-xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 btn-pulse"
          >
            <Flame className="w-5 h-5 text-slate-950" />
            <span>Daftar Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onOpenVideo()}
            className="w-full sm:w-auto px-7 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-base rounded-xl border border-slate-700 hover:border-amber-500/50 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <Play className="w-4 h-4 text-amber-400 group-hover:text-black fill-current ml-0.5" />
            </div>
            <span>Video Company Profile</span>
          </button>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto text-left pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Kualitas Terjamin</p>
              <p className="text-sm font-semibold text-slate-200">Garansi Sampai Bisa</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Standar Industri</p>
              <p className="text-sm font-semibold text-slate-200">Sertifikat Resmi</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <Users className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Instruktur Pro</p>
              <p className="text-sm font-semibold text-slate-200">Praktisi Migas & Fabrikasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
