'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen cyber-grid relative overflow-x-hidden">
      {/* Efek Cahaya Background (Glow) */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-cyber-purple/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-cyber-cyan/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main className="container mx-auto px-6 max-w-5xl relative z-10 pb-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <footer className="text-center py-8 glass-panel border-b-0 border-l-0 border-r-0 z-10 relative">
        <p className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Dendi Sutiya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}