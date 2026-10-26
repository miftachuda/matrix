import React, { useState } from 'react';
import { MessageSquare, X, Send, ChevronUp, User } from './Icons';
import { siteData } from '../data/siteData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const handleSend = (waUrl) => {
    const text = customText
      ? encodeURIComponent(customText)
      : encodeURIComponent('Halo Matrix Welding School, saya ingin konsultasi mengenai program pelatihan las.');
    window.open(`${waUrl}?text=${text}`, '_blank');
    setIsOpen(false);
    setCustomText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Speed Dial Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-emerald-500/40 p-5 shadow-2xl corner-frame animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-heading text-sm font-bold uppercase text-white">
                  Chat WhatsApp MWS
                </h5>
                <span className="text-[10px] text-emerald-400 font-medium">● Online Siap Melayani</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 my-3 leading-relaxed">
            Pilih tim kami untuk memulai percakapan instan di WhatsApp:
          </p>

          <div className="space-y-2 mb-3">
            {siteData.contacts.map((contact, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(contact.waUrl)}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 block">
                      {contact.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {contact.role}
                    </span>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          {/* Quick Note Input */}
          <div className="pt-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Tulis pesan cepat..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-2xl shadow-emerald-500/40 active:scale-95 transition-all duration-200 group"
        aria-label="Buka Chat WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current text-slate-950" />
        <span className="hidden sm:inline font-heading text-sm tracking-wider uppercase">
          Tanya WA Kami
        </span>
        <span className="sm:hidden text-xs font-heading uppercase">WA CS</span>
      </button>
    </div>
  );
}
