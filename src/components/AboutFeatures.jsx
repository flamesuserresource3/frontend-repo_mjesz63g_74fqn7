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

const CyberShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className="h-36 w-36 text-[#00FFF0]"
    fill="none"
  >
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#00FFF0" />
        <stop offset="100%" stopColor="#1E90FF" />
      </linearGradient>
    </defs>
    <path
      d="M100 15l60 20v48c0 46.4-33.6 88.2-60 101-26.4-12.8-60-54.6-60-101V35l60-20z"
      stroke="url(#g)"
      strokeWidth="3"
      fill="rgba(0,255,240,0.08)"
      filter="url(#glow)"
    />
    <path
      d="M70 95l20 20 40-40"
      stroke="#00FFF0"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g opacity="0.5">
      <circle cx="100" cy="100" r="58" stroke="url(#g)" strokeDasharray="6 8" />
    </g>
  </svg>
);

const AboutFeatures = () => {
  const about = useReveal();
  const features = useReveal();

  const featureItems = [
    { title: 'Gamified Learning', emoji: '🕹️', text: 'Quests, missions, and leaderboards keep you engaged.' },
    { title: 'Real Attack Scenarios', emoji: '🧠', text: 'Hands-on challenges mirror real-world threats.' },
    { title: 'Safe Sandbox Labs', emoji: '⚙️', text: 'Break things safely in isolated practice labs.' },
    { title: 'Progress Analytics', emoji: '📈', text: 'Track skills, strengths, and mastery over time.' },
  ];

  return (
    <section id="about" className="relative w-full bg-[#050B1E] py-20 text-[#E6F1FF]">
      <div
        ref={about.ref}
        className={`mx-auto max-w-6xl px-6 pb-14 text-center transition-all duration-700 ${
          about.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <div className="mb-8 flex items-center justify-center gap-6">
          <CyberShield />
        </div>
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">What is ThreatSim?</h2>
        <p className="mx-auto max-w-3xl text-[#E6F1FF]/80">
          ThreatSim turns cybersecurity training into an interactive experience. Play real-world attack and defense simulations, take micro-lessons, and track your growth — all in one platform.
        </p>
      </div>

      <div
        ref={features.ref}
        className={`mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${
          features.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {featureItems.map((f) => (
          <div
            key={f.title}
            className="group rounded-xl border border-cyan-400/20 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(0,255,240,0.08)] backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,240,0.25)]"
          >
            <div className="mb-2 text-2xl">{f.emoji}</div>
            <h3 className="mb-1 text-lg font-semibold text-[#E6F1FF]">{f.title}</h3>
            <p className="text-sm text-[#E6F1FF]/75">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutFeatures;
