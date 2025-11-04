import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050B1E] text-[#E6F1FF]"
    >
      {/* Spline background */}
      <div className="absolute inset-0">
        {mounted && (
          <Spline
            scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      {/* Gradient and vignette overlays (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,240,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050B1E]/10 via-transparent to-[#050B1E]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
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
    </section>
  );
};

export default Hero;
