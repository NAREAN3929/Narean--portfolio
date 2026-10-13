import { useState, useEffect } from 'react';
import { Menu, X, Laptop, Keyboard, Puzzle, Zap, Globe } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import type { IntroPhase } from '../App';

interface NavbarProps {
  introPhase?: IntroPhase;
}

const navLinks = [
  { name: 'Projects', href: '#projects', icon: Laptop },
  { name: 'Skills', href: '#skills', icon: Keyboard },
  { name: 'About', href: '#about', icon: Puzzle },
  { name: 'AI Tools', href: '#ai-tools', icon: Zap },
  { name: 'Home', href: '#', icon: Globe }
];

export default function Navbar({ introPhase = 'completed' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const isIntroComplete = introPhase === 'completed';
  const isTransforming = introPhase === 'transforming';
  const showNav = isIntroComplete || isTransforming;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id') || '';
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={isScrolled && isIntroComplete ? 'scrolled' : ''} style={{
        transition: 'all 0.4s ease',
        padding: isScrolled ? '0.5rem 0' : '1.5rem 0',
        background: isScrolled && isIntroComplete ? 'var(--nav-bg, rgba(5, 5, 5, 0.8))' : 'transparent',
        opacity: showNav ? 1 : 0,
        pointerEvents: showNav ? 'auto' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          
          {/* Logo */}
          <a href="#" onClick={handleNavClick} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 1002 }} data-cursor="hover">
            <div style={{ 
              background: 'var(--accent-color)', 
              color: '#fff', 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 0 15px rgba(120, 119, 198, 0.4)'
            }}>
              NK
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.125rem', lineHeight: '1.2' }}>
                Narean Karthikeyan
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '') || (activeSection === '' && link.name === 'Home');
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    data-cursor="hover"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </a>
                );
              })}
            </div>
            
            <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />

            <a href="#contact" className="magnetic-btn primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }} data-cursor="hover">
              Let's Connect
            </a>
            
            <ThemeSwitcher />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-nav-actions">
            <div className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeSwitcher />
            </div>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor="hover"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '') || (activeSection === '' && link.name === 'Home');
          return (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              onClick={handleNavClick}
            >
              <link.icon size={24} />
              {link.name}
            </a>
          );
        })}
        <a 
          href="#contact" 
          className="magnetic-btn primary" 
          style={{ padding: '1rem 2rem', fontSize: '1.125rem', marginTop: '1rem' }} 
          onClick={handleNavClick}
        >
          Let's Connect
        </a>
      </div>
    </>
  );
}
