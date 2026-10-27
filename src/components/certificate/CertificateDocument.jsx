import React from 'react';
import { generateBarcodeSVG } from '../../utils/barcode';
import { generateQRCodeSVG } from '../../utils/qrCode';
import { Award, ShieldCheck, CheckCircle2 } from '../Icons';

export default function CertificateDocument({ cert, printMode = false }) {
  if (!cert) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://matrix.loc-2.com';
  const verificationUrl = `${currentOrigin}/?verify=${encodeURIComponent(cert.code)}`;

  const barcodeSvg = generateBarcodeSVG(cert.code, {
    height: 38,
    barWidth: 1.5,
    showText: true,
    color: '#0f172a'
  });

  const qrCodeSvg = generateQRCodeSVG(verificationUrl, 96, '#0f172a', '#ffffff');

  return (
    <div
      id={`certificate-doc-${cert.code}`}
      className={`relative w-full max-w-4xl mx-auto bg-[#faf8f5] text-slate-900 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-10 border-8 border-double border-amber-600/60 font-sans print:m-0 print:p-8 print:shadow-none print:w-full print:max-w-none print:border-8`}
      style={{
        boxSizing: 'border-box',
        backgroundImage: `radial-gradient(#f59e0b10 1px, transparent 1px), radial-gradient(#d9770610 1px, #faf8f5 1px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }}
    >
      {/* Decorative Ornate Guilloche Corners */}
      <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-amber-600 pointer-events-none" />
      <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-amber-600 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-amber-600 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-amber-600 pointer-events-none" />

      {/* Inner Thin Border */}
      <div className="border border-amber-700/30 p-6 sm:p-8 rounded-lg relative">
        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-amber-600/40 pb-5 gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/Logo-MWS.png"
              alt="Matrix Welding School"
              className="h-12 sm:h-14 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://matrixweldingschool.com/wp-content/uploads/2025/11/Logo-MWS-1024x267.png";
              }}
            />
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-slate-950 leading-tight">
                MATRIX WELDING SCHOOL
              </h2>
              <p className="text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-amber-700">
                Pusat Pelatihan & Sertifikasi Las Industri Cilacap
              </p>
              <p className="text-[10px] text-slate-600">
                Jl. Thamrin No. 03 Lomanis / Jl. Serayu Raya Kesugihan – Cilacap
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
              NOMOR REGISTRASI RESMI
            </span>
            <div className="font-heading text-lg sm:text-xl font-bold text-amber-800 tracking-wider bg-amber-100/70 px-3 py-1 rounded border border-amber-300 inline-block mt-0.5">
              {cert.code}
            </div>
          </div>
        </div>

        {/* Certificate Body Title */}
        <div className="text-center my-6">
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-widest text-slate-900 drop-shadow-sm mb-1">
            SERTIFIKAT KOMPETENSI
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-800">
            CERTIFICATE OF WELDING COMPETENCE & QUALIFICATION
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 mx-auto mt-2 rounded-full" />
        </div>

        {/* Recipient Details */}
        <div className="text-center my-6">
          <p className="text-xs sm:text-sm text-slate-600 italic">
            Diberikan dengan bangga kepada / This is to certify that:
          </p>
          <h3 className="font-heading text-2xl sm:text-4xl font-bold uppercase text-slate-950 tracking-wider my-2 text-amber-900 border-b border-dashed border-amber-300 pb-1 max-w-lg mx-auto">
            {cert.participant_name}
          </h3>
          {cert.participant_id && (
            <p className="text-xs text-slate-600 tracking-wider font-mono">
              ID / NIK: {cert.participant_id}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-700 mt-4 max-w-2xl mx-auto leading-relaxed">
            Telah menyelesaikan program pelatihan intensif dan dinyatakan <strong className="text-emerald-800 uppercase font-bold">{cert.grade || 'KOMPETEN'}</strong> sesuai standar kualifikasi juru las profesional:
          </p>

          <div className="my-3 p-3 bg-amber-50 rounded-lg border border-amber-200 inline-block max-w-xl">
            <h4 className="font-heading text-xl sm:text-2xl font-bold uppercase text-amber-900 tracking-wide">
              {cert.program_name}
            </h4>
            <p className="text-xs text-slate-700 font-medium mt-1">
              Standar Acuan: <span className="font-bold text-slate-900">{cert.standards || 'ASME Sec. IX & AWS D1.1'}</span> • {cert.workshop_location}
            </p>
          </div>

          {cert.qualification_range && (
            <p className="text-[11px] sm:text-xs text-slate-600 italic max-w-xl mx-auto">
              Lingkup Kualifikasi: {cert.qualification_range}
            </p>
          )}
        </div>

        {/* Certificate Bottom Section: Barcode, Signatures & QR Code */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end mt-8 pt-6 border-t border-amber-600/30">
          {/* Left: Code128 Barcode & Verification Info (4 cols) */}
          <div className="sm:col-span-4 flex flex-col items-start space-y-2">
            <div
              className="p-1.5 bg-white rounded border border-slate-300 shadow-sm"
              dangerouslySetInnerHTML={{ __html: barcodeSvg }}
            />
            <p className="text-[9px] text-slate-500 leading-tight">
              Scan barcode / QR untuk validasi keaslian sertifikat di database Matrix Welding School.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status: Terverifikasi Resmi</span>
            </div>
          </div>

          {/* Center: Signatures & Gold Seal (5 cols) */}
          <div className="sm:col-span-5 flex items-center justify-around text-center">
            {/* Instructor Signature */}
            <div className="space-y-1">
              <div className="h-14 flex items-end justify-center font-serif italic text-amber-900 font-bold text-base opacity-85 select-none">
                {cert.instructor_name?.split(',')[0] || 'Faizal'}
              </div>
              <div className="w-32 border-b border-slate-800 mx-auto" />
              <p className="text-[11px] font-bold text-slate-900">
                {cert.instructor_name || 'Faizal, S.T.'}
              </p>
              <p className="text-[9px] text-slate-600 font-medium">
                Lead Welding Inspector
              </p>
            </div>

            {/* Official Hologram Badge */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-600 border-2 border-amber-700 shadow-md flex flex-col items-center justify-center text-slate-950 font-bold p-1 shrink-0 rotate-6 select-none">
              <Award className="w-5 h-5 text-amber-950" />
              <span className="text-[7px] uppercase tracking-tighter font-extrabold leading-none mt-0.5 text-center">
                MWS CERTIFIED
              </span>
            </div>
          </div>

          {/* Right: QR Code for Verification Link (3 cols) */}
          <div className="sm:col-span-3 flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
            <div
              className="p-1.5 bg-white rounded border border-slate-300 shadow-sm inline-block"
              dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
            />
            <span className="text-[9px] text-slate-500 block">
              Diterbitkan: {cert.issue_date}
            </span>
            {cert.expiry_date && (
              <span className="text-[9px] text-slate-500 block">
                Berlaku s/d: {cert.expiry_date}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
