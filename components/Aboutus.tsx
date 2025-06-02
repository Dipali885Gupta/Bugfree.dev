"use client"

import { useEffect, useRef } from 'react'
import { Rocket, Zap, ShieldCheck, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { featureCards } from '@/constants'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
  delay: string
}

const FeatureCard = ({ title, description, icon: Icon, delay }: FeatureCardProps) => {
  return (
    <div className={`glass-card p-6 rounded-xl opacity-0 animate-fade-in-up ${delay}`}>
      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            entry.target.classList.remove('opacity-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    const hiddenElements = document.querySelectorAll('.hidden-element')
    hiddenElements.forEach((el) => observer.observe(el))

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up">
            Redefining Product Development
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 opacity-0 animate-fade-in-up delay-100"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200">
            We merge cutting-edge AI technologies with expert development to create innovative digital products 
            that outpace traditional development cycles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => (
            <FeatureCard 
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={card.delay}
            />
          ))}
        </div>
        
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden-element opacity-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose Our <span className="text-gradient">AI-Powered</span> Approach?
            </h3>
            <p className="text-gray-300 mb-6">
              In today's rapidly evolving digital landscape, businesses need to move quickly without sacrificing quality. 
              Our agency blends human creativity with artificial intelligence to accelerate every stage of the product development lifecycle.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300">Faster time-to-market with AI-accelerated development cycles</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300">Cost-effective solutions through automation of repetitive tasks</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300">Data-driven decision making throughout the development process</span>
              </li>
            </ul>
          </div>

          <div className="relative hidden-element opacity-0">
            <div className="glass-card rounded-2xl p-1">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
                <div className="relative w-full h-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                    alt="Team collaborating on AI product development"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-primary/30 blur-2xl"></div>
          </div>
        </div>
      
      </div>
    </section>
  )
}

export default AboutSection
