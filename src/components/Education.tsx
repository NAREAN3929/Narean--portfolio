import React, { useEffect, useState } from 'react';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, Book } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../education.css';

interface Coursework {
  title: string;
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: {
    type: string;
    value: number;
    max: number;
    label: string;
  };
  coursework: Coursework[];
  icon: React.ReactNode;
}

const educationData: EducationItem[] = [
  {
    id: 'btech',
    degree: 'B.E. in Computer Science and Engineering',
    institution: 'VSB College of Engineering Technical Campus',
    location: 'Coimbatore, Tamil Nadu, India',
    duration: '2023 – 2027',
    score: {
      type: 'cgpa',
      value: 8.01,
      max: 10,
      label: 'Cumulative GPA (CGPA)'
    },
    coursework: [
      { title: 'Data Structures & Algorithms' },
      { title: 'Database Management Systems' },
      { title: 'Object-Oriented Programming' },
      { title: 'Operating Systems' },
      { title: 'Computer Networks' },
      { title: 'Artificial Intelligence' }
    ],
    icon: <GraduationCap size={24} />
  },
  {
    id: 'school',
    degree: 'Higher Secondary Education (12th Grade)',
    institution: 'PKP Swamy Matric Hr. Sec. School',
    location: 'Erode, Tamil Nadu, India',
    duration: '2021 – 2023',
    score: {
      type: 'percentage',
      value: 65,
      max: 100,
      label: 'Overall Percentage'
    },
    coursework: [
      { title: 'Mathematics' },
      { title: 'Physics' },
      { title: 'Chemistry' },
      { title: 'Computer Science' }
    ],
    icon: <Book size={24} />
  }
];

export default function Education() {
  const revealRef = useScrollReveal();
  
  return (
    <section id="education" className="education-section">
      <div className="container">
        
        {/* Section Header */}
        <div ref={revealRef} className="reveal education-header-wrapper">
          <div className="education-header">
            <div className="header-title">
              <GraduationCap className="header-icon" />
              <div>
                <h2>Academic Background</h2>
                <p className="subtitle">Degree & Secondary Education</p>
              </div>
            </div>
            <div className="count-pill">
              {educationData.length} Institutions
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="education-timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-items">
            {educationData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineCard({ item, index }: { item: EducationItem, index: number }) {
  const revealRef = useScrollReveal();
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Animate progress bar width slightly after mount to trigger transition
    const timer = setTimeout(() => {
      const percentage = (item.score.value / item.score.max) * 100;
      setProgressWidth(percentage);
    }, 500 + index * 200); // Stagger animation
    return () => clearTimeout(timer);
  }, [item, index]);

  return (
    <div ref={revealRef} className="reveal timeline-item">
      {/* Node Marker */}
      <div className="timeline-node">
        <div className="node-inner" />
      </div>

      {/* Card Content */}
      <div className="timeline-card">
        {/* Watermark Icon */}
        <div className="card-watermark">
          {item.icon}
        </div>

        {/* Header Row (Badges) */}
        <div className="card-header-row">
          <div className="badge-pill duration-badge">
            <Calendar size={14} />
            <span>{item.duration}</span>
          </div>
          <div className="badge-pill score-badge">
            <Award size={14} />
            <span>
              {item.score.type === 'cgpa' ? `CGPA: ${item.score.value} / ${item.score.max}` : `${item.score.value}% Distinction`}
            </span>
          </div>
        </div>

        {/* Title & Info */}
        <div className="card-body">
          <h3 className="degree-title">{item.degree}</h3>
          <h4 className="institution-name">{item.institution}</h4>
          <div className="location-info">
            <MapPin size={14} />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Score Box */}
        <div className="score-box">
          <div className="score-header">
            <span className="score-label">{item.score.label}</span>
            <span className="score-value">{item.score.value}{item.score.type === 'percentage' ? '%' : ''}</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Coursework Tags */}
        {item.coursework && item.coursework.length > 0 && (
          <div className="coursework-section">
            <div className="coursework-header">
              <BookOpen size={14} />
              <span>Core Coursework:</span>
            </div>
            <div className="coursework-tags">
              {item.coursework.map((course, idx) => (
                <span key={idx} className="coursework-tag">
                  {course.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
