"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Our Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-900/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3 border-b border-purple-500/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="tech-gradient-text font-bold text-xl md:text-2xl animate-pulse-glow">
            TechFusion
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-medium text-gray-300 hover:text-tech-purple transition-all duration-300 animated-underline"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection('#contact')}
            className="web3-button"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-white hover:bg-purple-500/10"
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-xl absolute top-full left-0 w-full shadow-lg animate-fade-in border-b border-purple-500/10">
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="font-medium text-gray-300 hover:text-tech-purple transition-colors py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="web3-button w-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

