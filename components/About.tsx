'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const cardRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="py-16 scroll-mt-20 z-10 relative">
      <div ref={headingRef} className="mb-6 animate-on-scroll animate-slide-left">
        <h3 className="text-[23px] font-semibold text-ink dark:text-white tracking-tight">
          Tentang Saya
        </h3>
        <p className="text-sm text-slate dark:text-slate-400 mt-1">
          Latar belakang pendidikan, minat, dan fokus teknologi
        </p>
      </div>

      <div
        ref={cardRef}
        className="glass-panel p-7 rounded-[4px] border border-hairline dark:border-[#242f42] dark:bg-[#121824] relative overflow-hidden animate-on-scroll animate-fade-up delay-100"
      >
        <p className="text-base text-ink dark:text-slate-200 leading-relaxed font-normal">
          Saya adalah seorang mahasiswa D4 Teknologi Rekayasa Perangkat Lunak yang memiliki semangat tinggi dalam mengeksplorasi dunia IT. Saat ini, saya memfokuskan diri pada Backend Development untuk membangun arsitektur sistem yang solid, efisien, dan andal. Memiliki pengalaman dalam mengembangkan berbagai proyek Website, Aplikasi Mobile, hingga sistem AIoT. Bagi saya, teknologi bukan sekadar baris kode, melainkan medium untuk terus belajar dan menciptakan solusi di balik layar yang inovatif guna menjawab tantangan masa depan.
        </p>
      </div>
    </section>
  );
}