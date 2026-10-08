"use client";

import React, { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  connectionColor?: string;
  repulseDistance?: number;
  speed?: number;
  isDark?: boolean;
}

export default function ParticleBackground({
  particleCount = 70,
  particleColor,
  connectionColor,
  repulseDistance = 120,
  speed = 1,
  isDark = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    // @ts-ignore - Particle class is defined below
    let particles: Particle[] = [];

    const defaultParticleColor = isDark ? "rgba(0, 243, 255, 0.4)" : "rgba(0, 102, 255, 0.4)";
    const defaultLineColor = isDark ? "rgba(0, 243, 255, 0.15)" : "rgba(0, 102, 255, 0.15)";
    
    const pColor = particleColor || defaultParticleColor;
    const lColor = connectionColor || defaultLineColor;

    let mouse = {
      x: -1000,
      y: -1000,
      radius: repulseDistance,
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = pColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Pantulan di tepi layar untuk sumbu X
        if (this.x >= canvas!.width || this.x <= 0) this.vx = -this.vx;
        
        // Wrap-around untuk sumbu Y agar mendukung efek scroll yang mulus
        if (this.y >= canvas!.height) this.y -= canvas!.height;
        if (this.y < 0) this.y += canvas!.height;

        // Logika tolakan kursor (Repulsion)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Jarak interaksi
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    const init = () => {
      particles = [];
      // Sesuaikan jumlah partikel dengan ukuran layar
      const count = Math.floor((canvas.width * canvas.height) / 15000) * (particleCount / 50);
      for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentScrollY = window.scrollY;
      // Gunakan faktor 0.5 untuk efek parallax (scroll lebih lambat dari layar)
      const scrollDelta = (currentScrollY - lastScrollY) * 0.5;
      lastScrollY = currentScrollY;
      
      for (let i = 0; i < particles.length; i++) {
        // Geser partikel berdasarkan scroll
        particles[i].y -= scrollDelta;

        particles[i].update();
        particles[i].draw();
        
        // Gambar garis antar partikel yang berdekatan
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = lColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, particleCount, particleColor, connectionColor, repulseDistance, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
