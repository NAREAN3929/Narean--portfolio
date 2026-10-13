import { useEffect, useRef, useState } from 'react';
import type { IntroPhase } from '../App';
import '../intro.css';

interface IntroProps {
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
}

export default function Intro({ phase, setPhase }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  useEffect(() => {
    setPhase('playing');
  }, [setPhase]);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setPhase('transforming');
    
    // Allow the transition animation to play out before completing
    setTimeout(() => {
      sessionStorage.setItem('introPlayed', 'true');
      setPhase('completed');
    }, 1500); // 1.5s for the transition
  };
  
  // Backup timeout in case video fails to play or load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isVideoStarted && videoRef.current && videoRef.current.readyState < 3) {
        // Video failed to start after 3 seconds, skip intro
        handleVideoEnd();
      }
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [isVideoStarted]);

  if (phase === 'completed' || phase === 'initial') return null;

  return (
    <div className={`video-intro-overlay ${isVideoEnded ? 'video-fade-out' : ''}`}>
      <div className={`video-container ${isVideoEnded ? 'video-zoom-blur' : ''}`}>
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          onPlay={() => setIsVideoStarted(true)}
          onEnded={handleVideoEnd}
          className="intro-video"
          disablePictureInPicture
        />
        
        {/* Cinematic light flare overlay for transition */}
        <div className={`transition-flare ${isVideoEnded ? 'flare-active' : ''}`} />
      </div>
    </div>
  );
}
