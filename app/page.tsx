'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import CursorGlow from '@/components/CursorGlow';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen cyber-grid relative overflow-x-hidden text-ink bg-paper dark:bg-[#0a0e17] dark:text-[#f8fafc] transition-colors duration-300">
      {/* Background and Cursor - Cursor trail disabled, Particle background retained */}
      {/* <CursorGlow /> */}
      <ParticleBackground isDark={isDark} speed={0.2} />

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main className="container mx-auto px-6 max-w-[1200px] relative z-10 pb-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <footer className="text-center py-10 border-t border-hairline dark:border-[#242f42] z-10 relative bg-paper/60 dark:bg-[#0a0e17]/80 backdrop-blur-sm">
        <p className="text-xs tracking-wider uppercase text-slate dark:text-slate-400 font-medium">
          © {new Date().getFullYear()} Dendi Sutiya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}