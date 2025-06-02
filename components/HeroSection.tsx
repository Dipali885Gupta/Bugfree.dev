"use client"
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      spotlightRef.current.style.background = `
        radial-gradient(
          600px circle at ${clientX}px ${clientY}px,
          rgba(29, 209, 130, 0.15),
          transparent 40%
        )
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding overflow-hidden">
      {/* Interactive spotlight effect */}
      <div 
        ref={spotlightRef} 
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              Next Generation Tech Agency
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up delay-100">
            Building & Shipping Products <span className="text-gradient">Faster</span> with AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Building and shipping products faster than traditional approaches in the AI era.
            We transform ideas into exceptional digital experiences.
          </p>
          
          <div className="opacity-0 animate-fade-in-up delay-300">
            <Button asChild size="lg" className="group">
              <a href="#contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in delay-500">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-5 h-10 rounded-full border-2 border-gray-500 flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
