
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-[100px] z-0" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-[100px] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row gap-10 md:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image/Avatar section */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-2/5 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden neon-border p-1 animate-float">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-neon-purple/50 to-neon-blue/50">
                  {/* Placeholder for Arpit's photo - replace the src with actual photo */}
                  <img
                    src="https://placehold.co/400x400/1A1F2C/9b87f5?text=AS&font=montserrat"
                    alt="Arpit Singhal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 glass-panel rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-3/5"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              About Me
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Hi, I'm Arpit Singhal, a passionate software developer with over 4 years of experience building cutting-edge applications that power organizational growth.
              </p>
              <p>
                I earned my Master's degree in Computer Science from the Illinois Institute of Technology with a perfect 4.0 GPA, where I specialized in cloud computing and artificial intelligence.
              </p>
              <p>
                My journey in software development has led me to work with diverse technologies across the full stack. I'm particularly drawn to the intersection of cloud-native applications and AI, where I can create solutions that are both scalable and intelligent.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest tech trends, contributing to open source projects, or mentoring aspiring developers.
              </p>
            </div>

            {/* Stats/Highlights */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              {[
                { value: "4+", label: "Years Experience" },
                { value: "4.0", label: "GPA" },
                { value: "25+", label: "Projects" },
                { value: "5", label: "Certifications" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-panel p-4 text-center"
                >
                  <span className="block text-2xl md:text-3xl font-bold text-neon-purple">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/70">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
