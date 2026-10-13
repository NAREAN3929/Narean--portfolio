import { ChevronUp, Terminal } from 'lucide-react';
import TechIcon from './TechIcon';

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer style={{ 
      position: 'relative',
      padding: '4rem 0 2rem',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      
      {/* Subtle Animated Grid Background for Footer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Column 1: Identity */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
              Narean Karthikeyan K
            </h3>
            <p style={{ color: 'var(--accent-color)', fontSize: '1rem', fontWeight: 500, marginBottom: '1.5rem' }}>
              Aspiring Data Engineer
            </p>
            
            {/* Developer Terminal Line */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid var(--glass-border)', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <Terminal size={14} color="var(--accent-color)" /> 
              <span><span style={{ color: '#27c93f' }}>&gt;</span> Data Engineering &bull; SQL &bull; Backend Systems</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Navigation</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  data-cursor="hover"
                  style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/NAREAN3929" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
                <TechIcon name="GitHub" size={20} />
              </a>
              <a href="https://linkedin.com/in/narean3929" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <TechIcon name="LinkedIn" size={20} />
              </a>
              <a href="https://leetcode.com/u/Narean3929/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LeetCode">
                <TechIcon name="LeetCode" size={20} />
              </a>
              <a href="https://hackerrank.com/profile/narean3929" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="HackerRank">
                <TechIcon name="HackerRank" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--glass-border)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            &copy; 2026 Narean Karthikeyan K. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            data-cursor="hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-color)';
              e.currentTarget.style.borderColor = 'var(--accent-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-bg)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            <ChevronUp size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
