
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Stars, 
  PerspectiveCamera, 
  Text3D, 
  Float, 
  OrbitControls, 
  Cloud,
  Sphere,
  MeshDistortMaterial
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import LogoModel from "./AnimatedLogo";

// Enhanced background environment
const Environment = () => {
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
          position={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
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
          <Sphere args={[1, 32, 32]} scale={[0.5, 0.5, 0.5]}>
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

// Dynamic text component with animation
const AnimatedText = ({ isVisible = false }) => {
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

// Enhanced cloud particles
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

// Interactive 3D logo scene
const LogoScene = ({ isVisible = false }) => {
  return (
    <group position={[0, 0, 0]}>
      <LogoModel />
    </group>
  );
};

// Main scene component
const Scene = ({ isVisible = false }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#33C3F0" />
      
      <LogoScene isVisible={isVisible} />
      <AnimatedText isVisible={isVisible} />
      <CloudParticles />
      <Environment />
      
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
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          logarithmicDepthBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        camera={{ position: [0, 0, 15], fov: 60 }}
      >
        <Scene isVisible={isVisible} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
