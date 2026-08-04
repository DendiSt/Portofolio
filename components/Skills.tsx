'use client';

import { Code, GraduationCap, Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skills = [
  { name: "VsCode",       iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Figma",        iconUrl: "https://cdn.simpleicons.org/figma" },
  { name: "Arduino Ide",  iconUrl: "https://cdn.simpleicons.org/arduino" },
  { name: "Laravel",      iconUrl: "https://cdn.simpleicons.org/laravel" },
  { name: "PHP",          iconUrl: "https://cdn.simpleicons.org/php" },
  { name: "Javascript",   iconUrl: "https://cdn.simpleicons.org/javascript" },
  { name: "Python",       iconUrl: "https://cdn.simpleicons.org/python" },
  { name: "C++",          iconUrl: "https://cdn.simpleicons.org/cplusplus" },
  { name: "MySQL",        iconUrl: "https://cdn.simpleicons.org/mysql" },
  { name: "Flutter",      iconUrl: "https://cdn.simpleicons.org/flutter" },
  { name: "Bootstrap",    iconUrl: "https://cdn.simpleicons.org/bootstrap" },
  { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "HTML",         iconUrl: "https://cdn.simpleicons.org/html5" },
  { name: "CSS",          iconUrl: "https://cdn.simpleicons.org/css" },
  { name: "React",        iconUrl: "https://cdn.simpleicons.org/react" },
  { name: "Typescript",   iconUrl: "https://cdn.simpleicons.org/typescript" },
];

const cardDelays = ['', 'delay-200', 'delay-400'];

export default function Skills() {
  const headingRef   = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const cardsRef     = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const techHeadRef  = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const iconsRef     = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="skills" className="py-20 scroll-mt-20 z-10 relative">

      {/* 3 Info Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
      >
        {[
          { icon: <Code className="w-8 h-8 text-slate-800 dark:text-white mb-6" />, title: 'Bahasa & Framework', desc: 'PHP, Laravel, Javascript, Bootstrap, Flutter' },
          { icon: <GraduationCap className="w-8 h-8 text-slate-800 dark:text-white mb-6" />, title: 'Pendidikan', desc: 'Politeknik Negeri Subang di program studi D4 Teknologi Rekayasa Perangkat Lunak' },
          { icon: <Briefcase className="w-8 h-8 text-slate-800 dark:text-white mb-6" />, title: 'Projek', desc: 'Telah membuat beberapa projek mobile dan website' },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`glass-panel p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20 hover:border-cyber-cyan/50 transition-colors animate-on-scroll animate-fade-up ${cardDelays[idx]}`}
          >
            {card.icon}
            <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{card.title}</h4>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <h3
        ref={techHeadRef}
        className="text-3xl font-black mb-8 border-l-4 border-cyber-cyan pl-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan dark:from-cyber-cyan dark:to-cyber-blue animate-on-scroll animate-slide-left"
      >
        Teknologi yang saya gunakan
      </h3>

      {/* Skill icons grid — each icon zooms in with a stagger */}
      <div
        ref={iconsRef}
        className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:gap-4"
      >
        {skills.map((skill, idx) => (
          <div
            key={idx}
            style={{ transitionDelay: `${idx * 45}ms` }}
            className="animate-on-scroll animate-zoom-in relative group w-full aspect-square sm:w-20 sm:h-20 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-gray-800 rounded-2xl flex items-center justify-center hover:border-cyber-cyan dark:hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 cursor-pointer"
          >
            <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg border border-slate-700">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}