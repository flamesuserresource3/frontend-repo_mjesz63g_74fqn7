import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTAFooter() {
  return (
    <footer id="get-started" className="relative py-16">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">Ready to pressure‑test your defenses?</h3>
              <p className="mt-2 text-white/75">Spin up a realistic attack path and watch your signals light up.</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-400/90 hover:bg-cyan-300 text-black px-5 py-3 font-medium shadow-[0_0_30px_rgba(0,255,240,0.35)] hover:shadow-[0_0_40px_rgba(0,255,240,0.5)] transition"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
