import { useScrollReveal } from '../hooks/useScrollReveal';
import { Terminal, Database, Code2, Network, User } from 'lucide-react';

export default function InteractiveAvatar() {
  const revealRef = useScrollReveal();
  
  return (
    <section id="avatar" style={{ padding: '6rem 0 10rem 0', position: 'relative', overflow: 'hidden' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Meet <span className="text-gradient">Me</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            My virtual workspace.
          </p>
        </div>

        <div ref={revealRef} className="reveal" style={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '600px',
          perspective: '1000px' // For 3D curved effect
        }}>
          
          {/* Curved Background / Screen Effect */}
          <div style={{
            position: 'absolute',
            top: '5%',
            width: '120%',
            height: '110%',
            background: 'linear-gradient(to bottom, rgba(10,15,30,0.8), rgba(5,5,5,1))',
            borderTop: '1px solid rgba(0, 242, 254, 0.2)',
            borderLeft: '1px solid rgba(0, 242, 254, 0.1)',
            borderRight: '1px solid rgba(0, 242, 254, 0.1)',
            borderRadius: '40% 40% 0 0 / 10% 10% 0 0',
            transform: 'rotateX(5deg)',
            boxShadow: 'inset 0 40px 100px rgba(0, 242, 254, 0.05)',
            zIndex: 0
          }}></div>

          {/* Central Holographic Avatar */}
          <div style={{
            position: 'relative',
            width: '400px',
            height: '550px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            zIndex: 10,
            marginTop: '2rem'
          }}>
            <img 
              src="/avatar.png" 
              alt="My Avatar" 
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 15,
                transform: 'scale(1.15)',
                filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, transparent 100%)',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/profile.jpg';
              }}
            />
          </div>

          {/* Left Dashboard Panel */}
          <div style={{
            position: 'absolute',
            left: '2%',
            top: '15%',
            width: '280px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            transform: 'rotateY(15deg) translateZ(-50px)',
            boxShadow: '-20px 20px 40px rgba(0,0,0,0.5)',
            zIndex: 5
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <User size={16} color="var(--accent-color)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>PROFILE DATA</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={dataRowStyle}>
                <span style={dataLabelStyle}>ROLE</span>
                <span style={dataValueStyle}>DATA ENGINEER</span>
              </div>
              <div style={dataRowStyle}>
                <span style={dataLabelStyle}>STATUS</span>
                <span style={{...dataValueStyle, color: '#22c55e' }}>ONLINE</span>
              </div>
              <div style={dataRowStyle}>
                <span style={dataLabelStyle}>LOCATION</span>
                <span style={dataValueStyle}>COIMBATORE</span>
              </div>
            </div>
          </div>

          {/* Right Dashboard Panel */}
          <div style={{
            position: 'absolute',
            right: '2%',
            top: '25%',
            width: '300px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            transform: 'rotateY(-15deg) translateZ(-50px)',
            boxShadow: '20px 20px 40px rgba(0,0,0,0.5)',
            zIndex: 5
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <Terminal size={16} color="#00f2fe" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>SYSTEM VITALS</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={badgeStyle}><Database size={12} /> MySQL Core</div>
              <div style={badgeStyle}><Code2 size={12} /> Java Backend</div>
              <div style={badgeStyle}><Network size={12} /> ETL Pipelines</div>
            </div>

            <div style={{ marginTop: '1.5rem', height: '60px', borderRadius: '8px', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(0, 242, 254, 0.6)', letterSpacing: '0.1em' }}>PROCESSING PIPELINE...</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const dataRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const dataLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em'
};

const dataValueStyle = {
  fontSize: '0.8rem',
  color: 'var(--text-primary)',
  fontWeight: 600
};

const badgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.7rem',
  padding: '0.35rem 0.65rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  color: 'var(--text-secondary)'
};
