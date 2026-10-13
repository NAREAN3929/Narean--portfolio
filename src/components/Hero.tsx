import React from 'react';
import { ArrowRight, Download, MessageSquare, ChevronDown, Database, Network } from 'lucide-react';
import { FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa6';
import { SiMysql } from 'react-icons/si';
import TechIcon from './TechIcon';

const techStack = [
  { name: 'Java', color: '#e879f9', delay: '0s', icon: <FaJava size={16} /> },
  { name: 'SQL', color: '#60a5fa', delay: '-1s', icon: <Database size={16} /> },
  { name: 'MySQL', color: '#22d3ee', delay: '-2s', icon: <SiMysql size={16} /> },
  { name: 'HTML', color: '#fb923c', delay: '-3s', icon: <FaHtml5 size={16} /> },
  { name: 'CSS', color: '#38bdf8', delay: '-4s', icon: <FaCss3Alt size={16} /> },
  { name: 'DBMS', color: '#a78bfa', delay: '-5s', icon: <Database size={16} /> }
];

const dsStack = { name: 'Data Structures', color: '#2dd4bf', delay: '-2.5s', icon: <Network size={16} /> };

export default function Hero() {
  return (
    <section 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'var(--nav-height)' 
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div 
          className="hero-grid-layout"
          style={{ 
            display: 'grid', 
            gap: '4rem', 
            alignItems: 'center',
            padding: '2rem 0'
          }}
        >
          {/* LEFT CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            
            <h1 className="anim-name" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', marginBottom: '0.5rem', lineHeight: '1.1', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.03em', wordBreak: 'keep-all', maxWidth: '100%' }}>
              Narean Karthikeyan&nbsp;K
            </h1>
            
            <h2 className="anim-title text-gradient text-glow" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 600, backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
              Aspiring Data Engineer
            </h2>

            <p className="anim-intro" style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '2.5rem',
              maxWidth: '90%',
              lineHeight: '1.6'
            }}>
              Building reliable data pipelines, optimizing databases, and turning raw data into structured, actionable insights.
            </p>

            <div className="anim-badges tech-path-container" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem', maxWidth: '100%', overflowX: 'auto', paddingLeft: '2.5rem', paddingBottom: '0.5rem' }}>
              
              {/* Curve Container positioned absolutely behind the rows */}
              <div className="tech-path-lines" style={{ position: 'absolute', left: 0, top: '22px', bottom: '26px', width: '2.5rem', zIndex: 0 }}>
                 
                 {/* Top Dot */}
                 <div style={{ position: 'absolute', left: '4px', top: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: '#e879f9', boxShadow: '0 0 8px #e879f9' }} />
                 {/* Horizontal to Java */}
                 <div style={{ position: 'absolute', left: '12px', top: '0', right: 0, height: '2px', background: 'rgba(232, 121, 249, 0.4)' }} />
                 
                 {/* The Curve */}
                 <div style={{ position: 'absolute', left: '7px', top: '4px', bottom: '0', width: 'calc(100% - 7px)', borderLeft: '2px solid rgba(45, 212, 191, 0.4)', borderBottom: '2px solid rgba(45, 212, 191, 0.4)', borderBottomLeftRadius: '16px' }} />

                 {/* Bottom Dot */}
                 <div style={{ position: 'absolute', left: '4px', bottom: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 8px #2dd4bf' }} />
              </div>

              {/* TOP ROW */}
              <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, position: 'relative' }}>
                {techStack.map((tech, i) => (
                  <React.Fragment key={tech.name}>
                    {/* Pill */}
                    <span 
                      className="anim-badge-item tech-pill-wrapper"
                      style={{ 
                        animationDelay: `${1 + i * 0.1}s`,
                        '--pill-color': tech.color,
                        '--anim-delay': tech.delay,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        flexShrink: 0
                      } as React.CSSProperties}
                      data-cursor="hover"
                    >
                      <span className="tech-pill-border-highlight"></span>
                      <span style={{ color: tech.color, display: 'flex', alignItems: 'center' }}>
                         {tech.icon}
                      </span>
                      <span style={{ marginTop: '1px' }}>{tech.name}</span>
                    </span>

                    {/* Connecting Line & Dot (if not last) */}
                    {i < techStack.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', width: '2.5rem', flexShrink: 0, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: '2px', background: `linear-gradient(90deg, ${tech.color}40, ${techStack[i+1].color}40)`, zIndex: 0, overflow: 'hidden' }}>
                          <div className="traveling-light-horizontal" style={{ animationDelay: `${i * 0.5}s` }} />
                        </div>
                        <div style={{ 
                          width: '6px', height: '6px', borderRadius: '50%', 
                          background: techStack[i+1].color, 
                          boxShadow: `0 0 8px ${techStack[i+1].color}`,
                          position: 'absolute',
                          left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                          zIndex: 1
                        }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* BOTTOM ROW */}
              <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, position: 'relative' }}>
                <span 
                  className="anim-badge-item tech-pill-wrapper"
                  style={{ 
                    animationDelay: `1.6s`,
                    '--pill-color': dsStack.color,
                    '--anim-delay': dsStack.delay,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    flexShrink: 0
                  } as React.CSSProperties}
                  data-cursor="hover"
                >
                  <span className="tech-pill-border-highlight"></span>
                  <span style={{ color: dsStack.color, display: 'flex', alignItems: 'center' }}>
                     {dsStack.icon}
                  </span>
                  <span style={{ marginTop: '1px' }}>{dsStack.name}</span>
                </span>
              </div>
            </div>

            <div className="anim-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#projects" className="magnetic-btn primary" data-cursor="hover">
                View My Projects <ArrowRight size={18} />
              </a>
              <a 
                href="/resume.pdf" 
                download="Narean_Karthikeyan_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="magnetic-btn" 
                data-cursor="hover"
              >
                Download Resume <Download size={18} />
              </a>
              <a href="#contact" className="magnetic-btn" data-cursor="hover">
                Let's Connect <MessageSquare size={18} />
              </a>
            </div>

            {/* Social Links */}
            <div className="anim-socials" style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', alignItems: 'center' }}>
              <a href="https://github.com/NAREAN3929" target="_blank" rel="noreferrer" aria-label="GitHub Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} data-cursor="hover">
                <TechIcon name="GitHub" size={24} />
              </a>
              <a href="https://linkedin.com/in/narean3929" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} data-cursor="hover">
                <TechIcon name="LinkedIn" size={24} />
              </a>
              <a href="https://leetcode.com/u/Narean3929/" target="_blank" rel="noreferrer" aria-label="LeetCode Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffa116'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} data-cursor="hover">
                <TechIcon name="LeetCode" size={24} />
              </a>
              <a href="https://hackerrank.com/profile/narean3929" target="_blank" rel="noreferrer" aria-label="HackerRank Profile" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', padding: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#2ec866'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} data-cursor="hover">
                <TechIcon name="HackerRank" size={24} />
              </a>
            </div>

          </div>

          {/* RIGHT CONTENT - Visual Workspace */}
          <div className="anim-visual" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Profile Image Container */}
            <div 
              className="hero-portrait"
              style={{ 
                width: '100%', 
                maxWidth: '480px',
                aspectRatio: '1/1',
                position: 'relative', 
                zIndex: 10,
                borderRadius: '32px',
                background: 'var(--glass-bg)',
                padding: '6px',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), 0 20px 40px rgba(0,0,0,0.4)',
                transition: 'all 0.5s ease',
              }}
            >
              <div className="hero-portrait-border"></div>
              <div style={{ width: '100%', height: '100%', borderRadius: '26px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--glass-border)', borderRadius: '26px', zIndex: 5, pointerEvents: 'none', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' }} />
                <img 
                  src="/profile.jpg" 
                  alt="Narean Karthikeyan" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05) saturate(1.1)',
                  }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="anim-socials scroll-indicator" 
        style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll</span>
        <ChevronDown size={20} />
      </div>

    </section>
  );
}
