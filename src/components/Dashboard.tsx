import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Activity, Database, Server, Terminal, Zap, Info, X } from 'lucide-react';
import '../dashboard.css';

const MOCK_LOGS = [
  '[ETL] Job #4092: Transform completed. 1.2M rows processed.',
  '[METRIC] Query optimization reduced execution time by 32%.',
  '[QUALITY] Schema validation passed. No drift detected.',
  '[DB] Index maintenance completed on table `transactions`.',
  '[PIPELINE] Batch pipeline completed successfully in 4.2s.',
  '[SYSTEM] All scheduled checks passed. System status: healthy.'
];

const SERVERS = [
  { id: 'node-primary-db', name: 'node-primary-db', role: 'Primary Database', status: 'ONLINE', color: '#22c55e', activity: 'Handling 4,200 QPS' },
  { id: 'etl-worker-01', name: 'etl-worker-01', role: 'Batch Processor', status: 'PROCESSING', color: '#38bdf8', activity: 'Running Job #4092' },
  { id: 'java-auth-svc', name: 'java-auth-svc', role: 'Authentication Service', status: 'ONLINE', color: '#22c55e', activity: '0.01% Error Rate' }
];

export default function Dashboard() {
  const revealRef = useScrollReveal();
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  
  const [logs, setLogs] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  // Trigger animations when the section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRevealed) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, [isRevealed, revealRef]);

  // Terminal Log Sequence
  useEffect(() => {
    if (!isRevealed) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setLogs(MOCK_LOGS);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < MOCK_LOGS.length) {
        setLogs(prev => [...prev, MOCK_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800); // Add a new log every 800ms
    
    return () => clearInterval(interval);
  }, [isRevealed]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const activeServer = SERVERS.find(s => s.id === selectedServer);

  return (
    <section id="dashboard" className="dash-section">
      <div className="dash-container">
        
        <div ref={revealRef} className="reveal">
          
          <div className="dash-header">
            <h2 className="dash-title">SYSTEM OPS</h2>
            <p className="dash-subtitle">Real-time metrics of my engineering environment.</p>
          </div>

          {/* Flow Line SVG Background (Pipeline Visualization) */}
          <div className="pipeline-lines">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path className="flow-line" d="M 50 150 L 50 50 L 500 50 L 500 200" fill="transparent" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <path className="flow-line delay" d="M 900 50 L 500 50" fill="transparent" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="dash-metric-card">
              <div className="metric-header">
                <Database size={16} color="#60a5fa" />
                <span>DB HEALTH</span>
              </div>
              <div className="metric-value">99.9<span className="metric-unit">%</span></div>
              <div className="metric-subtext">All clusters operational</div>
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{ width: isRevealed ? '99%' : '0%', background: '#60a5fa', transition: 'width 1.5s ease-out 0.2s' }}></div>
              </div>
            </div>

            <div className="dash-metric-card">
              <div className="metric-header">
                <Activity size={16} color="#22c55e" />
                <span>PIPELINE STATUS</span>
              </div>
              <div className="metric-value">ACTIVE</div>
              <div className="metric-subtext">0 failed jobs in last 24h</div>
              <div className="metric-bar">
                <div className="metric-bar-fill pulse-anim" style={{ width: isRevealed ? '100%' : '0%', background: '#22c55e', transition: 'width 1s ease-out 0.4s' }}></div>
              </div>
            </div>

            <div className="dash-metric-card">
              <div className="metric-header">
                <Server size={16} color="#a78bfa" />
                <span>DATA PROCESSED</span>
              </div>
              <div className="metric-value">1.4<span className="metric-unit">TB</span></div>
              <div className="metric-subtext">Monthly throughput</div>
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{ width: isRevealed ? '75%' : '0%', background: '#a78bfa', transition: 'width 1.5s ease-out 0.6s' }}></div>
              </div>
            </div>

            <div className="dash-metric-card">
              <div className="metric-header">
                <Zap size={16} color="#fb923c" />
                <span>AVG LATENCY</span>
              </div>
              <div className="metric-value">42<span className="metric-unit">ms</span></div>
              <div className="metric-subtext">Query response time</div>
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{ width: isRevealed ? '30%' : '0%', background: '#fb923c', transition: 'width 1.5s ease-out 0.8s' }}></div>
              </div>
            </div>
          </div>

          <div className="dash-bottom-grid">
            
            {/* Terminal Panel */}
            <div className="terminal-panel">
              <div className="panel-header">
                <Terminal size={14} />
                <span>system-logs.sh</span>
              </div>
              <div className="terminal-body" ref={terminalBodyRef}>
                {logs.map((log, i) => {
                  const isNewest = i === logs.length - 1;
                  // Handle inline code formatting for backticks
                  const renderTextWithCode = (text: string) => {
                    if (!text) return null;
                    return text.split(/`([^`]+)`/g).map((part, index) => {
                      if (index % 2 === 1) {
                        return (
                          <code key={index} style={{ 
                            background: 'rgba(255,255,255,0.1)', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            color: '#38bdf8' 
                          }}>
                            {part}
                          </code>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    });
                  };

                  return (
                    <div key={i} className={`terminal-line ${isNewest ? 'newest-log' : ''}`}>
                      <span className="terminal-prompt" style={{ color: '#22c55e' }}>$</span> 
                      <span className="log-text">{renderTextWithCode(log)}</span>
                    </div>
                  );
                })}
                <div className="terminal-line">
                  <span className="terminal-prompt" style={{ color: '#22c55e' }}>$</span> 
                  <span className="cursor-blink">_</span>
                </div>
              </div>
            </div>

            {/* Server Cluster Panel */}
            <div className="server-panel">
              <div className="panel-header">
                <Server size={14} />
                <span>SERVER CLUSTER</span>
              </div>
              <div className="server-body">
                
                {/* Server Selection Details */}
                {selectedServer && activeServer && (
                  <div className="server-details-dialog">
                    <div className="details-header">
                      <div className="details-title">
                        <Info size={14} color={activeServer.color} />
                        <span>Node Details</span>
                      </div>
                      <button className="close-btn" onClick={() => setSelectedServer(null)}>
                        <X size={16} />
                      </button>
                    </div>
                    <div className="details-content">
                      <div className="detail-row">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{activeServer.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Role:</span>
                        <span className="detail-value">{activeServer.role}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value" style={{ color: activeServer.color }}>{activeServer.status}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Activity:</span>
                        <span className="detail-value">{activeServer.activity}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="server-rack-list">
                  {SERVERS.map((server) => {
                    const isSelected = selectedServer === server.id;
                    return (
                      <button 
                        key={server.id} 
                        className={`server-rack ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedServer(server.id)}
                        aria-pressed={isSelected}
                      >
                        <div className="rack-info">
                          <span className="rack-name">{server.name}</span>
                          <span className="rack-status" style={{ color: server.color }}>{server.status}</span>
                        </div>
                        <div className="rack-hardware">
                          <div className={`led`} style={{ background: server.color, boxShadow: `0 0 8px ${server.color}` }}></div>
                          <div className={`led delay-1`} style={{ background: server.color, boxShadow: `0 0 8px ${server.color}` }}></div>
                          <div className="rack-slots">
                            <div className="slot active"></div>
                            <div className="slot active"></div>
                            <div className="slot active"></div>
                            <div className={server.id === 'etl-worker-01' ? 'slot' : 'slot active'}></div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
