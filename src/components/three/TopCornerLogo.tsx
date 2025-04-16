
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LogoModel from "./AnimatedLogo";

const TopCornerLogo = () => {
  return (
    <div className="fixed top-4 left-4 z-50 w-16 h-16 rounded-full overflow-hidden border-2 border-neon-blue/60 shadow-[0_0_15px_rgba(30,174,219,0.5)]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <LogoModel isMinimized={true} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={5} 
        />
      </Canvas>
    </div>
  );
};

export default TopCornerLogo;
