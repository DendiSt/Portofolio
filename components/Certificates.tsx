'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const certificates = [
  {
    id: 1,
    title: "Junior Web Programming",
    image: "/images/sertifikat.jpeg",
    issuer: "Sertifikasi Kompetensi",
  },
  {
    id: 2,
    title: "Pengembangan Sistem Membership EVOS Esports",
    image: "/images/image.png",
    issuer: "Liputan Berita KOTASUBANG.com",
    link: "https://www.kotasubang.com/36695/mahasiswa-politeknik-negeri-subang-bekerjasama-dengan-pt-teknologi-mudah-terhubung-kembangkan-sistem-membership-untuk-evos-esports"
  }
];

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const gridRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section id="certificates" className="py-20 scroll-mt-20 z-10 relative">
      <div ref={headingRef} className="mb-6 animate-on-scroll animate-slide-left">
        <h3 className="text-[23px] font-semibold text-ink dark:text-white tracking-tight">
          Sertifikasi &amp; Pengakuan
        </h3>
        <p className="text-sm text-slate dark:text-slate-400 mt-1">
          Pencapaian profesional, sertifikasi keahlian, dan publikasi media
        </p>
      </div>

      {/* Grid Gallery */}
      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert, idx) => (
          <div
            key={cert.id}
            style={{ transitionDelay: `${idx * 150}ms` }}
            className="animate-on-scroll animate-zoom-in group relative glass-panel rounded-[4px] border border-hairline dark:border-[#242f42] dark:bg-[#121824] overflow-hidden cursor-pointer shadow-contra-md hover:border-charcoal dark:hover:border-slate-400 transition-all duration-200"
            onClick={() => {
              if ('link' in cert && cert.link) {
                window.open(cert.link, '_blank', 'noopener,noreferrer');
              } else {
                setSelectedImage(cert.image);
              }
            }}
          >
            {/* Thumbnail */}
            <div className="aspect-[4/3] overflow-hidden bg-mist dark:bg-[#0f1422] flex items-center justify-center relative border-b border-hairline dark:border-[#242f42]">
              <img
                src={cert.image}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-100 z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Teks cadangan jika gambar tidak ada/gagal dimuat */}
              <div className="z-0 px-4 text-center font-bold text-mist/40">
                {cert.title}
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {'link' in cert && cert.link ? (
                <ExternalLink className="text-mist w-8 h-8 mb-2 mx-auto animate-bounce" />
              ) : (
                <ZoomIn className="text-mist w-8 h-8 mb-2 mx-auto animate-bounce" />
              )}
              <h4 className="text-lg font-bold text-white text-center">{cert.title}</h4>
              <p className="text-xs text-mist text-center">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-in-out]"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-cyber-dark text-mist rounded-full border-2 border-cyber-cyan shadow-neon-cyan hover:scale-110 hover:text-white hover:bg-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all z-[10000]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="relative h-[85vh] max-h-[900px] aspect-[3/4] rounded-[4px] overflow-hidden border border-[#242f42] bg-[#121824] shadow-contra-md animate-[zoomIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Sertifikat Zoomed"
              className="w-full h-full object-cover bg-cyber-dark"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}