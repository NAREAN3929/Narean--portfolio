import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Platform() {
  const ringRef = useRef<THREE.Mesh>(null);

  // Rotate the glowing ring slightly
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* Main Base */}
      <mesh receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.2, 64]} />
        <meshStandardMaterial 
          color="#0a0a0f" 
          roughness={0.1} 
          metalness={0.8} 
        />
      </mesh>

      {/* Inner Matte Circle */}
      <mesh position={[0, 0.105, 0]} receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.02, 64]} />
        <meshStandardMaterial 
          color="#111" 
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>

      {/* Glowing Neon Rim */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.35, 64]} />
        <meshBasicMaterial 
          color="#7877c6" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Base ambient glow */}
      <pointLight position={[0, 0.5, 0]} color="#7877c6" intensity={2} distance={4} decay={2} />
    </group>
  );
}
