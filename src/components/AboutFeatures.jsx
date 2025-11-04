import React from 'react';
import { ShieldCheck, Radar, Activity, Layers } from 'lucide-react';

const features = [
  {
    title: 'Adversary Emulation',
    desc: 'Chain techniques into realistic campaigns that probe your defenses like a real threat actor.',
    icon: ShieldCheck,
  },
  {
    title: 'Signal-Rich Telemetry',
    desc: 'Stream events and artifacts to validate detections across endpoints, network, and cloud.',
    icon: Activity,
  },
  {
    title: 'Coverage Insights',
    desc: 'Map to ATT&CK, quantify control drift, and find blind spots before attackers do.',
    icon: Radar,
  },
  {
    title: 'Composable Scenarios',
    desc: 'Reusable building blocks let you compose, version, and share simulation playbooks.',
    icon: Layers,
  },
];

export default function AboutFeatures() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Built for modern defenders</h2>
          <p className="mt-3 text-white/75">
            ThreatSim accelerates purple-team programs with repeatable, measurable simulations that evolve with your stack.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="group rounded-lg border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-md bg-cyan-400/15 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
