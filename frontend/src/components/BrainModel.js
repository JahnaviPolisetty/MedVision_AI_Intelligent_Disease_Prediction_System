import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';

function RotatingBrain() {
  const meshRef = useRef();

  // Rotate slowly on the Y-axis
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.5}>
      <MeshDistortMaterial
        color="#6366f1" // Soft purple
        attach="material"
        distort={0.4} // Adds a brain-like organic distortion
        speed={2} // Speed of the distortion animation
        roughness={0.2}
        metalness={0.8}
        emissive="#14b8a6" // Teal glow
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

const BrainModel = () => {
  return (
    <div className="w-full h-64 relative mb-8 rounded-xl overflow-hidden glass-panel flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 pointer-events-none"></div>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
        <RotatingBrain />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute bottom-4 left-0 w-full text-center z-20 pointer-events-none">
        <p className="text-primary glow-text font-bold tracking-widest text-sm uppercase">AI Neural Core Active</p>
      </div>
    </div>
  );
};

export default BrainModel;
