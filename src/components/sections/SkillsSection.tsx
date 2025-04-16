
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Database, Cloud, Smartphone, Server, BrainCircuit } from "lucide-react";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="w-6 h-6 text-neon-purple" />,
      skills: ["React", "Vue", "JavaScript", "TypeScript", "Tailwind CSS", "Flutter"],
      color: "from-neon-purple/20 to-neon-blue/20"
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-neon-blue" />,
      skills: ["Node.js", "Express", "Django", "Flask", "GraphQL", "REST APIs"],
      color: "from-neon-blue/20 to-neon-pink/20"
    },
    {
      title: "Cloud",
      icon: <Cloud className="w-6 h-6 text-neon-pink" />,
      skills: ["GCP", "AWS", "Firebase", "Docker", "Kubernetes", "Serverless"],
      color: "from-neon-pink/20 to-neon-purple/20"
    },
    {
      title: "Mobile",
      icon: <Smartphone className="w-6 h-6 text-neon-purple" />,
      skills: ["React Native", "Flutter", "iOS", "Android", "PWA"],
      color: "from-neon-purple/20 to-neon-blue/20"
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6 text-neon-blue" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firestore", "Redis"],
      color: "from-neon-blue/20 to-neon-pink/20"
    },
    {
      title: "AI/ML",
      icon: <BrainCircuit className="w-6 h-6 text-neon-pink" />,
      skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision", "Data Analytics"],
      color: "from-neon-pink/20 to-neon-purple/20"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Skills & Tech Stack
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Specialized in full-stack development, cloud-native solutions, and AI integration.
            Here's my toolkit for building modern, scalable applications.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`glass-panel p-6 rounded-xl border border-white/10 bg-gradient-to-br ${category.color} hover-glow transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/5 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80 hover:bg-neon-purple/20 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Salesforce section */}
        <motion.div 
          className="mt-12 glass-panel p-6 rounded-xl border border-white/10 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gradient mb-2">Salesforce Expertise</h3>
              <p className="text-white/70">5x Certified Salesforce Expert with extensive implementation experience</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Admin", "Platform Developer I", "Platform Developer II", "Integration Specialist", "Experience Cloud"].map((cert, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-neon-blue/20 text-white border border-neon-blue/30 animate-pulse"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
