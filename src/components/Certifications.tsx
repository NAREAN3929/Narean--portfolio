import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Cpu, ExternalLink } from 'lucide-react';
import TechIcon from './TechIcon';

const certsData = [
  {
    title: 'Model Context Protocol',
    org: 'Anthropic',
    date: 'February 2026',
    techName: 'Claude',
    link: '/certificates/anthropic-mcp.pdf'
  },
  {
    title: 'Internet of Things (IoT) - Elite',
    org: 'NPTEL (IIT Kharagpur)',
    date: 'April 2026',
    icon: Cpu,
    link: '/certificates/nptel-iot.pdf'
  },
  {
    title: 'Java for Beginners',
    org: 'Infosys Springboard',
    date: 'March 2026',
    techName: 'Java',
    link: '/certificates/infosys-java.pdf'
  },
  {
    title: 'SQL for Beginners',
    org: 'Udemy',
    date: 'May 2026',
    techName: 'MySQL',
    link: '/certificates/udemy-sql.pdf'
  }
];

export default function Certifications() {
  const revealRef = useScrollReveal();

  return (
    <section id="certifications" style={{ padding: '4rem 0 2rem 0', position: 'relative' }}>
      <div className="container">
        
        <div ref={revealRef} className="reveal">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              Licenses & <span className="text-gradient">Certifications</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Continuous learning and professional development.
            </p>
          </div>

          <div className="cert-gallery">
            {certsData.map((cert, index) => (
              <div key={index} className="cert-card">
                
                <div className="cert-icon-container">
                  {cert.techName ? (
                    <TechIcon name={cert.techName} size={24} />
                  ) : cert.icon ? (
                    <cert.icon size={24} />
                  ) : null}
                </div>
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {cert.title}
                </h3>
                
                <div style={{ color: 'var(--accent-color)', fontWeight: 500, marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                  {cert.org}
                </div>
                
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                  Issued {cert.date}
                </div>
                
                <a 
                  href={cert.link} 
                  target={cert.link === '#' ? undefined : "_blank"}
                  rel={cert.link === '#' ? undefined : "noreferrer"}
                  onClick={(e) => {
                    if (cert.link === '#') {
                      e.preventDefault();
                      alert('Certificate link is currently private or unavailable.');
                    }
                  }}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                  data-cursor="hover"
                >
                  View Certificate <ExternalLink size={16} />
                </a>

                {/* Decorative Background Icon */}
                <Award 
                  size={120} 
                  style={{ 
                    position: 'absolute', 
                    right: '-20px', 
                    bottom: '-20px', 
                    color: 'var(--glass-border)', 
                    opacity: 0.2, 
                    zIndex: -1 
                  }} 
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
