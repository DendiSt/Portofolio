'use client';

import { useState, useEffect, useRef } from 'react';
import { Database, Code2, Cpu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
}

const projects: Project[] = [
  {
    id: 0,
    title: "V.I.S.I.O.N",
    category: "IoT & Computer Vision",
    shortDesc: "Visual Intelligence System for IoT & Optimized Nutrition. Sistem cerdas tambak ikan.",
    fullDesc: "V.I.S.I.O.N adalah platform pintar berbasis IoT dan Computer Vision yang dirancang untuk mengoptimalisasi manajemen tambak ikan. Menggunakan ESP32-CAM dengan deteksi aktivitas ikan berbasis AI, sistem ini mengatur siklus pakan otomatis dan memantau parameter kualitas air secara real-time.",
    features: [
      "Deteksi aktivitas & keaktifan ikan via ESP32-CAM",
      "Pemberian pakan otomatis & hemat sesuai jadwal",
      "Monitoring pH, suhu, dan kekeruhan air real-time",
      "Alert notifikasi otomatis via Supabase"
    ],
    tech: ["ESP32-CAM", "Python", "Supabase", "OpenCV"],
    images: ["/images/vision.png", "/images/visionalat.png"],
    icon: <Cpu className="w-5 h-5" />
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
    icon: <Smartphone className="w-5 h-5" />
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
    icon: <Monitor className="w-5 h-5" />
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
      className={`glass-panel rounded-2xl group transition-all duration-500 relative overflow-hidden animate-on-scroll animate-fade-up flex flex-col h-full w-[86vw] sm:w-[350px] md:w-auto shrink-0 snap-center ${cardDelays[idx]} ${isExpanded
        ? 'ring-2 ring-cyber-blue dark:ring-cyber-cyan shadow-[0_0_30px_rgba(0,102,255,0.25)] dark:shadow-[0_0_30px_rgba(0,243,255,0.3)] bg-white dark:bg-cyber-dark/95'
        : 'hover:shadow-neon-cyan hover:-translate-y-1'
        }`}
    >
      {/* Container Slider Gambar di Bagian Atas */}
      <div
        className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900 select-none group/slider shrink-0"
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
        <div className="absolute top-3 left-3 px-3 py-1 bg-cyber-dark/80 backdrop-blur-md text-cyber-cyan text-xs font-bold rounded-full border border-cyber-cyan/40 flex items-center gap-1.5 shadow-md z-10 pointer-events-none">
          {proj.icon}
          <span>{proj.category}</span>
        </div>

        {/* Jika projek memiliki lebih dari 1 gambar, tampilkan tombol navigasi & indikator */}
        {hasMultipleImages && (
          <>
            {/* Counter Badge (Misal: 1/2) */}
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-950/70 backdrop-blur-md text-cyber-cyan text-[10px] font-mono font-bold rounded-md border border-cyber-cyan/30 z-10">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Tombol Geser Kiri */}
            <button
              onClick={prevImage}
              aria-label="Gambar Sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/60 hover:bg-cyber-blue dark:hover:bg-cyber-cyan text-white dark:hover:text-slate-950 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-md z-20 cursor-pointer border border-white/20 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Tombol Geser Kanan */}
            <button
              onClick={nextImage}
              aria-label="Gambar Selanjutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/60 hover:bg-cyber-blue dark:hover:bg-cyber-cyan text-white dark:hover:text-slate-950 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-md z-20 cursor-pointer border border-white/20 shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
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
          <h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-cyber-blue dark:group-hover:text-cyber-cyan transition-colors">
            {proj.title}
          </h4>

          {/* Deskripsi Singkat */}
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            {proj.shortDesc}
          </p>
        </div>

        <div className="flex flex-col flex-1 justify-end">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {proj.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-cyber-dark/90 text-cyber-blue dark:text-cyber-cyan rounded-md border border-cyber-blue/30 dark:border-cyber-cyan/30"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bagian Deskripsi Lengkap yang Memanjang ke Bawah saat See More */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded
              ? 'max-h-[1000px] opacity-100 mt-2 pt-4 pb-2 border-t border-slate-200 dark:border-slate-700/60'
              : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'
              }`}
          >
            <h5 className="text-xs font-bold uppercase tracking-wider text-cyber-blue dark:text-cyber-cyan mb-2">
              Deskripsi Lengkap
            </h5>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {proj.fullDesc}
            </p>

            {/* Fitur Utama */}
            <h5 className="text-xs font-bold uppercase tracking-wider text-cyber-blue dark:text-cyber-cyan mb-2">
              Fitur Utama
            </h5>
            <ul className="space-y-2 mb-2">
              {proj.features.map((feat, fIdx) => (
                <li key={fIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber-blue dark:text-cyber-cyan shrink-0 mt-0.5" />
                  <span className="leading-normal">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tombol See More / See Less */}
          <button
            onClick={() => onToggleExpand(proj.id)}
            className="mt-4 w-full py-2.5 px-4 rounded-xl border border-cyber-blue/40 dark:border-cyber-cyan/40 bg-cyber-blue/5 dark:bg-cyber-cyan/10 hover:bg-cyber-blue dark:hover:bg-cyber-cyan hover:text-white dark:hover:text-slate-950 text-cyber-blue dark:text-cyber-cyan text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shrink-0"
          >
            <span>{isExpanded ? 'See Less' : 'See More'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            )}
          </button>
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
        <h3
          ref={headingRef}
          className="text-3xl font-black border-l-4 border-cyber-blue pl-4 animate-on-scroll animate-slide-left flex items-center gap-3"
        >
          <span>Projects</span>
          <Sparkles className="w-6 h-6 text-cyber-blue dark:text-cyber-cyan animate-pulse" />
        </h3>

        {/* Petunjuk Geser untuk Mobile */}
        <div className="md:hidden flex items-center gap-1.5 text-xs font-semibold text-cyber-blue dark:text-cyber-cyan bg-cyber-blue/10 dark:bg-cyber-cyan/10 px-3 py-1.5 rounded-full border border-cyber-blue/30 dark:border-cyber-cyan/30">
          <ChevronLeft className="w-3.5 h-3.5 animate-pulse" />
          <span>Geser Projek</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>

      {/* Container Cards: Horizontal Scroll di Mobile (< md), Grid di Desktop (>= md) */}
      <div
        ref={gridRef}
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 items-stretch pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar md:grid-cols-2 lg:grid-cols-3"
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