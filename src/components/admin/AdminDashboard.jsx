import React, { useState, useEffect } from 'react';
import CertificateMaker from './CertificateMaker';
import CertificateList from './CertificateList';
import UserManager from './UserManager';
import PocketBaseSettings from './PocketBaseSettings';
import { pb } from '../../services/pocketbase';
import {
  LayoutDashboard,
  Award,
  FileText,
  Users,
  Settings,
  LogOut,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from '../Icons';

export default function AdminDashboard({ onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalCerts: 0,
    totalUsers: 0,
    serverOnline: false
  });
  const currentUser = pb.getCurrentUser() || { name: 'Admin', email: 'admin@matrix.loc-2.com', role: 'Super Admin' };

  const loadStats = async () => {
    try {
      const certs = await pb.getCertificates();
      const users = await pb.getUsers();
      const health = await pb.checkHealth();
      setStats({
        totalCerts: certs.length,
        totalUsers: users.length,
        serverOnline: health.online
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
  }, [activeTab]);

  const navItems = [
    { id: 'overview', label: 'Ringkasan & Stats', icon: LayoutDashboard },
    { id: 'maker', label: 'Buat Sertifikat Online', icon: Award },
    { id: 'certs', label: 'Kelola Sertifikat (matrix)', icon: FileText },
    { id: 'users', label: 'Kelola Pengguna (Users)', icon: Users },
    { id: 'settings', label: 'Pengaturan PocketBase', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-amber-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/Logo-MWS.png"
              alt="MWS Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://matrixweldingschool.com/wp-content/uploads/2025/11/Logo-MWS-1024x267.png";
              }}
            />
            <div className="hidden sm:block">
              <span className="font-heading text-base font-bold text-white tracking-wide uppercase">
                MWS Admin Portal
              </span>
              <span className="block text-[10px] text-amber-400 font-semibold uppercase tracking-widest">
                Certificate & User Management
              </span>
            </div>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">
              {currentUser.name || currentUser.email}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
              {currentUser.role || 'Super Admin'}
            </span>
          </div>

          <button
            onClick={onBackToSite}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Website</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Keluar dari Admin Portal"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout with Sidebar / Tabs */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 corner-frame space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* PocketBase quick status pill */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">PocketBase Server:</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  stats.serverOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`}
              />
            </div>
            <p className="font-mono text-[11px] text-amber-300 truncate">base.loc-2.com</p>
            <p className="text-[10px] text-slate-500">Koleksi: matrix & users</p>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 corner-frame">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Selamat Datang di Portal Manajemen
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase text-white mb-2">
                  Matrix Welding School Dashboard
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Kelola penerbitan sertifikat pelatihan las dengan barcode/QR code resmi, verifikasi nomor seri unik, dan manajemen akun staf instruktur terintegrasi dengan backend PocketBase.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    onClick={() => setActiveTab('maker')}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <Award className="w-4 h-4 text-slate-950" />
                    <span>Buat Sertifikat Baru</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('certs')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Lihat Semua Sertifikat ({stats.totalCerts})</span>
                  </button>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 corner-frame">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Total Sertifikat Terbit
                    </span>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-white">
                    {stats.totalCerts}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Koleksi: matrix</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 corner-frame">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Pengguna Terdaftar
                    </span>
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-white">
                    {stats.totalUsers}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Admin & Instruktur</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 corner-frame">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Status Database
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-400">
                    base.loc-2.com
                  </div>
                  <p className="text-xs text-slate-400 mt-1">PocketBase Active</p>
                </div>
              </div>

              {/* Recent Certificates Snippet */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wider">
                    Sertifikat Terakhir Diterbitkan
                  </h4>
                  <button
                    onClick={() => setActiveTab('certs')}
                    className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Buka Semua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <CertificateList />
              </div>
            </div>
          )}

          {activeTab === 'maker' && (
            <div className="animate-in fade-in duration-200">
              <CertificateMaker
                onCreated={() => {
                  loadStats();
                }}
              />
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="animate-in fade-in duration-200">
              <CertificateList />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-in fade-in duration-200">
              <UserManager />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in duration-200">
              <PocketBaseSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
