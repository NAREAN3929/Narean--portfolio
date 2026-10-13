import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, PerspectiveCamera, Sparkles } from '@react-three/drei';
import AvatarPlaceholder from './AvatarPlaceholder';
import Platform from './Platform';
import Particles from './Particles';

interface SceneProps {
  phase: string;
  reducedMotion: boolean;
}

export default function Scene({ phase, reducedMotion }: SceneProps) {
  const showPlatform = ['PLATFORM_REVEAL', 'AVATAR_REVEAL', 'INTERACTIVE', 'HERO_MODE'].includes(phase);
  const showAvatar = ['AVATAR_REVEAL', 'INTERACTIVE', 'HERO_MODE'].includes(phase);
  const isHeroMode = phase === 'HERO_MODE';

  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera 
        makeDefault 
        position={isHeroMode ? [2, 3, 10] : [0, 3, 8]} 
        fov={45} 
      />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow 
        shadow-bias={-0.0001}
      />
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={2} 
        color="#7877c6" 
        penumbra={1} 
      />
      <pointLight position={[0, 4, 2]} intensity={1} color="#00d2ff" distance={10} />

      <Suspense fallback={null}>
        {/* Interaction Controls */}
        <PresentationControls 
          global 
          snap={true} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 12, Math.PI / 12]} // limit vertical 
          azimuth={[-Math.PI, Math.PI]} // full horizontal
        >
          <group position={[0, -2, 0]}>
            {showPlatform && <Platform />}
            {showAvatar && <AvatarPlaceholder />}
          </group>
        </PresentationControls>

        {/* Particles */}
        {!reducedMotion && <Particles count={isHeroMode ? 50 : 150} />}
        {!reducedMotion && <Sparkles count={50} scale={10} size={2} speed={0.2} opacity={0.5} color="#7877c6" />}
      </Suspense>
    </Canvas>
  );
}
