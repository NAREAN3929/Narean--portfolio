import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Layers, X, Code2, Database, Share2, Wrench } from 'lucide-react';
import '../skills.css';

type NodeType = 'center' | 'category' | 'skill';

interface DNA_Node {
  id: string;
  label: string;
  x: number; // 0-1000
  y: number; // 0-1000
  type: NodeType;
  color: string;
  parentId?: string;
  details: string;
  icon?: React.ReactNode;
}

const NODES: DNA_Node[] = [
  { 
    id: 'center', 
    label: 'DATA ENGINEER', 
    x: 500, y: 300, 
    type: 'center', 
    color: '#ffffff', 
    details: 'The core hub of operations. Designing, building, and maintaining scalable data infrastructure to support downstream analytics and applications.' 
  },
  
  // Categories (Widescreen Ellipse Layout)
  { id: 'cat-prog', label: 'Programming', x: 500, y: 150, type: 'category', color: '#a855f7', parentId: 'center', details: 'Core languages for building robust logic, data processing applications, and backend services.', icon: <Code2 size={16} /> },
  { id: 'cat-db', label: 'Databases', x: 750, y: 220, type: 'category', color: '#60a5fa', parentId: 'center', details: 'Persistent storage systems and querying languages designed for reliability and speed.', icon: <Database size={16} /> },
  { id: 'cat-de', label: 'Data Engineering', x: 700, y: 420, type: 'category', color: '#38bdf8', parentId: 'center', details: 'Architecting data pipelines, distributed computing clusters, and modern data warehouses.', icon: <Share2 size={16} /> },
  { id: 'cat-tools', label: 'Dev Tools', x: 300, y: 420, type: 'category', color: '#facc15', parentId: 'center', details: 'Version control, deployment, and development environments that keep code shipping safely.', icon: <Wrench size={16} /> },
  { id: 'cat-arch', label: 'Architecture', x: 250, y: 220, type: 'category', color: '#f43f5e', parentId: 'center', details: 'System design paradigms, structural data layouts, and trade-off analysis.', icon: <Layers size={16} /> },
  
  // Skills (Programming)
  { id: 'skill-java', label: 'Java', x: 500, y: 50, type: 'skill', color: '#a855f7', parentId: 'cat-prog', details: 'Object-oriented programming, scalable backend services, and high-performance concurrent computing.' },
  
  // Skills (Databases)
  { id: 'skill-sql', label: 'SQL', x: 900, y: 170, type: 'skill', color: '#60a5fa', parentId: 'cat-db', details: 'Advanced relational data querying, complex joins, window functions, and query optimization.' },
  { id: 'skill-mysql', label: 'MySQL', x: 880, y: 310, type: 'skill', color: '#60a5fa', parentId: 'cat-db', details: 'Open-source RDBMS used for structured data storage, featuring ACID compliance and robust indexing.' },
  
  // Skills (Data Engineering)
  { id: 'skill-spark', label: 'Apache Spark', x: 880, y: 470, type: 'skill', color: '#38bdf8', parentId: 'cat-de', details: 'Unified analytics engine for large-scale data processing, distributed computing, and batch processing.' },
  { id: 'skill-etl', label: 'ETL / ELT', x: 750, y: 540, type: 'skill', color: '#38bdf8', parentId: 'cat-de', details: 'Extracting data from sources, transforming it for analysis, and loading it into centralized storage.' },
  { id: 'skill-dwh', label: 'Data Warehousing', x: 580, y: 530, type: 'skill', color: '#38bdf8', parentId: 'cat-de', details: 'Designing centralized repositories of integrated data from multiple sources for reporting and analysis.' },

  // Skills (Dev Tools)
  { id: 'skill-git', label: 'Git', x: 420, y: 530, type: 'skill', color: '#facc15', parentId: 'cat-tools', details: 'Distributed version control system for tracking changes in source code during software development.' },
  { id: 'skill-github', label: 'GitHub', x: 250, y: 540, type: 'skill', color: '#facc15', parentId: 'cat-tools', details: 'Code hosting platform for version control, CI/CD automation, and seamless team collaboration.' },
  { id: 'skill-vscode', label: 'VS Code', x: 120, y: 470, type: 'skill', color: '#facc15', parentId: 'cat-tools', details: 'Extensible primary code editor configured with data extensions and terminal integrations.' },

  // Skills (Architecture)
  { id: 'skill-modeling', label: 'Data Modeling', x: 120, y: 310, type: 'skill', color: '#f43f5e', parentId: 'cat-arch', details: 'Designing logical and physical database schemas (Star, Snowflake) to support business requirements.' },
  { id: 'skill-normalization', label: 'Normalization', x: 100, y: 170, type: 'skill', color: '#f43f5e', parentId: 'cat-arch', details: 'Organizing data systematically to reduce redundancy, avoid anomalies, and improve data integrity.' },
  { id: 'skill-olap', label: 'OLTP vs OLAP', x: 280, y: 100, type: 'skill', color: '#f43f5e', parentId: 'cat-arch', details: 'Architecting separated systems for high-speed transactional processing (OLTP) and complex analytics (OLAP).' },
];

export default function Skills() {
  const revealRef = useScrollReveal();
  
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const edges = useMemo(() => {
    return NODES.filter(n => n.parentId).map(n => ({
      source: NODES.find(sn => sn.id === n.parentId)!,
      target: n,
      id: `${n.parentId}-${n.id}`
    }));
  }, []);

  const activeData = useMemo(() => {
    if (!activeNode) return null;
    return NODES.find(n => n.id === activeNode) || null;
  }, [activeNode]);

  // Determine relationship state for visuals
  const getNodeState = (nodeId: string) => {
    if (activeNode === nodeId || hoveredNode === nodeId) return 'highlighted';
    
    const focusNode = hoveredNode || activeNode;
    if (!focusNode) return 'normal';
    
    if (focusNode === 'center') return 'normal'; // Center highlights everything slightly

    const focusData = NODES.find(n => n.id === focusNode);
    if (!focusData) return 'dimmed';

    // If focused node is a category, highlight its children and center
    if (focusData.type === 'category') {
      if (nodeId === 'center' || NODES.find(n => n.id === nodeId)?.parentId === focusNode) return 'highlighted';
    }
    
    // If focused node is a skill, highlight its category and center
    if (focusData.type === 'skill') {
      if (nodeId === 'center' || nodeId === focusData.parentId) return 'highlighted';
    }

    return 'dimmed';
  };

  const getEdgeState = (sourceId: string, targetId: string) => {
    const focusNode = hoveredNode || activeNode;
    if (!focusNode) return 'normal';
    
    if (focusNode === 'center') return 'normal';

    if (focusNode === sourceId || focusNode === targetId) return 'highlighted';

    const focusData = NODES.find(n => n.id === focusNode);
    if (focusData?.type === 'skill' && (sourceId === 'center' && targetId === focusData.parentId)) {
      return 'highlighted'; // Highlight path back to center
    }

    return 'dimmed';
  };

  return (
    <section id="skills" className="skills-section tech-dna-section">
      <div className="container reveal" ref={revealRef}>
        
        <div className="skills-header">
          <div className="skills-badge">
            <Layers size={14} /> TECHNOLOGY DNA
          </div>
          <h2 className="skills-title" style={{ fontSize: '3rem' }}>
            The structural foundation of my <span className="text-gradient">data engineering</span> stack.
          </h2>
        </div>

        <div className="tech-dna-wrapper">
          
          {/* Desktop SVG Connections Layer */}
          <div className="tech-dna-svg-layer desktop-only">
            <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              {edges.map(edge => {
                const state = getEdgeState(edge.source.id, edge.target.id);
                return (
                  <g key={edge.id}>
                    <line 
                      x1={edge.source.x} y1={edge.source.y}
                      x2={edge.target.x} y2={edge.target.y}
                      className={`tech-dna-edge state-${state}`}
                      stroke={edge.target.color}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Desktop Nodes Layer */}
          <div className="tech-dna-nodes-layer desktop-only">
            {NODES.map(node => (
              <button
                key={node.id}
                className={`tech-dna-node type-${node.type} state-${getNodeState(node.id)}`}
                style={{ 
                  left: `${(node.x / 1000) * 100}%`, 
                  top: `${(node.y / 600) * 100}%`,
                  '--node-color': node.color,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode(node.id)}
              >
                <div className="tech-dna-node-inner" style={{ animationDelay: `${(node.x + node.y) % 2}s` }}>
                  {node.icon && <span className="node-icon">{node.icon}</span>}
                  <span className="node-label">{node.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Linear Layout Layer */}
          <div className="tech-dna-mobile-layer mobile-only">
            {NODES.filter(n => n.type === 'category').map(cat => (
              <div key={cat.id} className="tech-dna-mobile-category" style={{ '--node-color': cat.color } as React.CSSProperties}>
                <div 
                  className="mobile-cat-header"
                  onClick={() => setActiveNode(cat.id)}
                >
                  {cat.icon}
                  <h3>{cat.label}</h3>
                </div>
                <div className="mobile-skills-grid">
                  {NODES.filter(n => n.parentId === cat.id).map(skill => (
                    <button
                      key={skill.id}
                      className="mobile-skill-btn"
                      onClick={() => setActiveNode(skill.id)}
                    >
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className={`tech-dna-panel ${activeData ? 'active' : ''}`}>
            {activeData && (
              <>
                <button className="panel-close" onClick={() => setActiveNode(null)}>
                  <X size={20} />
                </button>
                <div className="panel-badge" style={{ color: activeData.color, background: `${activeData.color}20` }}>
                  {activeData.type.toUpperCase()}
                </div>
                <h3 className="panel-title">{activeData.label}</h3>
                <p className="panel-desc">{activeData.details}</p>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
