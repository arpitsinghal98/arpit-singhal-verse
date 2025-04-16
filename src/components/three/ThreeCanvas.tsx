
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Text3D, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Logo text component with animation
const LogoText = ({ isVisible = false }) => {
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
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D
          ref={textRef}
          font={"/fonts/inter_bold.json"}
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
            color="#9b87f5" 
            emissive="#9b87f5"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Float>
    </group>
  );
};

// Cloud particles for background effect
const CloudParticles = () => {
  const particles = useRef<THREE.Points>(null);
  const count = 300;
  
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 25;
    positions[i3 + 1] = (Math.random() - 0.5) * 25;
    positions[i3 + 2] = (Math.random() - 0.5) * 25;
    scales[i] = Math.random();
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
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#D946EF"
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main scene component
const Scene = ({ isVisible = false }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9b87f5" />
      <LogoText isVisible={isVisible} />
      <CloudParticles />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Main ThreeCanvas component
const ThreeCanvas = ({ isVisible = false }) => {
  return (
    <div id="canvas-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, logarithmicDepthBuffer: true }}>
        <Scene isVisible={isVisible} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
