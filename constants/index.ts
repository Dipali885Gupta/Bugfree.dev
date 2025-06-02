import { MessageCircle, FileSearch, Code, Rocket, LifeBuoy,Zap,ShieldCheck, TrendingUp} from 'lucide-react';


export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Our Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

export const featureCards = [
  {
    icon: Rocket,
    title: "Accelerated Development",
    description: "Our AI-powered approach speeds up development by 3x compared to traditional methods.",
    delay: "delay-100",
  },
  {
    icon: Zap,
    title: "Intelligent Solutions",
    description: "We harness machine learning and AI to build smarter, more efficient products.",
    delay: "delay-200",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Rigorous testing and quality control ensures your product is ready for market.",
    delay: "delay-300",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Our products are designed to drive engagement, conversions, and business growth.",
    delay: "delay-400",
  },
];



// Define the Project type
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
};

export const projects:  Project[] = [
  {
    id: 1,
    title: 'AI Content Generator',
    description: 'An AI-powered platform that generates high-quality content for blogs, social media, and marketing materials.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
    tags: ['AI', 'SaaS', 'React', 'Node.js'],
    url: '#',
  },
  {
    id: 2,
    title: 'Smart Inventory System',
    description: 'An intelligent inventory management system that predicts stock needs and automates ordering processes.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    tags: ['IoT', 'Machine Learning', 'Dashboard'],
    url: '#',
  },
  {
    id: 3,
    title: 'Healthcare Analytics Platform',
    description: 'A comprehensive analytics platform that helps healthcare providers make data-driven decisions.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    tags: ['Healthcare', 'Analytics', 'D3.js'],
    url: '#',
  },
  {
    id: 4,
    title: 'Smart City Solution',
    description: 'An integrated system for smart city management, combining IoT sensors and data analytics.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
    tags: ['IoT', 'Smart City', 'Big Data'],
    url: '#',
  },
]

// Define the ProcessStep type
type ProcessStep = {
  id: number;
  title: string;
  description: string;
  icon: any; // Replace 'any' with the appropriate type for the icon if known
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Initial Consultation',
    description: 'We begin by discussing your idea and business goals to understand the full scope of your project.',
    icon: MessageCircle,
  },
  {
    id: 2,
    title: 'Planning & Specification',
    description: 'Our team creates a detailed plan and specifications for your product, outlining features and technologies.',
    icon: FileSearch,
  },
  {
    id: 3,
    title: 'Development Sprint',
    description: 'We rapidly build your product using our AI-powered development process and agile methodology.',
    icon: Code,
  },
  {
    id: 4,
    title: 'Launch & Delivery',
    description: 'Your fully functional product is delivered, ready for market with all the features you specified.',
    icon: Rocket,
  },
  {
    id: 5,
    title: 'Ongoing Support',
    description: 'We provide maintenance, updates, and support to ensure your product continues to perform optimally.',
    icon: LifeBuoy,
  },
];

