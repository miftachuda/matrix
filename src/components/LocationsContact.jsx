import React, { useState } from 'react';
import { MapPin, Mail, Phone, MessageSquare, ExternalLink, Navigation } from './Icons';
import { siteData } from '../data/siteData';

export default function LocationsContact() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(siteData.workshops[0].id);

  const currentWorkshop =
    siteData.workshops.find((w) => w.id === selectedWorkshop) || siteData.workshops[0];

  return (
    <section id="lokasi" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              Contact Us
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Hubungi Tim Kami
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Silakan hubungi customer service kami atau kunjungi workshop Matrix Welding School terdekat di Cilacap.
          </p>
        </div>

        {/* Top: Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 corner-frame flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Email Resmi
              </span>
              <a
                href={`mailto:${siteData.email}`}
                className="text-base font-semibold text-slate-100 hover:text-amber-400 transition-colors break-all"
              >
                {siteData.email}
              </a>
              <p className="text-xs text-slate-500 mt-1">Respon cepat dalam 24 jam</p>
            </div>
          </div>

          {/* WhatsApp CS 1 - Faizal */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 corner-frame flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Nomer WA (Faizal)
              </span>
              <a
                href={siteData.contacts[0].waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-emerald-400 hover:underline block"
              >
                {siteData.contacts[0].phone}
              </a>
              <span className="inline-block mt-2 text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                Pendaftaran & Brosur
              </span>
            </div>
          </div>

          {/* WhatsApp CS 2 - Bangun */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 corner-frame flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Nomer WA (Bangun)
              </span>
              <a
                href={siteData.contacts[1].waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-emerald-400 hover:underline block"
              >
                {siteData.contacts[1].phone}
              </a>
              <span className="inline-block mt-2 text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                Konsultasi Teknis & Jadwal
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Workshop Locations & Interactive Map */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 corner-frame shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-1">
                Kunjungi Workshop
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                Lokasi Workshop Matrix Welding School
              </h3>
            </div>

            {/* Switcher Buttons for Workshop 1 vs 2 */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {siteData.workshops.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWorkshop(w.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    selectedWorkshop === w.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {w.name.split('–')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
            {/* Workshop Address Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                    {currentWorkshop.name}
                  </h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {currentWorkshop.address}
                </p>
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(currentWorkshop.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Operating Hours Info */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <p className="font-semibold text-slate-200">Jam Operasional & Latihan:</p>
                <p>Senin – Sabtu: 08.00 – 17.00 WIB</p>
                <p>Minggu: Libur / Sesuai Jadwal Khusus Sesi Intensif</p>
              </div>
            </div>

            {/* Embedded Interactive Map (7 cols) */}
            <div className="lg:col-span-7 h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950">
              <iframe
                title={`Map of ${currentWorkshop.name}`}
                src={currentWorkshop.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-[88%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
