
import * as THREE from "three";

interface LogoElementsProps {
  position?: [number, number, number];
}

/**
 * Inner geometric elements for the logo
 */
const LogoElements = ({ position = [0, 0, 0] }: LogoElementsProps) => {
  return (
    <group position={position}>
      {/* Cube element */}
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
      
      {/* Octahedron element */}
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
    </group>
  );
};

export default LogoElements;
