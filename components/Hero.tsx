'use client';

import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Hero() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const badgeRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const textRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const imageRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const fullGreeting = "Halo, Saya ";
  const fullName = "Dendi Sutiya";

  useEffect(() => {
    let i = 0;
    let j = 0;

    const typeWriter = () => {
      if (i < fullGreeting.length) {
        setGreeting(fullGreeting.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 80);
      } else if (j < fullName.length) {
        setName(fullName.slice(0, j + 1));
        j++;
        setTimeout(typeWriter, 120);
      } else {
        setTimeout(() => setIsTypingDone(true), 500);
      }
    };

    setTimeout(typeWriter, 300);
  }, []);

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col-reverse md:flex-row items-center justify-center gap-12 pt-36 pb-12">
      {/* Text side — slides in from left */}
      <div
        ref={textRef}
        className="flex-1 space-y-6 z-10 text-center md:text-left animate-on-scroll animate-slide-left"
      >
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue dark:border-cyber-cyan text-cyber-blue dark:text-cyber-cyan text-sm font-bold bg-cyber-blue/10 dark:bg-cyber-cyan/10"
        >
          <Terminal size={16} /> Web &amp; IoT Enthusiast
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight min-h-[120px] md:min-h-[160px]">
          {greeting} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple drop-shadow-md">
            {name}
          </span>

          {!isTypingDone && (
            <span className="inline-block w-1 h-10 md:h-16 ml-2 bg-cyber-cyan animate-pulse align-middle transition-opacity duration-300"></span>
          )}
        </h1>

        <h2 className="text-2xl font-bold text-slate-600 dark:text-slate-400">Junior Web &amp; IoT Developer</h2>
        <div className="pt-4 flex flex-col gap-4 justify-center items-center md:items-start">
          <a href="#projects" className="px-8 py-3 w-full sm:w-[200px] text-center rounded-md font-bold bg-cyber-blue dark:bg-cyber-cyan text-white dark:text-cyber-black shadow-neon-cyan hover:scale-105 transition-transform">
            Lihat Projek
          </a>
          <a href="/images/CVDendiSutiya.pdf" download="CV_Dendi_Sutiya.pdf" className="px-8 py-3 w-full sm:w-[200px] text-center rounded-md font-bold border border-cyber-blue dark:border-cyber-cyan text-cyber-blue dark:text-cyber-cyan hover:bg-cyber-blue/10 dark:hover:bg-cyber-cyan/10 transition-colors">
            Download CV
          </a>
        </div>
      </div>

      {/* Image side — slides in from right */}
      <div
        ref={imageRef}
        className="flex-1 flex justify-center z-10 animate-on-scroll animate-slide-right delay-200"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border-2 border-cyber-blue dark:border-cyber-cyan shadow-neon-cyan animate-[pulse_3s_ease-in-out_infinite]">
          <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full transition-all duration-500" />
        </div>
      </div>
    </section>
  );
}