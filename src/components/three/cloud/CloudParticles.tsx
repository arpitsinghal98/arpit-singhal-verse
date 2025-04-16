
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Enhanced cloud particles with animated rotation
 */
const CloudParticles = () => {
  const particles = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 35;
    positions[i3 + 1] = (Math.random() - 0.5) * 35;
    positions[i3 + 2] = (Math.random() - 0.5) * 35;
    scales[i] = Math.random();
    
    // Alternate colors between blue and purple
    const color = new THREE.Color(i % 2 === 0 ? "#33C3F0" : "#D946EF");
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  useFrame((state, delta) => {
    if (particles.current) {
      particles.current.rotation.y += delta * 0.05;
      particles.current.rotation.x += delta * 0.01;
    }
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CloudParticles;
