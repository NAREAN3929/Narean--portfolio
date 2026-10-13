import { useState, useEffect } from 'react';
import Scene from './canvas/Scene';
import { ArrowRight, Download, MessageSquare, ChevronDown } from 'lucide-react';
import TechIcon from './TechIcon';
import '../intro.css'; // Reuse intro styles but adapt

type IntroState =
  | 'LOADING'
  | 'DARKNESS'          // 0.0 - 2.0s
  | 'PLATFORM_REVEAL'   // 2.0 - 3.0s
  | 'AVATAR_REVEAL'     // 3.0 - 6.0s
  | 'INTERACTIVE'       // 6.0 - 10.0s (Show "DRAG TO EXPLORE")
  | 'HERO_MODE';        // 10.0s+ (Main portfolio layout)

const techStack = ['Java', 'SQL', 'MySQL', 'HTML', 'CSS', 'DBMS', 'Data Structures'];

export default function CinematicHero() {
  const [phase, setPhase] = useState<IntroState>('LOADING');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  useEffect(() => {
    // Check if intro has already been played
    if (sessionStorage.getItem('introPlayed') === 'true') {
      setPhase('HERO_MODE');
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    // Simulate initial load
    setTimeout(() => setPhase('DARKNESS'), 500);
  }, []);

  // Timeline Manager
  useEffect(() => {
    if (phase === 'LOADING' || phase === 'HERO_MODE') return;

    if (reducedMotion) {
      setPhase('HERO_MODE');
      sessionStorage.setItem('introPlayed', 'true');
      return;
    }

    let timer: number;
    if (phase === 'DARKNESS') {
      timer = setTimeout(() => setPhase('PLATFORM_REVEAL'), 2000);
    } else if (phase === 'PLATFORM_REVEAL') {
      timer = setTimeout(() => setPhase('AVATAR_REVEAL'), 1000);
    } else if (phase === 'AVATAR_REVEAL') {
      timer = setTimeout(() => setPhase('INTERACTIVE'), 3000);
    } else if (phase === 'INTERACTIVE') {
      timer = setTimeout(() => {
        setPhase('HERO_MODE');
        sessionStorage.setItem('introPlayed', 'true');
      }, 4000); // 4 seconds of forced interactive mode before showing hero
    }

    return () => clearTimeout(timer);
  }, [phase, reducedMotion]);

  const handleSkip = () => {
    sessionStorage.setItem('introPlayed', 'true');
    setPhase('HERO_MODE');
  };

  const isHero = phase === 'HERO_MODE';

  return (
    <section 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        paddingTop: isHero ? 'var(--nav-height)' : '0',
        overflow: 'hidden'
      }}
      onPointerDown={() => setHasInteracted(true)}
    >
      {/* 3D Canvas Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        transition: 'all 2s ease-in-out',
        pointerEvents: 'auto',
        // In hero mode, we shift the canvas slightly to the right using CSS or within the Scene camera
        width: isHero ? '100%' : '100%',
        height: '100%'
      }}>
        {phase !== 'LOADING' && phase !== 'DARKNESS' && (
          <Scene phase={phase} reducedMotion={reducedMotion} />
        )}
      </div>

      {/* Intro Overlay UI */}
      {!isHero && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          {phase === 'INTERACTIVE' && !hasInteracted && (
            <div style={{
              position: 'absolute',
              bottom: '20%',
              color: 'var(--text-secondary)',
              letterSpacing: '0.2em',
              animation: 'pulse 2s infinite',
              fontSize: '0.875rem'
            }}>
              [ DRAG TO EXPLORE ]
            </div>
          )}

          {phase !== 'LOADING' && (
            <button 
              onClick={handleSkip} 
              style={{ position: 'absolute', bottom: '2rem', right: '2rem', pointerEvents: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              Skip Intro <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}

      {/* Main Hero Content */}
      <div 
        className="container" 
        style={{ 
          width: '100%', 
          zIndex: 5, 
          position: 'relative',
          opacity: isHero ? 1 : 0,
          transform: isHero ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease-in-out 0.5s',
          pointerEvents: isHero ? 'auto' : 'none'
        }}
      >
        <div 
          className="hero-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 1fr', 
            gap: '4rem', 
            alignItems: 'center',
            padding: '2rem 0'
          }}
        >
          {/* LEFT CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: 'radial-gradient(circle at left, rgba(10,15,29,0.8) 0%, transparent 80%)', padding: '2rem', borderRadius: '24px' }}>
            
            <h1 className="anim-name" style={{ fontSize: '4.5rem', marginBottom: '0.5rem', lineHeight: '1', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Narean Karthikeyan K
            </h1>
            
            <h2 className="anim-title text-gradient text-glow" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              Aspiring Data Engineer
            </h2>

            <p className="anim-intro" style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '2.5rem',
              maxWidth: '90%',
              lineHeight: '1.6'
            }}>
              Building scalable data pipelines, optimizing databases, and transforming complex data into actionable insights.
            </p>

            <div className="anim-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
              {techStack.map((tech, i) => (
                <span 
                  key={tech}
                  className="anim-badge-item glass-panel"
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    animationDelay: `${1 + i * 0.1}s`,
                    border: '1px solid var(--accent-border)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="anim-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#projects" className="magnetic-btn primary">
                View My Projects <ArrowRight size={18} />
              </a>
              <a href="/resume.pdf" download="Narean_Karthikeyan_Resume.pdf" target="_blank" rel="noopener noreferrer" className="magnetic-btn">
                Download Resume <Download size={18} />
              </a>
              <a href="#contact" className="magnetic-btn">
                Let's Connect <MessageSquare size={18} />
              </a>
            </div>

            {/* Social Links */}
            <div className="anim-socials" style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', alignItems: 'center' }}>
              <a href="https://github.com/NAREAN3929" target="_blank" rel="noreferrer" aria-label="GitHub Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <TechIcon name="GitHub" size={24} />
              </a>
              <a href="https://linkedin.com/in/narean3929" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <TechIcon name="LinkedIn" size={24} />
              </a>
            </div>

          </div>

          {/* RIGHT CONTENT - Handled entirely by the 3D Canvas in the background */}
          <div className="anim-visual" style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Empty because 3D canvas is absolute behind it */}
          </div>

        </div>
      </div>

      {isHero && (
        <div 
          className="scroll-indicator" 
          style={{ 
            position: 'absolute', 
            bottom: '2rem', 
            left: '50%', 
            transform: 'translateX(-50%)',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'float 2s infinite ease-in-out'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll</span>
          <ChevronDown size={20} />
        </div>
      )}

    </section>
  );
}
