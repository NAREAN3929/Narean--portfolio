import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink, FileText } from 'lucide-react';
import TechIcon from './TechIcon';
import '../experience.css';

const experienceData = [
  {
    id: '01',
    type: 'internship',
    role: 'MERN Stack Developer Intern',
    company: 'Virusverze Pvt. Ltd.',
    duration: 'Dec 2025 – Jan 2026',
    mode: 'Remote',
    focus: 'Full-stack web app',
    deliverable: 'Expense Tracker',
    mockup: {
      url: 'expense-tracker.app/dashboard',
      balance: '₹24,860',
      income: '+ ₹40,000',
      expenses: '− ₹15,140',
      chartData: [40, 70, 30, 85, 50, 90], // percentages for chart bars
      transactions: [
        { name: 'Groceries', amount: '− ₹1,200', date: 'Today' },
        { name: 'Stipend', amount: '+ ₹10,000', date: 'Yesterday' },
        { name: 'Transport', amount: '− ₹450', date: 'Jan 15' },
        { name: 'Books', amount: '− ₹2,100', date: 'Jan 12' },
      ]
    },
    buildDetails: [
      { label: 'Frontend', desc: 'Responsive, interactive UI components in React.js.' },
      { label: 'Backend', desc: 'REST APIs with Node.js and Express.js.' },
      { label: 'Product', desc: 'Expense Tracker web app on the MERN stack.' }
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    links: {
      project: '#',
      github: '#',
      certificate: '#'
    }
  }
];

export default function Experience() {
  const revealRef = useScrollReveal();
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        
        <div ref={revealRef} className="reveal">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              Work <span className="text-gradient">Experience</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              My professional journey and internships.
            </p>
          </div>

          {experienceData.map((exp, index) => (
            <div key={index} className="experience-entry">
              
              {/* LEFT PANEL */}
              <div className="experience-left">
                <div className="exp-header">
                  <span className="exp-count">{exp.id}</span>
                  <span className="exp-type">{exp.type}</span>
                </div>
                
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-company">{exp.company}</div>
                
                <dl className="exp-dl">
                  <div className="exp-dl-row">
                    <dt>Duration</dt>
                    <dd>{exp.duration}</dd>
                  </div>
                  <div className="exp-dl-row">
                    <dt>Mode</dt>
                    <dd>{exp.mode}</dd>
                  </div>
                  <div className="exp-dl-row">
                    <dt>Focus</dt>
                    <dd>{exp.focus}</dd>
                  </div>
                  <div className="exp-dl-row">
                    <dt>Deliverable</dt>
                    <dd>{exp.deliverable}</dd>
                  </div>
                </dl>

                <div className="exp-availability">
                  <span className="status-dot"></span>
                  Open to work
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="experience-right">
                
                {/* Browser Mockup */}
                <div className="browser-mockup" aria-label={`Preview of the ${exp.deliverable} dashboard`}>
                  <div className="browser-header">
                    <div className="browser-dots">
                      <span style={{ background: '#ef4444' }}></span>
                      <span style={{ background: '#eab308' }}></span>
                      <span style={{ background: '#22c55e' }}></span>
                    </div>
                    <div className="browser-url">{exp.mockup.url}</div>
                  </div>
                  
                  {/* To swap for a real screenshot later, replace the .dashboard-mockup div with an <img>: 
                      <img src="/path/to/screenshot.png" alt="Dashboard" style={{ width: '100%', display: 'block' }} /> 
                  */}
                  <div className="dashboard-mockup">
                    <div className="dash-metrics">
                      <div className="metric-card">
                        <div className="metric-label">Balance</div>
                        <div className="metric-value">{exp.mockup.balance}</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-label">Income</div>
                        <div className="metric-value income">{exp.mockup.income}</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-label">Expenses</div>
                        <div className="metric-value expense">{exp.mockup.expenses}</div>
                      </div>
                    </div>

                    <div className="dash-grid">
                      <div className="dash-panel">
                        <div className="panel-title">Overview</div>
                        <div className="chart-container">
                          {exp.mockup.chartData.map((h, i) => (
                            <div key={i} className="chart-bar-wrapper">
                              <div 
                                className="chart-bar" 
                                style={{ height: inView ? `${h}%` : '0%' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="dash-panel">
                        <div className="panel-title">Recent Transactions</div>
                        <div className="tx-list">
                          {exp.mockup.transactions.map((tx, i) => (
                            <div key={i} className="tx-item">
                              <div>
                                <div style={{ color: '#fff', fontWeight: 500, marginBottom: '2px' }}>{tx.name}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{tx.date}</div>
                              </div>
                              <div style={{ color: tx.amount.includes('+') ? '#22c55e' : '#fff' }}>
                                {tx.amount}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="built-heading">What I built</h3>
                <div className="built-grid">
                  {exp.buildDetails.map((detail, i) => (
                    <div key={i} className="built-item">
                      <div className="built-label">{detail.label}</div>
                      <div className="built-desc">{detail.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="tech-chips">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="tech-chip">{t}</span>
                  ))}
                </div>

                <div className="action-buttons">
                  <a href={exp.links.project} className="btn-outline btn-primary" onClick={e => exp.links.project === '#' && e.preventDefault()}>
                    View project <ExternalLink size={16} />
                  </a>
                  <a href={exp.links.github} className="btn-outline btn-secondary" onClick={e => exp.links.github === '#' && e.preventDefault()}>
                    GitHub <TechIcon name="GitHub" size={16} />
                  </a>
                  <a href={exp.links.certificate} className="btn-outline btn-secondary" onClick={e => exp.links.certificate === '#' && e.preventDefault()}>
                    View certificate <FileText size={16} />
                  </a>
                </div>

              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
