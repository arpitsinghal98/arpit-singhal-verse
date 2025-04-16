
import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect } from "react";

const Footer = () => {
  // Function to handle "Press A" Easter Egg
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'a') {
      alert("🚀 Arpit's Favorite Stack: React + Node.js + GCP + TypeScript");
    }
  };

  // Set up event listener for keyboard shortcut
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">Arpit Singhal</h3>
            <p className="text-white/70 mb-6">
              Software developer passionate about building innovative solutions using cloud-native technologies and AI.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center text-neon-purple hover:text-neon-blue transition-colors"
            >
              Get in touch <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-neon-purple transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              {[
                { name: "GitHub", href: "#github" },
                { name: "LinkedIn", href: "#linkedin" },
                { name: "Twitter", href: "#twitter" },
                { name: "Email", href: "mailto:contact@arpitsinghal.com" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-neon-purple transition-colors"
                    target={link.name === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Easter Egg Hint */}
            <div className="mt-6 text-xs text-white/40">
              <p>Try pressing "A" for a surprise</p>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        
        {/* Bottom */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} Arpit Singhal. All rights reserved.
          </p>
          
          <p className="text-white/60 text-sm flex items-center">
            Built with <Heart className="w-4 h-4 mx-1 text-neon-pink" /> and React, Three.js & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
