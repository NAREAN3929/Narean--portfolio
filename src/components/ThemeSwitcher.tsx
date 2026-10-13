import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const themes = [
  { id: 'indigo', color: '#7877c6', gradient: 'linear-gradient(135deg, #7877c6 0%, #a09fe1 100%)', glow: 'rgba(120, 119, 198, 0.3)' },
  { id: 'blue', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)', glow: 'rgba(59, 130, 246, 0.3)' },
  { id: 'green', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)', glow: 'rgba(16, 185, 129, 0.3)' },
  { id: 'orange', color: '#f97316', gradient: 'linear-gradient(135deg, #f97316 0%, #fdba74 100%)', glow: 'rgba(249, 115, 22, 0.3)' }
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'indigo';
    }
    return 'indigo';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-mode') !== 'light';
    }
    return true;
  });

  const applyThemeColor = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId) || themes[0];
    const root = document.documentElement;
    root.style.setProperty('--accent-color', theme.color);
    root.style.setProperty('--accent-gradient', theme.gradient);
    root.style.setProperty('--accent-glow', theme.glow);
    localStorage.setItem('portfolio-theme', themeId);
  };

  const applyMode = (isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('portfolio-mode', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-mode', 'light');
    }
  };

  useEffect(() => {
    applyThemeColor(activeTheme);
    applyMode(isDarkMode);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    applyThemeColor(themeId);
  };

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyMode(newMode);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      
      {/* Light / Dark Mode Toggle */}
      <button 
        onClick={toggleMode}
        className="theme-mode-toggle"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-primary)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        aria-label="Toggle light/dark mode"
        title="Toggle Mode"
      >
        <Sun size={16} className="sun-icon" />
        <Moon size={16} className="moon-icon" />
      </button>

      {/* Accent Color Switcher */}
      <div className="theme-switcher" role="radiogroup" aria-label="Accent Color Selector">
        {themes.map((theme) => {
          const isActive = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              className={`theme-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
              aria-label={`${theme.id} accent color`}
              aria-checked={isActive}
              role="radio"
              title={theme.id.charAt(0).toUpperCase() + theme.id.slice(1)}
              style={{ 
                backgroundColor: theme.color,
                boxShadow: isActive ? `0 0 10px ${theme.glow}, inset 0 0 0 2px var(--bg-color)` : 'none'
              }}
            />
          );
        })}
      </div>
      
    </div>
  );
}
