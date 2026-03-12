import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

function GlowingMarker({ position, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  // All markers glow neon blue
  const color = "#38bdf8";

  useFrame((state) => {
    meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.15);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.5 : 1.5} toneMapped={false} />
      </mesh>
      
      {/* Outer Pulse */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
      </mesh>

      {hovered && (
        <Html position={[0.5, 0.5, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-[#0f172a]/90 backdrop-blur-md border border-[#3b82f6] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.6)] pointer-events-none font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></div>
              {label}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// A more medical/futuristic silhouette using wireframes and blue emissive
function MedicalSilhouette() {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3; // Slow floating rotation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 - 1.5;
  });

  const wireframeMaterial = (
    <meshStandardMaterial 
      color="#1d4ed8" 
      emissive="#0ea5e9"
      emissiveIntensity={0.4}
      wireframe={true} 
      transparent 
      opacity={0.3} 
    />
  );
  
  const coreMaterial = (
    <meshPhysicalMaterial 
      color="#0f172a" 
      transparent 
      opacity={0.8} 
      roughness={0.2} 
      metalness={0.9} 
      transmission={0.6}
    />
  );

  return (
    <group ref={groupRef}>
      {/* Head */}
      <group position={[0, 4.2, 0]}>
        <mesh>{wireframeMaterial}<sphereGeometry args={[0.7, 16, 16]} /></mesh>
        <mesh>{coreMaterial}<sphereGeometry args={[0.65, 32, 32]} /></mesh>
      </group>
      
      {/* Neck */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
        {wireframeMaterial}
      </mesh>
      
      {/* Ribcage / Upper Torso */}
      <group position={[0, 2.0, 0]}>
        <mesh>{wireframeMaterial}<capsuleGeometry args={[1.2, 1.5, 16, 32]} /></mesh>
        <mesh>{coreMaterial}<capsuleGeometry args={[1.1, 1.4, 32, 32]} /></mesh>
      </group>
      
      {/* Lower Torso */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.0, 1.1, 1.5, 16]} />
        {wireframeMaterial}
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, -0.6, 0]}>
        <capsuleGeometry args={[1.1, 0.5, 16, 32]} />
        {wireframeMaterial}
      </mesh>

      {/* Shoulders & Arms */}
      <mesh position={[-1.6, 2.2, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.35, 2.8, 16, 16]} />
        {wireframeMaterial}
      </mesh>
      <mesh position={[1.6, 2.2, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.35, 2.8, 16, 16]} />
        {wireframeMaterial}
      </mesh>

      {/* Legs */}
      <mesh position={[-0.6, -2.5, 0]}>
        <capsuleGeometry args={[0.4, 3.2, 16, 16]} />
        {wireframeMaterial}
      </mesh>
      <mesh position={[0.6, -2.5, 0]}>
        <capsuleGeometry args={[0.4, 3.2, 16, 16]} />
        {wireframeMaterial}
      </mesh>
      
      {/* Data rings orbiting the body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, 0]}>
         <torusGeometry args={[2.5, 0.02, 16, 100]} />
         <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.2, 0]} position={[0, 0.5, 0]}>
         <torusGeometry args={[2.2, 0.01, 16, 80]} />
         <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

const HumanModel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[550px] relative rounded-xl overflow-hidden bg-[#0a1122]">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d4ed8]/20 via-[#0f172a]/80 to-[#0f172a] pointer-events-none z-0"></div>
      
      <div className="absolute top-5 left-6 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_12px_#38bdf8]"></div>
          <span className="text-[#38bdf8] tracking-widest text-xs uppercase font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">Live Telemetry</span>
        </div>
        <p className="text-muted text-[10px] uppercase tracking-widest pl-4">Optic Scan In Progress</p>
      </div>
      
      <div className="absolute w-full h-full z-10">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#38bdf8" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#1d4ed8" />
          
          <MedicalSilhouette />
          
          {/* Brain Marker */}
          <GlowingMarker 
            position={[0, 2.7, 0]} 
            label="Brain Tumor Detection" 
            onClick={() => navigate('/brain-tumor')}
          />
          
          {/* Heart Marker */}
          <GlowingMarker 
            position={[0.3, 0.8, 0.6]} 
            label="Heart Disease Prediction" 
            onClick={() => navigate('/heart-disease')}
          />
          
          {/* Pancreas Marker */}
          <GlowingMarker 
            position={[-0.2, -0.4, 0.5]} 
            label="Diabetes Analysis" 
            onClick={() => navigate('/diabetes')}
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.5} 
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      <div className="absolute bottom-5 left-0 w-full text-center z-10 pointer-events-none">
        <div className="inline-block bg-[#0f172a]/80 backdrop-blur-sm border border-[#3b82f6]/30 px-4 py-1.5 rounded-full">
          <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest">
            <span className="text-[#38bdf8]">Drag</span> to rotate • <span className="text-[#38bdf8]">Click</span> glowing markers to enter diagnostic modules
          </p>
        </div>
      </div>
      
      {/* Decorative corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#38bdf8]/50 rounded-tl-lg z-0 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#38bdf8]/50 rounded-tr-lg z-0 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#38bdf8]/50 rounded-bl-lg z-0 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#38bdf8]/50 rounded-br-lg z-0 pointer-events-none"></div>
    </div>
  );
};

export default HumanModel;
