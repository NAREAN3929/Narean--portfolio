import { useState, useEffect, useRef } from 'react';
import { Search, User, Code2, MonitorPlay, GraduationCap, FileText, Mail, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';
import TechIcon from './TechIcon';

// Commands List
const commands = [
  { id: 'about', label: 'About', icon: User, type: 'internal', target: '#about' },
  { id: 'skills', label: 'Skills', icon: Code2, type: 'internal', target: '#skills' },
  { id: 'projects', label: 'Projects', icon: MonitorPlay, type: 'internal', target: '#projects' },
  { id: 'timeline', label: 'Timeline', icon: GraduationCap, type: 'internal', target: '#experience' },
  { id: 'ai-tools', label: '🤖 AI Tools', icon: 'Claude', type: 'internal', target: '#ai-tools' },
  { id: 'resume', label: 'Resume', icon: FileText, type: 'internal', target: '/resume.pdf' },
  { id: 'github', label: 'GitHub', icon: 'GitHub', type: 'external', target: 'https://github.com/NAREAN3929' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'LinkedIn', type: 'external', target: 'https://linkedin.com/in/narean3929' },
  { id: 'leetcode', label: 'LeetCode', icon: 'LeetCode', type: 'external', target: 'https://leetcode.com/u/Narean3929/' },
  { id: 'hackerrank', label: 'HackerRank', icon: 'HackerRank', type: 'external', target: 'https://hackerrank.com/profile/narean3929' },
  { id: 'contact', label: 'Contact', icon: Mail, type: 'internal', target: '#contact' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [easterEgg, setEasterEgg] = useState<'none' | 'sudo' | 'dev'>('none');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Keyboard Listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Reset state when opened and focus input
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setEasterEgg('none');
      document.body.style.overflow = 'hidden';
      // Slight delay to allow transition before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('easter-egg-active');
    }
  }, [isOpen]);

  // Filter commands
  const filteredCommands = commands.filter((cmd) => {
    const query = search.toLowerCase();
    if (query === '') return true;
    
    // Add some smart keywords for filtering
    const keywords = [cmd.label.toLowerCase(), cmd.id];
    if (cmd.id === 'leetcode') keywords.push('coding', 'problem', 'leet');
    if (cmd.id === 'github') keywords.push('git');
    if (cmd.id === 'linkedin') keywords.push('link', 'profile');
    if (cmd.id === 'projects') keywords.push('project');
    if (cmd.id === 'skills') keywords.push('skill');

    return keywords.some(kw => kw.includes(query));
  });

  // Handle Search Input & Easter Eggs
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    setSelectedIndex(0);

    const lower = val.toLowerCase();
    if (lower === 'sudo') {
      setEasterEgg('sudo');
      setTimeout(() => {
        setSearch('');
        setEasterEgg('none');
      }, 3000);
    } else if (lower === 'konami' || lower === 'narean') {
      setEasterEgg('dev');
      document.body.classList.add('easter-egg-active');
    } else {
      setEasterEgg('none');
      document.body.classList.remove('easter-egg-active');
    }
  };

  // Keyboard Navigation inside Modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }

    if (filteredCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  // Auto-scroll to selected item
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, filteredCommands]);

  const executeCommand = (cmd: typeof commands[0]) => {
    setIsOpen(false);
    
    if (cmd.id === 'resume' || cmd.target === '/resume.pdf') {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Narean_Karthikeyan_Resume.pdf';
      link.target = '_blank';
      link.click();
      return;
    }

    if (cmd.type === 'internal') {
      setTimeout(() => {
        const element = document.querySelector(cmd.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Highlight destination briefly
          const originalBg = (element as HTMLElement).style.background;
          (element as HTMLElement).style.background = 'rgba(120, 119, 198, 0.1)';
          setTimeout(() => {
            (element as HTMLElement).style.background = originalBg;
          }, 1000);
        }
      }, 100); // Wait for modal to close
    } else if (cmd.type === 'external') {
      window.open(cmd.target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`cmd-palette-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}>
      <div 
        className="cmd-palette-modal" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        
        <div className="cmd-search-container">
          <Search size={20} color="var(--text-secondary)" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Search portfolio..."
            value={search}
            onChange={handleSearch}
          />
          <span className="cmd-esc">ESC</span>
        </div>

        {easterEgg === 'sudo' && (
          <div className="sudo-msg">
            <p>&gt; sudo access portfolio</p>
            <p style={{ marginTop: '0.5rem' }}>Access granted.</p>
            <p style={{ marginTop: '0.5rem' }}>Welcome, curious developer. 👀</p>
          </div>
        )}

        {easterEgg === 'dev' && (
          <div className="dev-mode-msg">
            <p style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Developer mode unlocked ⚡</p>
            <p>NAREAN.DEV</p>
            <p>────────────────────</p>
            <p>Java        ✓</p>
            <p>SQL         ✓</p>
            <p>MySQL       ✓</p>
            <p>Web         ✓</p>
            <p>AI          ✓</p>
            <br />
            <p style={{ color: '#4ade80' }}>STATUS: BUILDING</p>
          </div>
        )}

        {easterEgg === 'none' && (
          <div className="cmd-list" ref={listRef} role="listbox">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                if (cmd.type === 'external') {
                  return (
                    <a
                      key={cmd.id}
                      href={cmd.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cmd-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      role="option"
                      aria-selected={isSelected}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {typeof cmd.icon === 'string' ? <TechIcon name={cmd.icon} size={18} /> : <cmd.icon size={18} />}
                      <span style={{ flexGrow: 1 }}>{cmd.label}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>↗</span>
                    </a>
                  );
                }

                return (
                  <div
                    key={cmd.id}
                    className={`cmd-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {typeof cmd.icon === 'string' ? <TechIcon name={cmd.icon} size={18} /> : <cmd.icon size={18} />}
                    <span style={{ flexGrow: 1 }}>{cmd.label}</span>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No commands found.
              </div>
            )}
          </div>
        )}

        {easterEgg === 'none' && (
          <div className="cmd-footer">
            <div className="cmd-hint">
              <span style={{ display: 'flex', gap: '2px' }}><ArrowUp size={12}/><ArrowDown size={12}/></span> Navigate
            </div>
            <div className="cmd-hint">
              <CornerDownLeft size={12} /> Select
            </div>
            <div className="cmd-hint">
              <span style={{ fontFamily: 'var(--font-mono)' }}>ESC</span> Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
