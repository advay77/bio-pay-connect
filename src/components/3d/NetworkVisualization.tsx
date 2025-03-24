
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

// Type definitions for our network points
interface NetworkPoint {
  position: [number, number, number];
  connections: number[];
}

// Generate random points for the network
const generatePoints = (count: number, size: number): NetworkPoint[] => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      position: [
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
      ],
      connections: [],
    });
  }

  // Create connections between points
  for (let i = 0; i < count; i++) {
    const maxConnections = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < maxConnections; j++) {
      const target = Math.floor(Math.random() * count);
      if (target !== i && !points[i].connections.includes(target)) {
        points[i].connections.push(target);
      }
    }
  }

  return points;
};

const Network = () => {
  // Use useMemo to generate points only once
  const points = useMemo(() => generatePoints(30, 5), []);
  const linesRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.001;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Nodes */}
      <group ref={nodesRef}>
        {points.map((point, i) => (
          <mesh key={`node-${i}`} position={new Vector3(point.position[0], point.position[1], point.position[2])}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#00ffcc" : i % 3 === 1 ? "#2563eb" : "#a855f7"} 
              emissive={i % 3 === 0 ? "#00ffcc" : i % 3 === 1 ? "#2563eb" : "#a855f7"}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Connections */}
      <group ref={linesRef}>
        {points.map((point, i) => 
          point.connections.map((target, j) => {
            const start = new Vector3(point.position[0], point.position[1], point.position[2]);
            const end = new Vector3(
              points[target].position[0], 
              points[target].position[1], 
              points[target].position[2]
            );
            
            // Calculate the midpoint and add some curve
            const mid = new Vector3().addVectors(start, end).divideScalar(2);
            mid.y += (Math.random() - 0.5) * 0.2;
            
            // Create a curve
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const curvePoints = curve.getPoints(20);
            const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
            
            return (
              <primitive 
                key={`line-${i}-${j}`} 
                object={new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({ 
                    color: i % 2 === 0 ? "#00ffcc" : "#2563eb", 
                    opacity: 0.3, 
                    transparent: true 
                  })
                )}
              />
            );
          })
        )}
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </>
  );
};

const NetworkVisualization: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Network />
      </Canvas>
    </div>
  );
};

export default NetworkVisualization;
