
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Maximize } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "web" | "mobile" | "cloud" | "ai" | "all";
  year: number;
  demoUrl?: string;
  githubUrl?: string;
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sample projects data - replace with real projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Cloud Native Dashboard",
      description: "A comprehensive dashboard for monitoring cloud resources across multiple providers. Built with React, Node.js, and integrated with various cloud provider APIs.",
      image: "https://placehold.co/600x400/1A1F2C/9b87f5?text=Cloud+Dashboard",
      technologies: ["React", "Node.js", "GCP", "AWS", "Docker"],
      category: "cloud",
      year: 2023,
      demoUrl: "#demo1",
      githubUrl: "#github1"
    },
    {
      id: 2,
      title: "AI Customer Service Bot",
      description: "An intelligent customer service bot powered by NLP. This solution reduced response times by 80% and improved customer satisfaction scores.",
      image: "https://placehold.co/600x400/1A1F2C/1EAEDB?text=AI+Bot",
      technologies: ["Python", "TensorFlow", "NLP", "Flask", "React"],
      category: "ai",
      year: 2023,
      demoUrl: "#demo2"
    },
    {
      id: 3,
      title: "E-Commerce Mobile App",
      description: "A cross-platform mobile application for e-commerce with real-time inventory updates and personalized recommendations.",
      image: "https://placehold.co/600x400/1A1F2C/D946EF?text=Mobile+App",
      technologies: ["Flutter", "Firebase", "Node.js", "Stripe"],
      category: "mobile",
      year: 2022,
      githubUrl: "#github3"
    },
    {
      id: 4,
      title: "Real-time Analytics Platform",
      description: "A scalable analytics platform processing millions of events per minute. Built with a microservices architecture on Kubernetes.",
      image: "https://placehold.co/600x400/1A1F2C/9b87f5?text=Analytics",
      technologies: ["React", "Node.js", "Kubernetes", "Kafka", "PostgreSQL"],
      category: "web",
      year: 2022,
      demoUrl: "#demo4",
      githubUrl: "#github4"
    },
    {
      id: 5,
      title: "Predictive Maintenance System",
      description: "An IoT-based system using machine learning to predict equipment failures before they occur, significantly reducing downtime.",
      image: "https://placehold.co/600x400/1A1F2C/1EAEDB?text=Predictive+ML",
      technologies: ["Python", "TensorFlow", "IoT", "AWS", "React"],
      category: "ai",
      year: 2021,
      demoUrl: "#demo5"
    },
    {
      id: 6,
      title: "Serverless CMS",
      description: "A content management system built entirely on serverless architecture. Offers exceptional scalability and cost efficiency.",
      image: "https://placehold.co/600x400/1A1F2C/D946EF?text=Serverless+CMS",
      technologies: ["React", "AWS Lambda", "DynamoDB", "S3", "CloudFront"],
      category: "cloud",
      year: 2021,
      githubUrl: "#github6"
    }
  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Web", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "Cloud", value: "cloud" },
    { label: "AI/ML", value: "ai" }
  ];
  
  const filteredProjects = projects.filter(
    project => activeFilter === "all" || project.category === activeFilter
  );
  
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
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A selection of my recent work across various technologies and domains.
            Click on a project to learn more.
          </motion.p>
          
          {/* Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-neon-purple text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover-glow transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden h-52">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-50" />
                <div className="absolute top-2 right-2 bg-dark/70 rounded-full px-3 py-1 text-xs text-white/80">
                  {project.year}
                </div>
                <button 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="View project details"
                >
                  <span className="p-2 rounded-full bg-neon-purple/80 text-white">
                    <Maximize size={24} />
                  </span>
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-neon-purple transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
            <motion.div 
              className="glass-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-60 md:h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-dark/70 text-white/80 hover:bg-dark hover:text-white transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gradient">
                  {selectedProject.title}
                </h3>
                <p className="text-white/80 mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-neon-purple/20 text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {selectedProject.demoUrl && (
                    <a 
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple text-white hover:bg-neon-purple/80 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
