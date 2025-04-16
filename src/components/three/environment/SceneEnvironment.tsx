
import { Stars, Cloud } from "@react-three/drei";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Enhanced background environment with stars, clouds, and ambient spheres
 */
const SceneEnvironment = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Atmospheric clouds */}
      <group position={[0, 0, -10]}>
        <Cloud 
          opacity={0.5}
          speed={0.4} 
          segments={20}
          color="#33C3F0"
        />
      </group>
      
      {/* Ambient spheres */}
      {[-10, -5, 5, 10].map((x, i) => (
        <Float 
          key={i}
          speed={1} 
          rotationIntensity={1} 
          floatIntensity={2}
          position={[x, x % 3, x % 2 - 10]}
        >
          <Sphere args={[1, 32, 32]}>
            <MeshDistortMaterial
              color={i % 2 === 0 ? "#33C3F0" : "#D946EF"}
              distort={0.5}
              speed={4}
              roughness={0}
              metalness={1}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

export default SceneEnvironment;
