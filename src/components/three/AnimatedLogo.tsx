
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

const LogoModel = ({ isMinimized = false, color = "#33C3F0" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  
  // Animation springs
  const { scale, rotation } = useSpring({
    scale: isMinimized ? [0.8, 0.8, 0.8] : [1, 1, 1],
    rotation: isMinimized ? [0, 0, 0] : [0, THREE.MathUtils.degToRad(360), 0],
    config: { mass: 2, tension: 200, friction: 50 }
  });

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
      scale={scale as any}
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
      
      {/* Inner rotating elements */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#33C3F0" 
          emissive="#33C3F0" 
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(45)]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color="#D946EF" 
          emissive="#D946EF" 
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Text "AS" in the middle */}
      <Text3D
        ref={textRef}
        font="/fonts/inter_bold.json"
        size={0.5}
        height={0.1}
        position={[-0.3, -0.25, 0]}
      >
        AS
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.1}
        />
      </Text3D>
    </animated.mesh>
  );
};

export default LogoModel;
