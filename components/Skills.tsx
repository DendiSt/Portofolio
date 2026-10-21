'use client';

import { Code, GraduationCap, Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skills = [
  { name: "VsCode", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Figma", iconUrl: "https://cdn.simpleicons.org/figma" },
  { name: "Arduino Ide", iconUrl: "https://cdn.simpleicons.org/arduino" },
  { name: "Laravel", iconUrl: "https://cdn.simpleicons.org/laravel" },
  // { name: "PHP", iconUrl: "https://cdn.simpleicons.org/php" },
  { name: "Javascript", iconUrl: "https://cdn.simpleicons.org/javascript" },
  { name: "Python", iconUrl: "https://cdn.simpleicons.org/python" },
  // { name: "C++", iconUrl: "https://cdn.simpleicons.org/cplusplus" },
  { name: "MySQL", iconUrl: "https://cdn.simpleicons.org/mysql" },
  { name: "Flutter", iconUrl: "https://cdn.simpleicons.org/flutter" },
  { name: "Bootstrap", iconUrl: "https://cdn.simpleicons.org/bootstrap" },
  //{ name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "HTML", iconUrl: "https://cdn.simpleicons.org/html5" },
  { name: "CSS", iconUrl: "https://cdn.simpleicons.org/css" },
  //{ name: "React", iconUrl: "https://cdn.simpleicons.org/react" },
  // { name: "Typescript", iconUrl: "https://cdn.simpleicons.org/typescript" },
];

const cardDelays = ['', 'delay-200', 'delay-400'];

export default function Skills() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const cardsRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const techHeadRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const iconsRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="skills" className="py-16 scroll-mt-20 z-10 relative">

      {/* 3 Info Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
      >
        {[
          { icon: <Code className="w-6 h-6 text-ink dark:text-white mb-4" />, title: 'Bahasa & Framework', desc: 'Javascript, Python, HTML, CSS, Laravel, Flutter, Bootstrap' },
          { icon: <GraduationCap className="w-6 h-6 text-ink dark:text-white mb-4" />, title: 'Pendidikan', desc: 'Politeknik Negeri Subang di program studi D4 Teknologi Rekayasa Perangkat Lunak' },
          { icon: <Briefcase className="w-6 h-6 text-ink dark:text-white mb-4" />, title: 'Projek', desc: 'Telah membuat beberapa projek mobile dan website' },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`glass-panel p-6 rounded-[4px] border border-hairline dark:border-[#242f42] dark:bg-[#121824] hover:border-slate/40 dark:hover:border-slate-400 transition-colors animate-on-scroll animate-fade-up ${cardDelays[idx]}`}
          >
            {card.icon}
            <h4 className="text-base font-semibold text-ink dark:text-white mb-2">{card.title}</h4>
            <p className="text-sm text-slate dark:text-slate-300 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div ref={techHeadRef} className="mb-6 animate-on-scroll animate-slide-left">
        <h3 className="text-[23px] font-semibold text-ink dark:text-white tracking-tight">
          Teknologi yang Saya Gunakan
        </h3>
        <p className="text-sm text-slate dark:text-slate-400 mt-1">
          Stack dan perangkat lunak yang mendukung alur kerja pengembangan
        </p>
      </div>

      {/* Skill icons grid */}
      <div
        ref={iconsRef}
        className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:gap-3"
      >
        {skills.map((skill, idx) => (
          <div
            key={idx}
            style={{ transitionDelay: `${idx * 40}ms` }}
            className="animate-on-scroll animate-zoom-in relative group w-full aspect-square sm:w-20 sm:h-20 bg-paper dark:bg-[#161e2c] border border-hairline dark:border-[#263246] rounded-[10px] flex items-center justify-center hover:border-charcoal dark:hover:border-slate-300 shadow-xs hover:shadow-contra-md transition-all duration-200 cursor-pointer"
          >
            <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105 transition-transform duration-200" />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal dark:bg-slate-100 text-white dark:text-slate-900 text-xs py-1 px-2.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-contra-md">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}