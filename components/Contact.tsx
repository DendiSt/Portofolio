'use client';

import { useState } from 'react';
import { Mail, MessageCircle, AtSign, Send } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const headingRef = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const leftRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const rightRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

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
    { icon: <Mail />, label: "Email", value: "dendist0402@gmail.com", href: "mailto:dendist0402@gmail.com", color: "hover:shadow-neon-cyan hover:border-cyber-cyan" },
    { icon: <MessageCircle />, label: "WhatsApp", value: "Chat Langsung", href: "https://wa.me/6285295619819?text=Halo%20Dendi%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut%20tentang%20peluang%20kerja%20sama.", color: "hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:border-[#25D366]" },
    { icon: <AtSign />, label: "Instagram", value: "@denst04_", href: "https://instagram.com/denst04_", color: "hover:shadow-neon-purple hover:border-cyber-purple" },
  ];

  return (
    <section id="contact" className="py-20 scroll-mt-20 z-10 relative">
      <div ref={headingRef} className="mb-8 animate-on-scroll animate-slide-left">
        <h3 className="text-[23px] font-semibold text-ink dark:text-white tracking-tight">
          Kontak &amp; Kolaborasi
        </h3>
        <p className="text-sm text-slate dark:text-slate-400 mt-1">
          Mari berdiskusi mengenai proyek IoT, Backend, atau peluang kerja sama
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: contact links — slide in from left */}
        <div
          ref={leftRef}
          className="space-y-6 animate-on-scroll animate-slide-left delay-200"
        >
          <p className="text-slate dark:text-slate-300 mb-8">
            Tertarik untuk bekerja sama, berdiskusi tentang IoT, atau membangun sistem Web &amp; Mobile yang keren? Jangan ragu untuk menghubungi saya melalui platform di bawah ini.
          </p>
          <div className="space-y-4">
            {contactLinks.map((contact, idx) => (
              <a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-[4px] glass-panel border border-hairline dark:border-[#242f42] dark:bg-[#121824] shadow-contra-md group hover:bg-mist dark:hover:bg-[#161e2c] transition-all"
              >
                <div className="p-3 rounded-full bg-mist dark:bg-[#1a2332] text-ink dark:text-white group-hover:scale-105 transition-transform border border-hairline dark:border-[#242f42]">
                  {contact.icon}
                </div>
                <div>
                  <h5 className="font-medium text-xs text-slate dark:text-slate-400">{contact.label}</h5>
                  <p className="font-semibold text-ink dark:text-white text-sm">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form — slide in from right */}
        <div
          ref={rightRef}
          className="glass-panel p-7 rounded-[4px] border border-hairline dark:border-[#242f42] dark:bg-[#121824] shadow-contra-md relative overflow-hidden animate-on-scroll animate-slide-right delay-300"
        >
          

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slate-300">Nama</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full bg-mist dark:bg-[#0f1422] border border-hairline dark:border-[#242f42] rounded-[10px] py-2.5 px-3.5 text-sm outline-none focus:border-ink dark:focus:border-white transition-colors text-ink dark:text-white placeholder:text-fog dark:placeholder:text-slate-500"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slate-300">Email</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full bg-transparent border-2 border-slate-300 dark:border-slate-700 rounded-lg p-3 outline-none focus:border-cyber-purple focus:shadow-neon-purple transition-all text-cyber-black dark:text-white"
                placeholder="alamat@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slate-300">Pesan</label>
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
            {status === 'error' && <p className="text-red-500 font-bold text-center mt-2">Gagal mengirim pesan. Coba lagi.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}