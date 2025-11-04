import React from 'react';
import Hero from './components/Hero.jsx';
import AboutFeatures from './components/AboutFeatures.jsx';
import Preview from './components/Preview.jsx';
import CTAFooter from './components/CTAFooter.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050B1E] text-[#E6F1FF] antialiased">
      <Hero />
      <AboutFeatures />
      <Preview />
      <CTAFooter />
    </div>
  );
}
