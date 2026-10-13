import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Icosahedron, Torus, Octahedron } from '@react-three/drei';

export default function AvatarPlaceholder() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group[]>([]);

  // Animation logic for the procedural model
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.6;
      ring3Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
    
    if (coreRef.current) {
      // Breathing scale effect
      coreRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
      // Gentle spin
      coreRef.current.rotation.y = time * 0.4;
      coreRef.current.rotation.z = Math.sin(time * 2) * 0.1;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = time * 0.25;
      orbitGroupRef.current.rotation.z = Math.sin(time * 0.4) * 0.15;
    }

    // Individual satellite bobbing and spinning
    satellitesRef.current.forEach((sat, i) => {
      if (sat) {
        sat.rotation.x = time * 2 + i;
        sat.rotation.y = time * 3 + i;
        sat.position.y = Math.sin(time * 3 + i * Math.PI) * 0.4;
      }
    });
  });

  return (
    <group position={[0, 2.8, 0]}>
      {/* Floating container for smooth overall motion */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
        
        {/* Central AI Data Core */}
        <group ref={coreRef}>
          {/* Wireframe outer shell */}
          <Icosahedron args={[0.9, 1]}>
            <meshStandardMaterial 
              color="var(--accent-color, #7877c6)" 
              emissive="var(--accent-color, #7877c6)" 
              emissiveIntensity={0.8} 
              wireframe 
              transparent
              opacity={0.4}
            />
          </Icosahedron>
          {/* Solid inner crystal */}
          <Icosahedron args={[0.65, 0]}>
            <meshPhysicalMaterial 
              color="#00d2ff" 
              emissive="#0044ff"
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.9}
              clearcoat={1}
            />
          </Icosahedron>
        </group>

        {/* Precision Tech Rings */}
        <Torus ref={ring1Ref} args={[1.6, 0.015, 16, 100]}>
          <meshStandardMaterial color="#fff" metalness={0.8} roughness={0.2} />
        </Torus>
        
        <Torus ref={ring2Ref} args={[2.0, 0.02, 16, 100]}>
          <meshStandardMaterial 
            color="var(--accent-color, #7877c6)" 
            emissive="var(--accent-color, #7877c6)" 
            emissiveIntensity={1} 
          />
        </Torus>

        <Torus ref={ring3Ref} args={[2.4, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
        </Torus>

        {/* Orbiting Data Satellites */}
        <group ref={orbitGroupRef}>
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const radius = 3.0;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <group 
                key={i} 
                position={[x, 0, z]} 
                ref={(el) => { if (el) satellitesRef.current[i] = el; }}
              >
                <Octahedron args={[0.18]}>
                  <meshPhysicalMaterial 
                    color="#ffffff" 
                    emissive="#00d2ff"
                    emissiveIntensity={1.2}
                    metalness={1} 
                    roughness={0} 
                  />
                </Octahedron>
                <pointLight distance={4} intensity={0.6} color="#00d2ff" />
              </group>
            );
          })}
        </group>
        
      </Float>
    </group>
  );
}
