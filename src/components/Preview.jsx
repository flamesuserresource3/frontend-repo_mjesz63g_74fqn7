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

const Typewriter = ({ text, speed = 45 }) => {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOut((prev) => text.slice(0, i + 1));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span>{out}</span>;
};

const Preview = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="preview" className="relative w-full bg-[#050B1E] py-24 text-[#E6F1FF]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,240,0.08),transparent_60%)]" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-6 transition-all duration-700 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">Peek inside the Arena</h2>
        {/* Tilted glowing frame */}
        <div className="mx-auto w-full max-w-4xl -rotate-1">
          <div className="rounded-xl bg-gradient-to-br from-[#00FFF0] to-[#1E90FF] p-[2px] shadow-[0_0_40px_rgba(0,255,240,0.25)]">
            <div className="rounded-[10px] bg-[#071028] p-4 sm:p-6">
              {/* Mock interface */}
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-sm text-[#E6F1FF]/70">threatsim://lab/session-042</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <div className="sm:col-span-3 rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 text-xs text-[#00FFF0]">/usr/bin/threatsim</div>
                  <div className="font-mono text-sm leading-relaxed text-[#E6F1FF]/90">
                    <div>$ nmap -A 10.0.3.7</div>
                    <div>PORT   STATE SERVICE VERSION</div>
                    <div>22/tcp open  ssh     OpenSSH 8.9p1</div>
                    <div>80/tcp open  http    nginx 1.20.2</div>
                    <div className="text-[#1E90FF]">Hint: Try a directory brute-force...</div>
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-4">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 text-xs text-[#00FFF0]">Objectives</div>
                    <ul className="list-disc pl-5 text-sm text-[#E6F1FF]/90">
                      <li>Identify exposed services</li>
                      <li>Gain limited shell access</li>
                      <li>Escalate privileges</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 text-xs text-[#00FFF0]">Telemetry</div>
                    <div className="h-16 w-full rounded bg-gradient-to-r from-[#00FFF0]/20 to-[#1E90FF]/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typewriter */}
        <p className="mx-auto mt-8 w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-center font-mono text-sm text-[#E6F1FF]/90 shadow-[0_0_24px_rgba(0,255,240,0.15)]">
          <Typewriter text="Initializing ThreatSim Environment…" />
        </p>
      </div>
    </section>
  );
};

export default Preview;
