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
    title: 'AccountSaathi',
    description: 'A modern accounting platform inspired by Khatabook, AccountSaathi streamlines purchases, sales, and bookkeeping for businesses of all sizes. Enjoy seamless management of transactions, ledgers, and financial reports—all in one intuitive dashboard.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    tags: ['Accounting', 'Finance', 'Dashboard', 'Automation'],
    url: '#',
  },
  {
    id: 2,
    title: 'Padamalay Foods',
    description: 'A feature-rich grocery delivery app designed for convenience. Padamalay Foods offers a complete solution—from user-friendly ordering to real-time delivery tracking, admin dashboards, and automated invoice generation for a smooth grocery shopping experience.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    tags: ['Grocery', 'Delivery', 'E-commerce', 'Admin Dashboard'],
    url: '#',
  },
  {
    id: 3,
    title: 'Landing Pages',
    description: 'Crafted high-converting landing pages for cybersecurity agencies such as FixiSecurity and others. These pages are designed for maximum impact, combining modern UI, persuasive copy, and seamless lead capture to boost online presence and conversions.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    tags: ['Landing Page', 'Cybersecurity', 'UI/UX', 'Conversion'],
    url: '#',
  },
  {
    id: 4,
    title: 'Mobile Apps (Stride Collaboration)',
    description: 'In partnership with Stride, we develop robust and scalable mobile applications tailored to client needs. Our apps deliver exceptional user experiences and performance, helping Stride’s clients achieve their business goals on mobile platforms.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800',
    tags: ['Mobile App', 'Collaboration', 'Agency', 'React Native'],
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

