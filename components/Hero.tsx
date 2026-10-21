'use client';

import { useState, useEffect } from 'react';
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
    <section id="hero" className="min-h-[100svh] flex flex-col-reverse md:flex-row items-center justify-center gap-12 pt-36 pb-16">
      {/* Text side — slides in from left */}
      <div
        ref={textRef}
        className="flex-1 space-y-6 z-10 text-center md:text-left animate-on-scroll animate-slide-left"
      >
        <div
          ref={badgeRef}
          className="inline-flex items-center px-3.5 py-1.5 rounded-[32px] bg-mist dark:bg-[#161e2c] border border-hairline dark:border-[#263246] text-ink dark:text-slate-200 text-xs font-medium"
        >
          Web &amp; IoT Enthusiast
        </div>

        <h1 className="text-5xl md:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] text-ink dark:text-white min-h-[120px] md:min-h-[140px]">
          {greeting} <br />
          <span className="text-ink dark:text-white">
            {name}
          </span>

          {!isTypingDone && (
            <span className="inline-block w-0.5 h-8 md:h-12 ml-1 bg-ink dark:bg-white animate-pulse align-middle"></span>
          )}
        </h1>

        <h2 className="text-lg md:text-xl font-normal text-slate dark:text-slate-300">Junior Web &amp; IoT Developer</h2>
        <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center">
          <a
            href="#projects"
            className="btn-charcoal px-6 py-2.5 rounded-[24px] text-sm font-medium shadow-contra-md transition-all text-center w-full sm:w-auto"
          >
            Lihat Projek
          </a>
          <a
            href="/images/CVDendiSutiya.pdf"
            download="CV_Dendi_Sutiya.pdf"
            className="btn-hairline px-6 py-2.5 rounded-[24px] text-sm font-medium transition-all text-center w-full sm:w-auto"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Image side — slides in from right */}
      <div
        ref={imageRef}
        className="flex-1 flex justify-center z-10 animate-on-scroll animate-slide-right delay-200"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border border-hairline dark:border-[#263246] bg-paper dark:bg-[#121824] shadow-contra-md">
          <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
    </section>
  );
}