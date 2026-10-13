import React from 'react';
import { 
  FaJava, 
  FaHtml5, 
  FaCss3Alt, 
  FaGithub, 
  FaLinkedin, 
  FaGitAlt,
  FaPython
} from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io5';
import { 
  SiMysql, 
  SiLeetcode, 
  SiHackerrank, 
  SiEclipseide,
  SiAnthropic,
  SiGooglegemini,
  SiPytorch,
  SiPandas,
  SiScikitlearn
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Raw SVG for OpenAI (Codex) since it might be missing or named differently in older react-icons
const OpenAIIcon = ({ size = 24, className, style }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5962 8.3828a.0747.0747 0 0 1-.0379-.053V2.7471a4.504 4.504 0 0 1 6.1266 1.6558 4.485 4.485 0 0 1 .5346 3.0137l-.14-.0852-4.7877-2.7581a.7712.7712 0 0 0-.7806 0l-5.8428 3.3684v-2.3323a.0804.0804 0 0 1 .0332-.0615l4.6998-2.7125a4.4992 4.4992 0 0 1 2.8764 1.0408zM8.9959 11.4586l-2.02-1.1685a.071.071 0 0 1-.0379-.052V4.6555a4.504 4.504 0 0 1 4.4945-4.4944 4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369zM10.8296 9.388l2.02 1.1686 2.02-1.1686v-2.337l-2.02-1.1685-2.02 1.1685v2.337z"/>
  </svg>
);

const AntigravityIcon = ({ size = 24, className, style }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" 
      fill="currentColor" 
      opacity="0.9"
    />
    <path 
      d="M12 7L7.5 16H16.5L12 7Z" 
      fill="var(--bg-color, #050505)"
    />
    <circle cx="12" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

const logoMap: Record<string, React.FC<any>> = {
  'Java': FaJava,
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': IoLogoJavascript,
  'MySQL': SiMysql,
  'Git': FaGitAlt,
  'GitHub': FaGithub,
  'LinkedIn': FaLinkedin,
  'LeetCode': SiLeetcode,
  'HackerRank': SiHackerrank,
  'VS Code': VscVscode,
  'Eclipse': SiEclipseide,
  'Claude': SiAnthropic,
  'Google AI Studio': SiGooglegemini,
  'Codex': OpenAIIcon,
  'Antigravity': AntigravityIcon,
  'Python': FaPython,
  'PyTorch': SiPytorch,
  'Pandas': SiPandas,
  'Scikit-learn': SiScikitlearn,
};

export default function TechIcon({ name, size = 24, className = '', style = {} }: TechIconProps) {
  // 1. Check if we have an official icon component for this name
  const IconComponent = logoMap[name] || logoMap[name.replace(' ', '')];

  // 2. Base styles for all tech icons
  const baseStyle: React.CSSProperties = {
    transition: 'all 0.3s ease',
    ...style
  };

  if (IconComponent) {
    return (
      <IconComponent 
        size={size} 
        className={`tech-icon ${className}`}
        style={baseStyle}
        aria-label={`${name} logo`}
        title={name}
      />
    );
  }

  // 3. Fallback for Antigravity or missing logos (Clean Text Label per requirements)
  return (
    <span 
      className={`tech-icon-text ${className}`}
      style={{
        fontSize: size * 0.5,
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        padding: '0.2em 0.6em',
        border: '1px solid currentColor',
        borderRadius: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...baseStyle
      }}
      aria-label={`${name} logo text`}
      title={name}
    >
      {name === 'Antigravity' ? 'AGY' : name}
    </span>
  );
}
