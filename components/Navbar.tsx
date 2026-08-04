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
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 rounded-b-2xl px-6 py-4 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 mt-2">

        {/* ── BRAND (MOBILE & DESKTOP) ── */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-xl border border-cyber-blue/40 dark:border-cyber-cyan/40 text-cyber-blue dark:text-cyber-cyan hover:bg-cyber-blue/10 dark:hover:bg-cyber-cyan/10 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-lg md:text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple">
            DENDI SUTIYA
          </div>
        </div>

        {/* ── DESKTOP: nav links + toggle ── */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-cyber-blue dark:hover:text-cyber-cyan transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle (selalu tampil) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark
              ? <Sun className="text-cyber-cyan w-5 h-5" />
              : <Moon className="text-cyber-blue w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE: Dropdown menu ── */}
      <div
        className={`
          fixed inset-x-0 top-0 z-40 md:hidden
          glass-panel border-b border-cyber-cyan/30
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
        style={{ paddingTop: '5rem' }}
      >
        <ul className="flex flex-col px-6 pb-6 gap-1">
          {navLinks.map((link, idx) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center gap-3 py-3 px-4 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:text-cyber-blue dark:hover:text-cyber-cyan hover:bg-cyber-blue/10 dark:hover:bg-cyber-cyan/10 transition-all group"
                style={{ transitionDelay: menuOpen ? `${idx * 50}ms` : '0ms' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue dark:bg-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop / overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-cyber-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}