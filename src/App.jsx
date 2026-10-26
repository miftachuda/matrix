import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import About from './components/About';
import ProgramsOverview from './components/ProgramsOverview';
import Facilities from './components/Facilities';
import ProgramDetails from './components/ProgramDetails';
import LocationsContact from './components/LocationsContact';
import GalleryDocumentation from './components/GalleryDocumentation';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import RegistrationModal from './components/RegistrationModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedProgramForRegister, setSelectedProgramForRegister] = useState('');

  const handleOpenRegister = (programTitle = '') => {
    setSelectedProgramForRegister(programTitle);
    setRegisterModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Sticky Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

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

        {/* Hubungi Tim Kami & Lokasi Workshop 1 & 2 */}
        <LocationsContact />

        {/* Dokumentasi & Galeri Pelatihan with Fullscreen Lightbox */}
        <GalleryDocumentation />
      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

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

      {/* Floating Speed-Dial WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Smooth Scroll Back to Top */}
      <BackToTop />
    </div>
  );
}
