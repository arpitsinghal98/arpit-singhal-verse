
import { useRef } from "react";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";

interface LogoTextProps {
  text?: string;
  position?: [number, number, number];
  fontSize?: number;
}

/**
 * 3D text component for the logo
 */
const LogoText = ({ 
  text = "AS", 
  position = [-0.3, -0.25, 0],
  fontSize = 0.5
}: LogoTextProps) => {
  const textRef = useRef<THREE.Mesh>(null);

  return (
    <Text3D
      ref={textRef}
      font="/fonts/inter_bold.json"
      size={fontSize}
      height={0.1}
      position={position}
    >
      {text}
      <meshStandardMaterial 
        color="#FFFFFF" 
        emissive="#FFFFFF"
        emissiveIntensity={1}
        metalness={0.8}
        roughness={0.1}
      />
    </Text3D>
  );
};

export default LogoText;
