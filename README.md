# Matrix Welding School (MWS) Cilacap - Web Application

A faithful, modern, high-performance reverse-engineered web application of **[matrixweldingschool.com](https://matrixweldingschool.com)** built with **React 19**, **Vite 6**, and **Tailwind CSS v4**.

---

## 🌐 Deployment & Live Custom Domain

- **GitHub Repository**: [https://github.com/miftachuda/matrix](https://github.com/miftachuda/matrix)
- **Live Custom Domain**: [http://matrix.loc-2.com](http://matrix.loc-2.com) (or [https://matrix.loc-2.com](https://matrix.loc-2.com))
- **Deployment Branch**: `gh-pages`
- **GitHub Actions Workflow**: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### DNS Configuration for `matrix.loc-2.com`
Pastikan DNS record berikut diset di Cloudflare / DNS Manager domain `loc-2.com`:
- **Type**: `CNAME`
- **Name / Host**: `matrix`
- **Target**: `miftachuda.github.io`
- **Proxy status**: DNS Only (atau Proxied)

---

## ⚡ Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Accessible at: `http://localhost:5173/`

### 2. Start Chrome Debugging Session
```bash
# Option A: npm script
npm run debug

# Option B: Windows batch script
.\debug.bat

# Option C: PowerShell script
.\debug.ps1
```
This starts the Vite development server and launches Google Chrome with:
- `--remote-debugging-port=9222`
- `--auto-open-devtools-for-tabs`
- Dedicated isolated debug user profile

### 3. VS Code / IDE Debugging (`debug.json` & `.vscode/launch.json`)
Open the **Run & Debug** panel in VS Code / Antigravity and select:
- **`Dev & Debug Chrome`**: Starts `npm run dev` as a background pre-launch task and attaches Chrome debugger with full source map support.
- **`Attach to Chrome (Port 9222)`**: Attaches debugger to an already running Chrome debug instance.

---

## 🛠️ Features & Component Architecture

1. **Header & Navigation (`Navbar.jsx`)**:
   - Sticky navbar with blur backdrop (`backdrop-blur-md`) and active scroll tracking.
   - Brand logo (`/Logo-MWS.png`) with remote CDN fallback.
   - Smooth navigation anchor links (`#tentangkami`, `#program`, `#fasilitas`, `#lokasi`).
   - Mobile-responsive hamburger menu with slide-out drawer.
   - Quick WhatsApp call-to-action buttons.

2. **Hero Section (`Hero.jsx`)**:
   - Signature industrial Oswald typography: *Matrix Welding School Cilacap*.
   - Dynamic pulsing action buttons: **Daftar Sekarang** & **Video Company Profile**.
   - Highlight badges: Garansi Sampai Bisa, Sertifikat Resmi, Instruktur Migas & Fabrikasi.
   - Industrial corner accents and metallic gradients.

3. **Statistics & Trust Counters (`TrustStats.jsx`)**:
   - Animated count-up numbers:
     - **2,230+** Peserta Lulus
     - **5+** Program Kursus
     - **4.9/5** Rating Kepuasan
     - **100%** Praktik Sampai Bisa

4. **About & Visi Misi (`About.jsx`)**:
   - Official mission statement and vision.
   - Interactive toggle tab between **VISI** and **MISI**.
   - Company Profile Video Card with glowing play button.
   - Key feature cards: *Program Lengkap & Fleksibel* and *Belajar Sampai Bisa*.

5. **Video Modal Player (`VideoModal.jsx`)**:
   - High-definition HTML5 video player streaming the official MP4 company profile:
     `COMPANY-PROFILE-MATRIX-WELDING-SCHOOL-160925.mp4`
   - Keyboard accessibility (`ESC` to close), auto-play, and full screen support.

6. **Programs Overview (`ProgramsOverview.jsx`)**:
   - Grid cards for all 5 training programs (`01` to `05`):
     - `01`: 1G Plate – 4G Plate (SMAW)
     - `02`: 1G Plate – 6G Pipe SMAW
     - `03`: 1G Plate – 6G GTAW/SMAW (Kombinasi)
     - `04`: FCAW (Durasi 1 Bulan)
     - `05`: Full GTAW (50 Hari)
   - Quick jump to full curriculum breakdown and direct registration.

7. **Facilities Accordion (`Facilities.jsx`)**:
   - Left side: High-resolution workshop booth training photo with industrial badge.
   - Right side: Interactive animated accordion:
     - *Sertifikat Pelatihan* (Resmi & Diakui)
     - *Modul Pembelajaran* (Mudah Dipahami)
     - *Pembekalan Teori Lengkap* (K3, Metalurgi, Parameter Las)
     - *Pendampingan Intensif* (1 Siswa 1 Booth & 1 Mesin)

8. **Detailed Program Breakdown (`ProgramDetails.jsx`)**:
   - Anchor targets for `#01`, `#02`, `#03`, `#04`, `#05`.
   - Comprehensive curriculum details, durations, process types, and career prospects.
   - Program-specific WhatsApp links pre-populated with encoded inquiry messages.

9. **Contact & Locations (`LocationsContact.jsx`)**:
   - Direct contacts:
     - Faizal: `085-747-117-407`
     - Bangun: `0856-5107-9733`
     - Email: `matrixwelding.mws@gmail.com`
   - Workshop 1: Jl. Thamrin No. 03, Lomanis, Cilacap Tengah
   - Workshop 2: Jl. Serayu Raya, Kesugihan Kidul, Kesugihan
   - Interactive tab switcher and embedded responsive Google Maps.

10. **Documentation Gallery with Lightbox (`GalleryDocumentation.jsx`)**:
    - Photo grid featuring the 11 real training photos from the workshop.
    - Full-screen lightbox modal with Next (`→`), Prev (`←`), and Close (`ESC`) controls.

11. **Interactive Registration Modal (`RegistrationModal.jsx`)**:
    - Complete enrollment form: Name, Phone, Program Selection, Workshop Location, Experience Level, and Notes.
    - Directly sends formatted registration data to WhatsApp or confirms online reservation.

12. **Floating Speed-Dial WhatsApp (`FloatingWhatsApp.jsx`)**:
    - Fixed bottom-right speed-dial widget allowing 1-click chat with either Faizal or Bangun.

13. **Back to Top (`BackToTop.jsx`)**:
    - Smooth scroll to top when page is scrolled down.

14. **Footer (`Footer.jsx`)**:
    - Complete copyright notices, quick links, program anchors, social links, and workshop addresses.

---

## 📱 Responsive Testing
Tested across:
- **Mobile** (`320px` - `640px`): Collapsible mobile drawer, touch targets >= 44px, single-column stacked cards.
- **Tablet** (`641px` - `1024px`): 2-column grids, optimized typography and map aspect ratio.
- **Desktop** (`1025px+`): Multi-column layouts, sticky navigation bar, corner frame accents, and high-DPI image scaling.
