import React, { useEffect, useRef, useState, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Shield, MousePointerClick } from 'lucide-react';

function CursorTrail() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, moved: false });
  const rafRef = useRef(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) * window.devicePixelRatio;
      mouse.current.y = (e.clientY - rect.top) * window.devicePixelRatio;
      mouse.current.moved = true;
      // spawn a few subtle particles
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 8,
          y: mouse.current.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0.9,
          size: 0.8 + Math.random() * 1.2,
          hue: 200 + Math.random() * 20, // sky/cyan range
        });
      }
    };
    container.addEventListener('mousemove', onMove);
    container.addEventListener(
      'touchmove',
      (e) => {
        if (!e.touches[0]) return;
        const t = e.touches[0];
        onMove({ clientX: t.clientX, clientY: t.clientY });
      },
      { passive: true }
    );
    return () => {
      container.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      // translucent fade
      ctx.fillStyle = 'rgba(5, 11, 30, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life -= 0.03;
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }
        const alpha = Math.max(0, Math.min(0.5, p.life));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
        grad.addColorStop(1, 'hsla(200, 100%, 50%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // prime background for nicer trail
    ctx.fillStyle = 'rgba(5, 11, 30, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default function Hero() {
  const contentRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = contentRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: relX * 12, y: relY * 12 });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      {/* Spline 3D background cover (new sky blue asset) */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Dim, translucent scrim to keep background from overpowering text */}
      <div className="absolute inset-0 bg-[#050B1E]/55" />

      {/* Soft gradient vignettes that don't block interaction */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-80 w-80 bg-sky-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Cursor particle trail overlay (already pointer-events-none) */}
      <CursorTrail />

      {/* Foreground content with blue backdrop behind text */}
      <div
        ref={contentRef}
        onMouseMove={onMouseMove}
        className="relative container mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div
          style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
          className="relative transition-transform duration-150 will-change-transform"
        >
          {/* Blue glow panel behind the text */}
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 md:-inset-x-10 md:-inset-y-10 z-0">
            <div className="mx-auto max-w-3xl h-full rounded-[28px] bg-gradient-to-b from-sky-500/30 via-sky-500/20 to-transparent blur-2xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/6 backdrop-blur px-3 py-1 text-xs md:text-sm border border-white/10">
              <Shield className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-cyan-200/90">ThreatSim</span>
              <span className="text-white/70">Adaptive Attack Simulation</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Red-team realism. Blue-team resilience.
            </h1>
            <p className="mt-4 max-w-2xl text-white/85">
              Train detection pipelines against living, breathing simulations. Orchestrate adversary behavior, stress-test controls, and level up your response.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-400/90 hover:bg-cyan-300 text-black px-5 py-3 font-medium shadow-[0_0_30px_rgba(0,255,240,0.35)] hover:shadow-[0_0_40px_rgba(0,255,240,0.5)] transition"
              >
                <Rocket className="h-4 w-4" />
                Launch a Simulation
              </a>
              <a
                href="#preview"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3 font-medium text-white/90 transition"
              >
                <MousePointerClick className="h-4 w-4" />
                See It in Action
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/75">
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Atomic TTPs</div>
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">MITRE ATT&CK Mapping</div>
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Live Telemetry</div>
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Team Workflows</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
