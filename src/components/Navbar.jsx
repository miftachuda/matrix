import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Flame, LogIn, LogOut, LayoutDashboard } from './Icons';
import { siteData } from '../data/siteData';

export default function Navbar({
  onOpenRegister,
  onOpenLogin,
  isLoggedIn = false,
  onOpenAdmin,
  currentUser = null,
  onLogout
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#' },
    { label: 'Tentang Kami', href: '#tentangkami' },
    { label: 'Program', href: '#program' },
    { label: 'Verifikasi Sertifikat', href: '#verifikasi' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/40 py-3'
          : 'bg-gradient-to-b from-[#0b0f17]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center h-11 w-auto px-1">
              <img
                src="/Logo-MWS.png"
                alt="Matrix Welding School Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://matrixweldingschool.com/wp-content/uploads/2025/11/Logo-MWS-1024x267.png";
                }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="block font-heading text-lg font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors leading-none mb-0.5">
                MATRIX WELDING
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-amber-500 font-semibold leading-none">
                Training & Certification
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5 bg-slate-800/60 p-1 rounded-lg border border-amber-500/30">
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 rounded-md transition-all flex items-center gap-1.5"
                  title="Buka Admin Dashboard"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-all flex items-center gap-1.5 border border-slate-700/60 hover:border-amber-500/40"
                title="Login Pengurus / Instruktur"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={() => onOpenRegister()}
              className="px-4 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-slate-950" />
              <span>Daftar Sekarang</span>
            </button>
            <a
              href={siteData.contacts[0].waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-sm font-medium text-amber-400 hover:text-white border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 rounded-lg transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/40 rounded-md flex items-center gap-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-md flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Login</span>
              </button>
            )}
            <button
              onClick={() => onOpenRegister()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 rounded-md active:scale-95 flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Daftar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800 bg-[#0d1117] rounded-xl px-4 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="flex-1 py-2 text-center text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Masuk Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="py-2 px-3 text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center justify-center"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>Login Pengurus / Admin Portal</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>Pendaftaran Online</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={siteData.contacts[0].waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 text-center text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WA Faizal</span>
                </a>
                <a
                  href={siteData.contacts[1].waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 text-center text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WA Bangun</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
