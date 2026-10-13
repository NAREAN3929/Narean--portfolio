import { useScrollReveal } from '../hooks/useScrollReveal';
import { User, Database, Network, Server } from 'lucide-react';
import '../about.css'; 

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="about-section">
      <div className="container reveal" ref={revealRef}>
        
        <div className="about-centered-layout">
          
          <div className="about-header-centered">
            <div className="about-badge">
              <User size={14} color="#00f2fe" /> 
              <span>ABOUT ME</span>
            </div>
            
            <h2 className="about-title-large">
              Turning raw data into<br/>
              <span className="text-gradient">reliable systems.</span>
            </h2>
            
            <div className="about-desc-container">
              <p>
                I am an Aspiring Data Engineer currently pursuing a B.E. in Computer Science at V.S.B College of Engineering. 
                I am passionate about the hidden infrastructure that powers modern applications. While others focus on the frontend, my core focus is on transforming, moving, and structuring data securely and efficiently behind the scenes.
              </p>
              <p>
                Whether it's optimizing complex SQL queries, designing normalized databases in MySQL, or writing scalable object-oriented Java solutions, I believe that every great product is built on a foundation of clean, reliable data.
              </p>
            </div>
          </div>

          {/* Three Pillar Cards */}
          <div className="about-pillar-row">
            <div className="pillar-glass-card">
              <div className="pillar-icon-ring" style={{ borderColor: 'rgba(96, 165, 250, 0.3)' }}>
                <Database size={24} color="#60a5fa" />
              </div>
              <h3 className="pillar-card-title">Database Architecture</h3>
              <p className="pillar-card-desc">Designing normalized, high-performance schemas in MySQL and SQL environments.</p>
            </div>

            <div className="pillar-glass-card">
              <div className="pillar-icon-ring" style={{ borderColor: 'rgba(45, 212, 191, 0.3)' }}>
                <Network size={24} color="#2dd4bf" />
              </div>
              <h3 className="pillar-card-title">Data Pipelines</h3>
              <p className="pillar-card-desc">Building robust ETL workflows to extract, transform, and load data securely.</p>
            </div>

            <div className="pillar-glass-card">
              <div className="pillar-icon-ring" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                <Server size={24} color="#a855f7" />
              </div>
              <h3 className="pillar-card-title">Backend Engineering</h3>
              <p className="pillar-card-desc">Writing scalable, object-oriented Java solutions for seamless data access.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
