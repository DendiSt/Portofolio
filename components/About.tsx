'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const cardRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 scroll-mt-20 z-10 relative">
      <h3
        ref={headingRef}
        className="text-3xl font-black mb-8 border-l-4 border-cyber-purple pl-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple animate-on-scroll animate-slide-left"
      >
        Tentang Saya
      </h3>
      <div
        ref={cardRef}
        className="glass-panel p-8 rounded-2xl relative overflow-hidden group animate-on-scroll animate-fade-up delay-200"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple"></div>
        <p className="text-lg leading-relaxed z-10 relative text-slate-700 dark:text-slate-300">
          Saya adalah seorang mahasiswa D4 Teknologi Rekayasa Perangkat Lunak yang memiliki semangat tinggi dalam mengeksplorasi dunia IT. Saat ini, saya memfokuskan diri pada Backend Development untuk membangun arsitektur sistem yang solid, efisien, dan andal. Memiliki pengalaman dalam mengembangkan berbagai proyek Website, Aplikasi Mobile, hingga sistem AIoT. Bagi saya, teknologi bukan sekadar baris kode, melainkan medium untuk terus belajar dan menciptakan solusi di balik layar yang inovatif guna menjawab tantangan masa depan.
        </p>
      </div>
    </section>
  );
}