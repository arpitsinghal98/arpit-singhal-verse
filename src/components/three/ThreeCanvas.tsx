
import { Canvas } from "@react-three/fiber";
import MainScene from "./MainScene";

interface ThreeCanvasProps {
  isVisible: boolean;
}

/**
 * Main ThreeCanvas component that renders the 3D scene
 */
const ThreeCanvas = ({ isVisible = false }: ThreeCanvasProps) => {
  return (
    <div id="canvas-container">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <MainScene isVisible={isVisible} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
