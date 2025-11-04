import React, { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';

function useTypewriter(words, speed = 60, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t;
    const current = words[index % words.length];
    if (!deleting) {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        t = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 1.6);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text + (deleting ? '' : '█');
}

export default function Preview() {
  const typed = useTypewriter([
    'invoke persistence --technique T1547',
    'simulate credential_access --mode spray',
    'exfiltrate --channel dns --rate stealth',
  ]);

  return (
    <section id="preview" className="relative py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">See your detections respond in real time</h2>
            <p className="mt-3 text-white/75">
              Rehearse incidents before they happen. Observe your stack under realistic pressure and tighten the loop between intel and response.
            </p>
            <a
              href="#get-started"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-sm transition"
            >
              <PlayCircle className="h-4 w-4" />
              Watch a demo
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-cyan-400/10 blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0B132B]/80 backdrop-blur p-4 shadow-2xl rotate-[-2deg]">
              <div className="rounded-md border border-white/10 bg-black/40 p-3 font-mono text-cyan-200 text-sm">
                <div className="text-white/60">$ threatshell</div>
                <div className="mt-1">{typed}</div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="rounded-md h-24 border border-white/10 bg-white/5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
