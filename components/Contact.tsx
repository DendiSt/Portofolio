'use client';

import { useState } from 'react';
import { Mail, MessageCircle, AtSign, Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const headingRef  = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const leftRef     = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const rightRef    = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const contactLinks = [
    { icon: <Mail />,           label: "Email",     value: "dendist0402@gmail.com",  href: "mailto:dendist0402@gmail.com",         color: "hover:shadow-neon-cyan hover:border-cyber-cyan" },
    { icon: <MessageCircle />,  label: "WhatsApp",  value: "Chat Langsung",           href: "https://wa.me/6285295619819",           color: "hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:border-[#25D366]" },
    { icon: <AtSign />,         label: "Instagram", value: "@denst04_",               href: "https://instagram.com/denst04_",        color: "hover:shadow-neon-purple hover:border-cyber-purple" },
  ];

  return (
    <section id="contact" className="py-20 scroll-mt-20 z-10 relative">
      <h3
        ref={headingRef}
        className="text-3xl font-black mb-8 border-l-4 border-cyber-cyan pl-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan dark:from-cyber-cyan dark:to-cyber-blue animate-on-scroll animate-slide-left"
      >
        Contact &amp; Collaboration
      </h3>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: contact links — slide in from left */}
        <div
          ref={leftRef}
          className="space-y-6 animate-on-scroll animate-slide-left delay-200"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Tertarik untuk bekerja sama, berdiskusi tentang IoT, atau membangun sistem Web &amp; Mobile yang keren? Jangan ragu untuk menghubungi saya melalui platform di bawah ini.
          </p>
          <div className="space-y-4">
            {contactLinks.map((contact, idx) => (
              <a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl glass-panel group transition-all duration-300 border border-transparent ${contact.color}`}
              >
                <div className="p-3 rounded-full bg-slate-200 dark:bg-cyber-dark text-cyber-black dark:text-white group-hover:scale-110 transition-transform">
                  {contact.icon}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-500 dark:text-slate-400">{contact.label}</h5>
                  <p className="font-semibold text-cyber-black dark:text-white">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form — slide in from right */}
        <div
          ref={rightRef}
          className="glass-panel p-8 rounded-2xl relative overflow-hidden animate-on-scroll animate-slide-right delay-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple dark:from-cyber-cyan dark:to-cyber-purple"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-cyber-black dark:text-slate-300">Nama</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full bg-transparent border-2 border-slate-300 dark:border-slate-700 rounded-lg p-3 outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all text-cyber-black dark:text-white"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-cyber-black dark:text-slate-300">Email</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full bg-transparent border-2 border-slate-300 dark:border-slate-700 rounded-lg p-3 outline-none focus:border-cyber-purple focus:shadow-neon-purple transition-all text-cyber-black dark:text-white"
                placeholder="alamat@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-cyber-black dark:text-slate-300">Pesan</label>
              <textarea
                name="message" required rows={4} value={formData.message} onChange={handleChange}
                className="w-full bg-transparent border-2 border-slate-300 dark:border-slate-700 rounded-lg p-3 outline-none focus:border-cyber-blue focus:shadow-neon-cyan transition-all text-cyber-black dark:text-white resize-none"
                placeholder="Ceritakan tentang proyek Anda..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-lg font-bold bg-cyber-blue dark:bg-cyber-cyan text-white dark:text-cyber-black shadow-neon-cyan hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Mengirim...' : <><Send size={18} /> Kirim Pesan</>}
            </button>

            {status === 'success' && <p className="text-green-500 font-bold text-center mt-2 animate-pulse">Pesan berhasil dikirim! 🚀</p>}
            {status === 'error'   && <p className="text-red-500 font-bold text-center mt-2">Gagal mengirim pesan. Coba lagi.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}