
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface AnimatedTextProps {
  isVisible: boolean;
}

/**
 * Dynamic text component with animation
 */
const AnimatedText = ({ isVisible = false }: AnimatedTextProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    if (isVisible && textRef.current && groupRef.current) {
      // Initial position
      gsap.set(groupRef.current.position, { y: -10, z: -5 });
      
      // Camera position animation
      gsap.to(camera.position, {
        z: 10,
        duration: 2,
        ease: "power2.inOut"
      });
      
      // Text animation
      gsap.to(groupRef.current.position, {
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out"
      });
      
      // Rotation animation
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 4,
        delay: 1,
        ease: "power1.inOut"
      });
    }
  }, [isVisible, camera]);
  
  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D
          ref={textRef}
          font="/fonts/inter_bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Arpit Singhal
          <meshStandardMaterial 
            color="#33C3F0" 
            emissive="#33C3F0"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Float>
    </group>
  );
};

export default AnimatedText;
