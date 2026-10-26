import React, { useState } from 'react';
import { ChevronDown, Award, BookOpen, GraduationCap, Users, ShieldCheck } from './Icons';
import { siteData } from '../data/siteData';

export default function Facilities() {
  const [openIndex, setOpenIndex] = useState(0);

  const icons = [Award, BookOpen, GraduationCap, Users];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="fasilitas" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              Fasilitas
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Fasilitas Pelatihan
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Didukung fasilitas modern, booth las individu, mesin berstandar industri, dan modul kurikulum komprehensif.
          </p>
        </div>

        {/* Content Row: Image on Left + Interactive Accordion on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Image with Badge (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl corner-frame group">
              <img
                src="https://matrixweldingschool.com/wp-content/uploads/2025/11/demolition-construction-worker-using-a-flame-torch-2025-02-11-21-28-08-utc-1024x683.jpeg"
                alt="Fasilitas Matrix Welding School Cilacap"
                className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-heading text-base font-bold uppercase text-white tracking-wide">
                      Standar Booth Las Individual
                    </h5>
                    <p className="text-xs text-slate-300">
                      1 Siswa 1 Booth Las & Mesin Sendiri, Praktik Maksimal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {siteData.facilities.map((fac, idx) => {
              const IconComponent = icons[idx] || Award;
              const isOpen = openIndex === idx;

              return (
                <div
                  key={fac.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden corner-frame ${
                    isOpen
                      ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isOpen
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-amber-400'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-wide transition-colors ${
                          isOpen ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        {fac.title}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400 bg-amber-500/10' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                      <p>{fac.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
