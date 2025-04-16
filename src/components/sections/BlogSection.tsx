
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

// Sample blog post type
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  url: string;
};

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Sample blog posts - replace with actual content
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Cloud-Native Applications",
      excerpt: "Exploring the latest trends in cloud-native development and how organizations can leverage them for scalable solutions.",
      date: "Jan 15, 2024",
      readTime: "5 min read",
      image: "https://placehold.co/800x450/1A1F2C/9b87f5?text=Cloud+Native",
      category: "Cloud",
      url: "#blog1"
    },
    {
      id: 2,
      title: "Building Intelligent AI Assistants for Enterprise",
      excerpt: "How to create and deploy AI assistants that can transform business processes and enhance customer experiences.",
      date: "Dec 10, 2023",
      readTime: "7 min read",
      image: "https://placehold.co/800x450/1A1F2C/1EAEDB?text=AI+Assistants",
      category: "AI",
      url: "#blog2"
    },
    {
      id: 3,
      title: "Optimizing React Applications for Performance",
      excerpt: "Advanced techniques to improve the performance of your React applications, from code splitting to memoization.",
      date: "Nov 5, 2023",
      readTime: "6 min read",
      image: "https://placehold.co/800x450/1A1F2C/D946EF?text=React",
      category: "Frontend",
      url: "#blog3"
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
      id="blog"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-pink/10 rounded-full blur-[100px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Blog & Insights
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Thoughts, tutorials, and insights on software development,
            cloud-native technologies, and AI solutions.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="glass-panel rounded-xl overflow-hidden group transition-all duration-300 hover-glow hover:border-neon-purple/30"
            >
              <a href={post.url} className="block">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 m-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-neon-purple/80 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-purple transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  
                  <span className="inline-flex items-center text-neon-purple font-medium text-sm">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
        
        {/* View All Posts Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#more-posts"
            className="inline-flex items-center px-6 py-3 rounded-full border border-neon-purple/50 text-white hover:bg-neon-purple/10 transition-colors"
          >
            View All Posts
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
