import React, { useEffect } from 'react';
import { X, Flame } from './Icons';
import { siteData } from '../data/siteData';

export default function VideoModal({ isOpen, onClose }) {
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-950 rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl corner-frame"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wide">
              Company Profile - Matrix Welding School
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-black text-slate-300 transition-colors"
            aria-label="Tutup video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            src={siteData.videoUrl}
          >
            Browser Anda tidak mendukung pemutar video HTML5.
          </video>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>Lembaga Pelatihan Pengelasan Berstandar Industri di Cilacap</span>
          <span className="text-amber-400 font-semibold">Matrix Welding School • Belajar Sampai Bisa</span>
        </div>
      </div>
    </div>
  );
}
