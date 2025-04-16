
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeCanvas from "../three/ThreeCanvas";
import * as THREE from "three";
import { useScrollAppearance } from "@/hooks/use-scroll-appearance";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [contentRef, isContentVisible] = useScrollAppearance<HTMLDivElement>({ threshold: 0.1 });
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Simulate loading time for the 3D scene
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Show tagline after logo animation
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 3000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeCanvas isVisible={isLoaded} />
      
      <motion.div 
        className="container mx-auto px-4 pt-20 pb-10 z-10 relative"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Invisible h1 for SEO */}
          <h1 className="sr-only">Arpit Singhal - Software Developer</h1>
          
          {/* Tagline */}
          <motion.div
            className="mt-32 md:mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: showTagline ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-xl md:text-3xl font-light text-white/80 leading-relaxed">
              Powering Organizational Growth with
            </p>
            <div 
              ref={contentRef}
              className="text-2xl md:text-4xl font-bold mt-2 text-neon-blue"
            >
              Cloud-Native and AI softwares
            </div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-neon-blue text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,174,219,0.7)] hover:scale-105"
            >
              Explore My Work
            </a>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: showTagline ? [0, 0.7, 0] : 0,
              y: showTagline ? [-10, 0, -10] : -10 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 2
            }}
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-white/60 mb-2">Scroll down</p>
              <div className="w-[2px] h-8 bg-neon-blue/50 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
