import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';
import '../achievements.css';

const achievementsData = [
  {
    id: 'ach-01',
    title: 'SQL 50 Badge',
    platform: 'LeetCode',
    desc: 'Top 50 SQL interview questions mastered.',
    badgeImg: '/certificates/leetcode-sql50.png',
    color: '#ffa116',
    date: '2026',
    link: '/certificates/leetcode-sql50.png'
  },
  {
    id: 'ach-02',
    title: '100 Days Badge',
    platform: 'LeetCode',
    desc: '100+ days of consistent problem solving.',
    badgeImg: '/certificates/leetcode-100days.png',
    color: '#ffa116',
    date: '2026',
    link: '/certificates/leetcode-100days.png'
  },
  {
    id: 'ach-03',
    title: 'Java (Basic)',
    platform: 'HackerRank',
    desc: 'Core Java programming fundamentals.',
    badgeImg: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    color: '#00ea64',
    date: 'Apr 2026',
    link: '/certificates/hackerrank-java.pdf'
  },
  {
    id: 'ach-04',
    title: 'SQL (Intermediate)',
    platform: 'HackerRank',
    desc: 'Complex queries and database management.',
    badgeImg: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    color: '#00ea64',
    date: 'Apr 2026',
    link: '/certificates/hackerrank-sql.pdf'
  }
];

export default function Achievements() {
  const revealRef = useScrollReveal();

  return (
    <section id="achievements" className="achievements-gamified">
      <div className="ach-particles"></div>

      <div className="container reveal" ref={revealRef}>
        
        <div className="achievements-header text-center">
          <div className="cyber-badge">
            <span className="blink-dot"></span> ACHIEVEMENT UNLOCKED
          </div>
          <h2 className="achievements-title">
            The <span className="text-gradient">Trophy Room.</span>
          </h2>
          <p className="achievements-desc">
            Competitive programming milestones and verified skill badges.
          </p>
        </div>

        <div className="trophy-showcase">
          {achievementsData.map((item, index) => (
            <div 
              key={item.id} 
              className="trophy-pedestal" 
              style={{ '--accent': item.color, animationDelay: `${index * 0.15}s` } as React.CSSProperties}
            >
              
              {/* Floating Hologram Badge */}
              <div className="trophy-hologram">
                <div className="hologram-beam"></div>
                <img src={item.badgeImg} alt={item.title} className="trophy-img float-anim" loading="lazy" />
              </div>

              {/* Pedestal Base info */}
              <div className="trophy-info">
                <div className="trophy-platform" style={{ color: item.color }}>{item.platform}</div>
                <h3 className="trophy-title">{item.title}</h3>
                <p className="trophy-desc">{item.desc}</p>
                
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="trophy-btn"
                >
                  Inspect <ExternalLink size={14} />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
