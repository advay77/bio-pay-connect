
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { Group } from 'three';

const FingerPrintModel = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  // We're creating a stylized fingerprint scanner model with Three.js primitives
  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.5, 1.7, 0.2, 32]} />
          <meshStandardMaterial 
            color="#121212" 
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        
        {/* Scanner surface */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
          <meshStandardMaterial 
            color="#00ffcc" 
            emissive="#00ffcc"
            emissiveIntensity={0.4}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
        
        {/* Fingerprint pattern */}
        <mesh position={[0, -0.29, 0]}>
          <cylinderGeometry args={[1, 1, 0.02, 32]} />
          <meshStandardMaterial 
            color="#0e766e"
            wireframe={true}
            emissive="#00ffcc"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Scan light effect */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
          <planeGeometry args={[2, 0.1]} />
          <meshBasicMaterial 
            color="#00ffcc"
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      </group>
      
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </>
  );
};

const FingerprintModelCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.4, 0.4]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <FingerPrintModel />
        </PresentationControls>
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={6}
          blur={3}
        />
      </Canvas>
    </div>
  );
};

export default FingerprintModelCanvas;
