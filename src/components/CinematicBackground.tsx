import { useEffect, useRef, useState } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Extremely slow drift
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() * -0.15) - 0.05; 
    this.size = Math.random() * 1.5 + 0.5; // Very small
    this.baseOpacity = Math.random() * 0.2 + 0.1; // Very low opacity (0.1 - 0.3)
    this.opacity = this.baseOpacity;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.01 + 0.005;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Subtle pulsing
    this.pulsePhase += this.pulseSpeed;
    this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.1;

    // Wrap around gracefully
    if (this.x < -20) this.x = width + 20;
    if (this.x > width + 20) this.x = -20;
    if (this.y < -20) this.y = height + 20;
    if (this.y > height + 20) this.y = -20;
  }

  draw(ctx: CanvasRenderingContext2D, baseColor: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // Add subtle glow to particle
    ctx.shadowBlur = 10;
    ctx.shadowColor = baseColor;
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Dynamic atmosphere colors based on scroll
  const [atmosphere, setAtmosphere] = useState({
    color1: 'rgba(90, 50, 180, 0.06)',  // Purple
    color2: 'rgba(30, 80, 200, 0.06)'   // Blue
  });

  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handleMqlChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handleMqlChange);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const progress = scrollY / (docHeight || 1);
          
          setScrollProgress(progress);

          // Section-based transition
          setAtmosphere(prev => {
            let nextC1 = prev.color1;
            let nextC2 = prev.color2;

            if (progress < 0.25) {
              // Hero: Slightly purple/blue
              nextC1 = 'rgba(120, 70, 220, 0.05)';
              nextC2 = 'rgba(40, 100, 230, 0.04)';
            } else if (progress < 0.5) {
              // Skills: Slightly cyan/blue
              nextC1 = 'rgba(0, 200, 255, 0.04)';
              nextC2 = 'rgba(100, 50, 220, 0.04)';
            } else if (progress < 0.75) {
              // Projects: Slightly blue
              nextC1 = 'rgba(0, 120, 255, 0.05)';
              nextC2 = 'rgba(0, 180, 255, 0.03)';
            } else {
              // Contact: Slightly purple
              nextC1 = 'rgba(150, 50, 250, 0.05)';
              nextC2 = 'rgba(80, 40, 200, 0.04)';
            }

            if (prev.color1 === nextC1 && prev.color2 === nextC2) return prev;
            return { color1: nextC1, color2: nextC2 };
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mql.removeEventListener('change', handleMqlChange);
    };
  }, []);

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    // LOW density particles
    const numParticles = isMobile ? 12 : 30; 
    const particles = Array.from({ length: numParticles }, () => new Particle(width, height));

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // We base particle glow color on scroll atmosphere roughly
      const particleColor = 'rgba(120, 150, 255, 0.5)';

      particles.forEach(p => {
        p.update(width, height);
        p.draw(ctx, particleColor);
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  // Smooth Mouse Follower
  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) return;
    
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      // Extremely smooth lerp (delay)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // Calculate parallax offsets
  const parallaxY = scrollProgress * 150; 
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="cinematic-bg-container" style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      
      {/* 1. Extremely Faint Developer Grid */}
      <div 
        className="premium-grid"
        style={{
          position: 'absolute',
          inset: -200, // Oversize to allow parallax without clipping
          backgroundSize: '100px 100px', // Large spacing
          transform: `translateY(${-parallaxY * 0.2}px) perspective(1000px) rotateX(20deg)`,
          transformOrigin: 'top center',
          opacity: 0.6,
        }} 
      />

      {/* 2. Soft Radial Glow Orbs (Animated) */}
      {!reducedMotion && (
        <div style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${-parallaxY * 0.1}px)`,
          transition: 'all 1s ease',
        }}>
          {/* Top Left Glow */}
          <div className="glow-orb orb-1" style={{ background: `radial-gradient(circle, ${atmosphere.color1} 0%, transparent 70%)` }} />
          {/* Bottom Right Glow */}
          <div className="glow-orb orb-2" style={{ background: `radial-gradient(circle, ${atmosphere.color2} 0%, transparent 70%)` }} />
          {/* Center Subtle Glow */}
          <div className="glow-orb orb-3" style={{ background: `radial-gradient(circle, ${atmosphere.color1} 0%, transparent 70%)` }} />
        </div>
      )}

      {/* 3. Mouse Interaction Glow */}
      {!reducedMotion && !isMobile && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.015), transparent 100%)`,
          mixBlendMode: 'screen',
        }} />
      )}
      
      {/* 4. Canvas Particles (Parallax Applied) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transform: `translateY(${-parallaxY * 0.3}px)`,
      }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      
      {/* 5. Vignette (Darkens edges to focus center) */}
      <div className="cinematic-vignette" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none'
      }} />

      <style>{`
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .orb-1 {
          top: -20%;
          left: -10%;
          width: 70vw;
          height: 70vh;
          animation: orb-breathe-1 12s infinite alternate ease-in-out;
        }

        .orb-2 {
          bottom: -20%;
          right: -10%;
          width: 80vw;
          height: 80vh;
          animation: orb-breathe-2 15s infinite alternate ease-in-out;
        }

        .orb-3 {
          top: 30%;
          left: 20%;
          width: 60vw;
          height: 60vh;
          animation: orb-breathe-3 10s infinite alternate ease-in-out;
        }

        @keyframes orb-breathe-1 {
          0% { transform: scale(1) translate(0, 0); opacity: 0.6; }
          100% { transform: scale(1.1) translate(5%, 5%); opacity: 0.9; }
        }

        @keyframes orb-breathe-2 {
          0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          100% { transform: scale(1.2) translate(-5%, -5%); opacity: 0.8; }
        }

        @keyframes orb-breathe-3 {
          0% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          100% { transform: scale(1.1) translate(5%, -5%); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
