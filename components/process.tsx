"use client"
import React, { useEffect, useRef } from 'react';
import { MessageCircle, FileSearch, Code, Rocket, LifeBuoy, Palette, Headphones, Zap, Target, Shield, Clock, Users, Cpu, Globe, Sparkles, Lightbulb, TrendingUp, CheckCircle, MessageSquare } from 'lucide-react';
import type { ProcessStep as ProcessStepType } from '@/lib/supabase/types';

// Icon mapping for dynamic icon rendering
const iconMap: { [key: string]: React.ElementType } = {
  MessageCircle, FileSearch, Code, Rocket, LifeBuoy, Palette, Headphones, Zap, Target, Shield, Clock, Users, Cpu, Globe, Sparkles, Lightbulb, TrendingUp, CheckCircle, MessageSquare
}

interface ProcessStep {
  id: string | number;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Default process steps
const defaultProcessSteps: ProcessStep[] = [
  { id: 1, title: 'Discovery', description: 'We start by understanding your vision, goals, and requirements through in-depth consultation.', icon: MessageCircle },
  { id: 2, title: 'Design', description: 'Our designers create stunning, user-centric interfaces that align with your brand identity.', icon: Palette },
  { id: 3, title: 'Development', description: 'Our AI-powered development process ensures rapid, high-quality code delivery.', icon: Code },
  { id: 4, title: 'Launch', description: 'We deploy your application with automated CI/CD pipelines for seamless releases.', icon: Rocket },
  { id: 5, title: 'Support', description: 'Ongoing maintenance and support to keep your application running smoothly.', icon: Headphones },
]

interface ProcessSectionProps {
  processSteps?: ProcessStepType[]
}

const ProcessSection = ({ processSteps: dbProcessSteps }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Map database process steps to component format or use defaults
  const processSteps: ProcessStep[] = dbProcessSteps && dbProcessSteps.length > 0 
    ? dbProcessSteps.map(step => ({
        id: step.id,
        title: step.title,
        description: step.description || '',
        icon: iconMap[step.icon_name] || Zap,
      }))
    : defaultProcessSteps

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timeline = document.querySelector('.timeline');
          if (timeline) {
            timeline.classList.add('timeline-active');
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="process" className="section-padding relative bg-gradient-radial from-background to-[#121212]" ref={sectionRef}>
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up">Our Development Process</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 opacity-0 animate-fade-in-up delay-100"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Our streamlined approach helps us deliver exceptional products quickly and efficiently.
          </p>
        </div>
        
        <div className="timeline relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div 
            className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 w-1 h-0 bg-gradient-to-b from-primary to-blue-500 timeline-line"
            style={{ transition: 'height 1.5s ease-out' }}
          ></div>
          
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={step.id}
                className={`
                  timeline-item relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  items-start mb-12 md:mb-24 opacity-0
                `}
                style={{ 
                  animationDelay: `${0.4 + index * 0.2}s`,
                  transitionDelay: `${0.4 + index * 0.2}s` 
                }}
              >
                {/* Timeline connector and icon for desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center backdrop-blur-sm timeline-icon">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                {/* Mobile icon */}
                <div className="md:hidden flex absolute left-4 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center timeline-icon">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className={`
                  w-full ml-8 md:ml-0 md:w-[calc(50%-3rem)] 
                  ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}
                `}>
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animation styles for timeline - Fixed the style tag */}
        <style>
          {`
          .timeline-active .timeline-line {
            height: 100%;
          }
          
          .timeline-active .timeline-item {
            animation: fadeInUp 0.6s forwards;
          }
          
          .timeline-active .timeline-icon {
            animation: scaleIn 0.4s forwards;
            animation-delay: inherit;
          }
          
          @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          `}
        </style>
      </div>
    </section>
  );
};

export default ProcessSection;

