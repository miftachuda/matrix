import React, { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, Star, Wrench } from './Icons';
import { siteData } from '../data/siteData';

export default function TrustStats() {
  const [participantsCount, setParticipantsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate participants from 0 to 2230
          const targetP = siteData.stats.participants;
          const duration = 1600;
          const startTime = performance.now();

          const animateCounts = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setParticipantsCount(Math.floor(easeOut * targetP));
            setProgramsCount(Math.min(Math.floor(easeOut * (siteData.stats.programsCount + 1)), siteData.stats.programsCount));

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setParticipantsCount(targetP);
              setProgramsCount(siteData.stats.programsCount);
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-12 bg-[#0d1117] border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h5 className="font-heading text-lg sm:text-xl font-bold tracking-wider uppercase text-amber-400">
            Dipercaya oleh 2rb+ Peserta
          </h5>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mencetak tenaga terampil las yang tersebar di berbagai sektor industri fabrikasi, konstruksi, dan migas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Peserta */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all text-center group corner-frame">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {participantsCount.toLocaleString()}
              <span className="text-amber-400">+</span>
            </div>
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Peserta Lulus
            </p>
          </div>

          {/* Card 2: Program */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all text-center group corner-frame">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {programsCount}
              <span className="text-amber-400">+</span>
            </div>
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Program Kursus
            </p>
          </div>

          {/* Card 3: Standar Kualitas */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all text-center group corner-frame">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              4.9<span className="text-amber-400">/5</span>
            </div>
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Rating Kepuasan
            </p>
          </div>

          {/* Card 4: Garansi */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all text-center group corner-frame">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="font-heading text-4xl sm:text-5xl font-bold text-amber-400 tracking-tight">
              100%
            </div>
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Praktik Sampai Bisa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
