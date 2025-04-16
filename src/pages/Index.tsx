
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import ContactSection from "../components/sections/ContactSection";
import BlogSection from "../components/sections/BlogSection";
import TopCornerLogo from "../components/three/TopCornerLogo";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LogoModel from "../components/three/AnimatedLogo";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingText, setShowLoadingText] = useState(false);
  const loadingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show loading text after a brief delay
    const textTimer = setTimeout(() => {
      setShowLoadingText(true);
    }, 500);

    // Simulate loading progress
    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Complete loading after 2.8 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(timer);
    }, 2800);

    // Cleanup
    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={loadingContainerRef}
          >
            <div className="relative w-48 h-48 mb-8">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <LogoModel color="#33C3F0" />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={5} 
                />
              </Canvas>
            </div>
            
            <motion.div
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Arpit Singhal
            </motion.div>
            
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            <motion.div 
              className="mt-4 text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoadingText ? 1 : 0 }}
              transition={{ delay: 0.4 }}
            >
              {loadingProgress < 100 ? "Loading experience..." : "Ready!"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="bg-dark min-h-screen">
        <Navbar />
        <TopCornerLogo />
        
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
          <BlogSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
