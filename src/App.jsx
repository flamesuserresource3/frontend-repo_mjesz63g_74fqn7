import Hero from './components/Hero';
import AboutFeatures from './components/AboutFeatures';
import Preview from './components/Preview';
import CTAFooter from './components/CTAFooter';

function App() {
  return (
    <div className="min-h-screen w-full scroll-smooth bg-[#050B1E] font-sans text-[#E6F1FF]">
      <Hero />
      <AboutFeatures />
      <Preview />
      <CTAFooter />
    </div>
  );
}

export default App;
