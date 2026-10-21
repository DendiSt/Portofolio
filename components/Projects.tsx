'use client';

import { useState, useEffect, useRef } from 'react';
import { Database, Code2, Cpu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Smartphone, Monitor, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  tech: string[];
  images: string[];
  icon: React.ReactNode;
  demoUrl?: string;
  githubUrl?: string;
  journalUrl?: string;
}

const projects: Project[] = [
  {
    id: 0,
    title: "V.I.S.I.O.N",
    category: "IoT & Computer Vision",
    shortDesc: "Visual Intelligence System for IoT & Optimized Nutrition. Sistem pemberi makan ikan otomatis berbasis ai guna mengurangi pemborosan pakan.",
    fullDesc: "V.I.S.I.O.N adalah platform pintar berbasis IoT dan Computer Vision yang dirancang untuk mengoptimalisasi manajemen tambak ikan. Menggunakan ESP32-CAM dengan deteksi aktivitas ikan berbasis AI, sistem ini mengatur siklus pakan otomatis dan memantau parameter kualitas air secara real-time.",
    features: [
      "Deteksi aktivitas & keaktifan ikan via ESP32-CAM",
      "Pemberian pakan otomatis & hemat sesuai jadwal",
      "Monitoring pH, suhu, dan kekeruhan air real-time",
      "Alert notifikasi otomatis via Supabase"
    ],
    tech: ["ESP32-CAM", "Python", "Supabase", "OpenCV"],
    images: ["/images/vision.png", "/images/visionalat.png"],
    icon: <Cpu className="w-5 h-5" />,
    githubUrl: "https://github.com/DendiSt/Project_Vision_AIoT.git"
  },
  {
    id: 1,
    title: "Fire Response App (Mobile)",
    category: "Mobile App Development",
    shortDesc: "Aplikasi mobile pelaporan darurat kebakaran dan manajemen tugas operasional lapangan bagi petugas Damkar.",
    fullDesc: "Aplikasi mobile yang dikembangkan untuk Dinas Pemadam Kebakaran Kabupaten Subang dengan dua peran utama: Masyarakat dan Petugas. Memungkinkan masyarakat melaporkan insiden secara real-time dengan tingkat akurasi tinggi menggunakan GPS, unggah foto/video, dan fitur voice-to-text. Untuk petugas, aplikasi ini menyediakan fitur navigasi langsung ke lokasi kejadian, penerimaan disposisi tugas, dan pencatatan waktu penanganan (timer) secara otomatis.",
    features: [
      "Pelaporan darurat real-time terintegrasi GPS & Kamera",
      "Fitur pelaporan aksesibilitas dengan Voice-to-Text",
      "Penerimaan notifikasi tugas dan navigasi lokasi untuk petugas",
      "Sistem tracking status laporan secara live"
    ],
    tech: ["Flutter", "Node.js", "Express.js", "MySQL"],
    images: ["/images/damkarMobile.png"],
    icon: <Smartphone className="w-5 h-5" />,
    githubUrl: "https://github.com/DendiSt/Mobile-Damkar.git",
    journalUrl: "https://journal.publinesia.com/index.php/sistematik/article/view/193"
  },
  {
    id: 2,
    title: "Fire Response Dashboard (Web)",
    category: "Web App Development",
    shortDesc: "Sistem informasi manajemen operasional Damkar terintegrasi dengan pemetaan wilayah rawan (GIS) dan layanan edukasi.",
    fullDesc: "Sistem informasi berbasis website yang bertindak sebagai pusat komando (Command Center) bagi Admin Dinas Pemadam Kebakaran Kabupaten Subang. Sistem ini memiliki dashboard analitik terintegrasi untuk memverifikasi laporan masuk dari aplikasi mobile, memetakan titik lokasi rawan kebakaran pada peta interaktif, mengelola pengajuan kunjungan edukasi dari sekolah, serta mencetak laporan rekapitulasi periodik secara otomatis.",
    features: [
      "Dashboard analitik manajemen laporan & verifikasi insiden",
      "Pemetaan interaktif wilayah rawan bencana (GIS)",
      "Manajemen pengajuan kunjungan edukasi & sosialisasi",
      "Generate otomatis laporan periodik operasional (PDF/Excel)"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    images: ["/images/pemadam.png"],
    icon: <Monitor className="w-5 h-5" />,
    githubUrl: "https://github.com/DendiSt/Web-Damkar.git",
    journalUrl: "https://journal.publinesia.com/index.php/sistematik/article/view/193"
  },
];

const cardDelays = ['', 'delay-200', 'delay-400'];

function ProjectCardItem({
  proj,
  idx,
  isExpanded,
  onToggleExpand,
  cardRef,
}: {
  proj: Project;
  idx: number;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const images = proj.images && proj.images.length > 0 ? proj.images : [];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    setCurrentImageIndex(i);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || !hasMultipleImages) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 40) {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    } else if (diff < -40) {
      setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
    }
    setTouchStart(null);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-panel rounded-[4px] group transition-all duration-300 relative overflow-hidden animate-on-scroll animate-fade-up flex flex-col h-auto w-[86vw] sm:w-[350px] md:w-auto shrink-0 snap-center border border-hairline dark:border-[#242f42] dark:bg-[#121824] shadow-contra-md ${cardDelays[idx]} ${isExpanded ? "ring-1 ring-charcoal dark:ring-white/40 bg-paper dark:bg-[#121824]" : "hover:border-slate/40 dark:hover:border-slate-500"}`}
    >
      {/* Container Slider Gambar di Bagian Atas */}
      <div
        className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900 dark:bg-black select-none group/slider shrink-0 border-b border-hairline dark:border-[#242f42]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track Slider Gambar */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((imgSrc, i) => (
            <div key={i} className="w-full h-full shrink-0 relative">
              <img
                src={imgSrc}
                alt={`${proj.title} slide ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-medium rounded-[32px] border border-white/20 flex items-center gap-1.5 shadow-md z-10 pointer-events-none">
          <span className="text-white flex items-center">{proj.icon}</span>
          <span className="text-white">{proj.category}</span>
        </div>

        {/* Jika projek memiliki lebih dari 1 gambar, tampilkan tombol navigasi & indikator */}
        {hasMultipleImages && (
          <>
            {/* Counter Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-medium rounded-[4px] border border-white/20 z-10">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Tombol Geser Kiri */}
            <button
              onClick={prevImage}
              aria-label="Gambar Sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 backdrop-blur-md z-20 cursor-pointer border border-white/20 shadow-contra-md hover:bg-black/90"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            {/* Tombol Geser Kanan */}
            <button
              onClick={nextImage}
              aria-label="Gambar Selanjutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 backdrop-blur-md z-20 cursor-pointer border border-white/20 shadow-contra-md hover:bg-black/90"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Indikator Dots di Bawah Gambar */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => selectImage(e, i)}
                  aria-label={`Pilih gambar ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${i === currentImageIndex
                    ? 'w-5 h-2 bg-cyber-blue dark:bg-cyber-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Konten Card (Judul & Deskripsi) */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold mb-2 text-ink dark:text-white tracking-tight group-hover:text-charcoal dark:group-hover:text-slate-200 transition-colors">
            {proj.title}
          </h4>

          {/* Deskripsi Singkat */}
          <p className="text-sm text-slate dark:text-slate-300 mb-4 leading-relaxed">
            {proj.shortDesc}
          </p>
        </div>

        <div className="flex flex-col flex-1 justify-end">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-0.5 bg-mist dark:bg-[#161e2c] text-slate dark:text-slate-300 rounded-[32px] border border-hairline dark:border-[#242f42]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bagian Deskripsi Lengkap yang Memanjang ke Bawah saat See More */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded
              ? 'max-h-[1000px] opacity-100 mt-2 pt-4 pb-2 border-t border-hairline dark:border-[#242f42]'
              : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'
              }`}
          >
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate dark:text-slate-400 mb-2">
              Deskripsi Lengkap
            </h5>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {proj.fullDesc}
            </p>

            {/* Fitur Utama */}
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate dark:text-slate-400 mb-2">
              Fitur Utama
            </h5>
            <ul className="space-y-2 mb-2">
              {proj.features.map((feat, fIdx) => (
                <li key={fIdx} className="text-xs text-slate dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ink dark:text-white shrink-0 mt-0.5" />
                  <span className="leading-normal">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tombol Actions */}
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-hairline dark:border-[#242f42]">
            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-hairline w-full py-2 px-3 rounded-[24px] text-xs font-medium text-ink dark:text-white bg-mist dark:bg-[#161e2c] hover:bg-paper dark:hover:bg-[#1f2a3c] transition-all flex items-center justify-center gap-1.5 border border-hairline dark:border-[#242f42]"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate dark:text-slate-300" />
                <span>Repository GitHub</span>
              </a>
            )}

            {proj.journalUrl && (
              <a
                href={proj.journalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-hairline w-full py-2 px-3 rounded-[24px] text-xs font-medium text-ink dark:text-white bg-mist dark:bg-[#161e2c] hover:bg-paper dark:hover:bg-[#1f2a3c] transition-all flex items-center justify-center gap-1.5 border border-hairline dark:border-[#242f42]"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate dark:text-slate-300" />
                <span>Baca Jurnal Terkait</span>
              </a>
            )}

            {/* Tombol See More / See Less */}
            <button
              onClick={() => onToggleExpand(proj.id)}
              className="w-full py-2 px-3 text-xs font-medium rounded-[24px] text-ink dark:text-slate-200 hover:bg-mist dark:hover:bg-[#161e2c] transition-colors flex items-center justify-center gap-1 border border-hairline dark:border-[#242f42]"
            >
              <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail Lengkap'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const gridRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Collapse card when clicking anywhere outside the expanded card
  useEffect(() => {
    if (expandedId === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      const activeCard = cardRefs.current[expandedId];
      if (activeCard && !activeCard.contains(event.target as Node)) {
        setExpandedId(null);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expandedId]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-20 scroll-mt-20 z-10 relative">
      <div className="flex items-center justify-between mb-8">
        <div ref={headingRef} className="animate-on-scroll animate-slide-left">
          <h3 className="text-[23px] font-semibold text-ink dark:text-white tracking-tight flex items-center gap-2">
            <span>Projects Showcase</span>
          </h3>
          <p className="text-sm text-slate dark:text-slate-400 mt-1">
            Kompilasi proyek IoT, Computer Vision, aplikasi mobile, dan sistem web
          </p>
        </div>

        {/* Petunjuk Geser untuk Mobile */}
        <div className="md:hidden flex items-center gap-1.5 text-xs font-medium text-slate dark:text-slate-300 bg-mist dark:bg-[#161e2c] px-3 py-1.5 rounded-[32px] border border-hairline dark:border-[#242f42]">
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Geser</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Container Cards: Horizontal Scroll di Mobile (< md), Grid di Desktop (>= md) */}
      <div
        ref={gridRef}
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 items-start pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((proj, idx) => (
          <ProjectCardItem
            key={proj.id}
            proj={proj}
            idx={idx}
            isExpanded={expandedId === proj.id}
            onToggleExpand={toggleExpand}
            cardRef={el => { cardRefs.current[idx] = el; }}
          />
        ))}
      </div>
    </section>
  );
}