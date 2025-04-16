
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, MenuIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" }
  ];

  const socialLinks = [
    { icon: <GithubIcon size={20} />, href: "https://github.com/arpitsinghal", label: "GitHub" },
    { icon: <LinkedinIcon size={20} />, href: "https://linkedin.com/in/arpitsinghal", label: "LinkedIn" },
    { icon: <TwitterIcon size={20} />, href: "https://twitter.com/arpitsinghal", label: "Twitter" },
    { icon: <MailIcon size={20} />, href: "mailto:contact@arpitsinghal.com", label: "Email" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass-panel bg-dark/80' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-xl font-bold tracking-tight text-gradient"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Arpit Singhal
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/80 hover:text-neon-purple transition-colors hover-float relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neon-purple after:transition-all hover:after:w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-neon-blue hover-float"
              aria-label={link.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/90 hover:text-neon-purple transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Mobile Navigation */}
        <motion.div
          className={`fixed inset-0 bg-dark z-50 flex flex-col ${isOpen ? 'block' : 'hidden'} md:hidden`}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="text-xl font-bold text-gradient">Arpit Singhal</span>
            <button
              className="text-white/90 hover:text-neon-purple transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <XIcon size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-4">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-lg font-medium py-2 text-white/80 hover:text-neon-purple transition-colors"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-neon-blue"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
