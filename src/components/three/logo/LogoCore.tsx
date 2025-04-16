
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { animated } from "@react-spring/three";

interface LogoCoreProps {
  scale: any; // Spring animated value
  color?: string;
}

/**
 * Core component of the logo that renders the outer ring and inner elements
 */
const LogoCore = ({ scale, color = "#33C3F0" }: LogoCoreProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Continuous animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <animated.mesh 
      ref={meshRef}
      scale={scale}
      position={[0, 0, 0]}
    >
      {/* Outer ring */}
      <torusGeometry args={[1.5, 0.15, 16, 32]} />
      <MeshTransmissionMaterial
        color={color}
        transmission={0.95}
        thickness={0.5}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.4}
        distortion={0.5}
        temporalDistortion={0.2}
        distortionScale={0.5}
        chromaticAberration={0.5}
      />
    </animated.mesh>
  );
};

export default LogoCore;
