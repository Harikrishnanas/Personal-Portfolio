import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

import Hero from './components/Hero';
import StackedProjects from './components/StackedProjects';
import SkillsVisualizer from './components/SkillsVisualizer';
import AboutContact from './components/AboutContact';
import FloatingCommandNode from './components/FloatingCommandNode';
import './index.css';

function App() {
  const [lenisRef, setLenisRef] = useState(null);

  useEffect(() => {
    // 1. Initialize Lenis for Smooth Inertia Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    setLenisRef(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Global Mouse Tracker for Dynamic Lighting Engine
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-app relative w-full bg-black min-h-screen">
      {/* Dynamic Cursor Lighting Overlay */}
      <div className="mouse-light-mask z-[9999]"></div>

      {/* Floating Command Palette */}
      <FloatingCommandNode lenis={lenisRef} />

      <main className="relative w-full">
        {/* Sticky Hero Anchor */}
        <Hero />

        {/* Overlapping Content Container */}
        <div className="relative z-10 bg-black flex flex-col w-full shadow-[0_-20px_50px_rgba(0,0,0,1)]">
          
          <section id="projects" className="w-full min-h-screen flex items-center justify-center py-24">
            <div className="w-full max-w-7xl mx-auto px-4">
              <StackedProjects />
            </div>
          </section>

          <section id="skills" className="w-full min-h-screen flex items-center justify-center py-24">
             <div className="w-full max-w-5xl mx-auto pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 shadow-2xl">
              <h2 className="section-title text-center mb-8 text-white">
                Technical <span className="liquid-chrome-text">Arsenal</span>
              </h2>
              <SkillsVisualizer />
            </div>
          </section>

          <section id="about" className="w-full min-h-screen flex items-center justify-center py-24">
             <div className="w-full max-w-5xl mx-auto pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 shadow-2xl">
              <AboutContact />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;
