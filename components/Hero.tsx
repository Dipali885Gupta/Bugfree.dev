"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] to-[#070709] z-[-1]"></div>

      {/* Abstract shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-tech-indigo/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-tech-teal/5 rounded-full blur-3xl"></div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-0 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Building Products Faster with 
              <span className="bg-gradient-to-r from-tech-indigo to-tech-teal text-transparent bg-clip-text"> AI-Powered </span> 
              Development
            </h1>

            <p className="text-xl text-gray-300 max-w-lg">
              Building and shipping products faster than traditional approaches in the AI era. 
              Turn your vision into reality with our accelerated development process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-tech-indigo hover:bg-tech-teal text-white text-lg px-8 py-6 rounded-md transition-all btn-hover-slide"
                size="lg"
              >
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button 
                variant="outline" 
                onClick={scrollToProjects}
                className="border-tech-indigo text-tech-indigo hover:text-tech-teal hover:border-tech-teal transition-colors text-lg px-8 py-6"
                size="lg"
              >
                Explore Our Work
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block opacity-0 animate-fade-in delay-300">
            <div className="relative w-full aspect-square">
              {/* Main image */}
              <div className="absolute inset-0 bg-gradient-to-br from-tech-indigo/80 to-tech-teal/80 rounded-2xl overflow-hidden animate-pulse-glow">
                {/* <img 
                  src=""
                  alt="Digital transformation" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-90" 
                /> */}
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-8 -left-8 bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-500/20 animate-fade-in delay-500">
                <div className="flex items-center gap-3">
                  <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                    <div className="text-green-400 text-2xl font-bold">+85%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Development Speed</div>
                    <div className="font-medium text-gray-200">Improved with AI</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gray-900 p-4 rounded-xl shadow-lg border border-purple-500/20 animate-fade-in delay-700">
                <div className="text-center">
                  <div className="text-tech-indigo font-bold text-xl">2-4 Weeks</div>
                  <div className="text-sm text-gray-400">Average Delivery Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

