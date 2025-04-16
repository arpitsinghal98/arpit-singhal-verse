
import { useSpring } from "@react-spring/three";
import LogoCore from "./logo/LogoCore";
import LogoElements from "./logo/LogoElements";
import LogoText from "./logo/LogoText";

interface LogoModelProps {
  isMinimized?: boolean;
  color?: string;
}

/**
 * Animated 3D logo composed of multiple elements
 */
const LogoModel = ({ isMinimized = false, color = "#33C3F0" }: LogoModelProps) => {
  // Animation springs
  const { scale } = useSpring({
    scale: isMinimized ? 0.8 : 1,
    config: { mass: 2, tension: 200, friction: 50 }
  });

  return (
    <group>
      <LogoCore scale={scale} color={color} />
      <LogoElements />
      <LogoText />
    </group>
  );
};

export default LogoModel;
