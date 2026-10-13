import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Cpu, Lightbulb, Code, Bug, Sparkles, AlertCircle } from 'lucide-react';
import '../ai-tools.css';

const tools = [
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI Assistants',
    role: 'Reasoning & Architecture',
    quote: '"My primary reasoning engine for complex architecture and deep logic bugs."',
    imgUrl: 'https://cdn.simpleicons.org/anthropic/d97757',
    color: '#d97757'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'AI Coding Tools',
    role: 'Inline Code Generation',
    quote: '"My persistent AI pair programmer for rapid boilerplate and inline completion."',
    imgUrl: 'https://cdn.simpleicons.org/githubcopilot/ffffff',
    color: '#ffffff'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Coding Tools',
    role: 'AI-First IDE',
    quote: '"My primary editor for AI-assisted whole-codebase refactoring and generation."',
    imgUrl: 'https://cdn.simpleicons.org/cursor/ffffff',
    color: '#ffffff'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Assistants',
    role: 'Conversational AI',
    quote: '"For rapid prototyping, exploring complex concepts, and quick logic validation."',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    color: '#10a37f'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'AI Assistants',
    role: 'Multimodal Analysis',
    quote: '"Where I tune complex prompt chains and test multimodal API integrations."',
    imgUrl: 'https://cdn.simpleicons.org/googlegemini/facc15',
    color: '#facc15'
  },
  {
    id: 'aistudio',
    name: 'Google AI Studio',
    category: 'AI Prototyping',
    role: 'Prompt Engineering',
    quote: '"For testing raw model capabilities and system instructions before deployment."',
    imgUrl: 'https://cdn.simpleicons.org/google/4285F4',
    color: '#4285F4'
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'Agentic Development',
    role: 'Agentic Framework',
    quote: '"A persistent pair programmer that autonomously orchestrates changes across the codebase."',
    imgUrl: '/antigravity.svg',
    color: '#a855f7'
  }
];

const CATEGORIES = ['All Tools', 'AI Assistants', 'AI Coding Tools', 'Agentic Development', 'AI Prototyping'];

const SDLC_STEPS = [
  { id: '01', title: 'IDEA', shortDesc: 'Define the problem', icon: Lightbulb, detail: 'Clarify requirements, explore approaches, and identify edge cases.' },
  { id: '02', title: 'AI ASSISTANCE', shortDesc: 'Accelerate implementation', icon: Cpu, detail: 'Generate ideas, scaffold solutions, and accelerate implementation.' },
  { id: '03', title: 'CODE', shortDesc: 'Build the solution', icon: Code, detail: 'Develop, explain, and refine code.' },
  { id: '04', title: 'TEST', shortDesc: 'Validate behavior', icon: Bug, detail: 'Generate test cases and validate expected behavior.' },
  { id: '05', title: 'DEBUG', shortDesc: 'Find and resolve issues', icon: Bug, detail: 'Investigate errors and identify possible fixes.' },
  { id: '06', title: 'IMPROVE', shortDesc: 'Refine and optimize', icon: Sparkles, detail: 'Refactor, optimize performance, and improve maintainability.' }
];

export default function AITools() {
  const revealRef = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  const filteredTools = activeCategory === 'All Tools' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <section id="ai-tools" className="ai-section">
      <div className="container reveal" ref={revealRef}>
        
        <div className="ai-header-centered">
          <div className="ai-badge">
            <Cpu size={14} /> AI DEVELOPMENT
          </div>
          <h2 className="ai-title">
            Augmented <span className="text-gradient">Engineering.</span>
          </h2>
          <div className="main-quote">
            <span style={{color: 'rgba(168, 85, 247, 0.8)', fontSize: '1.2em'}}>&ldquo;</span>
            I don't just write code; I orchestrate AI agents to accelerate development, eliminate boilerplate, and focus entirely on solving complex engineering problems.
            <span style={{color: 'rgba(168, 85, 247, 0.8)', fontSize: '1.2em'}}>&rdquo;</span>
          </div>
        </div>

        {/* Interactive Toolkit Showcase */}
        <div className="toolkit-showcase">
          
          <div className="toolkit-filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstMatch = cat === 'All Tools' ? tools[0] : tools.find(t => t.category === cat);
                  if (firstMatch) setSelectedTool(firstMatch);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="toolkit-layout">
            <div className="toolkit-grid">
              {filteredTools.map((tool) => (
                <div 
                  key={tool.id} 
                  className={`toolkit-card ${selectedTool.id === tool.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTool(tool)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedTool(tool)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedTool.id === tool.id}
                  style={{ '--accent': tool.color } as React.CSSProperties}
                >
                  <div className="toolkit-logo-wrapper">
                    {tool.imgUrl ? (
                      <img 
                        src={tool.imgUrl} 
                        alt={`${tool.name} official logo`} 
                        className={`toolkit-logo ${tool.id === 'chatgpt' ? 'invert-on-dark' : ''}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="missing-logo">
                        <AlertCircle size={20} color={tool.color} />
                        <span>Missing</span>
                      </div>
                    )}
                  </div>
                  <div className="toolkit-info">
                    <h4>{tool.name}</h4>
                    <span className="toolkit-cat">{tool.category}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="toolkit-detail-panel" style={{ '--accent': selectedTool.color } as React.CSSProperties}>
              <div className="detail-header">
                <div className="detail-logo">
                  {selectedTool.imgUrl ? (
                    <img 
                      src={selectedTool.imgUrl} 
                      alt={selectedTool.name} 
                      className={selectedTool.id === 'chatgpt' ? 'invert-on-dark' : ''}
                    />
                  ) : (
                    <AlertCircle size={32} color={selectedTool.color} />
                  )}
                </div>
                <div>
                  <h3>{selectedTool.name}</h3>
                  <span className="detail-role">{selectedTool.role}</span>
                </div>
              </div>
              <p className="detail-quote">{selectedTool.quote}</p>
              {!selectedTool.imgUrl && (
                <div className="detail-warning">
                  ⚠️ Official logo could not be verified or obtained.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Workflow SDLC Section */}
        <div className="ai-workflow-section">
          <div className="ai-workflow-header">
            <span className="ai-workflow-subtitle">DEVELOPMENT WORKFLOW</span>
            <h3 className="ai-workflow-title">AI-Assisted SDLC</h3>
            <p className="ai-workflow-desc">
              Leveraging AI at every stage of the development lifecycle to build faster, smarter, and more reliable software.
            </p>
            
            {/* Floating handwritten quote */}
            <div className="floating-handwritten-quote">
              <span className="hand-top">Better Code</span>
              <span className="hand-bottom">Bigger Ideas</span>
              <div className="hand-underline"></div>
            </div>
          </div>

          <div className="ai-workflow-timeline-wrapper">
            <div className="ai-workflow-steps">
              {SDLC_STEPS.map((step, index) => (
                <div 
                  key={index} 
                  className={`workflow-step ${activeStep === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveStep(index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={activeStep === index}
                >
                  <div className="step-icon">
                    <step.icon size={20} />
                  </div>
                  <div className="step-id">{step.id}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.shortDesc}</div>
                  {index < 5 && (
                    <div className="step-connector">
                      <div className="pulse-line"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="ai-workflow-details">
              {(() => {
                const ActiveIcon = SDLC_STEPS[activeStep].icon;
                return (
                  <>
                    <div className="details-indicator">
                      <ActiveIcon size={18} />
                      <span>{SDLC_STEPS[activeStep].id} - {SDLC_STEPS[activeStep].title}</span>
                    </div>
                    <p className="details-text">
                      {SDLC_STEPS[activeStep].detail}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="ai-sdlc-quote" tabIndex={0}>
            "<span>AI</span> doesn't replace developers, it makes them <span>10x</span> more effective."
          </div>
        </div>

      </div>
    </section>
  );
}
