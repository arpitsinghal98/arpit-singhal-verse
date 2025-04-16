
import LogoModel from "../AnimatedLogo";

interface LogoSceneProps {
  isVisible: boolean;
}

/**
 * Interactive 3D logo scene
 */
const LogoScene = ({ isVisible = false }: LogoSceneProps) => {
  return (
    <group position={[0, 0, 0]} visible={isVisible}>
      <LogoModel />
    </group>
  );
};

export default LogoScene;
