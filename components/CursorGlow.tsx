'use client';

import { useEffect, useState, useRef } from 'react';

interface Splatter {
  id: number;
  x: number;
  y: number;
  size: number;
  colorClass: string;
  offsetX: number;
  offsetY: number;
  borderRadius: string;
}

const colors = [
  'bg-cyber-purple',
  'bg-cyber-cyan',
  'bg-cyber-blue',
];

export default function CursorGlow() {
  const [trail, setTrail] = useState<Splatter[]>([]);
  const lastClientPos = useRef({ clientX: 0, clientY: 0 });
  const pointIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  const sprayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const addSplatter = (pageX: number, pageY: number, isSpray: boolean = false, customSpread: number = 80) => {
      const size = Math.floor(Math.random() * 14) + 4; 
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      
      // Semprotan (spray) memiliki sebaran area yang lebih luas, dan bisa membesar
      const spread = isSpray ? customSpread : 20; 
      
      // Menggunakan koordinat polar agar sebaran membentuk lingkaran sempurna, bukan persegi
      const angle = Math.random() * Math.PI * 2;
      // Menggunakan Math.sqrt agar distribusi merata di seluruh area lingkaran
      const radius = Math.sqrt(Math.random()) * (spread / 2);
      
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      const br1 = Math.floor(Math.random() * 50) + 25;
      const br2 = Math.floor(Math.random() * 50) + 25;
      const br3 = Math.floor(Math.random() * 50) + 25;
      const br4 = Math.floor(Math.random() * 50) + 25;
      const borderRadius = `${br1}% ${100 - br1}% ${br2}% ${100 - br2}% / ${br3}% ${br4}% ${100 - br4}% ${100 - br3}%`;

      const newPoint = { 
        id: pointIdRef.current++,
        x: pageX, 
        y: pageY, 
        size,
        colorClass,
        offsetX,
        offsetY,
        borderRadius
      };

      setTrail((prev) => [...prev.slice(-800), newPoint]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== newPoint.id));
      }, 2000);
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastClientPos.current = { clientX: e.clientX, clientY: e.clientY };
      const now = Date.now();
      
      if (now - lastTimeRef.current > 20) { 
        addSplatter(e.pageX, e.pageY);
        lastTimeRef.current = now;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      
      if (e.target instanceof Element) {
        const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"]');
        if (isInteractive) return; 
      }

      lastClientPos.current = { clientX: e.clientX, clientY: e.clientY };
      
      if (sprayIntervalRef.current) clearInterval(sprayIntervalRef.current);
      
      let sprayTick = 0;
      
      sprayIntervalRef.current = setInterval(() => {
        sprayTick++;
        const pageX = lastClientPos.current.clientX + window.scrollX;
        const pageY = lastClientPos.current.clientY + window.scrollY;
        
        // Semakin lama ditahan, semakin luas area semprotannya (maksimal 400px)
        const currentSpread = Math.min(80 + (sprayTick * 10), 400);
        
        // Semakin lebar, semakin banyak titik cat yang disemprotkan
        // Mulai dari 3, maksimal hingga 15 titik per 50ms
        const dropCount = Math.min(3 + Math.floor(sprayTick / 2), 15);
        
        for (let i = 0; i < dropCount; i++) {
          addSplatter(pageX, pageY, true, currentSpread);
        }
      }, 50);
    };

    const handlePointerUp = () => {
      if (sprayIntervalRef.current) {
        clearInterval(sprayIntervalRef.current);
        sprayIntervalRef.current = null;
      }
    };

    const handleScroll = () => {
      if (lastClientPos.current.clientX !== 0 || lastClientPos.current.clientY !== 0) {
        const pageX = lastClientPos.current.clientX + window.scrollX;
        const pageY = lastClientPos.current.clientY + window.scrollY;
        const now = Date.now();
        if (now - lastTimeRef.current > 20) {
          addSplatter(pageX, pageY);
          lastTimeRef.current = now;
        }
      }
    };

    // Menggunakan Pointer Events agar otomatis mendukung Mouse, Touch, dan Pen
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
      if (sprayIntervalRef.current) clearInterval(sprayIntervalRef.current);
    };
  }, []);

  return (
    <>
      {trail.map((point) => (
        <div
          key={point.id}
          className={`absolute pointer-events-none z-0 ${point.colorClass} animate-fade-out opacity-80`}
          style={{
            width: `${point.size}px`,
            height: `${point.size}px`,
            left: `${point.x + point.offsetX}px`,
            top: `${point.y + point.offsetY}px`,
            borderRadius: point.borderRadius,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}
