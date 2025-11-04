import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

// Lightweight cursor trail rendered on a pointer-events-none canvas
function CursorTrail({ containerRef }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const rafRef = useRef(0);

  // Listen to mouse on the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.inside = true;
    };
    const onLeave = () => {
      mouseRef.current.inside = false;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  // Resize canvas to match container bounds and device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => ro.disconnect();
  }, [containerRef]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const step = () => {
      const { width, height } = canvas;
      // Slight transparent fill for motion trails
      ctx.fillStyle = 'rgba(5, 11, 30, 0.18)';
      ctx.fillRect(0, 0, width, height);

      // Spawn particles only when inside
      if (mouseRef.current.inside) {
        const { x, y } = mouseRef.current;
        const spawn = 3; // small burst per frame while moving
        for (let s = 0; s < spawn; s += 1) {
          if (particlesRef.current.length < 220) {
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 6,
              y: y + (Math.random() - 0.5) * 6,
              vx: (Math.random() - 0.5) * 1.1,
              vy: (Math.random() - 0.5) * 1.1,
              r: 1.6 + Math.random() * 2.6,
              life: 1,
              hue: Math.random() < 0.5 ? 178 : 207,
            });
          } else {
            break;
          }
        }
      }

      const next = [];
      for (let i = 0; i < particlesRef.current.length; i += 1) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life *= 0.96; // fade out faster for performance

        if (p.life > 0.06) {
          next.push(p);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          const color = `hsla(${p.hue}, 100%, 60%, ${0.16 * p.life})`;
          g.addColorStop(0, color);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      particlesRef.current = next;

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 block"
    />
  );
}

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Foreground content parallax
  const handleMouseMove = (e) => {
    const el = contentRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const rect = container.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const x = relX / rect.width - 0.5;
    const y = relY / rect.height - 0.5;
    el.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = contentRef.current;
    if (!el) return;
    el.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050B1E] text-[#E6F1FF]"
    >
      {/* Spline background (interactive) */}
      <div className="absolute inset-0">
        {mounted && (
          <Spline
            scene="https://prod.spline.design/GAomjSvthYZG1LLN/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      {/* Cursor trail canvas (non-blocking) */}
      <CursorTrail containerRef={containerRef} />

      {/* Non-blocking overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,240,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050B1E]/10 via-transparent to-[#050B1E]" />

      {/* Playful floating badges */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-10 top-24 select-none rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,255,240,0.25)] animate-bounce">GG</span>
        <span className="absolute right-12 top-32 select-none rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200 shadow-[0_0_20px_rgba(30,144,255,0.25)] animate-pulse">XP +10</span>
        <span className="absolute bottom-24 left-1/4 select-none rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,255,240,0.25)] animate-ping">★</span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div ref={contentRef} className="transition-transform duration-150 will-change-transform">
          <h1 className="mb-4 bg-gradient-to-r from-[#00FFF0] to-[#1E90FF] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            ThreatSim — Play. Learn. Defend.
          </h1>
          <p className="mb-10 max-w-2xl text-base/relaxed text-[#E6F1FF]/80 sm:text-lg">
            The ultimate gamified cybersecurity training platform.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#about"
              className="group inline-flex items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-[#E6F1FF] shadow-[0_0_24px_rgba(0,255,240,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(0,255,240,0.35)] focus:outline-none focus:ring-2 focus:ring-[#00FFF0]/60"
            >
              <span className="relative">
                Start Learning
                <span className="absolute inset-0 -z-10 animate-pulse rounded blur-md opacity-60 bg-[#00FFF0]/20" />
              </span>
            </a>
            <a
              href="#preview"
              className="group inline-flex items-center justify-center rounded-md border border-sky-300/30 bg-sky-400/10 px-6 py-3 text-sm font-semibold text-[#E6F1FF] shadow-[0_0_24px_rgba(30,144,255,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-[0_0_40px_rgba(30,144,255,0.35)] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/60"
            >
              <span className="relative">
                Launch Simulation
                <span className="absolute inset-0 -z-10 animate-pulse rounded blur-md opacity-60 bg-[#1E90FF]/20" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
