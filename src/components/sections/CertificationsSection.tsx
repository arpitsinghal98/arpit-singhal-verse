import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
  category: "salesforce" | "cloud" | "development" | "other";
  color?: string;
};

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Sample certifications - replace with actual ones
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Salesforce Administrator",
      issuer: "Salesforce",
      date: "Jan 2023",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=Salesforce",
      link: "#cert1",
      category: "salesforce",
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: 2,
      title: "Platform Developer I",
      issuer: "Salesforce",
      date: "Mar 2023",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=Salesforce",
      link: "#cert2",
      category: "salesforce",
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: 3,
      title: "Platform Developer II",
      issuer: "Salesforce",
      date: "Jun 2023",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=Salesforce",
      link: "#cert3",
      category: "salesforce",
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: 4,
      title: "Integration Specialist",
      issuer: "Salesforce",
      date: "Aug 2023",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=Salesforce",
      link: "#cert4",
      category: "salesforce",
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: 5,
      title: "Experience Cloud",
      issuer: "Salesforce",
      date: "Oct 2023",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=Salesforce",
      link: "#cert5",
      category: "salesforce",
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: 6,
      title: "Google Cloud Architect",
      issuer: "Google Cloud",
      date: "Dec 2022",
      image: "https://placehold.co/200x200/1A1F2C/1EAEDB?text=GCP",
      link: "#cert6",
      category: "cloud",
      color: "from-neon-blue to-neon-pink"
    },
    {
      id: 7,
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Jul 2022",
      image: "https://placehold.co/200x200/1A1F2C/D946EF?text=AWS",
      link: "#cert7",
      category: "cloud",
      color: "from-neon-pink to-neon-purple"
    },
    {
      id: 8,
      title: "Advanced React",
      issuer: "Meta",
      date: "May 2022",
      image: "https://placehold.co/200x200/1A1F2C/9b87f5?text=React",
      link: "#cert8",
      category: "development",
      color: "from-neon-purple to-neon-blue"
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-neon-pink/10 rounded-full blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Certifications
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Professional certifications and achievements that showcase my expertise
            and commitment to continuous learning.
          </motion.p>
        </div>
        
        {/* Salesforce Badges Highlight */}
        <motion.div
          className="mb-16 p-8 glass-panel rounded-xl border border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
                <Award className="text-neon-purple" />
                <span className="text-gradient">Salesforce Certified Expert</span>
              </h3>
              <p className="text-white/70 mt-2">
                Earned all 5 key Salesforce certifications, demonstrating expertise in Salesforce development,
                administration, and integration.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {certifications
              .filter(cert => cert.category === "salesforce")
              .map((cert) => (
                <a
                  key={cert.id}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-16 h-16 mb-3 overflow-hidden rounded-full p-1 bg-gradient-to-r from-neon-blue to-neon-purple">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-center group-hover:text-neon-purple transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1">{cert.date}</p>
                </a>
              ))}
          </div>
        </motion.div>
        
        {/* Other Certifications */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certifications
            .filter(cert => cert.category !== "salesforce")
            .map((cert) => (
              <motion.a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="glass-panel rounded-xl overflow-hidden flex flex-col hover-glow transition-all duration-300 hover:border-neon-purple/50 group"
              >
                <div className={`h-3 bg-gradient-to-r ${cert.color}`}></div>
                <div className="p-6 flex gap-4 items-start flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={cert.image} 
                      alt={cert.issuer}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-neon-purple transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-white/50">{cert.date}</span>
                      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-neon-purple transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
