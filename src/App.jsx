import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import About from './components/About';
import ProgramsOverview from './components/ProgramsOverview';
import Facilities from './components/Facilities';
import ProgramDetails from './components/ProgramDetails';
import CertificateVerification from './components/CertificateVerification';
import LocationsContact from './components/LocationsContact';
import GalleryDocumentation from './components/GalleryDocumentation';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import RegistrationModal from './components/RegistrationModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import LoginModal from './components/auth/LoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { pb } from './services/pocketbase';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedProgramForRegister, setSelectedProgramForRegister] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => pb.getCurrentUser());

  useEffect(() => {
    // Check if query parameter specifies admin mode or verify mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || window.location.hash === '#admin') {
      if (pb.isLoggedIn()) {
        setIsAdminView(true);
      } else {
        setLoginModalOpen(true);
      }
    } else if (urlParams.has('verify')) {
      const el = document.getElementById('verifikasi');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, []);

  const handleOpenRegister = (programTitle = '') => {
    setSelectedProgramForRegister(programTitle);
    setRegisterModalOpen(true);
  };

  const handleOpenAdmin = () => {
    if (currentUser || pb.isLoggedIn()) {
      setIsAdminView(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    pb.logout();
    setCurrentUser(null);
    setIsAdminView(false);
  };

  // If viewing Admin Dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        onBackToSite={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Sticky Navigation */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenLogin={() => setLoginModalOpen(true)}
        isLoggedIn={!!currentUser}
        currentUser={currentUser}
        onOpenAdmin={handleOpenAdmin}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenVideo={() => setVideoModalOpen(true)}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* Counter Statistics & Trust Badges */}
        <TrustStats />

        {/* Tentang Kami & Visi Misi */}
        <About
          onOpenVideo={() => setVideoModalOpen(true)}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* Program Kami (Overview Cards) */}
        <ProgramsOverview
          onOpenRegister={(progTitle) => handleOpenRegister(progTitle)}
        />

        {/* Fasilitas Pelatihan & Interactive Accordion */}
        <Facilities />

        {/* Rincian Program Kami (Detailed Curriculum Cards 01 - 05) */}
        <ProgramDetails
          onOpenRegister={(progTitle) => handleOpenRegister(progTitle)}
        />

        {/* Sistem Verifikasi Sertifikat Online Terintegrasi PocketBase */}
        <CertificateVerification />

        {/* Hubungi Tim Kami & Lokasi Workshop 1 & 2 */}
        <LocationsContact />

        {/* Dokumentasi & Galeri Pelatihan with Fullscreen Lightbox */}
        <GalleryDocumentation />
      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister()}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isLoggedIn={!!currentUser}
      />

      {/* Interactive Video Player Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Interactive Registration Form Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialProgram={selectedProgramForRegister}
      />

      {/* Admin Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAdminView(true);
        }}
      />

      {/* Floating Speed-Dial WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Smooth Scroll Back to Top */}
      <BackToTop />
    </div>
  );
}
