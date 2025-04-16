
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import SceneEnvironment from "./environment/SceneEnvironment";
import CloudParticles from "./cloud/CloudParticles";
import AnimatedText from "./text/AnimatedText";
import LogoScene from "./logo/LogoScene";

interface MainSceneProps {
  isVisible: boolean;
}

/**
 * Main scene component combining all 3D elements
 */
const MainScene = ({ isVisible = false }: MainSceneProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#33C3F0" />
      
      <LogoScene isVisible={isVisible} />
      <AnimatedText isVisible={isVisible} />
      <CloudParticles />
      <SceneEnvironment />
      
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

export default MainScene;
