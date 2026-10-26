import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from './Icons';
import { siteData } from '../data/siteData';

export default function GalleryDocumentation() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % siteData.gallery.length);
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + siteData.gallery.length) % siteData.gallery.length);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117] border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Camera className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              Dokumentasi
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Dokumentasi Pelatihan
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Foto langsung aktivitas latihan, pembekalan materi, suasana booth, dan kelulusan siswa di workshop Matrix Welding School.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {siteData.gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer aspect-square shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-[11px] font-semibold text-amber-300 truncate">
                  {item.title}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-300">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar with Title and Close Button */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <p className="font-heading text-lg font-bold text-amber-400 uppercase tracking-wide">
                {siteData.gallery[selectedPhotoIndex].title}
              </p>
              <p className="text-xs text-slate-300">
                Foto {selectedPhotoIndex + 1} dari {siteData.gallery.length} • {siteData.gallery[selectedPhotoIndex].category}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-black text-slate-200 transition-colors"
              aria-label="Tutup preview gambar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-black text-slate-200 transition-colors z-10"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image */}
          <div
            className="max-w-5xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={siteData.gallery[selectedPhotoIndex].url}
              alt={siteData.gallery[selectedPhotoIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-slate-800 shadow-2xl"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-black text-slate-200 transition-colors z-10"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
