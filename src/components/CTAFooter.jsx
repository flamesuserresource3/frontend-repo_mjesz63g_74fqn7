import { useEffect, useRef, useState } from 'react';

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
};

const CTAFooter = () => {
  const { ref, visible } = useReveal();
  return (
    <section className="relative w-full bg-[#050B1E] pb-12 pt-16 text-[#E6F1FF]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(30,144,255,0.08),transparent_60%)]" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-6 text-center transition-all duration-700 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <h3 className="mb-3 text-2xl font-bold sm:text-3xl">Ready to defend the digital frontier?</h3>
        <div className="mb-2 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-400/10 px-8 py-3 text-sm font-semibold text-[#E6F1FF] shadow-[0_0_24px_rgba(0,255,240,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(0,255,240,0.35)] focus:outline-none focus:ring-2 focus:ring-[#00FFF0]/60"
          >
            <span className="relative">
              Join the Beta
              <span className="absolute inset-0 -z-10 animate-pulse rounded blur-md opacity-60 bg-[#00FFF0]/20" />
            </span>
          </a>
        </div>
        <p className="text-sm text-[#E6F1FF]/70">Powered by AI · Built for Cyber Warriors</p>
      </div>

      <footer className="relative mx-auto mt-14 max-w-6xl px-6 text-center text-xs text-[#E6F1FF]/60">
        © 2025 ThreatSim · Ethical Tech for Global Good.
      </footer>
    </section>
  );
};

export default CTAFooter;
