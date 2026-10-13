import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Skills from './components/Skills';
import AITools from './components/AITools';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import CinematicBackground from './components/CinematicBackground';
import InteractiveAvatar from './components/InteractiveAvatar';

export type IntroPhase = 'initial' | 'playing' | 'avatar-reveal' | 'icons-orbit' | 'message' | 'transforming' | 'completed';

function App() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return 'completed';
    return 'initial'; 
  });

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (introPhase !== 'completed') {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introPhase]);

  return (
    <>
      <CustomCursor />
      <CommandPalette />

      {introPhase !== 'completed' && <Intro phase={introPhase} setPhase={setIntroPhase} />}

      <Navbar introPhase={introPhase} />

      <div className={introPhase === 'completed' ? 'app-enter' : ''} style={{ 
        opacity: introPhase === 'completed' ? 1 : 0,
        pointerEvents: introPhase === 'completed' ? 'auto' : 'none',
        transition: 'opacity 1s ease-in-out'
      }}>
        <CinematicBackground />
        
        <main>
          <Hero />
          <Dashboard />
          <InteractiveAvatar />
          <About />
          <Skills />
          <AITools />
          <Projects />
          <Certifications />
          <Achievements />
          <Education />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;

