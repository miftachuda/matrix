import React from 'react';
import { Flame, MapPin, Mail, Phone, MessageSquare, Instagram, ShieldCheck } from './Icons';
import { siteData } from '../data/siteData';

export default function Footer({ onOpenRegister }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#07090e] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/Logo-MWS.png"
                alt="Matrix Welding School"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://matrixweldingschool.com/wp-content/uploads/2025/11/Logo-MWS-1024x267.png";
                }}
              />
            </div>
            <p className="text-slate-300 font-heading text-lg font-bold uppercase tracking-wider text-amber-400">
              Welding Training and Certification
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Lembaga pelatihan las di Cilacap yang berfokus pada peningkatan skill, sertifikasi, dan kualitas hasil pengelasan industri. Dilatih hingga benar-benar "Sampai Bisa".
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-black text-slate-300 transition-colors"
                aria-label="Instagram MWS"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteData.contacts[0].waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-emerald-400 hover:text-black text-slate-300 transition-colors"
                aria-label="WhatsApp CS"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigasi Cepat
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleScrollTo(e, '#')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentangkami"
                  onClick={(e) => handleScrollTo(e, '#tentangkami')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#program"
                  onClick={(e) => handleScrollTo(e, '#program')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Program Pelatihan
                </a>
              </li>
              <li>
                <a
                  href="#fasilitas"
                  onClick={(e) => handleScrollTo(e, '#fasilitas')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Fasilitas
                </a>
              </li>
              <li>
                <a
                  href="#lokasi"
                  onClick={(e) => handleScrollTo(e, '#lokasi')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Lokasi Workshop
                </a>
              </li>
            </ul>
          </div>

          {/* Programs Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Program Kursus Las
            </h5>
            <ul className="space-y-2 text-xs">
              {siteData.programs.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    onClick={(e) => handleScrollTo(e, `#${p.id}`)}
                    className="hover:text-amber-400 transition-colors block truncate"
                  >
                    <span className="text-amber-500 font-bold mr-1.5">{p.code}</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Workshop (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Kontak & Alamat
            </h5>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteData.workshops[0].address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${siteData.email}`}
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {siteData.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Faizal: {siteData.contacts[0].phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bangun: {siteData.contacts[1].phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} Matrix Welding School. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Pusat Pelatihan & Sertifikasi Las Terpercaya di Cilacap, Jawa Tengah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
