import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import TechIcon from './TechIcon';
import '../projects.css';

// --- Data Structure ---
const projectsData = [
  {
    id: 1,
    title: "AI Mock Interview Assessment",
    description: "A web-based AI mock interview platform that captures live video responses and generates automated interview assessments.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    technologies: ['Java', 'HTML', 'CSS', 'MySQL', 'WebRTC', 'Gemini API'],
    github: "#",
    liveDemo: "https://aimock-interview-frontend.vercel.app",
    problem: "Candidates often lack access to realistic interview practice environments with objective feedback. Traditional mock interviews require human availability and are hard to scale.",
    solution: "An AI-driven platform that simulates real interviews using WebRTC for live video capture and the Gemini API for advanced, real-time response analysis and feedback.",
    features: [
      "Live video capture via WebRTC",
      "Real-time AI response analysis",
      "Automated feedback generation",
      "Session history and tracking",
      "Secure data storage with MySQL"
    ]
  },
  {
    id: 2,
    title: "Student Performance Tracking",
    description: "A system for tracking and analyzing student performance efficiently using a Java backend and secure database management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL'],
    github: "#",
    liveDemo: "#",
    problem: "Educators struggle to efficiently track and analyze long-term student academic metrics across different subjects in a centralized, easily accessible way.",
    solution: "A comprehensive management system with a robust Java backend that securely stores academic records and provides an intuitive dashboard for educators to monitor student progress.",
    features: [
      "Student information management",
      "Academic performance tracking",
      "Database-driven data management",
      "User-friendly web interface",
      "Java-based application logic",
      "MySQL database integration"
    ]
  }
];

export default function Projects() {
  const revealRef = useScrollReveal();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        
        <div className="projects-header reveal" ref={revealRef}>
          <h2>Featured <span className="text-gradient">Projects</span></h2>
          <p className="projects-subtitle">A deep dive into my AI applications, intelligent systems, and data pipelines.</p>
          <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            "WHERE AI MEETS ENGINEERING."
          </p>
        </div>

        <div className="projects-container">
          {projectsData.map((project, index) => (
            <div key={project.id} className="project-case-file">
              
              {/* Sticky Sidebar Fact Sheet */}
              <div className="project-sidebar">
                <div className="project-number-wrap">
                  <span className="project-number">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="project-title-side">{project.title}</h3>
                  <p className="project-desc-side">{project.description}</p>
                </div>
                <div className="project-tech-stack">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-chip">
                      <TechIcon name={tech} size={14} /> {tech}
                    </span>
                  ))}
                </div>
              </div>

                  {/* Main Content (Browser Window) */}
              <div 
                className="project-window"
                onMouseEnter={(e) => {
                  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                  e.currentTarget.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease';
                }}
                onMouseMove={(e) => {
                  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  
                  // Max rotation 4 degrees
                  const rotateX = ((y - centerY) / centerY) * -4;
                  const rotateY = ((x - centerX) / centerX) * 4;
                  
                  el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
                  el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                }}
              >
                
                {/* Browser Header */}
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="browser-dot close"></span>
                    <span className="browser-dot min"></span>
                    <span className="browser-dot max"></span>
                  </div>
                  <div className="browser-url">
                    {project.liveDemo && project.liveDemo !== '#'
                      ? project.liveDemo.replace(/^https?:\/\//, '')
                      : `localhost:3000/projects/${project.title.toLowerCase().replace(/ /g, '-')}`}
                  </div>
                </div>
                
                {/* Hero Image */}
                <div className="project-hero">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-hero-overlay" />
                </div>

                {/* Project Details */}
                <div className="project-body">
                  <div className="project-details-grid">
                    <div className="detail-block">
                      <h4>The Problem</h4>
                      <p>{project.problem}</p>
                    </div>
                    <div className="detail-block">
                      <h4>The Solution</h4>
                      <p>{project.solution}</p>
                    </div>
                    <div className="detail-block full-width">
                      <h4>Key Features</h4>
                      <ul className="feature-list">
                        {project.features.map((feature, i) => (
                          <li key={i}><span className="check">✓</span> {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="project-actions">
                    {project.github && project.github !== '#' ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-project secondary">
                        <FaGithub size={18} /> Source Code
                      </a>
                    ) : (
                      <button 
                        type="button"
                        className="btn-project secondary" 
                        onClick={() => alert('Private repository. Contact me for codebase access.')}
                        style={{ cursor: 'pointer', background: 'transparent', font: 'inherit' }}
                      >
                        <FaGithub size={18} /> Source Code
                      </button>
                    )}
                    {project.liveDemo && project.liveDemo !== '#' ? (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-project primary">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    ) : (
                      <button 
                        type="button"
                        className="btn-project primary" 
                        onClick={() => alert('Demo unavailable.')}
                        style={{ cursor: 'pointer', background: 'transparent', font: 'inherit' }}
                      >
                        <ExternalLink size={18} /> Live Demo
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
