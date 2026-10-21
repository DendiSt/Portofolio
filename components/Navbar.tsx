'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Kunci scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-panel border border-hairline dark:border-[#242f42] rounded-[16px] px-6 py-3.5 flex justify-between items-center max-w-[1200px] mx-auto left-0 right-0 mt-3 backdrop-blur-md bg-paper/90 dark:bg-[#0f1422]/90 shadow-contra-md">

        {/* ── BRAND (MOBILE & DESKTOP) ── */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-[10px] border border-hairline dark:border-[#242f42] text-ink dark:text-white hover:bg-mist dark:hover:bg-[#1a2332] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-base md:text-lg font-bold tracking-tight text-ink dark:text-white">
            DENDI SUTIYA
          </div>
        </div>

        {/* ── DESKTOP: nav links + toggle ── */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-slate dark:text-slate-300 hover:text-ink dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-mist dark:hover:bg-[#1a2332] text-slate dark:text-slate-300 hover:text-ink dark:hover:text-white transition-colors border border-transparent hover:border-hairline dark:hover:border-[#242f42]"
            aria-label="Toggle theme"
          >
            {isDark
              ? <Sun className="w-4 h-4 text-white" />
              : <Moon className="w-4 h-4 text-charcoal" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE: Dropdown menu ── */}
      <div
        className={`
          fixed inset-x-0 top-0 z-40 md:hidden
          glass-panel border-b border-hairline dark:border-[#242f42] dark:bg-[#0f1422]
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
        style={{ paddingTop: '5.5rem' }}
      >
        <ul className="flex flex-col px-6 pb-6 gap-1">
          {navLinks.map((link, idx) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center gap-3 py-2.5 px-4 rounded-[10px] text-sm font-medium text-slate dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-mist dark:hover:bg-[#1a2332] transition-all group"
                style={{ transitionDelay: menuOpen ? `${idx * 40}ms` : '0ms' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop / overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-ink/30 dark:bg-black/60 backdrop-blur-xs"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}