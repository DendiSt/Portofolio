'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const certificates = [
  {
    id: 1,
    title: "Junior Web Programming",
    image: "/images/sertifikat.jpeg",
    issuer: "Sertifikasi Kompetensi",
  }
];

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const gridRef    = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

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
      <h3
        ref={headingRef}
        className="text-3xl font-black mb-8 border-l-4 border-cyber-purple pl-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple animate-on-scroll animate-slide-left"
      >
        Certificates
      </h3>

      {/* Grid Gallery */}
      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert, idx) => (
          <div
            key={cert.id}
            style={{ transitionDelay: `${idx * 150}ms` }}
            className="animate-on-scroll animate-zoom-in group relative glass-panel rounded-xl overflow-hidden cursor-pointer hover:shadow-neon-purple transition-all duration-300"
            onClick={() => setSelectedImage(cert.image)}
          >
            {/* Thumbnail */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-100"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-cyber-black/90 via-cyber-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="text-cyber-cyan w-8 h-8 mb-2 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white text-center">{cert.title}</h4>
              <p className="text-xs text-cyber-cyan text-center">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cyber-black/90 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-in-out]"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-cyber-dark text-cyber-cyan rounded-full border-2 border-cyber-cyan shadow-neon-cyan hover:scale-110 hover:text-white hover:bg-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all z-[10000]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="relative h-[85vh] max-h-[900px] aspect-[3/4] rounded-xl overflow-hidden border-2 border-cyber-cyan shadow-neon-cyan animate-[zoomIn_0.3s_ease-out]"
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