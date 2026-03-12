import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function BrainModel() {
  const { scene } = useGLTF("/models/neurons.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {

        child.material = new THREE.MeshStandardMaterial({
          color: "#60a5fa",
          metalness: 0.6,
          roughness: 0.2,
          emissive: "#1e40af",
          emissiveIntensity: 1.5
        });

      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={[3, 3, 3]}
      position={[0, 0, 0]}
    />
  );
}

export default function ImmersiveModel() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      {/* 3D MODEL */}
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
          color="#93c5fd"
        />

        <pointLight
          position={[-3, 2, 3]}
          intensity={2}
          color="#3b82f6"
        />

        <BrainModel />

      </Canvas>

      {/* OPACITY OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)"
        }}
      />
    </div>
  );
}